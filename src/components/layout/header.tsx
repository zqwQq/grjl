'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Home, User, Briefcase, BookOpen, Mail, Settings } from 'lucide-react';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { personalInfo } from '@/data/personal';

// 导航菜单项
const navigationItems = [
  {
    name: '首页',
    href: '/',
    icon: Home,
  },
  {
    name: '关于我',
    href: '/about',
    icon: User,
  },
  {
    name: '作品集',
    href: '/portfolio',
    icon: Briefcase,
  },
  {
    name: '博客',
    href: '/blog',
    icon: BookOpen,
  },
  {
    name: '服务',
    href: '/services',
    icon: Settings,
  },
  {
    name: '联系',
    href: '/contact',
    icon: Mail,
  },
];

/**
 * 网站头部导航组件
 */
export function Header() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);
  const pathname = usePathname();

  // 监听滚动事件，添加背景模糊效果
  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 关闭移动端菜单
  const closeMobileMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled
          ? 'bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md border-b border-neutral-200/50 dark:border-neutral-800/50 shadow-sm'
          : 'bg-transparent'
      )}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center space-x-3 group"
            onClick={closeMobileMenu}
          >
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-600 to-secondary-600 rounded-xl flex items-center justify-center text-white font-bold text-lg transition-transform duration-200 group-hover:scale-110">
                {personalInfo.chineseName.charAt(0)}
              </div>
              <div className="absolute -inset-1 bg-gradient-to-br from-primary-600 to-secondary-600 rounded-xl opacity-0 group-hover:opacity-20 transition-opacity duration-200 blur-sm" />
            </div>
            <div className="hidden sm:block">
              <div className="font-bold text-lg text-neutral-900 dark:text-white">
                {personalInfo.chineseName}
              </div>
              <div className="text-sm text-neutral-600 dark:text-neutral-400 -mt-1">
                {personalInfo.title}
              </div>
            </div>
          </Link>

          {/* 桌面端导航 */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navigationItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200',
                    'hover:bg-neutral-100 dark:hover:bg-neutral-800',
                    isActive
                      ? 'text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20'
                      : 'text-neutral-700 dark:text-neutral-300'
                  )}
                >
                  <item.icon size={16} />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* 右侧操作区 */}
          <div className="flex items-center space-x-2">
            {/* 主题切换按钮 */}
            <ThemeToggle size="md" variant="ghost" />

            {/* 联系按钮 - 桌面端显示 */}
            <div className="hidden lg:block">
              <Button
                asChild
                variant="gradient"
                size="sm"
                className="ml-2"
              >
                <Link href="/contact">
                  开始合作
                </Link>
              </Button>
            </div>

            {/* 移动端菜单按钮 */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="切换菜单"
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </Button>
          </div>
        </div>

        {/* 移动端导航菜单 */}
        {isMenuOpen && (
          <div className="lg:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white dark:bg-neutral-900 border-t border-neutral-200 dark:border-neutral-800">
              {navigationItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      'flex items-center space-x-3 px-3 py-3 rounded-lg text-base font-medium transition-all duration-200',
                      'hover:bg-neutral-100 dark:hover:bg-neutral-800',
                      isActive
                        ? 'text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20'
                        : 'text-neutral-700 dark:text-neutral-300'
                    )}
                    onClick={closeMobileMenu}
                  >
                    <item.icon size={20} />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
              
              {/* 移动端联系按钮 */}
              <div className="pt-4 border-t border-neutral-200 dark:border-neutral-800">
                <Button
                  asChild
                  variant="gradient"
                  className="w-full"
                  onClick={closeMobileMenu}
                >
                  <Link href="/contact">
                    开始合作
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

/**
 * 导航链接组件
 */
interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export function NavLink({ href, children, className, onClick }: NavLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={cn(
        'flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200',
        'hover:bg-neutral-100 dark:hover:bg-neutral-800',
        isActive
          ? 'text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20'
          : 'text-neutral-700 dark:text-neutral-300',
        className
      )}
      onClick={onClick}
    >
      {children}
    </Link>
  );
}
