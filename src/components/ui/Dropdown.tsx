'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { useEffect, useRef, useState } from 'react';

interface DropdownMenuProps {
  children: React.ReactNode;
}

export function DropdownMenu({ children }: DropdownMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative inline-block text-left" ref={containerRef}>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
           // @ts-ignore
          return React.cloneElement(child, { isOpen, setIsOpen });
        }
        return child;
      })}
    </div>
  );
}

interface DropdownTriggerProps {
  children: React.ReactNode;
  isOpen?: boolean;
  setIsOpen?: (isOpen: boolean) => void;
  className?: string;
}

export function DropdownTrigger({ children, isOpen, setIsOpen, className }: DropdownTriggerProps) {
  return (
    <div onClick={() => setIsOpen && setIsOpen(!isOpen)} className={cn("cursor-pointer", className)}>
      {children}
    </div>
  );
}

interface DropdownContentProps {
  children: React.ReactNode;
  isOpen?: boolean;
  setIsOpen?: (isOpen: boolean) => void;
  align?: 'left' | 'right';
  className?: string;
}

export function DropdownContent({ children, isOpen, setIsOpen, align = 'right', className }: DropdownContentProps) {
  if (!isOpen) return null;

  return (
    <div
      className={cn(
        "absolute z-50 mt-2 min-w-[8rem] overflow-hidden rounded-md border border-border bg-popover p-1 text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95",
        align === 'right' ? "right-0" : "left-0",
        className
      )}
      onClick={() => setIsOpen && setIsOpen(false)}
    >
      {children}
    </div>
  );
}

interface DropdownItemProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  inset?: boolean;
}

export function DropdownItem({ children, className, inset, ...props }: DropdownItemProps) {
  return (
    <div
      className={cn(
        "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 cursor-pointer",
        inset && "pl-8",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
