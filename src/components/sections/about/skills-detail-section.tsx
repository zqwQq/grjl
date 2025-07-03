'use client';

import * as React from 'react';
import { 
  Star, 
  TrendingUp, 
  Award, 
  Target,
  Code,
  Palette,
  Monitor,
  Users
} from 'lucide-react';
import { Section, Card } from '@/components/layout/layout';
import { cn } from '@/lib/utils';
import { 
  skillCategories, 
  getSkillLevelDescription, 
  getSkillLevelColor,
  getSkillProgressColor 
} from '@/data/skills';

/**
 * 技能进度条组件
 */
interface SkillProgressBarProps {
  skill: any;
  isVisible: boolean;
  delay: number;
}

function SkillProgressBar({ skill, isVisible, delay }: SkillProgressBarProps) {
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
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <h4 className="font-medium text-neutral-900 dark:text-white">
            {skill.name}
          </h4>
          <span className={cn(
            'text-xs font-medium px-2 py-0.5 rounded-full',
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
      </div>

      {skill.description && (
        <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
          {skill.description}
        </p>
      )}
    </div>
  );
}

/**
 * 技能分类卡片组件
 */
interface SkillCategoryCardProps {
  category: any;
  index: number;
  isVisible: boolean;
}

function SkillCategoryCard({ category, index, isVisible }: SkillCategoryCardProps) {
  // 分类图标映射
  const categoryIcons = {
    'design-software': Palette,
    'design-skills': Monitor,
    'technical-skills': Code,
    'soft-skills': Users,
  };

  const IconComponent = categoryIcons[category.id as keyof typeof categoryIcons] || Palette;

  return (
    <Card
      className={cn(
        'transition-all duration-700 ease-out',
        isVisible 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-8'
      )}
      style={{ transitionDelay: `${index * 200}ms` }}
    >
      <div className="space-y-6">
        {/* 分类标题 */}
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center">
            <IconComponent size={24} className="text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">
              {category.name}
            </h3>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              {category.description}
            </p>
          </div>
        </div>

        {/* 技能列表 */}
        <div className="space-y-4">
          {category.skills.map((skill: any, skillIndex: number) => (
            <SkillProgressBar
              key={skill.id}
              skill={skill}
              isVisible={isVisible}
              delay={300 + index * 200 + skillIndex * 100}
            />
          ))}
        </div>

        {/* 分类统计 */}
        <div className="pt-4 border-t border-neutral-200 dark:border-neutral-800">
          <div className="flex items-center justify-between text-sm">
            <span className="text-neutral-600 dark:text-neutral-400">
              技能数量: {category.skills.length}
            </span>
            <span className="text-neutral-600 dark:text-neutral-400">
              平均水平: {Math.round(category.skills.reduce((sum: number, skill: any) => sum + skill.level, 0) / category.skills.length)}%
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
}

/**
 * 技能详细展示区域组件
 */
export function SkillsDetailSection() {
  const [isVisible, setIsVisible] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState('all');
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

  // 筛选技能分类
  const filteredCategories = activeTab === 'all' 
    ? skillCategories 
    : skillCategories.filter(cat => cat.id === activeTab);

  return (
    <Section 
      ref={sectionRef}
      id="skills"
      title="专业技能"
      subtitle="Professional Skills"
      description="全面展示我的技能体系，从设计软件到项目管理，每一项技能都经过实战检验"
    >
      <div className="space-y-12">
        {/* 技能概览 */}
        <div
          className={cn(
            'transition-all duration-1000 ease-out',
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          )}
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="text-center bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-blue-200 dark:border-blue-800">
              <div className="space-y-3">
                <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mx-auto">
                  <Palette size={24} className="text-white" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    {skillCategories.find(cat => cat.id === 'design-software')?.skills.length}
                  </div>
                  <div className="text-sm text-neutral-600 dark:text-neutral-400">
                    设计软件
                  </div>
                </div>
              </div>
            </Card>

            <Card className="text-center bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border-green-200 dark:border-green-800">
              <div className="space-y-3">
                <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center mx-auto">
                  <Monitor size={24} className="text-white" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                    {skillCategories.find(cat => cat.id === 'design-skills')?.skills.length}
                  </div>
                  <div className="text-sm text-neutral-600 dark:text-neutral-400">
                    设计技能
                  </div>
                </div>
              </div>
            </Card>

            <Card className="text-center bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 border-purple-200 dark:border-purple-800">
              <div className="space-y-3">
                <div className="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center mx-auto">
                  <Code size={24} className="text-white" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                    {skillCategories.find(cat => cat.id === 'technical-skills')?.skills.length}
                  </div>
                  <div className="text-sm text-neutral-600 dark:text-neutral-400">
                    技术技能
                  </div>
                </div>
              </div>
            </Card>

            <Card className="text-center bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 border-orange-200 dark:border-orange-800">
              <div className="space-y-3">
                <div className="w-12 h-12 bg-orange-600 rounded-xl flex items-center justify-center mx-auto">
                  <Users size={24} className="text-white" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                    {skillCategories.find(cat => cat.id === 'soft-skills')?.skills.length}
                  </div>
                  <div className="text-sm text-neutral-600 dark:text-neutral-400">
                    软技能
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* 技能筛选标签 */}
        <div
          className={cn(
            'transition-all duration-1000 ease-out delay-300',
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          )}
        >
          <div className="flex flex-wrap justify-center gap-2">
            <button
              onClick={() => setActiveTab('all')}
              className={cn(
                'px-4 py-2 rounded-full text-sm font-medium transition-all duration-200',
                activeTab === 'all'
                  ? 'bg-primary-600 text-white shadow-lg'
                  : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-700'
              )}
            >
              全部技能
            </button>
            {skillCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveTab(category.id)}
                className={cn(
                  'px-4 py-2 rounded-full text-sm font-medium transition-all duration-200',
                  activeTab === category.id
                    ? 'bg-primary-600 text-white shadow-lg'
                    : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-700'
                )}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* 技能分类展示 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredCategories.map((category, index) => (
            <SkillCategoryCard
              key={category.id}
              category={category}
              index={index}
              isVisible={isVisible}
            />
          ))}
        </div>

        {/* 技能认证说明 */}
        <div
          className={cn(
            'transition-all duration-1000 ease-out delay-700',
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          )}
        >
          <Card className="bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20 border-primary-200 dark:border-primary-800">
            <div className="text-center space-y-6">
              <div className="w-16 h-16 bg-gradient-to-br from-primary-600 to-secondary-600 rounded-2xl flex items-center justify-center mx-auto">
                <Award size={32} className="text-white" />
              </div>
              
              <div>
                <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-4">
                  技能认证与持续学习
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
                  <div className="space-y-2">
                    <div className="flex items-center justify-center space-x-2">
                      <Star size={16} className="text-yellow-500" />
                      <span className="font-semibold text-neutral-900 dark:text-white">
                        专业认证
                      </span>
                    </div>
                    <p className="text-neutral-600 dark:text-neutral-400">
                      获得Adobe、Google等权威机构的专业认证
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-center space-x-2">
                      <TrendingUp size={16} className="text-green-500" />
                      <span className="font-semibold text-neutral-900 dark:text-white">
                        持续提升
                      </span>
                    </div>
                    <p className="text-neutral-600 dark:text-neutral-400">
                      定期参加培训课程，跟上行业最新趋势
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-center space-x-2">
                      <Target size={16} className="text-blue-500" />
                      <span className="font-semibold text-neutral-900 dark:text-white">
                        实战验证
                      </span>
                    </div>
                    <p className="text-neutral-600 dark:text-neutral-400">
                      所有技能都经过真实项目的实战检验
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
