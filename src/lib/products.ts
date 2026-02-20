// Shop products data
export interface PrintSize {
  label: string;
  dimensions: string;
  price: number;
  priceId: string; // Stripe price ID placeholder
}

export interface Product {
  id: string;
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  location: string;
  category: string;
  sizes: PrintSize[];
  featured?: boolean;
}

export const PRODUCTS: Product[] = [
  {
    id: "prod-1",
    title: "Sunset over Hazro Fields",
    description: "A breathtaking golden hour shot of the wheat fields outside Hazro, with the sky painted in deep oranges and crimsons. This image captures the soul of rural Punjab.",
    imageSrc: "https://images.unsplash.com/photo-1476611338391-6f395a0ebc7b?w=800&q=85",
    imageAlt: "Sunset over Hazro wheat fields",
    location: "Hazro, Punjab",
    category: "Sunsets & Golden Hour",
    featured: true,
    sizes: [
      { label: "Digital Download", dimensions: "Full resolution JPEG", price: 15, priceId: "price_digital_1" },
      { label: "8×10 Print", dimensions: "8\" × 10\"", price: 35, priceId: "price_8x10_1" },
      { label: "16×20 Print", dimensions: "16\" × 20\"", price: 75, priceId: "price_16x20_1" },
      { label: "24×30 Print", dimensions: "24\" × 30\"", price: 130, priceId: "price_24x30_1" },
    ],
  },
  {
    id: "prod-2",
    title: "Golden Wheat Fields of Punjab",
    description: "Endless golden wheat stretching to the horizon under a pale blue sky. Taken during the May harvest season when Punjab turns into a sea of gold.",
    imageSrc: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=85",
    imageAlt: "Golden wheat fields Punjab",
    location: "Hazro Fields, Punjab",
    category: "Fields & Nature",
    featured: true,
    sizes: [
      { label: "Digital Download", dimensions: "Full resolution JPEG", price: 15, priceId: "price_digital_2" },
      { label: "8×10 Print", dimensions: "8\" × 10\"", price: 35, priceId: "price_8x10_2" },
      { label: "16×20 Print", dimensions: "16\" × 20\"", price: 75, priceId: "price_16x20_2" },
      { label: "24×30 Print", dimensions: "24\" × 30\"", price: 130, priceId: "price_24x30_2" },
    ],
  },
  {
    id: "prod-3",
    title: "Salt Range at Dawn",
    description: "The ancient Salt Range mountains glow under the first light of day. These Precambrian hills hold some of Pakistan's oldest geological history.",
    imageSrc: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=85",
    imageAlt: "Salt Range mountains at dawn",
    location: "Salt Range, Punjab",
    category: "Punjab Landscapes",
    sizes: [
      { label: "Digital Download", dimensions: "Full resolution JPEG", price: 15, priceId: "price_digital_3" },
      { label: "8×10 Print", dimensions: "8\" × 10\"", price: 35, priceId: "price_8x10_3" },
      { label: "16×20 Print", dimensions: "16\" × 20\"", price: 75, priceId: "price_16x20_3" },
      { label: "24×30 Print", dimensions: "24\" × 30\"", price: 130, priceId: "price_24x30_3" },
    ],
  },
  {
    id: "prod-4",
    title: "Milky Way over Punjab",
    description: "A rare clear night away from city lights reveals the full arc of the Milky Way galaxy above the open fields of central Punjab.",
    imageSrc: "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=800&q=85",
    imageAlt: "Milky Way over Punjab fields",
    location: "Rural Punjab",
    category: "Fields & Nature",
    featured: true,
    sizes: [
      { label: "Digital Download", dimensions: "Full resolution JPEG", price: 20, priceId: "price_digital_4" },
      { label: "8×10 Print", dimensions: "8\" × 10\"", price: 45, priceId: "price_8x10_4" },
      { label: "16×20 Print", dimensions: "16\" × 20\"", price: 90, priceId: "price_16x20_4" },
      { label: "24×30 Print", dimensions: "24\" × 30\"", price: 160, priceId: "price_24x30_4" },
    ],
  },
  {
    id: "prod-5",
    title: "Eagle in Flight",
    description: "A short-toed snake eagle caught mid-soar against a moody sky over the Kalar Kahar wetlands. A testament to Punjab's rich birdlife.",
    imageSrc: "https://images.unsplash.com/photo-1444464666168-49d633b86797?w=800&q=85",
    imageAlt: "Eagle soaring in flight",
    location: "Kalar Kahar, Punjab",
    category: "Wildlife",
    sizes: [
      { label: "Digital Download", dimensions: "Full resolution JPEG", price: 20, priceId: "price_digital_5" },
      { label: "8×10 Print", dimensions: "8\" × 10\"", price: 45, priceId: "price_8x10_5" },
      { label: "16×20 Print", dimensions: "16\" × 20\"", price: 90, priceId: "price_16x20_5" },
      { label: "24×30 Print", dimensions: "24\" × 30\"", price: 160, priceId: "price_24x30_5" },
    ],
  },
  {
    id: "prod-6",
    title: "Morning Mist — Pothohar Plateau",
    description: "Soft morning fog blankets the Pothohar Plateau, creating an ethereal, dreamlike atmosphere as the first light of day filters through.",
    imageSrc: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=800&q=85",
    imageAlt: "Morning mist over Pothohar Plateau",
    location: "Attock, Punjab",
    category: "Punjab Landscapes",
    sizes: [
      { label: "Digital Download", dimensions: "Full resolution JPEG", price: 15, priceId: "price_digital_6" },
      { label: "8×10 Print", dimensions: "8\" × 10\"", price: 35, priceId: "price_8x10_6" },
      { label: "16×20 Print", dimensions: "16\" × 20\"", price: 75, priceId: "price_16x20_6" },
      { label: "24×30 Print", dimensions: "24\" × 30\"", price: 130, priceId: "price_24x30_6" },
    ],
  },
];
