import { Skill, SkillCategory } from '@/types';

// 技能数据
export const skills: Skill[] = [
  // 设计软件
  {
    id: 'photoshop',
    name: 'Adobe Photoshop',
    category: 'design-software',
    level: 95,
    icon: 'photoshop',
    description: '图像处理和合成的专业工具，熟练掌握各种修图技巧和特效制作',
  },
  {
    id: 'illustrator',
    name: 'Adobe Illustrator',
    category: 'design-software',
    level: 90,
    icon: 'illustrator',
    description: '矢量图形设计软件，擅长logo设计、插画创作和图标制作',
  },
  {
    id: 'indesign',
    name: 'Adobe InDesign',
    category: 'design-software',
    level: 85,
    icon: 'indesign',
    description: '专业排版软件，用于制作宣传册、杂志和书籍等印刷品',
  },
  {
    id: 'figma',
    name: 'Figma',
    category: 'design-software',
    level: 88,
    icon: 'figma',
    description: '现代化的界面设计工具，团队协作和原型制作的首选',
  },
  {
    id: 'sketch',
    name: 'Sketch',
    category: 'design-software',
    level: 80,
    icon: 'sketch',
    description: 'Mac平台的专业UI设计工具，简洁高效的设计流程',
  },
  {
    id: 'cinema4d',
    name: 'Cinema 4D',
    category: 'design-software',
    level: 75,
    icon: 'cinema4d',
    description: '3D建模和渲染软件，用于创建立体视觉效果',
  },

  // 设计技能
  {
    id: 'brand-design',
    name: '品牌设计',
    category: 'design-skills',
    level: 92,
    icon: 'brand',
    description: '品牌视觉识别系统设计，包括logo、VI、品牌指南等',
  },
  {
    id: 'ui-design',
    name: 'UI设计',
    category: 'design-skills',
    level: 85,
    icon: 'ui',
    description: '用户界面设计，注重可用性和美观性的平衡',
  },
  {
    id: 'packaging-design',
    name: '包装设计',
    category: 'design-skills',
    level: 88,
    icon: 'package',
    description: '产品包装设计，结合品牌特色和市场需求',
  },
  {
    id: 'print-design',
    name: '印刷设计',
    category: 'design-skills',
    level: 90,
    icon: 'print',
    description: '各类印刷品设计，熟悉印刷工艺和色彩管理',
  },
  {
    id: 'web-design',
    name: '网页设计',
    category: 'design-skills',
    level: 82,
    icon: 'web',
    description: '响应式网页设计，注重用户体验和视觉效果',
  },
  {
    id: 'illustration',
    name: '插画设计',
    category: 'design-skills',
    level: 78,
    icon: 'illustration',
    description: '手绘和数字插画创作，风格多样化',
  },

  // 技术技能
  {
    id: 'html-css',
    name: 'HTML/CSS',
    category: 'technical-skills',
    level: 75,
    icon: 'code',
    description: '前端基础技术，能够实现设计稿的准确还原',
  },
  {
    id: 'javascript',
    name: 'JavaScript',
    category: 'technical-skills',
    level: 65,
    icon: 'javascript',
    description: '基础的交互效果实现和动画制作',
  },
  {
    id: 'prototyping',
    name: '原型制作',
    category: 'technical-skills',
    level: 80,
    icon: 'prototype',
    description: '交互原型设计，使用Figma、Principle等工具',
  },
  {
    id: 'animation',
    name: '动效设计',
    category: 'technical-skills',
    level: 70,
    icon: 'animation',
    description: 'UI动效和品牌动画设计，提升用户体验',
  },

  // 软技能
  {
    id: 'communication',
    name: '沟通协作',
    category: 'soft-skills',
    level: 90,
    icon: 'communication',
    description: '良好的客户沟通能力和团队协作精神',
  },
  {
    id: 'project-management',
    name: '项目管理',
    category: 'soft-skills',
    level: 85,
    icon: 'management',
    description: '项目进度控制和资源协调能力',
  },
  {
    id: 'creativity',
    name: '创意思维',
    category: 'soft-skills',
    level: 95,
    icon: 'creativity',
    description: '独特的创意思维和问题解决能力',
  },
  {
    id: 'learning',
    name: '学习能力',
    category: 'soft-skills',
    level: 92,
    icon: 'learning',
    description: '快速学习新技术和适应行业变化的能力',
  },
];

// 技能分类
export const skillCategories: SkillCategory[] = [
  {
    id: 'design-software',
    name: '设计软件',
    description: '熟练掌握各种专业设计软件工具',
    skills: skills.filter(skill => skill.category === 'design-software'),
  },
  {
    id: 'design-skills',
    name: '设计技能',
    description: '专业的设计能力和丰富的项目经验',
    skills: skills.filter(skill => skill.category === 'design-skills'),
  },
  {
    id: 'technical-skills',
    name: '技术技能',
    description: '前端技术和交互设计相关技能',
    skills: skills.filter(skill => skill.category === 'technical-skills'),
  },
  {
    id: 'soft-skills',
    name: '软技能',
    description: '沟通协作和项目管理等综合能力',
    skills: skills.filter(skill => skill.category === 'soft-skills'),
  },
];

// 获取技能等级描述
export function getSkillLevelDescription(level: number): string {
  if (level >= 90) return '专家级';
  if (level >= 80) return '熟练';
  if (level >= 70) return '良好';
  if (level >= 60) return '一般';
  return '入门';
}

// 获取技能等级颜色
export function getSkillLevelColor(level: number): string {
  if (level >= 90) return 'text-green-600 dark:text-green-400';
  if (level >= 80) return 'text-blue-600 dark:text-blue-400';
  if (level >= 70) return 'text-yellow-600 dark:text-yellow-400';
  if (level >= 60) return 'text-orange-600 dark:text-orange-400';
  return 'text-red-600 dark:text-red-400';
}

// 获取技能进度条颜色
export function getSkillProgressColor(level: number): string {
  if (level >= 90) return 'bg-green-500';
  if (level >= 80) return 'bg-blue-500';
  if (level >= 70) return 'bg-yellow-500';
  if (level >= 60) return 'bg-orange-500';
  return 'bg-red-500';
}

// 核心技能（用于首页展示）
export const coreSkills = [
  'photoshop',
  'illustrator',
  'figma',
  'brand-design',
  'ui-design',
  'packaging-design',
  'print-design',
  'creativity',
].map(id => skills.find(skill => skill.id === id)!);

// 技能标签（用于快速筛选）
export const skillTags = [
  '平面设计',
  '品牌设计',
  'UI设计',
  '包装设计',
  '印刷设计',
  '网页设计',
  '插画设计',
  '3D设计',
  '动效设计',
  '原型制作',
];

// 获取随机技能
export function getRandomSkills(count: number = 6): Skill[] {
  const shuffled = [...skills].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

// 按分类获取技能
export function getSkillsByCategory(categoryId: string): Skill[] {
  return skills.filter(skill => skill.category === categoryId);
}

// 获取顶级技能
export function getTopSkills(count: number = 8): Skill[] {
  return skills
    .sort((a, b) => b.level - a.level)
    .slice(0, count);
}
