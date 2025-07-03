'use client';

import * as React from 'react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { type ThemeProviderProps } from 'next-themes/dist/types';

/**
 * 主题提供者组件
 * 为整个应用提供主题切换功能
 */
export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}

/**
 * 主题切换钩子
 * 提供主题相关的状态和方法
 */
export function useTheme() {
  const { theme, setTheme, resolvedTheme } = require('next-themes').useTheme();
  
  return {
    theme,
    setTheme,
    resolvedTheme,
    isDark: resolvedTheme === 'dark',
    isLight: resolvedTheme === 'light',
    toggleTheme: () => setTheme(theme === 'dark' ? 'light' : 'dark'),
  };
}
