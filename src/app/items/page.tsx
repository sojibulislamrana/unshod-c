import ProductCard from '@/components/ProductCard';

async function getItems() {
  try {
      const res = await fetch('http://127.0.0.1:5001/api/items', { cache: 'no-store' });
      if (!res.ok) {
        throw new Error('Failed to fetch data');
      }
      return res.json();
  } catch (error) {
      console.error(error);
      return [];
  }
}

interface Item {
    _id: string;
    name: string;
    description: string;
    price: number;
    category: string;
    imageUrl: string;
}

export default async function ItemsPage() {
  const items: Item[] = await getItems();

  // Group items by category
  const categorizedItems: Record<string, Item[]> = {};
  items.forEach(item => {
    const cat = item.category || 'General';
    if (!categorizedItems[cat]) categorizedItems[cat] = [];
    categorizedItems[cat].push(item);
  });

  const categories = Object.keys(categorizedItems).sort();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-12 text-center">Shop Collections</h1>
      
      {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-muted-foreground space-y-4">
              <p className="text-lg">No items found or server is connecting...</p>
          </div>
      ) : (
          <div className="space-y-16">
            {categories.map(category => (
                <section key={category} id={category} className="scroll-mt-24">
                    <div className="flex items-center gap-4 mb-6">
                        <h2 className="text-2xl font-bold">{category}</h2>
                        <div className="h-px bg-border flex-1" />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {categorizedItems[category].map(item => (
                            <ProductCard key={item._id} item={item} />
                        ))}
                    </div>
                </section>
            ))}
          </div>
      )}
    </div>
  );
}
