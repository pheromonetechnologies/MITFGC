import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-md font-semibold transition-all duration-300 cursor-pointer disabled:opacity-50 disabled:pointer-events-none min-h-[44px]",
  {
    variants: {
      variant: {
        default: "bg-primary text-white hover:bg-primary-dark shadow-sm hover:shadow-md",
        secondary: "bg-secondary text-white hover:bg-secondary-dark shadow-sm",
        accent: "bg-accent text-white hover:bg-accent-dark shadow-sm",
        outline: "border-2 border-primary text-primary hover:bg-primary hover:text-white",
        ghost: "text-foreground hover:bg-muted",
        destructive: "bg-destructive text-white hover:bg-red-600",
        link: "text-primary underline-offset-4 hover:underline p-0 min-h-0",
      },
      size: {
        sm: "text-sm px-3 py-1.5 min-h-[36px]",
        md: "text-sm px-5 py-2.5",
        lg: "text-base px-8 py-3",
        xl: "text-lg px-10 py-4",
        icon: "h-10 w-10 p-0",
      },
    },
    defaultVariants: { variant: "default", size: "md" },
  }
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  loading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, loading, children, disabled, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={disabled || loading}
        {...props}
      >
        {loading && (
          <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };
