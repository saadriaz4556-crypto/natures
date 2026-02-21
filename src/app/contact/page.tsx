"use client";

import { useState } from "react";
import Image from "next/image";
import { Mail, MapPin, Instagram, Twitter, Send, Check } from "lucide-react";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      setError("Please fill in all required fields.");
      return;
    }
    setSending(true);
    setError("");

    try {
      // Import exactly where it's needed to avoid lifting the import to the top if not wanted,
      // but it's better to import at top. I'll use the top-level import logic in my next tool replacement or just do it inline here.
      const { supabase } = await import('@/lib/supabaseClient');

      // We assume the table is named `contact_messages`. 
      // If the user named it differently in Supabase, they need to update this string.
      const { error: submitError } = await supabase
        .from('users')
        .insert([
          {
            Name: form.name,
            Email: form.email,
            Message: form.message
          }
        ]);

      if (submitError) throw submitError;

      setSent(true);
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (err: any) {
      console.error("Error submitting form:", err);
      setError(err.message || "Failed to send message. Please try again later.");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="pt-16 min-h-screen">
      {/* Header */}
      <div className="relative h-48 sm:h-56 overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=1600&q=80"
          alt="Contact page header"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/65" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4">
          <p className="text-xs uppercase tracking-[0.25em] font-medium mb-2 text-white/70">Get in Touch</p>
          <h1 className="font-serif text-4xl sm:text-5xl font-semibold">Contact</h1>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

          {/* Contact form */}
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-primary font-medium mb-2">Send a Message</p>
            <h2 className="font-serif text-2xl font-semibold mb-2">Let's Talk</h2>
            <p className="text-muted-foreground text-sm mb-8 leading-relaxed">
              Whether you're interested in a print, have a licensing inquiry, or just want to say hello — I'd love to hear from you.
            </p>

            {sent ? (
              <div className="bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 rounded-xl p-6 flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/50 flex items-center justify-center flex-shrink-0">
                  <Check className="w-5 h-5 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <p className="font-medium text-green-800 dark:text-green-300">Message sent!</p>
                  <p className="text-sm text-green-700 dark:text-green-400 mt-0.5">
                    I'll get back to you within 1–2 business days.
                  </p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-xs font-medium text-foreground/70 mb-1.5">
                      Name <span className="text-destructive">*</span>
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      required
                      className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors placeholder:text-muted-foreground/50"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-xs font-medium text-foreground/70 mb-1.5">
                      Email <span className="text-destructive">*</span>
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      required
                      className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors placeholder:text-muted-foreground/50"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-xs font-medium text-foreground/70 mb-1.5">
                    Subject
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors text-foreground"
                  >
                    <option value="">Select a subject...</option>
                    <option value="print-inquiry">Print Inquiry</option>
                    <option value="licensing">Photo Licensing</option>
                    <option value="collaboration">Collaboration</option>
                    <option value="general">General Question</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-xs font-medium text-foreground/70 mb-1.5">
                    Message <span className="text-destructive">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell me what's on your mind..."
                    required
                    rows={5}
                    className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors placeholder:text-muted-foreground/50 resize-none"
                  />
                </div>

                {error && (
                  <p className="text-destructive text-sm">{error}</p>
                )}

                <button
                  type="submit"
                  disabled={sending}
                  className="flex items-center gap-2 bg-primary text-primary-foreground px-7 py-3 rounded-full font-medium hover:opacity-90 transition-opacity disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {sending ? (
                    <>
                      <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Info panel */}
          <div className="space-y-8">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-primary font-medium mb-2">Find Me</p>
              <h2 className="font-serif text-2xl font-semibold mb-6">Connect</h2>

              <div className="space-y-4">
                <a
                  href="mailto:saadriaz4555@gmail.com"
                  className="flex items-start gap-4 p-4 rounded-xl border border-border hover:border-primary/40 hover:bg-muted/50 transition-all group"
                >
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                    <Mail className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Email</p>
                    <p className="text-sm text-muted-foreground">saadriaz4555@gamil.com</p>
                    <p className="text-xs text-muted-foreground mt-0.5">Usually responds within 24 hours</p>
                  </div>
                </a>

                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-4 p-4 rounded-xl border border-border hover:border-primary/40 hover:bg-muted/50 transition-all group"
                >
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                    <Instagram className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Instagram</p>
                    <p className="text-sm text-muted-foreground">@clicks._.by._.saadi</p>
                    <p className="text-xs text-muted-foreground mt-0.5">Behind-the-scenes and new work</p>
                  </div>
                </a>

                <div className="flex items-start gap-4 p-4 rounded-xl border border-border bg-muted/20">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Location</p>
                    <p className="text-sm text-muted-foreground">Satellite Town, Rawalpindi </p>
                    <p className="text-sm text-muted-foreground">Punjab, Pakistan</p>
                  </div>
                </div>
              </div>
            </div>

            {/* FAQ */}
            <div className="border-t border-border pt-8">
              <h3 className="font-serif text-lg font-semibold mb-4">Common Questions</h3>
              <div className="space-y-4">
                {[
                  {
                    q: "How are prints shipped?",
                    a: "Prints are rolled in a protective tube or flat-packed depending on size, and shipped via courier with tracking.",
                  },
                  {
                    q: "Can I license a photo for commercial use?",
                    a: "Yes. Please reach out with details about your project and intended use.",
                  },
                  {
                    q: "Do you do custom shoots?",
                    a: "I take on limited commissions for nature and landscape work in Punjab. Enquire via the form.",
                  },
                ].map(item => (
                  <div key={item.q} className="space-y-1">
                    <p className="text-sm font-medium">{item.q}</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.a}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
