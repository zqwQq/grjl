'use client';

import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Calendar, 
  MapPin, 
  Star, 
  Heart, 
  Download,
  Mail,
  Phone,
  Globe,
  User,
  Cake
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Section, Card } from '@/components/layout/layout';
import { cn } from '@/lib/utils';
import { personalInfo, stats } from '@/data/personal';

/**
 * 个人详细介绍区域组件
 */
export function PersonalIntroSection() {
  const [isVisible, setIsVisible] = React.useState(false);
  const sectionRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // 计算年龄
  const calculateAge = (birthDate: string) => {
    const birth = new Date(birthDate);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  };

  const age = calculateAge(personalInfo.birthDate);

  return (
    <Section ref={sectionRef} className="relative overflow-hidden">
      {/* 背景装饰 */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-10 right-10 w-32 h-32 bg-primary-200 dark:bg-primary-800 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-40 h-40 bg-secondary-200 dark:bg-secondary-800 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* 左侧：头像和基本信息 */}
          <div
            className={cn(
              'space-y-8 transition-all duration-1000 ease-out',
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
            )}
          >
            {/* 头像区域 */}
            <div className="relative">
              <div className="relative w-80 h-96 mx-auto lg:mx-0 rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src={personalInfo.avatar}
                  alt={personalInfo.chineseName}
                  fill
                  className="object-cover"
                  priority
                />
                
                {/* 头像装饰 */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                
                {/* 状态标签 */}
                <div className="absolute top-4 left-4">
                  <div className="flex items-center space-x-2 bg-white/90 dark:bg-neutral-900/90 backdrop-blur-sm rounded-full px-3 py-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    <span className="text-xs font-medium">可接新项目</span>
                  </div>
                </div>
              </div>

              {/* 浮动装饰元素 */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-primary-500 rounded-full animate-bounce" />
              <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-secondary-500 rounded-full animate-bounce delay-1000" />
            </div>

            {/* 基本信息卡片 */}
            <Card className="bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-neutral-900 dark:text-white flex items-center">
                  <User size={20} className="mr-2 text-primary-600 dark:text-primary-400" />
                  基本信息
                </h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <Cake size={16} className="text-neutral-500" />
                    <span className="text-neutral-600 dark:text-neutral-400">年龄：</span>
                    <span className="font-medium">{age}岁</span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Star size={16} className="text-neutral-500" />
                    <span className="text-neutral-600 dark:text-neutral-400">星座：</span>
                    <span className="font-medium">{personalInfo.zodiacSign}</span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Heart size={16} className="text-neutral-500" />
                    <span className="text-neutral-600 dark:text-neutral-400">生肖：</span>
                    <span className="font-medium">{personalInfo.chineseZodiac}</span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <MapPin size={16} className="text-neutral-500" />
                    <span className="text-neutral-600 dark:text-neutral-400">位置：</span>
                    <span className="font-medium">{personalInfo.location}</span>
                  </div>
                </div>
              </div>
            </Card>

            {/* 联系方式 */}
            <Card>
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">
                  联系方式
                </h3>
                
                <div className="space-y-3">
                  <a 
                    href={`mailto:${personalInfo.email}`}
                    className="flex items-center space-x-3 p-3 rounded-lg bg-neutral-50 dark:bg-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors group"
                  >
                    <Mail size={18} className="text-primary-600 dark:text-primary-400" />
                    <div>
                      <div className="font-medium text-neutral-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                        {personalInfo.email}
                      </div>
                      <div className="text-xs text-neutral-500">邮箱联系</div>
                    </div>
                  </a>
                  
                  <a 
                    href={`tel:${personalInfo.phone}`}
                    className="flex items-center space-x-3 p-3 rounded-lg bg-neutral-50 dark:bg-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors group"
                  >
                    <Phone size={18} className="text-primary-600 dark:text-primary-400" />
                    <div>
                      <div className="font-medium text-neutral-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                        {personalInfo.phone}
                      </div>
                      <div className="text-xs text-neutral-500">电话咨询</div>
                    </div>
                  </a>
                  
                  <a 
                    href={personalInfo.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-3 p-3 rounded-lg bg-neutral-50 dark:bg-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors group"
                  >
                    <Globe size={18} className="text-primary-600 dark:text-primary-400" />
                    <div>
                      <div className="font-medium text-neutral-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                        个人网站
                      </div>
                      <div className="text-xs text-neutral-500">在线作品集</div>
                    </div>
                  </a>
                </div>
              </div>
            </Card>
          </div>

          {/* 右侧：详细介绍 */}
          <div
            className={cn(
              'space-y-8 transition-all duration-1000 ease-out delay-300',
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
            )}
          >
            {/* 个人介绍 */}
            <div className="space-y-6">
              <div>
                <h1 className="text-4xl lg:text-5xl font-bold text-neutral-900 dark:text-white mb-2">
                  {personalInfo.chineseName}
                </h1>
                <div className="text-xl text-primary-600 dark:text-primary-400 font-medium mb-4">
                  {personalInfo.title}
                </div>
                <div className="text-lg text-neutral-600 dark:text-neutral-400 mb-6">
                  {personalInfo.subtitle}
                </div>
              </div>

              <div className="prose prose-lg dark:prose-invert max-w-none">
                <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
                  {personalInfo.bio}
                </p>
                
                <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
                  我于{personalInfo.birthDate.split('-')[0]}年出生在中国，从小就对艺术和设计充满热情。
                  在成长过程中，我不断探索各种艺术形式，从传统绘画到数字设计，每一次尝试都让我更加确信设计是我的人生方向。
                </p>
                
                <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
                  作为一名{personalInfo.zodiacSign}座的设计师，我天生具有强烈的创造欲望和领导能力。
                  我相信每个设计项目都是一次新的冒险，需要用心去感受、用脑去思考、用手去创造。
                  我的目标是通过设计为世界带来更多美好，让每一个作品都能触动人心。
                </p>
              </div>
            </div>

            {/* 核心数据 */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-primary-50 dark:bg-primary-900/20 rounded-xl">
                <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                  {stats.projectsCompleted}+
                </div>
                <div className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
                  完成项目
                </div>
              </div>
              
              <div className="text-center p-4 bg-secondary-50 dark:bg-secondary-900/20 rounded-xl">
                <div className="text-2xl font-bold text-secondary-600 dark:text-secondary-400">
                  {stats.happyClients}+
                </div>
                <div className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
                  满意客户
                </div>
              </div>
              
              <div className="text-center p-4 bg-accent-50 dark:bg-accent-900/20 rounded-xl">
                <div className="text-2xl font-bold text-accent-600 dark:text-accent-400">
                  {stats.awardsWon}+
                </div>
                <div className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
                  获得奖项
                </div>
              </div>
              
              <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-xl">
                <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                  {stats.yearsExperience}
                </div>
                <div className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
                  年经验
                </div>
              </div>
            </div>

            {/* 行动按钮 */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild variant="gradient" size="lg" className="group">
                <Link href="/contact">
                  <Mail size={20} className="mr-2" />
                  开始合作
                </Link>
              </Button>
              
              <Button asChild variant="outline" size="lg">
                <Link href="/portfolio">
                  查看作品集
                </Link>
              </Button>
              
              <Button asChild variant="ghost" size="lg">
                <a href={personalInfo.resume} download>
                  <Download size={20} className="mr-2" />
                  下载简历
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
