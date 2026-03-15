// components/ui/Input.tsx
import { forwardRef } from 'react';
import { cn } from '../../lib/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, icon, ...props }, ref) => {
    return (
      <div className="relative group">
        {icon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500 group-focus-within:text-cyan-500 transition-colors">
            {icon}
          </div>
        )}
        <input
          className={cn(
            'w-full bg-white/5 border border-white/10 rounded-full py-3 pl-12 pr-4 text-base text-white focus:outline-none focus:border-cyan-500/50 focus:bg-white/10 transition-all',
            className
          )}
          ref={ref}
          {...props}
        />
      </div>
    );
  }
);
Input.displayName = 'Input';

export { Input };