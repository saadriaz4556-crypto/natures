import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-01-27.acacia",
});

export async function POST(req: NextRequest) {
  try {
    const { items } = await req.json();

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: "No items provided" }, { status: 400 });
    }

    const origin = process.env.NEXT_PUBLIC_SITE_URL || req.headers.get("origin") || "http://localhost:3000";

    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = items.map(
      (item: { title: string; imageSrc: string; size: { label: string; dimensions: string; price: number }; quantity: number }) => ({
        price_data: {
          currency: "usd",
          product_data: {
            name: `${item.title} — ${item.size.label}`,
            description: item.size.dimensions,
            images: [item.imageSrc],
          },
          unit_amount: Math.round(item.size.price * 100),
        },
        quantity: item.quantity,
      })
    );

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${origin}/shop/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/shop`,
      shipping_address_collection: {
        allowed_countries: ["US", "GB", "CA", "AU", "DE", "FR", "PK", "AE", "SA"],
      },
      custom_text: {
        submit: {
          message: "Prints are manually fulfilled and ship within 5–7 business days.",
        },
      },
      metadata: {
        source: "saad-nature-photography",
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Stripe checkout error:", error);
    const message = error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
