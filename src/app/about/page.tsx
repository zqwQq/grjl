import { Metadata } from 'next';
import { Layout, PageContainer } from '@/components/layout/layout';
import { PersonalIntroSection } from '@/components/sections/about/personal-intro-section';
import { SkillsDetailSection } from '@/components/sections/about/skills-detail-section';
import { ExperienceSection } from '@/components/sections/about/experience-section';
import { EducationSection } from '@/components/sections/about/education-section';
import { CertificatesSection } from '@/components/sections/about/certificates-section';
import { AwardsSection } from '@/components/sections/about/awards-section';
import { TimelineSection } from '@/components/sections/about/timeline-section';
import { PersonalitySection } from '@/components/sections/about/personality-section';
import { personalInfo } from '@/data/personal';

// 页面元数据
export const metadata: Metadata = {
  title: `关于我 - ${personalInfo.chineseName}`,
  description: `了解更多关于${personalInfo.chineseName}的信息：工作经历、教育背景、技能专长、获得荣誉等。`,
  openGraph: {
    title: `关于我 - ${personalInfo.chineseName}`,
    description: `了解更多关于${personalInfo.chineseName}的信息：工作经历、教育背景、技能专长、获得荣誉等。`,
    images: [personalInfo.avatar],
  },
};

/**
 * 关于我页面组件
 * 详细展示个人信息、技能、经历等内容
 */
export default function AboutPage() {
  return (
    <Layout>
      <PageContainer
        title="关于我"
        description="深入了解我的设计之路、专业技能和个人故事"
        className="space-y-16 lg:space-y-20"
      >
        {/* 个人详细介绍 */}
        <PersonalIntroSection />
        
        {/* 个性特质和价值观 */}
        <PersonalitySection />
        
        {/* 技能详细展示 */}
        <SkillsDetailSection />
        
        {/* 工作经历 */}
        <ExperienceSection />
        
        {/* 教育背景 */}
        <EducationSection />
        
        {/* 证书和认证 */}
        <CertificatesSection />
        
        {/* 奖项和荣誉 */}
        <AwardsSection />
        
        {/* 成长时间线 */}
        <TimelineSection />
      </PageContainer>
    </Layout>
  );
}
