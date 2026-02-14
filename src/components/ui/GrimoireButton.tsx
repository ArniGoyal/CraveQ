import { ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface GrimoireButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

export const GrimoireButton = forwardRef<HTMLButtonElement, GrimoireButtonProps>(
  ({ className, variant = 'primary', size = 'md', children, ...props }, ref) => {
    const baseStyles = "relative font-data uppercase tracking-widest transition-all duration-300 overflow-hidden group";
    
    const variants = {
      primary: "bg-primary text-primary-foreground hover:shadow-[0_0_30px_hsl(150_100%_50%/0.5),0_0_60px_hsl(150_100%_50%/0.3)] border border-primary/50",
      secondary: "bg-transparent text-primary border border-primary/50 hover:bg-primary/10 hover:shadow-[0_0_20px_hsl(150_100%_50%/0.3)]",
      ghost: "bg-transparent text-muted-foreground hover:text-primary hover:bg-primary/5",
    };
    
    const sizes = {
      sm: "px-4 py-2 text-xs",
      md: "px-6 py-3 text-sm",
      lg: "px-8 py-4 text-base",
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {/* Shimmer effect */}
        <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
        
        {/* Content */}
        <span className="relative z-10 flex items-center justify-center gap-2">
          {children}
        </span>
        
        {/* Corner accents */}
        <span className="absolute top-0 left-0 w-2 h-2 border-t border-l border-primary/80" />
        <span className="absolute top-0 right-0 w-2 h-2 border-t border-r border-primary/80" />
        <span className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-primary/80" />
        <span className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-primary/80" />
      </button>
    );
  }
);

GrimoireButton.displayName = 'GrimoireButton';

export default GrimoireButton;
