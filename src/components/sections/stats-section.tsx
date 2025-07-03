'use client';

import * as React from 'react';
import { 
  Briefcase, 
  Users, 
  Award, 
  BookOpen,
  Eye,
  Calendar
} from 'lucide-react';
import { Section } from '@/components/layout/layout';
import { cn } from '@/lib/utils';
import { stats } from '@/data/personal';

// 统计项配置
const statsConfig = [
  {
    key: 'projectsCompleted',
    label: '完成项目',
    icon: Briefcase,
    suffix: '+',
    color: 'from-blue-500 to-blue-600',
    bgColor: 'bg-blue-50 dark:bg-blue-900/20',
    iconColor: 'text-blue-600 dark:text-blue-400',
  },
  {
    key: 'happyClients',
    label: '满意客户',
    icon: Users,
    suffix: '+',
    color: 'from-green-500 to-green-600',
    bgColor: 'bg-green-50 dark:bg-green-900/20',
    iconColor: 'text-green-600 dark:text-green-400',
  },
  {
    key: 'awardsWon',
    label: '获得奖项',
    icon: Award,
    suffix: '+',
    color: 'from-yellow-500 to-yellow-600',
    bgColor: 'bg-yellow-50 dark:bg-yellow-900/20',
    iconColor: 'text-yellow-600 dark:text-yellow-400',
  },
  {
    key: 'yearsExperience',
    label: '年工作经验',
    icon: Calendar,
    suffix: '',
    color: 'from-purple-500 to-purple-600',
    bgColor: 'bg-purple-50 dark:bg-purple-900/20',
    iconColor: 'text-purple-600 dark:text-purple-400',
  },
  {
    key: 'blogPosts',
    label: '博客文章',
    icon: BookOpen,
    suffix: '+',
    color: 'from-pink-500 to-pink-600',
    bgColor: 'bg-pink-50 dark:bg-pink-900/20',
    iconColor: 'text-pink-600 dark:text-pink-400',
  },
  {
    key: 'totalViews',
    label: '总浏览量',
    icon: Eye,
    suffix: '+',
    color: 'from-indigo-500 to-indigo-600',
    bgColor: 'bg-indigo-50 dark:bg-indigo-900/20',
    iconColor: 'text-indigo-600 dark:text-indigo-400',
    format: (value: number) => {
      if (value >= 10000) {
        return `${(value / 10000).toFixed(1)}万`;
      }
      return value.toString();
    },
  },
];

/**
 * 数字动画钩子
 */
function useCountUp(end: number, duration: number = 2000, start: number = 0) {
  const [count, setCount] = React.useState(start);
  const [isAnimating, setIsAnimating] = React.useState(false);

  const animate = React.useCallback(() => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    const startTime = Date.now();
    const startValue = start;
    const endValue = end;

    const updateCount = () => {
      const now = Date.now();
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // 使用缓动函数
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentValue = Math.floor(startValue + (endValue - startValue) * easeOutQuart);
      
      setCount(currentValue);
      
      if (progress < 1) {
        requestAnimationFrame(updateCount);
      } else {
        setIsAnimating(false);
      }
    };

    requestAnimationFrame(updateCount);
  }, [end, duration, start, isAnimating]);

  return { count, animate };
}

/**
 * 统计卡片组件
 */
interface StatCardProps {
  stat: typeof statsConfig[0];
  value: number;
  index: number;
  isVisible: boolean;
}

function StatCard({ stat, value, index, isVisible }: StatCardProps) {
  const { count, animate } = useCountUp(value, 2000 + index * 200);
  const [hasAnimated, setHasAnimated] = React.useState(false);

  React.useEffect(() => {
    if (isVisible && !hasAnimated) {
      const timer = setTimeout(() => {
        animate();
        setHasAnimated(true);
      }, index * 150);
      
      return () => clearTimeout(timer);
    }
  }, [isVisible, hasAnimated, animate, index]);

  const displayValue = stat.format ? stat.format(count) : count;

  return (
    <div
      className={cn(
        'relative group transition-all duration-700 ease-out',
        isVisible 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-8'
      )}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      {/* 背景装饰 */}
      <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl blur-xl -z-10" 
           style={{ background: `linear-gradient(135deg, ${stat.color.split(' ')[1]}, ${stat.color.split(' ')[3]})` }} />
      
      {/* 卡片内容 */}
      <div className={cn(
        'relative bg-white dark:bg-neutral-900 rounded-2xl p-6 border border-neutral-200 dark:border-neutral-800',
        'hover:shadow-lg hover:-translate-y-1 transition-all duration-300',
        'group-hover:border-transparent'
      )}>
        {/* 图标背景 */}
        <div className={cn(
          'w-16 h-16 rounded-xl flex items-center justify-center mb-4',
          stat.bgColor
        )}>
          <stat.icon size={28} className={stat.iconColor} />
        </div>

        {/* 数值 */}
        <div className="space-y-2">
          <div className="text-3xl lg:text-4xl font-bold text-neutral-900 dark:text-white">
            {displayValue}{stat.suffix}
          </div>
          <div className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
            {stat.label}
          </div>
        </div>

        {/* 进度指示器 */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-neutral-100 dark:bg-neutral-800 rounded-b-2xl overflow-hidden">
          <div 
            className={cn(
              'h-full bg-gradient-to-r transition-all duration-1000 ease-out',
              stat.color.replace('from-', 'from-').replace('to-', 'to-'),
              isVisible ? 'w-full' : 'w-0'
            )}
            style={{ transitionDelay: `${500 + index * 100}ms` }}
          />
        </div>
      </div>
    </div>
  );
}

/**
 * 统计数据区域组件
 */
export function StatsSection() {
  const [isVisible, setIsVisible] = React.useState(false);
  const sectionRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <Section 
      ref={sectionRef}
      className="relative overflow-hidden"
      background="gradient"
    >
      {/* 背景装饰 */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-1/4 w-2 h-2 bg-primary-400 rounded-full animate-pulse" />
        <div className="absolute top-1/3 right-1/4 w-3 h-3 bg-secondary-400 rounded-full animate-pulse delay-1000" />
        <div className="absolute bottom-1/4 left-1/3 w-2 h-2 bg-accent-400 rounded-full animate-pulse delay-2000" />
      </div>

      <div className="relative z-10">
        {/* 标题 */}
        <div 
          className={cn(
            'text-center mb-12 lg:mb-16 transition-all duration-1000 ease-out',
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          )}
        >
          <div className="text-primary-600 dark:text-primary-400 font-medium mb-2">
            数据说话
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-neutral-900 dark:text-white mb-4">
            用数字见证成长
          </h2>
          <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
            每一个数字背后都是我与客户共同创造的价值，是我不断成长的见证
          </p>
        </div>

        {/* 统计卡片网格 */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {statsConfig.map((statConfig, index) => (
            <StatCard
              key={statConfig.key}
              stat={statConfig}
              value={stats[statConfig.key as keyof typeof stats] as number}
              index={index}
              isVisible={isVisible}
            />
          ))}
        </div>

        {/* 底部说明 */}
        <div 
          className={cn(
            'text-center mt-12 transition-all duration-1000 ease-out delay-1000',
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          )}
        >
          <p className="text-sm text-neutral-500 dark:text-neutral-500">
            * 数据截至 2024年12月，持续更新中
          </p>
        </div>
      </div>
    </Section>
  );
}
