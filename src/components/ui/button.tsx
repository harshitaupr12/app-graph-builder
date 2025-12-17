import { ButtonHTMLAttributes, forwardRef } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg';
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = '', variant = 'default', size = 'md', ...props }, ref) => {
    const baseStyles = 'rounded-lg font-medium transition-all focus:outline-none focus:ring-2 focus:ring-blue-500/50';
    
    const variants = {
      default: 'bg-blue-500 text-white hover:bg-blue-600 shadow-sm',
      ghost: 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300',
      outline: 'border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800',
    };
    
    const sizes = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2 text-sm',
      lg: 'px-6 py-3 text-base',
    };

    return (
      <button
        ref={ref}
        className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
        {...props}
      />
    );
  }
);

Button.displayName = 'Button';
