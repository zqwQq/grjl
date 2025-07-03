'use client';

import * as React from 'react';
import { 
  Heart, 
  Target, 
  Lightbulb, 
  Users,
  Camera,
  Map,
  Book,
  Music,
  Dumbbell,
  Utensils,
  Palette,
  Coffee
} from 'lucide-react';
import { Section, Card } from '@/components/layout/layout';
import { cn } from '@/lib/utils';
import { personalTraits, hobbies, designPhilosophy } from '@/data/personal';

/**
 * 个性特质和价值观区域组件
 */
export function PersonalitySection() {
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
  const traitIconMap = {
    lightbulb: Lightbulb,
    users: Users,
    eye: Target,
    team: Users,
  };

  const hobbyIconMap = {
    camera: Camera,
    map: Map,
    book: Book,
    music: Music,
    dumbbell: Dumbbell,
    utensils: Utensils,
  };

  return (
    <Section 
      ref={sectionRef}
      title="个性特质"
      subtitle="Personality & Values"
      description="了解我的性格特点、兴趣爱好和设计理念"
      background="muted"
    >
      <div className="space-y-16">
        {/* 核心特质 */}
        <div
          className={cn(
            'transition-all duration-1000 ease-out',
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          )}
        >
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold text-neutral-900 dark:text-white mb-4">
              核心特质
            </h3>
            <p className="text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
              这些特质塑造了我的设计风格和工作方式，也是我与客户建立信任的基础
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {personalTraits.map((trait, index) => {
              const IconComponent = traitIconMap[trait.icon as keyof typeof traitIconMap] || Lightbulb;
              
              return (
                <Card
                  key={trait.title}
                  hover
                  className={cn(
                    'text-center transition-all duration-700 ease-out',
                    isVisible 
                      ? 'opacity-100 translate-y-0' 
                      : 'opacity-0 translate-y-8'
                  )}
                  style={{ transitionDelay: `${index * 150}ms` }}
                >
                  <div className="space-y-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-2xl flex items-center justify-center mx-auto">
                      <IconComponent size={32} className="text-white" />
                    </div>
                    
                    <div>
                      <h4 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">
                        {trait.title}
                      </h4>
                      <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                        {trait.description}
                      </p>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>

        {/* 设计理念 */}
        <div
          className={cn(
            'transition-all duration-1000 ease-out delay-300',
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          )}
        >
          <Card className="bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20 border-primary-200 dark:border-primary-800">
            <div className="text-center space-y-8">
              <div className="w-20 h-20 bg-gradient-to-br from-primary-600 to-secondary-600 rounded-3xl flex items-center justify-center mx-auto">
                <Heart size={40} className="text-white" />
              </div>
              
              <div>
                <h3 className="text-2xl font-bold text-neutral-900 dark:text-white mb-2">
                  {designPhilosophy.title}
                </h3>
                <div className="text-lg text-primary-600 dark:text-primary-400 font-medium mb-4">
                  {designPhilosophy.subtitle}
                </div>
                <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed max-w-3xl mx-auto">
                  {designPhilosophy.description}
                </p>
              </div>

              {/* 设计原则 */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {designPhilosophy.principles.map((principle, index) => (
                  <div
                    key={principle.title}
                    className={cn(
                      'p-4 bg-white dark:bg-neutral-800 rounded-xl transition-all duration-500',
                      isVisible 
                        ? 'opacity-100 scale-100' 
                        : 'opacity-0 scale-95'
                    )}
                    style={{ transitionDelay: `${600 + index * 100}ms` }}
                  >
                    <div className="text-center space-y-2">
                      <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center mx-auto">
                        <Palette size={16} className="text-white" />
                      </div>
                      <h4 className="font-semibold text-neutral-900 dark:text-white">
                        {principle.title}
                      </h4>
                      <p className="text-xs text-neutral-600 dark:text-neutral-400">
                        {principle.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>

        {/* 兴趣爱好 */}
        <div
          className={cn(
            'transition-all duration-1000 ease-out delay-500',
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          )}
        >
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold text-neutral-900 dark:text-white mb-4">
              兴趣爱好
            </h3>
            <p className="text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
              生活中的多元体验为我的设计带来无限灵感
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {hobbies.map((hobby, index) => {
              const IconComponent = hobbyIconMap[hobby.icon as keyof typeof hobbyIconMap] || Camera;
              
              return (
                <Card
                  key={hobby.name}
                  hover
                  className={cn(
                    'transition-all duration-700 ease-out',
                    isVisible 
                      ? 'opacity-100 translate-y-0' 
                      : 'opacity-0 translate-y-8'
                  )}
                  style={{ transitionDelay: `${700 + index * 100}ms` }}
                >
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-gradient-to-br from-accent-500 to-primary-500 rounded-xl flex items-center justify-center">
                        <IconComponent size={24} className="text-white" />
                      </div>
                    </div>
                    
                    <div className="flex-1">
                      <h4 className="font-semibold text-neutral-900 dark:text-white mb-2">
                        {hobby.name}
                      </h4>
                      <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                        {hobby.description}
                      </p>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>

        {/* 生活态度 */}
        <div
          className={cn(
            'transition-all duration-1000 ease-out delay-700',
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          )}
        >
          <Card className="bg-gradient-to-r from-accent-50 to-primary-50 dark:from-accent-900/20 dark:to-primary-900/20">
            <div className="text-center space-y-6">
              <div className="w-16 h-16 bg-gradient-to-br from-accent-600 to-primary-600 rounded-2xl flex items-center justify-center mx-auto">
                <Coffee size={32} className="text-white" />
              </div>
              
              <div>
                <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-4">
                  生活态度
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
                  <div className="space-y-2">
                    <div className="font-semibold text-neutral-900 dark:text-white">
                      保持好奇
                    </div>
                    <p className="text-neutral-600 dark:text-neutral-400">
                      对新事物保持开放的心态，不断学习和探索
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="font-semibold text-neutral-900 dark:text-white">
                      追求平衡
                    </div>
                    <p className="text-neutral-600 dark:text-neutral-400">
                      在工作与生活之间找到最佳的平衡点
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="font-semibold text-neutral-900 dark:text-white">
                      享受过程
                    </div>
                    <p className="text-neutral-600 dark:text-neutral-400">
                      专注于当下，享受创作和成长的每一个瞬间
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </Section>
  );
}
