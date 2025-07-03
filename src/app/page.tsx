import { Metadata } from 'next';
import { Layout } from '@/components/layout/layout';
import { HeroSection } from '@/components/sections/hero-section';
import { AboutSection } from '@/components/sections/about-section';
import { SkillsSection } from '@/components/sections/skills-section';
import { ProjectsSection } from '@/components/sections/projects-section';
import { StatsSection } from '@/components/sections/stats-section';
import { TestimonialsSection } from '@/components/sections/testimonials-section';
import { ContactSection } from '@/components/sections/contact-section';
import { personalInfo } from '@/data/personal';

// 页面元数据
export const metadata: Metadata = {
  title: `${personalInfo.chineseName} - ${personalInfo.title}`,
  description: personalInfo.bio,
  openGraph: {
    title: `${personalInfo.chineseName} - ${personalInfo.title}`,
    description: personalInfo.bio,
    images: [personalInfo.avatar],
  },
};

/**
 * 首页组件
 * 展示个人介绍、技能、作品等核心内容
 */
export default function HomePage() {
  return (
    <Layout>
      {/* 英雄区域 - 主要介绍和CTA */}
      <HeroSection />
      
      {/* 关于我简介 */}
      <AboutSection />
      
      {/* 统计数据 */}
      <StatsSection />
      
      {/* 核心技能展示 */}
      <SkillsSection />
      
      {/* 精选作品展示 */}
      <ProjectsSection />
      
      {/* 客户评价 */}
      <TestimonialsSection />
      
      {/* 联系我 */}
      <ContactSection />
    </Layout>
  );
}
