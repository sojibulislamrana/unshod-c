'use client';

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export default function NewsletterForm() {
  return (
    <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
        <Input placeholder="Enter your email" type="email" className="h-11 bg-background" />
        <Button size="lg" className="h-11">Subscribe</Button>
    </form>
  );
}
