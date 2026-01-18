'use client';

import { useSession } from 'next-auth/react';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { ShoppingBag, Settings, PlusCircle } from 'lucide-react';

export default function DashboardPage() {
  const { data: session } = useSession();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex flex-col gap-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground mt-2">
            Welcome back, {session?.user?.name || 'User'}. Manage your store and settings here.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Quick Actions */}
          <div className="bg-card border border-border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-primary/10 rounded-full">
                <ShoppingBag className="w-6 h-6 text-primary" />
              </div>
              <h2 className="text-xl font-semibold">Manage Shop</h2>
            </div>
            <p className="text-muted-foreground mb-6">
              View your products and manage inventory.
            </p>
            <Link href="/items">
              <Button className="w-full">
                Go to Shop
              </Button>
            </Link>
          </div>

          <div className="bg-card border border-border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-primary/10 rounded-full">
                <PlusCircle className="w-6 h-6 text-primary" />
              </div>
              <h2 className="text-xl font-semibold">Add Product</h2>
            </div>
            <p className="text-muted-foreground mb-6">
              Create a new product listing for your shop.
            </p>
            <Link href="/admin/add">
              <Button variant="outline" className="w-full">
                Add Item
              </Button>
            </Link>
          </div>

          <div className="bg-card border border-border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-4 mb-4">
               <div className="p-3 bg-primary/10 rounded-full">
                <Settings className="w-6 h-6 text-primary" />
              </div>
              <h2 className="text-xl font-semibold">Settings</h2>
            </div>
            <p className="text-muted-foreground mb-6">
              Update your profile and account settings.
            </p>
            <Link href="/settings">
              <Button variant="outline" className="w-full">
                View Settings
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
