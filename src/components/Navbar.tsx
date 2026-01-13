'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShoppingBag, Menu, X, LogOut, PlusCircle } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { useSession, signOut } from 'next-auth/react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { data: session } = useSession();

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/items', label: 'Shop' },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0 flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2">
              <ShoppingBag className="h-6 w-6 text-primary" />
              <span className="font-bold text-xl tracking-tight">UniShop</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  pathname === link.href ? "text-primary" : "text-muted-foreground"
                )}
              >
                {link.label}
              </Link>
            ))}
            
            {session ? (
                <>
                    <Link href="/admin/add">
                        <Button variant="ghost" size="sm" className="gap-2">
                            <PlusCircle className="w-4 h-4" /> Add Item
                        </Button>
                    </Link>
                    <div className="flex items-center gap-4 border-l border-border pl-4">
                        <span className="text-sm font-medium">{session.user?.name || "Admin"}</span>
                        <Button 
                            variant="destructive" 
                            size="sm" 
                            onClick={() => signOut({ callbackUrl: '/' })}
                            className="gap-2"
                        >
                            <LogOut className="w-4 h-4" /> Logout
                        </Button>
                    </div>
                </>
            ) : (
                <Link href="/login">
                    <Button size="sm">Login</Button>
                </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-primary hover:text-primary/80 focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-background border-b border-border">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "block px-3 py-2 rounded-md text-base font-medium",
                  pathname === link.href
                    ? "text-primary bg-secondary"
                    : "text-muted-foreground hover:text-primary hover:bg-secondary/50"
                )}
              >
                {link.label}
              </Link>
            ))}
             <div className="px-3 pt-2 space-y-2">
                 {session ? (
                     <>
                        <Link href="/admin/add" onClick={() => setIsOpen(false)}>
                            <Button variant="outline" className="w-full justify-start gap-2">
                                <PlusCircle className="w-4 h-4" /> Add Item
                            </Button>
                        </Link>
                        <Button 
                            variant="destructive" 
                            className="w-full justify-start gap-2"
                            onClick={() => {
                                setIsOpen(false);
                                signOut({ callbackUrl: '/' });
                            }}
                        >
                            <LogOut className="w-4 h-4" /> Logout
                        </Button>
                     </>
                 ) : (
                    <Link href="/login" onClick={() => setIsOpen(false)}>
                        <Button className="w-full">Login</Button>
                    </Link>
                 )}
             </div>
          </div>
        </div>
      )}
    </nav>
  );
}
