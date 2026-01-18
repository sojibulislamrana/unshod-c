import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';

async function getItem(id: string) {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:5001';
    const res = await fetch(`${apiUrl}/api/items/${id}`, { cache: 'no-store' });
    if (res.status === 404) return null;
    if (!res.ok) throw new Error('Failed to fetch item');
    return res.json();
  } catch (error) {
    console.error(error);
    return null;
  }
}

export default async function ItemDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const item = await getItem(id);

  if (!item) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/items">
        <Button variant="ghost" className="mb-6 pl-0 hover:pl-2 transition-all">&larr; Back to Shop</Button>
      </Link>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="relative aspect-square bg-secondary rounded-2xl overflow-hidden shadow-lg">
           <Image 
                src={item.imageUrl} 
                alt={item.name} 
                fill 
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
                priority
            />
        </div>
        <div className="space-y-6 self-start">
            <div>
                <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider">{item.category}</span>
                <h1 className="text-4xl font-bold mt-2">{item.name}</h1>
            </div>
            <p className="text-3xl font-bold text-primary">${item.price.toFixed(2)}</p>
            <p className="text-lg text-muted-foreground leading-relaxed">{item.description}</p>
            
            <div className="pt-6 border-t border-border space-y-4">
                <div className="flex gap-4">
                    <Button size="lg" className="flex-1 text-lg h-12 rounded-full">
                        Add to Cart
                    </Button>
                    <Button size="lg" variant="secondary" className="flex-1 text-lg h-12 rounded-full border-2 border-primary">
                        Buy Now
                    </Button>
                </div>
                <div className="flex gap-4 text-sm text-muted-foreground justify-center">
                    <span>Free Shipping</span>
                    <span>•</span>
                    <span>Secure Checkout</span>
                    <span>•</span>
                    <span>Official Warranty</span>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}
