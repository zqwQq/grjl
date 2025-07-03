'use client';

import * as React from 'react';
import Image from 'next/image';
import { Quote, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Section, Card } from '@/components/layout/layout';
import { cn } from '@/lib/utils';

// 客户评价数据
const testimonials = [
  {
    id: '1',
    name: '张总',
    title: '科技公司CEO',
    company: '智能科技有限公司',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
    content: '郑权威的设计水平非常专业，从品牌定位到视觉呈现都很到位。整个合作过程中沟通顺畅，交付及时，最终的品牌形象超出了我们的预期。强烈推荐！',
    rating: 5,
    project: '品牌识别系统设计',
    date: '2024年11月',
  },
  {
    id: '2',
    name: '李经理',
    title: '电商运营总监',
    company: 'StyleHub时尚电商',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
    content: '合作过程中，郑权威展现出了很强的专业能力和创意思维。他不仅理解我们的需求，还能提出很多有价值的建议。设计作品既美观又实用，帮助我们提升了转化率。',
    rating: 5,
    project: '电商视觉设计',
    date: '2024年10月',
  },
  {
    id: '3',
    name: '王女士',
    title: '品牌总监',
    company: '绿色轻食连锁',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
    content: '郑权威的包装设计非常出色，既符合我们的品牌理念，又考虑到了实用性和成本控制。客户反馈很好，销量也有明显提升。期待下次合作！',
    rating: 5,
    project: '包装设计系列',
    date: '2024年9月',
  },
  {
    id: '4',
    name: '陈先生',
    title: '产品经理',
    company: 'FitLife健身应用',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
    content: 'UI设计非常棒！用户体验流畅，界面美观大方。郑权威对细节的把控很到位，能够从用户角度思考问题。我们的应用评分和用户留存都有显著提升。',
    rating: 5,
    project: '移动应用UI设计',
    date: '2024年8月',
  },
  {
    id: '5',
    name: '刘总',
    title: '总经理',
    company: '精密制造集团',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop&crop=face',
    content: '网站重新设计后效果很好，既保持了我们企业的专业形象，又增加了现代感。访问量和询盘转化率都有大幅提升。郑权威的专业水平值得信赖。',
    rating: 5,
    project: '企业官网重新设计',
    date: '2024年7月',
  },
];

/**
 * 评价卡片组件
 */
interface TestimonialCardProps {
  testimonial: typeof testimonials[0];
  isActive: boolean;
}

function TestimonialCard({ testimonial, isActive }: TestimonialCardProps) {
  return (
    <Card
      className={cn(
        'relative transition-all duration-500 ease-out',
        isActive ? 'scale-100 opacity-100' : 'scale-95 opacity-70'
      )}
      padding="lg"
    >
      {/* 引用图标 */}
      <div className="absolute top-4 right-4 text-primary-200 dark:text-primary-800">
        <Quote size={32} />
      </div>

      <div className="space-y-6">
        {/* 评分 */}
        <div className="flex items-center space-x-1">
          {Array.from({ length: 5 }).map((_, index) => (
            <Star
              key={index}
              size={16}
              className={cn(
                index < testimonial.rating
                  ? 'text-yellow-400 fill-current'
                  : 'text-neutral-300 dark:text-neutral-600'
              )}
            />
          ))}
        </div>

        {/* 评价内容 */}
        <blockquote className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
          "{testimonial.content}"
        </blockquote>

        {/* 项目信息 */}
        <div className="text-sm text-primary-600 dark:text-primary-400 font-medium">
          项目：{testimonial.project}
        </div>

        {/* 客户信息 */}
        <div className="flex items-center space-x-4 pt-4 border-t border-neutral-200 dark:border-neutral-800">
          <div className="relative w-12 h-12 rounded-full overflow-hidden">
            <Image
              src={testimonial.avatar}
              alt={testimonial.name}
              fill
              className="object-cover"
            />
          </div>
          <div className="flex-1">
            <div className="font-semibold text-neutral-900 dark:text-white">
              {testimonial.name}
            </div>
            <div className="text-sm text-neutral-600 dark:text-neutral-400">
              {testimonial.title}
            </div>
            <div className="text-sm text-neutral-500 dark:text-neutral-500">
              {testimonial.company} · {testimonial.date}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}

/**
 * 客户评价区域组件
 */
export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = React.useState(0);
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

  // 自动轮播
  React.useEffect(() => {
    if (!isVisible) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [isVisible]);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  return (
    <Section 
      ref={sectionRef}
      id="testimonials"
      title="客户评价"
      subtitle="Client Testimonials"
      description="客户的认可是我前进的动力，每一份好评都是对我工作的最大肯定"
      background="gradient"
    >
      <div className="relative max-w-4xl mx-auto">
        {/* 评价卡片容器 */}
        <div 
          className={cn(
            'relative transition-all duration-1000 ease-out',
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          )}
        >
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <div key={testimonial.id} className="w-full flex-shrink-0 px-4">
                  <TestimonialCard
                    testimonial={testimonial}
                    isActive={index === currentIndex}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* 导航按钮 */}
          <div className="absolute top-1/2 -translate-y-1/2 -left-4 lg:-left-12">
            <Button
              variant="outline"
              size="icon"
              onClick={goToPrevious}
              className="rounded-full shadow-lg bg-white dark:bg-neutral-900"
            >
              <ChevronLeft size={20} />
            </Button>
          </div>
          
          <div className="absolute top-1/2 -translate-y-1/2 -right-4 lg:-right-12">
            <Button
              variant="outline"
              size="icon"
              onClick={goToNext}
              className="rounded-full shadow-lg bg-white dark:bg-neutral-900"
            >
              <ChevronRight size={20} />
            </Button>
          </div>
        </div>

        {/* 指示器 */}
        <div 
          className={cn(
            'flex justify-center space-x-2 mt-8 transition-all duration-1000 ease-out delay-300',
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          )}
        >
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={cn(
                'w-3 h-3 rounded-full transition-all duration-300',
                index === currentIndex
                  ? 'bg-primary-600 dark:bg-primary-400 scale-125'
                  : 'bg-neutral-300 dark:bg-neutral-600 hover:bg-neutral-400 dark:hover:bg-neutral-500'
              )}
              aria-label={`查看第${index + 1}个评价`}
            />
          ))}
        </div>

        {/* 统计信息 */}
        <div 
          className={cn(
            'grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-neutral-200/50 dark:border-neutral-800/50 transition-all duration-1000 ease-out delay-500',
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          )}
        >
          <div className="text-center">
            <div className="text-2xl lg:text-3xl font-bold text-primary-600 dark:text-primary-400">
              5.0
            </div>
            <div className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
              平均评分
            </div>
          </div>
          <div className="text-center">
            <div className="text-2xl lg:text-3xl font-bold text-primary-600 dark:text-primary-400">
              100%
            </div>
            <div className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
              客户满意度
            </div>
          </div>
          <div className="text-center">
            <div className="text-2xl lg:text-3xl font-bold text-primary-600 dark:text-primary-400">
              {testimonials.length}+
            </div>
            <div className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
              好评数量
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
