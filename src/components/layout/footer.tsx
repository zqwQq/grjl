'use client';

import * as React from 'react';
import Link from 'next/link';
import { 
  Heart, 
  ArrowUp, 
  Mail, 
  Phone, 
  MapPin,
  Github,
  Linkedin,
  Instagram,
  Twitter
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { personalInfo, socialLinks } from '@/data/personal';

// 快速链接
const quickLinks = [
  { name: '首页', href: '/' },
  { name: '关于我', href: '/about' },
  { name: '作品集', href: '/portfolio' },
  { name: '博客', href: '/blog' },
];

const serviceLinks = [
  { name: '品牌设计', href: '/services#brand-design' },
  { name: '电商设计', href: '/services#ecommerce-design' },
  { name: '包装设计', href: '/services#packaging-design' },
  { name: '网页设计', href: '/services#web-design' },
];

const legalLinks = [
  { name: '隐私政策', href: '/privacy' },
  { name: '服务条款', href: '/terms' },
  { name: '版权声明', href: '/copyright' },
];

// 社交媒体图标映射
const socialIcons = {
  github: Github,
  linkedin: Linkedin,
  instagram: Instagram,
  twitter: Twitter,
  behance: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M22 7h-7v-2h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-3.074 0-5.564-1.729-5.564-5.675 0-3.91 2.325-5.92 5.466-5.92 3.082 0 4.964 1.782 5.375 4.426.078.506.109 1.188.095 2.14H15.97c.13 3.211 3.483 3.312 4.588 2.029h3.168zm-7.686-4h4.965c-.105-1.547-1.136-2.219-2.477-2.219-1.466 0-2.277.768-2.488 2.219zm-9.574 6.988h-6.466v-14.967h6.953c5.476.081 5.58 5.444 2.72 6.906 3.461 1.26 3.577 8.061-3.207 8.061zm-3.466-8.988h3.584c2.508 0 2.906-3-.312-3h-3.272v3zm3.391 3h-3.391v3.016h3.341c3.055 0 2.868-3.016.05-3.016z"/>
    </svg>
  ),
  dribbble: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0c-6.628 0-12 5.373-12 12 0 6.628 5.372 12 12 12s12-5.372 12-12c0-6.627-5.372-12-12-12zm9.427 5.373c1.318 1.604 2.131 3.631 2.131 5.827 0 .342-.024.677-.067 1.005-.722-.165-2.649-.601-4.301-.601-.177 0-.357.007-.539.019-.121-.302-.251-.608-.394-.908 2.065-.842 3.087-2.086 3.17-2.342zm-2.734-1.324c-.077.246-1.018 1.435-3.016 2.188-1.001-1.836-2.111-3.391-2.27-3.625 2.466-.631 4.677-.178 5.286.437zm-7.99-.956c.138.204 1.227 1.781 2.248 3.584-2.897.771-5.454.771-5.771.771-.384-1.846.255-3.566 1.523-4.355zm-1.563 6.239c.343-.002.896-.016 1.596-.016 2.322 0 4.617-.302 5.744-.302.177 0 .35.007.518.019-.121.302-.251.608-.394.908-2.065.842-3.087 2.086-3.17 2.342-.722.165-2.649.601-4.301.601-.177 0-.357-.007-.539-.019.121-.302.251-.608.394-.908 2.065-.842 3.087-2.086 3.17-2.342.722-.165 2.649-.601 4.301-.601.177 0 .357.007.539.019.121.302.251.608.394.908-2.065.842-3.087 2.086-3.17 2.342-.722.165-2.649.601-4.301.601-.177 0-.357-.007-.539-.019-.121-.302-.251-.608-.394-.908 2.065-.842 3.087-2.086 3.17-2.342z"/>
    </svg>
  ),
  wechat: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 0 1 .213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 0 0 .167-.054l1.903-1.114a.864.864 0 0 1 .717-.098 10.16 10.16 0 0 0 2.837.403c.276 0 .543-.027.811-.05-.857-2.578.157-4.972 1.932-6.446 1.703-1.415 3.882-1.98 5.853-1.838-.576-3.583-4.196-6.348-8.596-6.348zM5.785 5.991c.642 0 1.162.529 1.162 1.18 0 .659-.52 1.188-1.162 1.188-.642 0-1.162-.529-1.162-1.188 0-.651.52-1.18 1.162-1.18zm5.813 0c.642 0 1.162.529 1.162 1.18 0 .659-.52 1.188-1.162 1.188-.642 0-1.162-.529-1.162-1.188 0-.651.52-1.18 1.162-1.18zm4.721 2.471c-3.48 0-6.294 2.454-6.294 5.48 0 3.027 2.814 5.481 6.294 5.481a7.18 7.18 0 0 0 2.06-.302.615.615 0 0 1 .508.07l1.342.785a.238.238 0 0 0 .119.039.235.235 0 0 0 .235-.235c0-.05-.02-.98-.035-.127l-.275-1.045a.414.414 0 0 1 .15-.471c1.322-.946 2.179-2.352 2.179-3.934 0-3.026-2.814-5.48-6.294-5.48zm-2.27 3.422c.456 0 .827.372.827.828 0 .456-.371.827-.827.827s-.827-.371-.827-.827c0-.456.371-.828.827-.828zm4.54 0c.456 0 .827.372.827.828 0 .456-.371.827-.827.827s-.827-.371-.827-.827c0-.456.371-.828.827-.828z"/>
    </svg>
  ),
  weibo: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M10.098 20.323c-3.977.391-7.414-1.406-7.672-4.02-.259-2.609 2.759-5.047 6.74-5.441 3.979-.394 7.413 1.404 7.671 4.018.259 2.6-2.759 5.049-6.739 5.443zm8.717-8.922c-.332-.066-.562-.132-.389-.475.375-.751.413-1.398.115-1.859-.558-.861-2.09-.816-3.85-.02 0 0-.554.25-.412-.199.268-.9.227-1.651-.159-2.085-.883-1.002-3.234.039-5.25 2.323C7.139 11.937 6.116 14.016 6.116 15.628c0 3.009 3.875 4.825 7.67 4.825 4.962 0 8.27-2.877 8.27-5.164 0-1.378-1.161-2.167-3.241-1.888zM9.554 18.054c-1.539.151-2.785-.609-2.785-1.695 0-1.087 1.247-2.056 2.785-2.207 1.539-.15 2.786.609 2.786 1.696 0 1.086-1.247 2.055-2.786 2.206zm2.381-3.652c-.409.042-.738-.192-.738-.523 0-.332.329-.634.738-.676.409-.042.738.192.738.524 0 .331-.329.633-.738.675zm-1.406.331c-.614.063-1.111-.291-1.111-.789 0-.498.497-.952 1.111-1.015.614-.062 1.111.292 1.111.79 0 .498-.497.951-1.111 1.014zM18.686 6.51c-1.363-1.512-3.518-1.895-5.456-1.226-.24.083-.397.323-.397.58 0 .348.281.629.629.629.119 0 .229-.033.324-.09 1.338-.462 2.828-.198 3.767.846.939 1.044 1.157 2.529.69 3.802-.082.225-.082.478.082.703.164.225.446.36.738.36.348 0 .629-.281.629-.629 0-.06-.007-.119-.021-.178.677-1.847.367-4.017-1.385-5.797zm-1.506 2.76c-.563-.625-1.453-.926-2.256-.76-.225.046-.394.234-.394.467 0 .264.214.478.478.478.06 0 .119-.01.178-.03.449-.093.832.075 1.002.42.17.345.106.777-.203 1.067-.082.077-.135.185-.135.304 0 .225.182.407.407.407.119 0 .225-.052.3-.135.563-.529.751-1.334.623-2.218z"/>
    </svg>
  ),
};

/**
 * 网站页脚组件
 */
export function Footer() {
  const [showBackToTop, setShowBackToTop] = React.useState(false);

  // 监听滚动，显示/隐藏回到顶部按钮
  React.useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 500);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 回到顶部
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className="bg-neutral-50 dark:bg-neutral-900 border-t border-neutral-200 dark:border-neutral-800">
      <div className="container-custom">
        {/* 主要内容区域 */}
        <div className="py-12 lg:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {/* 品牌信息 */}
            <div className="lg:col-span-2">
              <Link href="/" className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-primary-600 to-secondary-600 rounded-xl flex items-center justify-center text-white font-bold text-xl">
                  {personalInfo.chineseName.charAt(0)}
                </div>
                <div>
                  <div className="font-bold text-xl text-neutral-900 dark:text-white">
                    {personalInfo.chineseName}
                  </div>
                  <div className="text-sm text-neutral-600 dark:text-neutral-400">
                    {personalInfo.title}
                  </div>
                </div>
              </Link>
              
              <p className="text-neutral-600 dark:text-neutral-400 mb-6 max-w-md">
                {personalInfo.bio.substring(0, 120)}...
              </p>

              {/* 联系信息 */}
              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-sm text-neutral-600 dark:text-neutral-400">
                  <Mail size={16} />
                  <a 
                    href={`mailto:${personalInfo.email}`}
                    className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                  >
                    {personalInfo.email}
                  </a>
                </div>
                <div className="flex items-center space-x-3 text-sm text-neutral-600 dark:text-neutral-400">
                  <Phone size={16} />
                  <a 
                    href={`tel:${personalInfo.phone}`}
                    className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                  >
                    {personalInfo.phone}
                  </a>
                </div>
                <div className="flex items-center space-x-3 text-sm text-neutral-600 dark:text-neutral-400">
                  <MapPin size={16} />
                  <span>{personalInfo.location}</span>
                </div>
              </div>
            </div>

            {/* 快速链接 */}
            <div>
              <h3 className="font-semibold text-neutral-900 dark:text-white mb-4">
                快速链接
              </h3>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-neutral-600 dark:text-neutral-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* 服务项目 */}
            <div>
              <h3 className="font-semibold text-neutral-900 dark:text-white mb-4">
                服务项目
              </h3>
              <ul className="space-y-3">
                {serviceLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-neutral-600 dark:text-neutral-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* 社交媒体和版权信息 */}
        <div className="py-6 border-t border-neutral-200 dark:border-neutral-800">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            {/* 社交媒体链接 */}
            <div className="flex items-center space-x-4">
              {socialLinks.slice(0, 6).map((social) => {
                const IconComponent = socialIcons[social.icon as keyof typeof socialIcons];
                return (
                  <a
                    key={social.platform}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-neutral-600 dark:text-neutral-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                    aria-label={`访问我的${social.platform}`}
                  >
                    {IconComponent && <IconComponent />}
                  </a>
                );
              })}
            </div>

            {/* 版权信息 */}
            <div className="flex items-center space-x-6 text-sm text-neutral-600 dark:text-neutral-400">
              <div className="flex items-center space-x-1">
                <span>© 2024 {personalInfo.chineseName}. 用</span>
                <Heart size={14} className="text-red-500" />
                <span>制作</span>
              </div>
              
              {/* 法律链接 */}
              <div className="hidden md:flex items-center space-x-4">
                {legalLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 回到顶部按钮 */}
      {showBackToTop && (
        <Button
          onClick={scrollToTop}
          size="icon"
          variant="gradient"
          className={cn(
            'fixed bottom-6 right-6 z-40 rounded-full shadow-lg',
            'transition-all duration-300 hover:shadow-xl'
          )}
          aria-label="回到顶部"
        >
          <ArrowUp size={20} />
        </Button>
      )}
    </footer>
  );
}
