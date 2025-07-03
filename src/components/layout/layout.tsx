'use client';

import * as React from 'react';
import { Header } from './header';
import { Footer } from './footer';
import { cn } from '@/lib/utils';

interface LayoutProps {
  children: React.ReactNode;
  className?: string;
  showHeader?: boolean;
  showFooter?: boolean;
  fullWidth?: boolean;
}

/**
 * 主布局组件
 * 包含头部导航、主要内容区域和页脚
 */
export function Layout({
  children,
  className,
  showHeader = true,
  showFooter = true,
  fullWidth = false,
}: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-neutral-900">
      {/* 头部导航 */}
      {showHeader && <Header />}
      
      {/* 主要内容区域 */}
      <main
        className={cn(
          'flex-1',
          showHeader && 'pt-16 lg:pt-20', // 为固定头部留出空间
          !fullWidth && 'container-custom',
          className
        )}
      >
        {children}
      </main>
      
      {/* 页脚 */}
      {showFooter && <Footer />}
    </div>
  );
}

/**
 * 页面容器组件
 * 为页面内容提供标准的间距和布局
 */
interface PageContainerProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  description?: string;
  showTitle?: boolean;
}

export function PageContainer({
  children,
  className,
  title,
  description,
  showTitle = true,
}: PageContainerProps) {
  return (
    <div className={cn('py-8 lg:py-12', className)}>
      {showTitle && (title || description) && (
        <div className="mb-8 lg:mb-12">
          {title && (
            <h1 className="text-3xl lg:text-4xl font-bold text-neutral-900 dark:text-white mb-4">
              {title}
            </h1>
          )}
          {description && (
            <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-3xl">
              {description}
            </p>
          )}
        </div>
      )}
      {children}
    </div>
  );
}

/**
 * 区域容器组件
 * 为页面的不同区域提供一致的间距和样式
 */
interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  title?: string;
  subtitle?: string;
  description?: string;
  background?: 'default' | 'muted' | 'gradient';
  padding?: 'sm' | 'md' | 'lg' | 'xl';
  fullWidth?: boolean;
}

export function Section({
  children,
  className,
  id,
  title,
  subtitle,
  description,
  background = 'default',
  padding = 'lg',
  fullWidth = false,
}: SectionProps) {
  const backgroundClasses = {
    default: '',
    muted: 'bg-neutral-50 dark:bg-neutral-800/50',
    gradient: 'bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20',
  };

  const paddingClasses = {
    sm: 'py-8',
    md: 'py-12',
    lg: 'py-16 lg:py-20',
    xl: 'py-20 lg:py-24',
  };

  return (
    <section
      id={id}
      className={cn(
        paddingClasses[padding],
        backgroundClasses[background],
        className
      )}
    >
      <div className={cn(!fullWidth && 'container-custom')}>
        {/* 区域标题 */}
        {(title || subtitle || description) && (
          <div className="text-center mb-12 lg:mb-16">
            {subtitle && (
              <div className="text-primary-600 dark:text-primary-400 font-medium mb-2">
                {subtitle}
              </div>
            )}
            {title && (
              <h2 className="text-3xl lg:text-4xl font-bold text-neutral-900 dark:text-white mb-4">
                {title}
              </h2>
            )}
            {description && (
              <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto">
                {description}
              </p>
            )}
          </div>
        )}
        
        {children}
      </div>
    </section>
  );
}

/**
 * 卡片容器组件
 * 提供一致的卡片样式
 */
interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  padding?: 'sm' | 'md' | 'lg';
  border?: boolean;
  shadow?: 'none' | 'sm' | 'md' | 'lg';
}

export function Card({
  children,
  className,
  hover = false,
  padding = 'md',
  border = true,
  shadow = 'sm',
}: CardProps) {
  const paddingClasses = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };

  const shadowClasses = {
    none: '',
    sm: 'shadow-sm',
    md: 'shadow-md',
    lg: 'shadow-lg',
  };

  return (
    <div
      className={cn(
        'rounded-xl bg-white dark:bg-neutral-900',
        border && 'border border-neutral-200 dark:border-neutral-800',
        shadowClasses[shadow],
        hover && 'hover:shadow-lg hover:-translate-y-1 transition-all duration-300',
        paddingClasses[padding],
        className
      )}
    >
      {children}
    </div>
  );
}

/**
 * 网格容器组件
 * 提供响应式网格布局
 */
interface GridProps {
  children: React.ReactNode;
  className?: string;
  cols?: 1 | 2 | 3 | 4 | 5 | 6;
  gap?: 'sm' | 'md' | 'lg' | 'xl';
  responsive?: boolean;
}

export function Grid({
  children,
  className,
  cols = 3,
  gap = 'md',
  responsive = true,
}: GridProps) {
  const colsClasses = {
    1: 'grid-cols-1',
    2: 'grid-cols-2',
    3: 'grid-cols-3',
    4: 'grid-cols-4',
    5: 'grid-cols-5',
    6: 'grid-cols-6',
  };

  const gapClasses = {
    sm: 'gap-4',
    md: 'gap-6',
    lg: 'gap-8',
    xl: 'gap-12',
  };

  const responsiveClasses = responsive
    ? {
        1: 'grid-cols-1',
        2: 'grid-cols-1 md:grid-cols-2',
        3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
        4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
        5: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5',
        6: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6',
      }
    : colsClasses;

  return (
    <div
      className={cn(
        'grid',
        responsive ? responsiveClasses[cols] : colsClasses[cols],
        gapClasses[gap],
        className
      )}
    >
      {children}
    </div>
  );
}
