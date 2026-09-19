import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

/** Better Design Radix primitive, adapted to this portfolio's tinted glass tokens. */
const buttonVariants = cva('ds-button', {
  variants: {
    variant: { default: 'ds-button-primary', secondary: 'ds-button-secondary', ghost: 'ds-button-ghost', outline: 'ds-button-outline', link: 'ds-button-link', destructive: 'ds-button-destructive' },
    size: { default: 'ds-button-normal', sm: 'ds-button-small', lg: 'ds-button-large', xl: 'ds-button-large', icon: 'ds-button-icon' },
  },
  defaultVariants: { variant: 'default', size: 'default' },
});
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> { asChild?: boolean }
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Component = asChild ? Slot : 'button';
  return <Component type={asChild ? undefined : 'button'} className={cn(buttonVariants({ variant, size }), className)} ref={ref} {...props} />;
});
Button.displayName = 'Button';
export { Button, buttonVariants };
