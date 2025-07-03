'use client';

import * as React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/components/providers/theme-provider';
import { cn } from '@/lib/utils';

interface ThemeToggleProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'ghost' | 'outline';
}

/**
 * 主题切换按钮组件
 * 支持在亮色和暗色主题之间切换
 */
export function ThemeToggle({ 
  className, 
  size = 'md', 
  variant = 'ghost' 
}: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  // 确保组件在客户端渲染后才显示，避免水合不匹配
  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div
        className={cn(
          'inline-flex items-center justify-center rounded-lg transition-colors',
          {
            'h-8 w-8': size === 'sm',
            'h-10 w-10': size === 'md',
            'h-12 w-12': size === 'lg',
          },
          className
        )}
      />
    );
  }

  const sizeClasses = {
    sm: 'h-8 w-8',
    md: 'h-10 w-10',
    lg: 'h-12 w-12',
  };

  const variantClasses = {
    default: 'bg-primary-600 text-white hover:bg-primary-700',
    ghost: 'hover:bg-neutral-100 dark:hover:bg-neutral-800',
    outline: 'border border-neutral-300 hover:bg-neutral-50 dark:border-neutral-600 dark:hover:bg-neutral-800',
  };

  const iconSize = {
    sm: 16,
    md: 20,
    lg: 24,
  };

  return (
    <button
      onClick={toggleTheme}
      className={cn(
        'inline-flex items-center justify-center rounded-lg transition-all duration-200',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2',
        'active:scale-95',
        sizeClasses[size],
        variantClasses[variant],
        className
      )}
      aria-label={theme === 'dark' ? '切换到亮色主题' : '切换到暗色主题'}
      title={theme === 'dark' ? '切换到亮色主题' : '切换到暗色主题'}
    >
      {theme === 'dark' ? (
        <Sun 
          size={iconSize[size]} 
          className="transition-transform duration-200 rotate-0 scale-100" 
        />
      ) : (
        <Moon 
          size={iconSize[size]} 
          className="transition-transform duration-200 rotate-0 scale-100" 
        />
      )}
    </button>
  );
}

/**
 * 带动画效果的主题切换按钮
 */
export function AnimatedThemeToggle({ className, size = 'md' }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div
        className={cn(
          'inline-flex items-center justify-center rounded-full transition-colors',
          {
            'h-8 w-8': size === 'sm',
            'h-10 w-10': size === 'md',
            'h-12 w-12': size === 'lg',
          },
          className
        )}
      />
    );
  }

  const sizeClasses = {
    sm: 'h-8 w-8',
    md: 'h-10 w-10',
    lg: 'h-12 w-12',
  };

  const iconSize = {
    sm: 16,
    md: 20,
    lg: 24,
  };

  return (
    <button
      onClick={toggleTheme}
      className={cn(
        'relative inline-flex items-center justify-center rounded-full',
        'bg-gradient-to-r from-orange-400 to-pink-400 dark:from-blue-600 dark:to-purple-600',
        'transition-all duration-500 ease-in-out',
        'hover:scale-110 active:scale-95',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2',
        'shadow-lg hover:shadow-xl',
        sizeClasses[size],
        className
      )}
      aria-label={theme === 'dark' ? '切换到亮色主题' : '切换到暗色主题'}
      title={theme === 'dark' ? '切换到亮色主题' : '切换到暗色主题'}
    >
      <div className="relative">
        <Sun
          size={iconSize[size]}
          className={cn(
            'absolute inset-0 text-white transition-all duration-500',
            theme === 'dark' 
              ? 'rotate-90 scale-0 opacity-0' 
              : 'rotate-0 scale-100 opacity-100'
          )}
        />
        <Moon
          size={iconSize[size]}
          className={cn(
            'absolute inset-0 text-white transition-all duration-500',
            theme === 'dark' 
              ? 'rotate-0 scale-100 opacity-100' 
              : '-rotate-90 scale-0 opacity-0'
          )}
        />
      </div>
    </button>
  );
}
