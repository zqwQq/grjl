import { WorkExperience, Education, Certificate, Award } from '@/types';

// 工作经历数据
export const workExperience: WorkExperience[] = [
  {
    id: 'freelance-designer-2024',
    company: '自由设计师',
    position: '平面设计师 & 电商设计师',
    startDate: '2024-01',
    current: true,
    description: '专注于品牌设计、电商视觉设计和包装设计，为多家企业和个人客户提供专业的设计服务。',
    responsibilities: [
      '为客户提供品牌视觉识别系统设计服务',
      '设计电商平台的产品页面、营销物料和广告素材',
      '创作包装设计，提升产品的市场竞争力',
      '与客户沟通需求，制定设计方案和项目时间表',
      '跟进项目进度，确保按时交付高质量的设计作品',
      '持续学习新的设计趋势和技术，提升专业技能',
    ],
    achievements: [
      '成功完成150+个设计项目，客户满意度达95%',
      '帮助多个品牌提升视觉形象，销售转化率平均提升30%',
      '建立了稳定的客户群体，获得多个长期合作伙伴',
      '作品在多个设计平台获得好评和关注',
      '获得Adobe认证设计师资格',
    ],
    technologies: [
      'Adobe Photoshop',
      'Adobe Illustrator', 
      'Adobe InDesign',
      'Figma',
      'Sketch',
      'Cinema 4D',
    ],
    location: '深圳，中国',
    companyLogo: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=100&h=100&fit=crop',
  },
  {
    id: 'design-intern-2023',
    company: '创意设计工作室',
    position: '设计实习生',
    startDate: '2023-06',
    endDate: '2023-12',
    current: false,
    description: '在知名设计工作室实习，参与多个品牌项目的设计工作，积累了丰富的实战经验。',
    responsibilities: [
      '协助资深设计师完成品牌设计项目',
      '参与创意头脑风暴和设计方案讨论',
      '制作设计稿和演示文档',
      '学习客户沟通技巧和项目管理流程',
      '整理和维护设计素材库',
      '参与团队培训和技能提升活动',
    ],
    achievements: [
      '参与完成20+个品牌设计项目',
      '独立负责3个小型项目的设计工作',
      '获得实习期间最佳表现奖',
      '建立了扎实的设计基础和工作流程',
      '获得导师和同事的一致好评',
    ],
    technologies: [
      'Adobe Creative Suite',
      'Figma',
      'Sketch',
      'Principle',
      'InVision',
    ],
    location: '深圳，中国',
    companyLogo: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=100&h=100&fit=crop',
  },
];

// 教育背景数据
export const education: Education[] = [
  {
    id: 'design-college-2024',
    institution: '深圳艺术设计学院',
    degree: '专科',
    major: '视觉传达设计',
    startDate: '2022-09',
    endDate: '2024-06',
    gpa: '3.8/4.0',
    description: '系统学习了视觉传达设计的理论知识和实践技能，掌握了从创意构思到设计实现的完整流程。',
    achievements: [
      '连续两年获得学院奖学金',
      '担任设计社团副社长，组织多次设计活动',
      '毕业设计作品获得优秀奖',
      '参与学院品牌形象升级项目',
      '多次参加设计竞赛并获奖',
    ],
    logo: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=100&h=100&fit=crop',
  },
  {
    id: 'high-school-2022',
    institution: '深圳市第一中学',
    degree: '高中',
    major: '艺术特长班',
    startDate: '2019-09',
    endDate: '2022-06',
    description: '在艺术特长班学习，培养了扎实的美术基础和艺术素养，为后续的设计学习奠定了基础。',
    achievements: [
      '多次获得校级美术作品展览一等奖',
      '参加市级美术竞赛获得优秀奖',
      '担任班级文艺委员，负责班级文化建设',
      '高考艺术类专业考试成绩优异',
    ],
    logo: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=100&h=100&fit=crop',
  },
];

// 证书和认证
export const certificates: Certificate[] = [
  {
    id: 'adobe-certified-expert',
    name: 'Adobe Certified Expert (ACE)',
    issuer: 'Adobe',
    issueDate: '2024-08',
    credentialId: 'ACE-2024-ZQW-001',
    credentialUrl: 'https://www.adobe.com/certification',
    image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=200&h=150&fit=crop',
  },
  {
    id: 'figma-professional',
    name: 'Figma Professional Certificate',
    issuer: 'Figma',
    issueDate: '2024-06',
    credentialId: 'FIG-PRO-2024-ZQW',
    credentialUrl: 'https://www.figma.com/certification',
    image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=200&h=150&fit=crop',
  },
  {
    id: 'google-ux-design',
    name: 'Google UX Design Certificate',
    issuer: 'Google',
    issueDate: '2024-04',
    credentialId: 'GOOGLE-UX-2024-ZQW',
    credentialUrl: 'https://www.coursera.org/google-certificates',
    image: 'https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=200&h=150&fit=crop',
  },
  {
    id: 'ui-ux-bootcamp',
    name: 'UI/UX Design Bootcamp Certificate',
    issuer: '设计训练营',
    issueDate: '2023-12',
    credentialId: 'BOOTCAMP-2023-ZQW',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=150&fit=crop',
  },
];

// 奖项和荣誉
export const awards: Award[] = [
  {
    id: 'best-brand-design-2024',
    title: '2024年度最佳品牌设计奖',
    issuer: '中国设计师协会',
    date: '2024-11',
    description: '凭借"智能科技有限公司品牌识别系统"项目获得年度最佳品牌设计奖',
    category: '品牌设计',
    image: 'https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?w=200&h=150&fit=crop',
    url: 'https://example.com/award-2024',
  },
  {
    id: 'young-designer-award-2024',
    title: '青年设计师新锐奖',
    issuer: '深圳设计周组委会',
    date: '2024-09',
    description: '在深圳设计周中获得青年设计师新锐奖，表彰在设计领域的创新表现',
    category: '综合设计',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&h=150&fit=crop',
    url: 'https://example.com/young-designer-2024',
  },
  {
    id: 'packaging-design-excellence-2024',
    title: '包装设计卓越奖',
    issuer: '亚洲包装设计协会',
    date: '2024-07',
    description: '餐厅品牌包装设计系列获得亚洲包装设计协会卓越奖',
    category: '包装设计',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=200&h=150&fit=crop',
  },
  {
    id: 'student-design-competition-2023',
    title: '全国大学生设计竞赛一等奖',
    issuer: '教育部高等教育司',
    date: '2023-11',
    description: '在全国大学生设计竞赛中获得视觉传达设计类一等奖',
    category: '学生竞赛',
    image: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=200&h=150&fit=crop',
  },
  {
    id: 'innovation-design-award-2023',
    title: '创新设计奖',
    issuer: '深圳市文化创意产业协会',
    date: '2023-08',
    description: '创新的设计理念和优秀的执行效果获得创新设计奖',
    category: '创新设计',
    image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=200&h=150&fit=crop',
  },
];

// 技能发展时间线
export const skillTimeline = [
  {
    year: '2019',
    title: '艺术启蒙',
    description: '开始系统学习美术基础，培养艺术感知能力',
    skills: ['素描', '色彩', '构图', '艺术史'],
    milestone: '进入艺术特长班',
  },
  {
    year: '2020-2021',
    title: '基础积累',
    description: '深入学习传统美术技法，建立扎实的艺术基础',
    skills: ['水彩', '油画', '版画', '雕塑基础'],
    milestone: '参加市级美术竞赛获奖',
  },
  {
    year: '2022',
    title: '数字化转型',
    description: '开始接触数字设计工具，学习平面设计基础',
    skills: ['Photoshop', 'Illustrator', '平面设计理论'],
    milestone: '考入视觉传达设计专业',
  },
  {
    year: '2023',
    title: '专业深化',
    description: '系统学习设计理论和实践，参与实际项目',
    skills: ['品牌设计', 'UI设计', 'InDesign', 'Figma'],
    milestone: '获得设计实习机会',
  },
  {
    year: '2024',
    title: '职业起步',
    description: '开始独立承接设计项目，建立专业声誉',
    skills: ['项目管理', '客户沟通', '商业设计', '3D设计'],
    milestone: '成为自由设计师',
  },
];

// 获取工作年限
export function getWorkExperience(): number {
  const startDate = new Date('2024-01-01');
  const currentDate = new Date();
  const diffTime = Math.abs(currentDate.getTime() - startDate.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return Math.max(1, Math.floor(diffDays / 365));
}

// 获取最新证书
export function getLatestCertificates(count: number = 3): Certificate[] {
  return certificates
    .sort((a, b) => new Date(b.issueDate).getTime() - new Date(a.issueDate).getTime())
    .slice(0, count);
}

// 获取最新奖项
export function getLatestAwards(count: number = 3): Award[] {
  return awards
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, count);
}
