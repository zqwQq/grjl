import { PersonalInfo, SocialLink, Stats } from '@/types';

// 个人基本信息
export const personalInfo: PersonalInfo = {
  name: 'Zheng Quanwei',
  chineseName: '郑权威',
  title: '平面设计师 & 电商设计师',
  subtitle: '用设计创造价值，让创意改变世界',
  bio: '我是郑权威，一名充满激情的平面设计师和电商设计师。自2024年开始从事设计工作以来，我专注于为品牌创造独特的视觉体验。我相信好的设计不仅仅是美观，更要能够传达品牌价值，解决实际问题，并与用户产生情感共鸣。',
  birthDate: '2006-07-29',
  zodiacSign: '狮子座',
  chineseZodiac: '狗',
  location: '中国 深圳',
  email: 'zhengquanwei@example.com',
  phone: '+86 138-0000-0000',
  website: 'https://zhengquanwei.com',
  avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
  resume: '/resume/zheng-quanwei-resume.pdf',
};

// 社交媒体链接
export const socialLinks: SocialLink[] = [
  {
    platform: 'Behance',
    url: 'https://behance.net/zhengquanwei',
    icon: 'behance',
    username: 'zhengquanwei',
  },
  {
    platform: 'Dribbble',
    url: 'https://dribbble.com/zhengquanwei',
    icon: 'dribbble',
    username: 'zhengquanwei',
  },
  {
    platform: 'Instagram',
    url: 'https://instagram.com/zhengquanwei_design',
    icon: 'instagram',
    username: '@zhengquanwei_design',
  },
  {
    platform: 'LinkedIn',
    url: 'https://linkedin.com/in/zhengquanwei',
    icon: 'linkedin',
    username: 'zhengquanwei',
  },
  {
    platform: 'GitHub',
    url: 'https://github.com/zhengquanwei',
    icon: 'github',
    username: 'zhengquanwei',
  },
  {
    platform: 'WeChat',
    url: '#',
    icon: 'wechat',
    username: 'zhengquanwei2006',
  },
  {
    platform: 'Weibo',
    url: 'https://weibo.com/zhengquanwei',
    icon: 'weibo',
    username: '@郑权威设计师',
  },
];

// 统计数据
export const stats: Stats = {
  projectsCompleted: 150,
  yearsExperience: 1,
  happyClients: 80,
  awardsWon: 12,
  blogPosts: 45,
  totalViews: 25000,
};

// 个人特质和价值观
export const personalTraits = [
  {
    title: '创新思维',
    description: '始终保持对新趋势和技术的敏感度，勇于尝试创新的设计方案',
    icon: 'lightbulb',
  },
  {
    title: '用户导向',
    description: '深入理解用户需求，以用户体验为核心进行设计决策',
    icon: 'users',
  },
  {
    title: '细节专注',
    description: '注重每一个设计细节，追求完美的视觉呈现效果',
    icon: 'eye',
  },
  {
    title: '团队协作',
    description: '善于与团队成员沟通协作，共同完成优秀的设计项目',
    icon: 'team',
  },
];

// 兴趣爱好
export const hobbies = [
  {
    name: '摄影',
    description: '喜欢用镜头捕捉生活中的美好瞬间，为设计积累灵感素材',
    icon: 'camera',
  },
  {
    name: '旅行',
    description: '热爱探索不同的文化和风景，从中汲取设计灵感',
    icon: 'map',
  },
  {
    name: '阅读',
    description: '广泛阅读设计、艺术、心理学等领域的书籍',
    icon: 'book',
  },
  {
    name: '音乐',
    description: '音乐是我创作时的灵感源泉，喜欢各种风格的音乐',
    icon: 'music',
  },
  {
    name: '健身',
    description: '保持健康的身体状态，为创作提供充沛的精力',
    icon: 'dumbbell',
  },
  {
    name: '美食',
    description: '品尝各地美食，从中感受不同文化的设计美学',
    icon: 'utensils',
  },
];

// 设计理念
export const designPhilosophy = {
  title: '设计理念',
  subtitle: '用心设计，用爱创造',
  description: '我相信设计是一种沟通的语言，它能够跨越文化和语言的障碍，直达人心。好的设计应该是简洁而有力的，既要满足功能需求，又要带来美的享受。我始终坚持以用户为中心的设计原则，通过深入了解用户需求和行为，创造出既实用又美观的设计作品。',
  principles: [
    {
      title: '简约至上',
      description: '去除多余的装饰，保留最核心的设计元素',
    },
    {
      title: '功能优先',
      description: '设计必须首先满足功能需求，美观是在此基础上的升华',
    },
    {
      title: '情感共鸣',
      description: '好的设计能够与用户产生情感连接，传达品牌价值',
    },
    {
      title: '持续创新',
      description: '不断学习新技术和趋势，保持设计的前瞻性',
    },
  ],
};

// 职业目标
export const careerGoals = {
  shortTerm: [
    '成为资深平面设计师，在品牌设计领域建立专业声誉',
    '完成100个高质量的设计项目，积累丰富的实战经验',
    '学习UI/UX设计技能，拓展设计服务范围',
    '建立个人设计品牌，打造专业的作品集网站',
  ],
  longTerm: [
    '创立自己的设计工作室，为更多品牌提供专业设计服务',
    '成为设计行业的意见领袖，分享设计经验和见解',
    '培养新一代设计师，传承设计文化和理念',
    '将中国传统文化元素融入现代设计，推广中式设计美学',
  ],
};

// 工作方式
export const workingStyle = {
  approach: '我采用系统化的设计流程，从需求分析到最终交付，每个环节都严格把控质量。',
  process: [
    {
      step: 1,
      title: '需求调研',
      description: '深入了解客户需求、目标用户和市场环境',
    },
    {
      step: 2,
      title: '概念设计',
      description: '基于调研结果，提出创意概念和设计方向',
    },
    {
      step: 3,
      title: '方案设计',
      description: '制作详细的设计方案和视觉稿件',
    },
    {
      step: 4,
      title: '反馈优化',
      description: '根据客户反馈进行调整和优化',
    },
    {
      step: 5,
      title: '最终交付',
      description: '提供完整的设计文件和使用指南',
    },
  ],
  tools: [
    'Adobe Creative Suite (Photoshop, Illustrator, InDesign)',
    'Figma & Sketch',
    'Cinema 4D',
    'After Effects',
    'Principle',
    'Zeplin',
  ],
};

// 成就和里程碑
export const achievements = [
  {
    year: '2024',
    title: '开始设计职业生涯',
    description: '正式踏入设计行业，开始为各类客户提供专业设计服务',
  },
  {
    year: '2024',
    title: '首个品牌设计项目',
    description: '成功完成首个完整的品牌视觉识别系统设计',
  },
  {
    year: '2024',
    title: '电商设计专业化',
    description: '专注电商设计领域，为多个电商品牌提供视觉设计服务',
  },
  {
    year: '2024',
    title: '作品集网站上线',
    description: '建立个人作品集网站，展示专业设计作品',
  },
];

// 技能发展历程
export const skillDevelopment = [
  {
    period: '2023-2024',
    title: '设计基础学习',
    skills: ['平面设计基础', '色彩理论', '排版设计', 'Adobe软件操作'],
  },
  {
    period: '2024',
    title: '专业技能提升',
    skills: ['品牌设计', '电商设计', '包装设计', '网页设计'],
  },
  {
    period: '2024-至今',
    title: '综合能力发展',
    skills: ['用户体验设计', '动效设计', '3D设计', '前端开发基础'],
  },
];
