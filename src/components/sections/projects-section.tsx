'use client';

import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ExternalLink, Calendar, User, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Section, Card } from '@/components/layout/layout';
import { cn } from '@/lib/utils';
import { featuredProjects } from '@/data/projects';

/**
 * 项目卡片组件
 */
interface ProjectCardProps {
  project: typeof featuredProjects[0];
  index: number;
  isVisible: boolean;
}

function ProjectCard({ project, index, isVisible }: ProjectCardProps) {
  const [imageLoaded, setImageLoaded] = React.useState(false);

  return (
    <Card
      hover
      className={cn(
        'group overflow-hidden transition-all duration-700 ease-out',
        isVisible 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-8'
      )}
      style={{ transitionDelay: `${index * 150}ms` }}
      padding="sm"
    >
      {/* 项目图片 */}
      <div className="relative aspect-[4/3] overflow-hidden rounded-lg mb-4">
        <Image
          src={project.thumbnail}
          alt={project.title}
          fill
          className={cn(
            'object-cover transition-all duration-500',
            'group-hover:scale-110',
            imageLoaded ? 'opacity-100' : 'opacity-0'
          )}
          onLoad={() => setImageLoaded(true)}
        />
        
        {/* 加载占位符 */}
        {!imageLoaded && (
          <div className="absolute inset-0 bg-neutral-200 dark:bg-neutral-800 animate-pulse" />
        )}
        
        {/* 悬停遮罩 */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
        
        {/* 项目状态标签 */}
        <div className="absolute top-3 left-3">
          <span className={cn(
            'px-2 py-1 text-xs font-medium rounded-full',
            project.status === 'completed' 
              ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
              : project.status === 'in-progress'
              ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'
              : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
          )}>
            {project.status === 'completed' ? '已完成' : 
             project.status === 'in-progress' ? '进行中' : '概念'}
          </span>
        </div>

        {/* 查看详情按钮 */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Button
            asChild
            size="sm"
            variant="secondary"
            className="backdrop-blur-sm bg-white/90 dark:bg-neutral-900/90"
          >
            <Link href={`/portfolio/${project.id}`}>
              <ExternalLink size={16} className="mr-2" />
              查看详情
            </Link>
          </Button>
        </div>
      </div>

      {/* 项目信息 */}
      <div className="space-y-3">
        {/* 标题和描述 */}
        <div>
          <h3 className="font-semibold text-lg text-neutral-900 dark:text-white mb-2 line-clamp-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
            {project.title}
          </h3>
          <p className="text-sm text-neutral-600 dark:text-neutral-400 line-clamp-2 leading-relaxed">
            {project.description}
          </p>
        </div>

        {/* 项目元信息 */}
        <div className="flex items-center justify-between text-xs text-neutral-500 dark:text-neutral-500">
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-1">
              <Calendar size={12} />
              <span>{project.year}</span>
            </div>
            {project.client && (
              <div className="flex items-center space-x-1">
                <User size={12} />
                <span className="truncate max-w-20">{project.client}</span>
              </div>
            )}
          </div>
          <div className="text-primary-600 dark:text-primary-400 font-medium">
            {project.role}
          </div>
        </div>

        {/* 技术标签 */}
        <div className="flex flex-wrap gap-1">
          {project.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center px-2 py-1 text-xs bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 rounded-md"
            >
              <Tag size={10} className="mr-1" />
              {tag}
            </span>
          ))}
          {project.tags.length > 3 && (
            <span className="inline-flex items-center px-2 py-1 text-xs bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 rounded-md">
              +{project.tags.length - 3}
            </span>
          )}
        </div>
      </div>
    </Card>
  );
}

/**
 * 项目展示区域组件
 */
export function ProjectsSection() {
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
      id="projects"
      title="精选作品"
      subtitle="Featured Projects"
      description="精心挑选的代表性项目，展示我的设计能力和创意思维"
      background="muted"
    >
      <div className="space-y-12">
        {/* 项目网格 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {featuredProjects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              isVisible={isVisible}
            />
          ))}
        </div>

        {/* 查看更多按钮 */}
        <div 
          className={cn(
            'text-center transition-all duration-1000 ease-out delay-700',
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          )}
        >
          <div className="space-y-4">
            <p className="text-neutral-600 dark:text-neutral-400">
              这只是我作品的一小部分，更多精彩项目等你发现
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild variant="gradient" size="lg" className="group">
                <Link href="/portfolio">
                  查看全部作品
                  <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              
              <Button asChild variant="outline" size="lg" className="group">
                <Link href="/contact">
                  开始新项目
                  <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
