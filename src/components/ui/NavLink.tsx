// components/ui/NavLink.tsx
import Link from 'next/link';
import { cn } from '../../lib/utils';

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  active?: boolean;
}

export function NavLink({ href, children, className, active }: NavLinkProps) {
  return (
    <Link
      href={href}
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