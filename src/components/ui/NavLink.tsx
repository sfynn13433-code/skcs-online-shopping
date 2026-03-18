// components/ui/NavLink.tsx
import type React from 'react';
import Link from 'next/link';
import { cn } from '../../lib/utils';

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  active?: boolean;
  onClick?: () => void;
}

export function NavLink({ href, children, className, active, onClick }: NavLinkProps) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        'text-neutral-300 hover:text-cyan-400 transition',
        active && 'text-cyan-400',
        className
      )}
    >
      {children}
    </Link>
  );
}