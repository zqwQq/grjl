'use client';

import * as React from 'react';
import Link from 'next/link';
import { 
  ArrowRight, 
  Heart, 
  Target, 
  Lightbulb, 
  Users,
  Award,
  Coffee
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Section, Card } from '@/components/layout/layout';
import { cn } from '@/lib/utils';
import { personalInfo, personalTraits, designPhilosophy } from '@/data/personal';

/**
 * 关于我简介区域组件
 * 展示个人介绍、设计理念和核心特质
 */
export function AboutSection() {
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

  // 图标映射
  const iconMap = {
    lightbulb: Lightbulb,
    users: Users,
    eye: Target,
    team: Users,
  };

  return (
    <Section 
      ref={sectionRef}
      id="about"
      title="关于我"
      subtitle="About Me"
      description="用心设计，用爱创造。每一个项目都是我对美好生活的理解和表达。"
      background="muted"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
        {/* 左侧：个人介绍 */}
        <div
          className={cn(
            'space-y-6 transition-all duration-1000 ease-out',
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
          )}
        >
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
              {personalInfo.bio}
            </p>
            
            <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
              作为一名年轻的设计师，我始终保持着对新事物的好奇心和学习热情。
              我相信设计不仅仅是让事物看起来美观，更重要的是要能够解决问题，
              传达情感，创造价值。
            </p>
          </div>

          {/* 设计理念 */}
          <Card className="bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20 border-primary-200 dark:border-primary-800">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-primary-600 dark:bg-primary-500 rounded-xl flex items-center justify-center">
                  <Heart size={24} className="text-white" />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">
                  {designPhilosophy.title}
                </h3>
                <p className="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed">
                  {designPhilosophy.subtitle}
                </p>
              </div>
            </div>
          </Card>

          {/* 行动按钮 */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button asChild variant="gradient" className="group">
              <Link href="/about">
                了解更多
                <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            
            <Button asChild variant="outline" className="group">
              <Link href="/contact">
                <Coffee size={16} className="mr-2" />
                约个咖啡聊聊
              </Link>
            </Button>
          </div>
        </div>

        {/* 右侧：核心特质 */}
        <div
          className={cn(
            'space-y-6 transition-all duration-1000 ease-out delay-300',
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
          )}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {personalTraits.map((trait, index) => {
              const IconComponent = iconMap[trait.icon as keyof typeof iconMap] || Lightbulb;
              
              return (
                <Card
                  key={trait.title}
                  hover
                  className={cn(
                    'transition-all duration-500 ease-out',
                    isVisible 
                      ? 'opacity-100 translate-y-0' 
                      : 'opacity-0 translate-y-4',
                  )}
                  style={{ transitionDelay: `${400 + index * 100}ms` }}
                >
                  <div className="text-center space-y-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center mx-auto">
                      <IconComponent size={24} className="text-white" />
                    </div>
                    <h3 className="font-semibold text-neutral-900 dark:text-white">
                      {trait.title}
                    </h3>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                      {trait.description}
                    </p>
                  </div>
                </Card>
              );
            })}
          </div>

          {/* 设计原则 */}
          <Card className="bg-white dark:bg-neutral-800 border-2 border-dashed border-neutral-300 dark:border-neutral-700">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-gradient-to-br from-accent-500 to-primary-500 rounded-2xl flex items-center justify-center mx-auto">
                <Award size={32} className="text-white" />
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">
                  设计原则
                </h3>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  {designPhilosophy.principles.map((principle, index) => (
                    <div
                      key={principle.title}
                      className={cn(
                        'p-2 bg-neutral-50 dark:bg-neutral-700 rounded-lg transition-all duration-300',
                        isVisible 
                          ? 'opacity-100 scale-100' 
                          : 'opacity-0 scale-95'
                      )}
                      style={{ transitionDelay: `${600 + index * 100}ms` }}
                    >
                      <div className="font-medium text-neutral-900 dark:text-white">
                        {principle.title}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </Section>
  );
}
