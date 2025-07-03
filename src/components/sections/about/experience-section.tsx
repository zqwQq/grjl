'use client';

import * as React from 'react';
import Image from 'next/image';
import { 
  Calendar, 
  MapPin, 
  Briefcase, 
  CheckCircle, 
  Award,
  TrendingUp,
  Users,
  Target
} from 'lucide-react';
import { Section, Card } from '@/components/layout/layout';
import { cn } from '@/lib/utils';
import { workExperience } from '@/data/experience';

/**
 * 工作经历卡片组件
 */
interface ExperienceCardProps {
  experience: typeof workExperience[0];
  index: number;
  isVisible: boolean;
}

function ExperienceCard({ experience, index, isVisible }: ExperienceCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('zh-CN', { 
      year: 'numeric', 
      month: 'long' 
    });
  };

  const calculateDuration = (startDate: string, endDate?: string) => {
    const start = new Date(startDate);
    const end = endDate ? new Date(endDate) : new Date();
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const months = Math.floor(diffDays / 30);
    
    if (months < 1) return '不到1个月';
    if (months < 12) return `${months}个月`;
    
    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;
    
    if (remainingMonths === 0) return `${years}年`;
    return `${years}年${remainingMonths}个月`;
  };

  return (
    <Card
      className={cn(
        'relative transition-all duration-700 ease-out',
        isVisible 
          ? 'opacity-100 translate-x-0' 
          : 'opacity-0 translate-x-8'
      )}
      style={{ transitionDelay: `${index * 200}ms` }}
    >
      {/* 当前工作标识 */}
      {experience.current && (
        <div className="absolute -top-2 -right-2">
          <div className="bg-green-500 text-white text-xs font-medium px-2 py-1 rounded-full">
            当前
          </div>
        </div>
      )}

      <div className="space-y-6">
        {/* 公司信息和时间 */}
        <div className="flex items-start space-x-4">
          {/* 公司Logo */}
          <div className="flex-shrink-0">
            <div className="w-16 h-16 rounded-xl overflow-hidden bg-neutral-100 dark:bg-neutral-800">
              {experience.companyLogo ? (
                <Image
                  src={experience.companyLogo}
                  alt={experience.company}
                  width={64}
                  height={64}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Briefcase size={24} className="text-neutral-400" />
                </div>
              )}
            </div>
          </div>

          {/* 基本信息 */}
          <div className="flex-1">
            <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-1">
              {experience.position}
            </h3>
            <div className="text-lg text-primary-600 dark:text-primary-400 font-medium mb-2">
              {experience.company}
            </div>
            
            <div className="flex flex-wrap gap-4 text-sm text-neutral-600 dark:text-neutral-400">
              <div className="flex items-center space-x-1">
                <Calendar size={14} />
                <span>
                  {formatDate(experience.startDate)} - {experience.current ? '至今' : formatDate(experience.endDate!)}
                </span>
              </div>
              <div className="flex items-center space-x-1">
                <TrendingUp size={14} />
                <span>{calculateDuration(experience.startDate, experience.endDate)}</span>
              </div>
              <div className="flex items-center space-x-1">
                <MapPin size={14} />
                <span>{experience.location}</span>
              </div>
            </div>
          </div>
        </div>

        {/* 工作描述 */}
        <div>
          <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
            {experience.description}
          </p>
        </div>

        {/* 工作职责 */}
        <div>
          <h4 className="font-semibold text-neutral-900 dark:text-white mb-3 flex items-center">
            <Users size={16} className="mr-2 text-primary-600 dark:text-primary-400" />
            主要职责
          </h4>
          <ul className="space-y-2">
            {experience.responsibilities.map((responsibility, idx) => (
              <li key={idx} className="flex items-start space-x-2 text-sm text-neutral-600 dark:text-neutral-400">
                <CheckCircle size={14} className="mt-0.5 text-green-500 flex-shrink-0" />
                <span>{responsibility}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* 主要成就 */}
        <div>
          <h4 className="font-semibold text-neutral-900 dark:text-white mb-3 flex items-center">
            <Award size={16} className="mr-2 text-primary-600 dark:text-primary-400" />
            主要成就
          </h4>
          <ul className="space-y-2">
            {experience.achievements.map((achievement, idx) => (
              <li key={idx} className="flex items-start space-x-2 text-sm text-neutral-600 dark:text-neutral-400">
                <Target size={14} className="mt-0.5 text-blue-500 flex-shrink-0" />
                <span>{achievement}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* 技术栈 */}
        <div>
          <h4 className="font-semibold text-neutral-900 dark:text-white mb-3">
            使用技术
          </h4>
          <div className="flex flex-wrap gap-2">
            {experience.technologies.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-full text-xs font-medium"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}

/**
 * 工作经历区域组件
 */
export function ExperienceSection() {
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

  // 计算总工作时间
  const calculateTotalExperience = () => {
    let totalMonths = 0;
    
    workExperience.forEach(exp => {
      const start = new Date(exp.startDate);
      const end = exp.current ? new Date() : new Date(exp.endDate!);
      const diffTime = Math.abs(end.getTime() - start.getTime());
      const months = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 30));
      totalMonths += months;
    });

    const years = Math.floor(totalMonths / 12);
    const remainingMonths = totalMonths % 12;
    
    if (years === 0) return `${remainingMonths}个月`;
    if (remainingMonths === 0) return `${years}年`;
    return `${years}年${remainingMonths}个月`;
  };

  return (
    <Section 
      ref={sectionRef}
      id="experience"
      title="工作经历"
      subtitle="Work Experience"
      description="我的职业发展历程，从实习生到独立设计师的成长之路"
      background="muted"
    >
      <div className="space-y-12">
        {/* 经历概览 */}
        <div
          className={cn(
            'transition-all duration-1000 ease-out',
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          )}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="text-center bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-900/20 dark:to-primary-800/20 border-primary-200 dark:border-primary-800">
              <div className="space-y-3">
                <div className="w-12 h-12 bg-primary-600 rounded-xl flex items-center justify-center mx-auto">
                  <Calendar size={24} className="text-white" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                    {calculateTotalExperience()}
                  </div>
                  <div className="text-sm text-neutral-600 dark:text-neutral-400">
                    总工作经验
                  </div>
                </div>
              </div>
            </Card>

            <Card className="text-center bg-gradient-to-br from-secondary-50 to-secondary-100 dark:from-secondary-900/20 dark:to-secondary-800/20 border-secondary-200 dark:border-secondary-800">
              <div className="space-y-3">
                <div className="w-12 h-12 bg-secondary-600 rounded-xl flex items-center justify-center mx-auto">
                  <Briefcase size={24} className="text-white" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-secondary-600 dark:text-secondary-400">
                    {workExperience.length}
                  </div>
                  <div className="text-sm text-neutral-600 dark:text-neutral-400">
                    工作经历
                  </div>
                </div>
              </div>
            </Card>

            <Card className="text-center bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border-green-200 dark:border-green-800">
              <div className="space-y-3">
                <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center mx-auto">
                  <TrendingUp size={24} className="text-white" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                    {workExperience.filter(exp => exp.current).length > 0 ? '在职' : '求职中'}
                  </div>
                  <div className="text-sm text-neutral-600 dark:text-neutral-400">
                    当前状态
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* 工作经历时间线 */}
        <div className="relative">
          {/* 时间线 */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-500 to-secondary-500 hidden lg:block" />

          <div className="space-y-8">
            {workExperience.map((experience, index) => (
              <div key={experience.id} className="relative">
                {/* 时间线节点 */}
                <div className="absolute left-6 w-4 h-4 bg-primary-600 rounded-full border-4 border-white dark:border-neutral-900 shadow-lg hidden lg:block" />
                
                {/* 经历卡片 */}
                <div className="lg:ml-16">
                  <ExperienceCard
                    experience={experience}
                    index={index}
                    isVisible={isVisible}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 职业发展总结 */}
        <div
          className={cn(
            'transition-all duration-1000 ease-out delay-500',
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          )}
        >
          <Card className="bg-gradient-to-r from-accent-50 to-primary-50 dark:from-accent-900/20 dark:to-primary-900/20 border-accent-200 dark:border-accent-800">
            <div className="text-center space-y-6">
              <div className="w-16 h-16 bg-gradient-to-br from-accent-600 to-primary-600 rounded-2xl flex items-center justify-center mx-auto">
                <TrendingUp size={32} className="text-white" />
              </div>
              
              <div>
                <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-4">
                  职业发展轨迹
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
                  <div className="space-y-2">
                    <div className="font-semibold text-neutral-900 dark:text-white">
                      学习阶段
                    </div>
                    <p className="text-neutral-600 dark:text-neutral-400">
                      从实习生开始，系统学习设计理论和实践技能
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="font-semibold text-neutral-900 dark:text-white">
                      成长阶段
                    </div>
                    <p className="text-neutral-600 dark:text-neutral-400">
                      积累项目经验，提升专业技能和客户服务能力
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="font-semibold text-neutral-900 dark:text-white">
                      独立阶段
                    </div>
                    <p className="text-neutral-600 dark:text-neutral-400">
                      成为自由设计师，建立个人品牌和客户网络
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
