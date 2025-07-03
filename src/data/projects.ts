import { Project, ProjectCategory } from '@/types';

// 项目数据
export const projects: Project[] = [
  {
    id: 'brand-identity-tech-startup',
    title: '科技创业公司品牌识别系统',
    description: '为一家AI科技创业公司设计完整的品牌视觉识别系统，包括logo、VI手册、应用系统等。',
    longDescription: '这是一个完整的品牌识别系统设计项目，客户是一家专注于人工智能技术的创业公司。项目从品牌调研开始，深入了解公司的核心价值、目标用户和市场定位，最终创造出一套现代、专业且具有科技感的视觉识别系统。设计过程中特别注重品牌的可扩展性和应用的一致性，确保在各种媒介上都能保持品牌形象的统一性。',
    category: 'brand-design',
    tags: ['品牌设计', 'Logo设计', 'VI设计', '科技', '创业公司'],
    images: [
      'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1634942537034-2531766767d1?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=600&fit=crop',
    ],
    thumbnail: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=300&fit=crop',
    client: '智能科技有限公司',
    year: '2024',
    duration: '6周',
    role: '主设计师',
    technologies: ['Adobe Illustrator', 'Adobe Photoshop', 'Adobe InDesign'],
    challenges: [
      '如何在众多科技公司中脱颖而出',
      '平衡专业性与亲和力',
      '确保品牌在不同应用场景下的一致性',
    ],
    solutions: [
      '采用独特的几何图形组合，体现AI的逻辑性',
      '选择温暖的蓝色调，增加品牌亲和力',
      '制定详细的品牌应用规范',
    ],
    results: [
      '品牌认知度提升40%',
      '客户满意度达到95%',
      '获得当年度最佳品牌设计奖',
    ],
    featured: true,
    status: 'completed',
  },
  {
    id: 'ecommerce-fashion-brand',
    title: '时尚电商品牌视觉设计',
    description: '为新兴时尚电商品牌打造完整的视觉形象，包括网站设计、产品包装、营销物料等。',
    longDescription: '这个项目为一个专注于年轻女性市场的时尚电商品牌提供全方位的视觉设计服务。从品牌定位分析开始，我们深入研究了目标用户的审美偏好和购物习惯，创造出一套既时尚又实用的视觉系统。项目涵盖了从线上到线下的各个触点，确保品牌形象的一致性和连贯性。',
    category: 'ecommerce-design',
    tags: ['电商设计', '时尚品牌', '网页设计', '包装设计', '营销设计'],
    images: [
      'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop',
    ],
    thumbnail: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop',
    client: 'StyleHub时尚电商',
    year: '2024',
    duration: '8周',
    role: '视觉设计师',
    technologies: ['Figma', 'Adobe Photoshop', 'Adobe Illustrator'],
    challenges: [
      '在竞争激烈的时尚市场中建立独特性',
      '平衡美观与功能性',
      '适应快速变化的时尚趋势',
    ],
    solutions: [
      '采用简约现代的设计风格',
      '建立灵活的视觉系统',
      '注重用户体验和转化率',
    ],
    results: [
      '网站转化率提升25%',
      '品牌关注度增长60%',
      '月销售额增长35%',
    ],
    featured: true,
    status: 'completed',
  },
  {
    id: 'restaurant-packaging-design',
    title: '餐厅品牌包装设计系列',
    description: '为连锁餐厅设计全套包装系统，包括外卖盒、饮料杯、购物袋等，提升品牌形象。',
    longDescription: '这个项目为一家主打健康轻食的连锁餐厅设计了完整的包装系统。设计理念围绕"新鲜、健康、环保"展开，采用天然的色彩搭配和简洁的图形元素。包装设计不仅要美观，还要考虑实用性、成本控制和环保要求。最终的设计方案成功提升了品牌的专业形象和用户体验。',
    category: 'packaging-design',
    tags: ['包装设计', '餐饮品牌', '环保设计', '系列设计'],
    images: [
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop',
    ],
    thumbnail: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop',
    client: '绿色轻食连锁',
    year: '2024',
    duration: '4周',
    role: '包装设计师',
    technologies: ['Adobe Illustrator', 'Adobe Photoshop'],
    challenges: [
      '在有限的预算内实现高质量设计',
      '平衡美观与实用性',
      '符合食品安全和环保要求',
    ],
    solutions: [
      '选择成本效益高的印刷工艺',
      '优化包装结构设计',
      '使用环保材料和油墨',
    ],
    results: [
      '包装成本降低15%',
      '客户满意度提升30%',
      '品牌识别度显著提高',
    ],
    featured: false,
    status: 'completed',
  },
  {
    id: 'mobile-app-ui-design',
    title: '移动应用UI设计',
    description: '为健身类移动应用设计用户界面，注重用户体验和视觉美感的平衡。',
    longDescription: '这是一个健身类移动应用的UI设计项目，目标用户是热爱运动的年轻人群。设计过程中深入研究了用户的使用场景和行为习惯，创造出既美观又实用的界面设计。特别注重信息架构的清晰性和操作流程的简便性，确保用户能够轻松完成各种健身相关的任务。',
    category: 'ui-design',
    tags: ['UI设计', '移动应用', '健身', '用户体验'],
    images: [
      'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=600&fit=crop',
    ],
    thumbnail: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=300&fit=crop',
    client: 'FitLife健身应用',
    year: '2024',
    duration: '10周',
    role: 'UI/UX设计师',
    technologies: ['Figma', 'Principle', 'Adobe XD'],
    challenges: [
      '在小屏幕上展示复杂的健身数据',
      '设计直观的导航系统',
      '保持设计的一致性',
    ],
    solutions: [
      '采用卡片式布局优化信息展示',
      '设计清晰的视觉层级',
      '建立完整的设计系统',
    ],
    results: [
      '用户留存率提升45%',
      '应用商店评分达到4.8分',
      '日活跃用户增长50%',
    ],
    featured: true,
    status: 'completed',
  },
  {
    id: 'corporate-website-redesign',
    title: '企业官网重新设计',
    description: '为传统制造业企业重新设计官方网站，提升品牌形象和用户体验。',
    longDescription: '这个项目为一家有着30年历史的制造业企业重新设计官方网站。原网站设计陈旧，用户体验较差，急需现代化改造。新设计采用响应式布局，优化了信息架构，提升了视觉效果，同时保持了企业的专业性和权威性。项目还包括了SEO优化和性能提升。',
    category: 'web-design',
    tags: ['网页设计', '企业官网', '响应式设计', '重新设计'],
    images: [
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=600&fit=crop',
    ],
    thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop',
    client: '精密制造集团',
    year: '2024',
    duration: '12周',
    role: '网页设计师',
    technologies: ['Figma', 'HTML/CSS', 'JavaScript'],
    challenges: [
      '平衡传统与现代的设计风格',
      '优化复杂的产品信息展示',
      '提升网站加载速度',
    ],
    solutions: [
      '采用现代简约的设计语言',
      '重新组织信息架构',
      '优化图片和代码',
    ],
    results: [
      '网站访问量增长80%',
      '询盘转化率提升40%',
      '页面加载速度提升60%',
    ],
    featured: false,
    status: 'completed',
  },
  {
    id: 'book-cover-series',
    title: '图书封面设计系列',
    description: '为出版社设计一系列文学作品的封面，体现不同作品的独特气质。',
    longDescription: '这个项目为知名出版社设计了一系列经典文学作品的封面。每本书都有其独特的主题和风格，需要通过视觉设计准确传达作品的内涵和情感。设计过程中深入阅读了每部作品，提取关键元素，创造出既符合市场需求又具有艺术价值的封面设计。',
    category: 'print-design',
    tags: ['封面设计', '出版物', '文学作品', '系列设计'],
    images: [
      'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop',
    ],
    thumbnail: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop',
    client: '文艺出版社',
    year: '2024',
    duration: '6周',
    role: '封面设计师',
    technologies: ['Adobe Photoshop', 'Adobe Illustrator', 'Adobe InDesign'],
    challenges: [
      '准确传达不同作品的情感',
      '在书店货架上脱颖而出',
      '平衡艺术性与商业性',
    ],
    solutions: [
      '深入研究作品内容和背景',
      '采用独特的视觉语言',
      '考虑目标读者的审美偏好',
    ],
    results: [
      '销量比原版提升25%',
      '获得多个设计奖项',
      '读者好评率达到90%',
    ],
    featured: false,
    status: 'completed',
  },
];

// 项目分类
export const projectCategories: ProjectCategory[] = [
  {
    id: 'brand-design',
    name: '品牌设计',
    description: '品牌视觉识别系统、Logo设计、VI设计等',
    slug: 'brand-design',
    count: projects.filter(p => p.category === 'brand-design').length,
  },
  {
    id: 'ecommerce-design',
    name: '电商设计',
    description: '电商平台视觉设计、产品页面、营销物料等',
    slug: 'ecommerce-design',
    count: projects.filter(p => p.category === 'ecommerce-design').length,
  },
  {
    id: 'packaging-design',
    name: '包装设计',
    description: '产品包装、礼盒设计、标签设计等',
    slug: 'packaging-design',
    count: projects.filter(p => p.category === 'packaging-design').length,
  },
  {
    id: 'ui-design',
    name: 'UI设计',
    description: '移动应用界面、网页界面、交互设计等',
    slug: 'ui-design',
    count: projects.filter(p => p.category === 'ui-design').length,
  },
  {
    id: 'web-design',
    name: '网页设计',
    description: '企业官网、响应式网站、落地页设计等',
    slug: 'web-design',
    count: projects.filter(p => p.category === 'web-design').length,
  },
  {
    id: 'print-design',
    name: '印刷设计',
    description: '宣传册、海报、书籍装帧、名片设计等',
    slug: 'print-design',
    count: projects.filter(p => p.category === 'print-design').length,
  },
];

// 获取特色项目
export const featuredProjects = projects.filter(project => project.featured);

// 获取最新项目
export const latestProjects = projects
  .sort((a, b) => parseInt(b.year) - parseInt(a.year))
  .slice(0, 6);

// 按分类获取项目
export function getProjectsByCategory(categoryId: string): Project[] {
  return projects.filter(project => project.category === categoryId);
}

// 获取随机项目
export function getRandomProjects(count: number = 3): Project[] {
  const shuffled = [...projects].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

// 根据标签获取项目
export function getProjectsByTag(tag: string): Project[] {
  return projects.filter(project => project.tags.includes(tag));
}

// 获取项目统计
export function getProjectStats() {
  return {
    total: projects.length,
    completed: projects.filter(p => p.status === 'completed').length,
    inProgress: projects.filter(p => p.status === 'in-progress').length,
    featured: projects.filter(p => p.featured).length,
    categories: projectCategories.length,
  };
}
