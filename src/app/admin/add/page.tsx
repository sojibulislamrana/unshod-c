'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useSession } from 'next-auth/react';
import { useToast } from '@/components/ui/Toast';

export default function AddItemPage() {
  const router = useRouter();
  const { data: session } = useSession();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    imageUrl: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:5001';
      const res = await fetch(`${apiUrl}/api/items`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          price: parseFloat(formData.price),
        }),
      });

      if (!res.ok) {
        throw new Error('Failed to create item');
      }

      toast('Item created successfully!', 'success');
      setTimeout(() => {
        router.push('/items');
        router.refresh();
      }, 1500);
    } catch (err) {
      toast('Failed to add item. Ensure server is running.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Add New Item</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6 bg-card p-6 rounded-xl border shadow-sm">
        <div>
          <label className="block text-sm font-medium mb-2">Product Name</label>
          <Input name="name" required value={formData.name} onChange={handleChange} placeholder="e.g. Premium Headphones" />
        </div>

        <div>
           <label className="block text-sm font-medium mb-2">Description</label>
           <textarea 
             name="description" 
             required 
             value={formData.description} 
             onChange={handleChange}
             className="flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
             placeholder="Product description..."
           />
        </div>

        <div className="grid grid-cols-2 gap-4">
            <div>
                <label className="block text-sm font-medium mb-2">Price ($)</label>
                <Input name="price" type="number" step="0.01" required value={formData.price} onChange={handleChange} placeholder="0.00" />
            </div>
            <div>
                <label className="block text-sm font-medium mb-2">Category</label>
                <Input name="category" required value={formData.category} onChange={handleChange} placeholder="e.g. Electronics" />
            </div>
        </div>

        <div>
            <label className="block text-sm font-medium mb-2">Image URL</label>
            <Input name="imageUrl" required value={formData.imageUrl} onChange={handleChange} placeholder="https://..." />
            <p className="text-xs text-muted-foreground mt-1">Use a direct link to an image (e.g. Unsplash)</p>
        </div>

        <Button type="submit" size="lg" className="w-full" disabled={loading}>
          {loading ? 'Creating...' : 'Create Product'}
        </Button>
      </form>
    </div>
  );
}
