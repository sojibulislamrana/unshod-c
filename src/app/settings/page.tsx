'use client';

import { useSession } from 'next-auth/react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Avatar } from '@/components/ui/Avatar';

export default function SettingsPage() {
  const { data: session } = useSession();

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Settings</h1>
      
      <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
        <h2 className="text-xl font-semibold mb-6">Profile Settings</h2>
        
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-4">
             <Avatar 
                src={session?.user?.image} 
                fallback={session?.user?.name?.charAt(0) || "U"} 
                className="h-20 w-20 text-lg"
             />
             <div>
                <Button variant="outline" size="sm">Change Avatar</Button>
             </div>
          </div>

          <div className="grid gap-4 max-w-md">
            <div className="grid gap-2">
              <label htmlFor="name" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Name
              </label>
              <Input 
                id="name" 
                placeholder="Your name" 
                defaultValue={session?.user?.name || ''} 
                readOnly
              />
              <p className="text-xs text-muted-foreground">
                This is your public display name.
              </p>
            </div>

            <div className="grid gap-2">
              <label htmlFor="email" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Email
              </label>
              <Input 
                id="email" 
                type="email" 
                placeholder="Email address" 
                defaultValue={session?.user?.email || ''} 
                readOnly
              />
               <p className="text-xs text-muted-foreground">
                Your email address is managed by your login provider.
              </p>
            </div>
          </div>
          
           <div className="pt-4">
                <Button disabled>Save Changes</Button>
           </div>
        </div>
      </div>
    </div>
  );
}
