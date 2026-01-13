import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { ArrowRight, Star, Truck, ShieldCheck, RefreshCw, Zap } from "lucide-react";
import Link from 'next/link';
import NewsletterForm from "@/components/sections/NewsletterForm";

import ProductCard from '@/components/ProductCard';

async function getTrendingItems() {
  try {
      // Use 127.0.0.1 to avoid Node.js localhost IPv6 issues
      const res = await fetch('http://127.0.0.1:5001/api/items', { cache: 'no-store' }); 
      if (!res.ok) return [];
      const items = await res.json();
      return items.slice(0, 4); // Just take first 4 as trending
  } catch (error) {
      console.error(error);
      return [];
  }
}

export default async function Home() {
  const trendingItems = await getTrendingItems();

  return (
    <div className="flex flex-col gap-16 md:gap-24 pb-16">
      {/* 1. Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center bg-black text-white isolate overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[url('https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-50"></div>
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black/60 to-transparent"></div>
        <div className="text-center space-y-6 px-4 max-w-4xl mx-auto animate-in fade-in zoom-in duration-1000">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
            Elevate Your Lifestyle
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 max-w-2xl mx-auto">
            Discover a curated collection of premium products designed for the modern individual.
          </p>
          <div className="flex justify-center gap-4 pt-4">
             <Link href="/items">
                <Button size="lg" className="rounded-full px-8 text-lg">
                  Shop Now
                </Button>
             </Link>
             <Link href="/items">
                <Button variant="outline" size="lg" className="rounded-full px-8 text-lg bg-transparent text-white border-white hover:bg-white hover:text-black">
                  View Collections
                </Button>
             </Link>
          </div>
        </div>
      </section>

      {/* 2. Featured Categories */}
      <section className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Shop by Category</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {["Electronics", "Fashion", "Home & Living", "Accessories"].map((cat, i) => (
            <Link key={i} href={`/items#${cat}`} className="group relative h-64 rounded-xl overflow-hidden cursor-pointer shadow-lg block">
              <div className={`absolute inset-0 bg-gray-200 transition-transform duration-500 group-hover:scale-110`}>
                 <img 
                    src={`https://loremflickr.com/400/400/${cat.toLowerCase().split(' ')[0]}?lock=${i}`} 
                    alt={cat} 
                    className="w-full h-full object-cover"
                 />
              </div>
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors" />
              <div className="absolute bottom-6 left-6 text-white">
                <h3 className="text-xl font-bold">{cat}</h3>
                <p className="text-sm opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0">Explore &rarr;</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 3. Trending Now */}
      <section className="container mx-auto px-4 bg-secondary/30 py-16 rounded-3xl">
        <div className="flex justify-between items-end mb-10">
            <div>
                <h2 className="text-3xl font-bold">Trending Now</h2>
                <p className="text-muted-foreground mt-2">The most desired items of the season.</p>
            </div>
            <Link href="/items">
              <Button variant="ghost" className="hidden md:flex gap-2">View All <ArrowRight className="w-4 h-4" /></Button>
            </Link>
        </div>
        
        {trendingItems.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {trendingItems.map((item: any) => (
                    <ProductCard key={item._id} item={item} />
                ))}
            </div>
        ) : (
             <div className="text-center py-12 text-muted-foreground">
                <p>No trending items found. Please start the server and seed the database.</p>
             </div>
        )}

        <div className="mt-8 text-center md:hidden">
            <Link href="/items">
              <Button variant="outline" className="w-full">View All Trending</Button>
            </Link>
        </div>
      </section>

      {/* 4. Why Choose Us */}
      <section className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-6 rounded-2xl bg-primary/5 space-y-4">
                <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto">
                    <Truck className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold">Free Fast Shipping</h3>
                <p className="text-muted-foreground">Enjoy free shipping on all orders over $100. We deliver swiftly to your doorstep globally.</p>
            </div>
            <div className="p-6 rounded-2xl bg-primary/5 space-y-4">
                <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto">
                    <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold">Secure Payment</h3>
                <p className="text-muted-foreground">Your security is our priority. We use 256-bit SSL encryption for all transactions.</p>
            </div>
            <div className="p-6 rounded-2xl bg-primary/5 space-y-4">
                <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto">
                    <RefreshCw className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold">30-Day Returns</h3>
                <p className="text-muted-foreground">Not satisfied? Return it within 30 days for a full refund, no questions asked.</p>
            </div>
        </div>
      </section>

      {/* 5. Special Offers */}
      <section className="container mx-auto px-4">
        <div className="relative rounded-3xl overflow-hidden bg-primary text-primary-foreground">
            <div className="absolute top-0 right-0 w-1/2 h-full bg-white/10 skew-x-12 transform translate-x-20"></div>
            <div className="relative z-10 p-12 md:p-24 text-center md:text-left md:flex justify-between items-center">
                <div className="space-y-6 max-w-xl">
                    <div className="inline-block px-3 py-1 rounded-full bg-white/20 text-sm font-medium backdrop-blur-sm">
                        <Zap className="w-4 h-4 inline mr-1" /> Limited Time Offer
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold">Get 20% Off Your First Order</h2>
                    <p className="text-lg opacity-90">Sign up today and use code <span className="font-mono font-bold bg-white/20 px-2 py-1 rounded">WELCOME20</span> at checkout.</p>
                    <Button size="lg" variant="secondary" className="rounded-full px-8">Claim Offer</Button>
                </div>
                <div className="hidden md:block">
                    {/* Decorative element or hero image could go here */}
                    <div className="w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
                </div>
            </div>
        </div>
      </section>

      {/* 6. Customer Reviews */}
      <section className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">What Our Customers Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
                <div key={i} className="bg-card border border-border p-8 rounded-2xl shadow-sm">
                    <div className="flex gap-1 text-yellow-400 mb-4">
                        {[1, 2, 3, 4, 5].map(s => <Star key={s} className="w-4 h-4 fill-current" />)}
                    </div>
                    <p className="text-lg italic mb-6">"Absolutely love the quality and service. Will definitely be shopping here again!"</p>
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-gray-200" />
                        <div>
                            <p className="font-semibold">Alex Doe</p>
                            <p className="text-sm text-muted-foreground">Verified Buyer</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
      </section>

      {/* 7. Newsletter */}
      <section className="container mx-auto px-4 mb-16">
        <div className="bg-muted rounded-3xl p-12 text-center max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Subscribe to our newsletter</h2>
            <p className="text-muted-foreground mb-8 max-w-lg mx-auto">Stay updated on new arrivals, special offers, and exclusive events.</p>
            <NewsletterForm />
        </div>
      </section>
    </div>
  );
}
