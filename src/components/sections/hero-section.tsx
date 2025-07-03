'use client';

import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  ArrowRight, 
  Download, 
  Mail, 
  MapPin, 
  Calendar,
  Star,
  Sparkles
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Section } from '@/components/layout/layout';
import { cn } from '@/lib/utils';
import { personalInfo, stats } from '@/data/personal';

/**
 * 英雄区域组件
 * 首页的主要展示区域，包含个人介绍和主要行动按钮
 */
export function HeroSection() {
  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <Section 
      className="relative overflow-hidden bg-gradient-to-br from-primary-50 via-white to-secondary-50 dark:from-primary-900/10 dark:via-neutral-900 dark:to-secondary-900/10"
      padding="xl"
    >
      {/* 背景装饰 */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-200/30 dark:bg-primary-800/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary-200/30 dark:bg-secondary-800/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent-200/20 dark:bg-accent-800/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* 左侧内容 */}
          <div className="space-y-8">
            {/* 问候语 */}
            <div
              className={cn(
                'transition-all duration-1000 ease-out',
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              )}
            >
              <div className="flex items-center space-x-2 text-primary-600 dark:text-primary-400 font-medium mb-4">
                <Sparkles size={20} className="animate-pulse" />
                <span>你好，我是</span>
              </div>
              
              <h1 className="text-4xl lg:text-6xl font-bold text-neutral-900 dark:text-white mb-4">
                <span className="block font-serif">{personalInfo.chineseName}</span>
                <span className="block text-2xl lg:text-3xl font-normal text-neutral-600 dark:text-neutral-400 mt-2">
                  {personalInfo.name}
                </span>
              </h1>
              
              <div className="text-xl lg:text-2xl text-primary-600 dark:text-primary-400 font-medium mb-6">
                {personalInfo.title}
              </div>
              
              <p className="text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-xl">
                {personalInfo.subtitle}
              </p>
            </div>

            {/* 个人信息标签 */}
            <div
              className={cn(
                'flex flex-wrap gap-4 transition-all duration-1000 ease-out delay-300',
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              )}
            >
              <div className="flex items-center space-x-2 bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm rounded-full px-4 py-2 text-sm">
                <MapPin size={16} className="text-primary-600 dark:text-primary-400" />
                <span>{personalInfo.location}</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm rounded-full px-4 py-2 text-sm">
                <Calendar size={16} className="text-primary-600 dark:text-primary-400" />
                <span>{personalInfo.zodiacSign} · {personalInfo.chineseZodiac}</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm rounded-full px-4 py-2 text-sm">
                <Star size={16} className="text-primary-600 dark:text-primary-400" />
                <span>{stats.yearsExperience}年经验</span>
              </div>
            </div>

            {/* 行动按钮 */}
            <div
              className={cn(
                'flex flex-col sm:flex-row gap-4 transition-all duration-1000 ease-out delay-500',
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              )}
            >
              <Button
                asChild
                size="lg"
                variant="gradient"
                className="group"
              >
                <Link href="/contact">
                  <Mail size={20} className="mr-2" />
                  开始合作
                  <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              
              <Button
                asChild
                size="lg"
                variant="outline"
                className="group"
              >
                <Link href="/portfolio">
                  查看作品
                  <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              
              <Button
                asChild
                size="lg"
                variant="ghost"
                className="group"
              >
                <a href={personalInfo.resume} download>
                  <Download size={20} className="mr-2 group-hover:translate-y-0.5 transition-transform" />
                  下载简历
                </a>
              </Button>
            </div>

            {/* 快速统计 */}
            <div
              className={cn(
                'grid grid-cols-3 gap-6 pt-8 border-t border-neutral-200/50 dark:border-neutral-800/50 transition-all duration-1000 ease-out delay-700',
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              )}
            >
              <div className="text-center">
                <div className="text-2xl lg:text-3xl font-bold text-primary-600 dark:text-primary-400">
                  {stats.projectsCompleted}+
                </div>
                <div className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
                  完成项目
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl lg:text-3xl font-bold text-primary-600 dark:text-primary-400">
                  {stats.happyClients}+
                </div>
                <div className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
                  满意客户
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl lg:text-3xl font-bold text-primary-600 dark:text-primary-400">
                  {stats.awardsWon}+
                </div>
                <div className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
                  获得奖项
                </div>
              </div>
            </div>
          </div>

          {/* 右侧头像和装饰 */}
          <div className="relative">
            <div
              className={cn(
                'relative transition-all duration-1000 ease-out delay-200',
                isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
              )}
            >
              {/* 头像背景装饰 */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary-400 to-secondary-400 rounded-3xl rotate-6 scale-105 opacity-20" />
              <div className="absolute inset-0 bg-gradient-to-tl from-accent-400 to-primary-400 rounded-3xl -rotate-6 scale-110 opacity-10" />
              
              {/* 头像容器 */}
              <div className="relative bg-white dark:bg-neutral-900 rounded-3xl p-2 shadow-2xl">
                <div className="relative overflow-hidden rounded-2xl">
                  <Image
                    src={personalInfo.avatar}
                    alt={personalInfo.chineseName}
                    width={500}
                    height={600}
                    className="w-full h-auto object-cover"
                    priority
                  />
                  
                  {/* 头像遮罩效果 */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                </div>
              </div>

              {/* 浮动装饰元素 */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-primary-500 rounded-full animate-bounce delay-1000" />
              <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-secondary-500 rounded-full animate-bounce delay-1500" />
              <div className="absolute top-1/2 -left-8 w-4 h-4 bg-accent-500 rounded-full animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
