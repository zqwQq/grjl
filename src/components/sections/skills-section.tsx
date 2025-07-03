'use client';

import * as React from 'react';
import Link from 'next/link';
import { ArrowRight, Star, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Section, Card } from '@/components/layout/layout';
import { cn } from '@/lib/utils';
import { 
  coreSkills, 
  getSkillLevelDescription, 
  getSkillLevelColor,
  getSkillProgressColor 
} from '@/data/skills';

/**
 * 技能进度条组件
 */
interface SkillProgressProps {
  skill: typeof coreSkills[0];
  isVisible: boolean;
  delay: number;
}

function SkillProgress({ skill, isVisible, delay }: SkillProgressProps) {
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        setProgress(skill.level);
      }, delay);
      
      return () => clearTimeout(timer);
    }
  }, [isVisible, skill.level, delay]);

  return (
    <div className="space-y-3">
      {/* 技能名称和等级 */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <h3 className="font-semibold text-neutral-900 dark:text-white">
            {skill.name}
          </h3>
          <span className={cn(
            'text-xs font-medium px-2 py-1 rounded-full',
            getSkillLevelColor(skill.level),
            'bg-current/10'
          )}>
            {getSkillLevelDescription(skill.level)}
          </span>
        </div>
        <div className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
          {skill.level}%
        </div>
      </div>

      {/* 进度条 */}
      <div className="relative">
        <div className="w-full h-2 bg-neutral-200 dark:bg-neutral-700 rounded-full overflow-hidden">
          <div 
            className={cn(
              'h-full rounded-full transition-all duration-1000 ease-out',
              getSkillProgressColor(skill.level)
            )}
            style={{ 
              width: `${progress}%`,
              transitionDelay: `${delay}ms`
            }}
          />
        </div>
        
        {/* 进度指示点 */}
        <div 
          className={cn(
            'absolute top-1/2 w-3 h-3 rounded-full border-2 border-white dark:border-neutral-900 transition-all duration-1000 ease-out transform -translate-y-1/2',
            getSkillProgressColor(skill.level)
          )}
          style={{ 
            left: `${progress}%`,
            marginLeft: '-6px',
            transitionDelay: `${delay + 200}ms`
          }}
        />
      </div>

      {/* 技能描述 */}
      {skill.description && (
        <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
          {skill.description}
        </p>
      )}
    </div>
  );
}

/**
 * 技能卡片组件
 */
interface SkillCardProps {
  skill: typeof coreSkills[0];
  index: number;
  isVisible: boolean;
}

function SkillCard({ skill, index, isVisible }: SkillCardProps) {
  return (
    <Card
      hover
      className={cn(
        'transition-all duration-700 ease-out',
        isVisible 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-8'
      )}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <SkillProgress 
        skill={skill} 
        isVisible={isVisible} 
        delay={300 + index * 150} 
      />
    </Card>
  );
}

/**
 * 技能展示区域组件
 */
export function SkillsSection() {
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

  return (
    <Section 
      ref={sectionRef}
      id="skills"
      title="核心技能"
      subtitle="Core Skills"
      description="专业的设计技能和丰富的项目经验，为您提供全方位的设计服务"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
        {/* 左侧：技能介绍 */}
        <div
          className={cn(
            'space-y-6 transition-all duration-1000 ease-out',
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
          )}
        >
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-neutral-900 dark:text-white">
              专业技能体系
            </h3>
            <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
              经过系统学习和实践积累，我掌握了从创意构思到最终交付的完整设计流程。
              每一项技能都经过大量项目的实战检验，确保能够为客户提供专业、高效的设计服务。
            </p>
          </div>

          {/* 技能亮点 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-center space-x-3 p-4 bg-primary-50 dark:bg-primary-900/20 rounded-xl">
              <div className="w-10 h-10 bg-primary-600 dark:bg-primary-500 rounded-lg flex items-center justify-center">
                <Star size={20} className="text-white" />
              </div>
              <div>
                <div className="font-semibold text-neutral-900 dark:text-white">
                  专业认证
                </div>
                <div className="text-sm text-neutral-600 dark:text-neutral-400">
                  Adobe认证专家
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-3 p-4 bg-secondary-50 dark:bg-secondary-900/20 rounded-xl">
              <div className="w-10 h-10 bg-secondary-600 dark:bg-secondary-500 rounded-lg flex items-center justify-center">
                <TrendingUp size={20} className="text-white" />
              </div>
              <div>
                <div className="font-semibold text-neutral-900 dark:text-white">
                  持续学习
                </div>
                <div className="text-sm text-neutral-600 dark:text-neutral-400">
                  跟上最新趋势
                </div>
              </div>
            </div>
          </div>

          {/* 技能说明 */}
          <Card className="bg-gradient-to-br from-accent-50 to-primary-50 dark:from-accent-900/20 dark:to-primary-900/20 border-accent-200 dark:border-accent-800">
            <div className="space-y-3">
              <h4 className="font-semibold text-neutral-900 dark:text-white">
                技能评估标准
              </h4>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full" />
                  <span className="text-neutral-600 dark:text-neutral-400">
                    专家级 (90%+)
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full" />
                  <span className="text-neutral-600 dark:text-neutral-400">
                    熟练 (80%+)
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                  <span className="text-neutral-600 dark:text-neutral-400">
                    良好 (70%+)
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-orange-500 rounded-full" />
                  <span className="text-neutral-600 dark:text-neutral-400">
                    一般 (60%+)
                  </span>
                </div>
              </div>
            </div>
          </Card>

          {/* 行动按钮 */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button asChild variant="gradient" className="group">
              <Link href="/about#skills">
                查看全部技能
                <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        </div>

        {/* 右侧：技能列表 */}
        <div
          className={cn(
            'space-y-6 transition-all duration-1000 ease-out delay-300',
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
          )}
        >
          <div className="space-y-4">
            {coreSkills.map((skill, index) => (
              <SkillCard
                key={skill.id}
                skill={skill}
                index={index}
                isVisible={isVisible}
              />
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
