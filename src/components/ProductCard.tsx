import Image from 'next/image';
import Link from 'next/link';
import { Button } from './ui/Button';

interface Item {
    _id: string;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
    category?: string;
}

export default function ProductCard({ item }: { item: Item }) {
  return (
    <div className="bg-card rounded-xl overflow-hidden shadow-sm border border-border hover:shadow-md transition-all group h-full flex flex-col">
      <div className="relative aspect-square overflow-hidden bg-secondary">
        <Image 
            src={item.imageUrl} 
            alt={item.name} 
            fill 
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform group-hover:scale-105"
        />
      </div>
      <div className="p-4 space-y-2 flex flex-col flex-1">
        <div className="flex justify-between items-start">
            <div>
                <p className="text-xs text-muted-foreground">{item.category || 'General'}</p>
                <h3 className="font-semibold text-lg line-clamp-1" title={item.name}>{item.name}</h3>
            </div>
            <span className="font-bold whitespace-nowrap">${item.price.toFixed(2)}</span>
        </div>
        <p className="text-sm text-muted-foreground line-clamp-2 flex-1">{item.description}</p>
        <Link href={`/items/${item._id}`} className="block mt-4">
            <Button className="w-full" variant="secondary">View Details</Button>
        </Link>
      </div>
    </div>
  );
}
