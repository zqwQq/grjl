import * as React from 'react';
import { cn } from '@/lib/utils';

/**
 * 按钮变体类型
 */
export type ButtonVariant =
  | 'default'
  | 'destructive'
  | 'outline'
  | 'secondary'
  | 'ghost'
  | 'link'
  | 'gradient';

export type ButtonSize =
  | 'default'
  | 'sm'
  | 'lg'
  | 'xl'
  | 'icon'
  | 'icon-sm'
  | 'icon-lg';

/**
 * 获取按钮样式类名
 */
const getButtonClasses = (variant: ButtonVariant = 'default', size: ButtonSize = 'default') => {
  const baseClasses = 'inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-95';

  const variantClasses = {
    default: 'bg-primary-600 text-white shadow hover:bg-primary-700 active:bg-primary-800 dark:bg-primary-500 dark:hover:bg-primary-600',
    destructive: 'bg-red-600 text-white shadow-sm hover:bg-red-700 active:bg-red-800',
    outline: 'border border-neutral-300 bg-transparent shadow-sm hover:bg-neutral-50 hover:text-neutral-900 active:bg-neutral-100 dark:border-neutral-600 dark:hover:bg-neutral-800 dark:hover:text-neutral-50',
    secondary: 'bg-secondary-100 text-secondary-900 shadow-sm hover:bg-secondary-200 active:bg-secondary-300 dark:bg-secondary-800 dark:text-secondary-100 dark:hover:bg-secondary-700',
    ghost: 'hover:bg-neutral-100 hover:text-neutral-900 active:bg-neutral-200 dark:hover:bg-neutral-800 dark:hover:text-neutral-50',
    link: 'text-primary-600 underline-offset-4 hover:underline dark:text-primary-400',
    gradient: 'bg-gradient-to-r from-primary-600 to-secondary-600 text-white shadow-lg hover:shadow-xl hover:scale-105',
  };

  const sizeClasses = {
    default: 'h-10 px-4 py-2',
    sm: 'h-8 rounded-md px-3 text-xs',
    lg: 'h-12 rounded-lg px-8 text-base',
    xl: 'h-14 rounded-xl px-10 text-lg',
    icon: 'h-10 w-10',
    'icon-sm': 'h-8 w-8',
    'icon-lg': 'h-12 w-12',
  };

  return cn(baseClasses, variantClasses[variant], sizeClasses[size]);
};

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  asChild?: boolean;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

/**
 * 按钮组件
 * 支持多种样式变体和尺寸
 */
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({
    className,
    variant = 'default',
    size = 'default',
    loading = false,
    leftIcon,
    rightIcon,
    children,
    disabled,
    ...props
  }, ref) => {
    return (
      <button
        className={cn(getButtonClasses(variant, size), className)}
        ref={ref}
        disabled={disabled || loading}
        {...props}
      >
        {loading && (
          <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
        )}
        {!loading && leftIcon && (
          <span className="mr-2">{leftIcon}</span>
        )}
        {children}
        {!loading && rightIcon && (
          <span className="ml-2">{rightIcon}</span>
        )}
      </button>
    );
  }
);
Button.displayName = 'Button';

export { Button };

/**
 * 图标按钮组件
 * 专门用于只包含图标的按钮
 */
export interface IconButtonProps extends Omit<ButtonProps, 'leftIcon' | 'rightIcon'> {
  icon: React.ReactNode;
  'aria-label': string;
}

export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ icon, className, size = 'icon', ...props }, ref) => {
    return (
      <Button
        ref={ref}
        size={size}
        className={className}
        {...props}
      >
        {icon}
      </Button>
    );
  }
);
IconButton.displayName = 'IconButton';

/**
 * 浮动操作按钮组件
 * 通常用于主要操作
 */
export interface FABProps extends Omit<ButtonProps, 'variant' | 'size'> {
  size?: 'default' | 'lg';
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  fixed?: boolean;
}

export const FAB = React.forwardRef<HTMLButtonElement, FABProps>(
  ({ 
    className, 
    size = 'default',
    position = 'bottom-right',
    fixed = false,
    children,
    ...props 
  }, ref) => {
    const positionClasses = {
      'bottom-right': 'bottom-6 right-6',
      'bottom-left': 'bottom-6 left-6',
      'top-right': 'top-6 right-6',
      'top-left': 'top-6 left-6',
    };

    const sizeClasses = {
      default: 'h-14 w-14',
      lg: 'h-16 w-16',
    };

    return (
      <Button
        ref={ref}
        variant="gradient"
        className={cn(
          'rounded-full shadow-lg hover:shadow-xl',
          sizeClasses[size],
          fixed && 'fixed z-50',
          fixed && positionClasses[position],
          className
        )}
        {...props}
      >
        {children}
      </Button>
    );
  }
);
FAB.displayName = 'FAB';

/**
 * 按钮组组件
 * 用于将多个相关按钮组合在一起
 */
export interface ButtonGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: 'horizontal' | 'vertical';
  size?: 'sm' | 'default' | 'lg';
  variant?: 'default' | 'outline' | 'ghost';
}

export const ButtonGroup = React.forwardRef<HTMLDivElement, ButtonGroupProps>(
  ({ 
    className, 
    orientation = 'horizontal',
    size = 'default',
    variant = 'outline',
    children,
    ...props 
  }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'inline-flex',
          orientation === 'horizontal' ? 'flex-row' : 'flex-col',
          '[&>button]:rounded-none',
          '[&>button:first-child]:rounded-l-lg',
          '[&>button:last-child]:rounded-r-lg',
          orientation === 'vertical' && '[&>button:first-child]:rounded-t-lg [&>button:first-child]:rounded-l-none',
          orientation === 'vertical' && '[&>button:last-child]:rounded-b-lg [&>button:last-child]:rounded-r-none',
          '[&>button:not(:first-child)]:border-l-0',
          orientation === 'vertical' && '[&>button:not(:first-child)]:border-l [&>button:not(:first-child)]:border-t-0',
          className
        )}
        {...props}
      >
        {React.Children.map(children, (child) => {
          if (React.isValidElement(child) && child.type === Button) {
            return React.cloneElement(child, {
              variant: variant,
              size: size,
              ...child.props,
            });
          }
          return child;
        })}
      </div>
    );
  }
);
ButtonGroup.displayName = 'ButtonGroup';
