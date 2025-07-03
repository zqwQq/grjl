// 基础类型定义
export interface BaseEntity {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

// 个人信息类型
export interface PersonalInfo {
  name: string;
  chineseName: string;
  title: string;
  subtitle: string;
  bio: string;
  birthDate: string;
  zodiacSign: string;
  chineseZodiac: string;
  location: string;
  email: string;
  phone: string;
  website: string;
  avatar: string;
  resume: string;
}

// 技能类型
export interface Skill {
  id: string;
  name: string;
  category: string;
  level: number; // 1-100
  icon: string;
  description?: string;
}

// 技能分类
export interface SkillCategory {
  id: string;
  name: string;
  description: string;
  skills: Skill[];
}

// 工作经历类型
export interface WorkExperience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  description: string;
  responsibilities: string[];
  achievements: string[];
  technologies: string[];
  location: string;
  companyLogo?: string;
}

// 教育背景类型
export interface Education {
  id: string;
  institution: string;
  degree: string;
  major: string;
  startDate: string;
  endDate: string;
  gpa?: string;
  description?: string;
  achievements?: string[];
  logo?: string;
}

// 项目/作品类型
export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  category: string;
  tags: string[];
  images: string[];
  thumbnail: string;
  client?: string;
  year: string;
  duration?: string;
  role: string;
  technologies: string[];
  challenges?: string[];
  solutions?: string[];
  results?: string[];
  liveUrl?: string;
  githubUrl?: string;
  behanceUrl?: string;
  dribbbleUrl?: string;
  featured: boolean;
  status: 'completed' | 'in-progress' | 'concept';
}

// 项目分类
export interface ProjectCategory {
  id: string;
  name: string;
  description: string;
  slug: string;
  count: number;
}

// 博客文章类型
export interface BlogPost extends BaseEntity {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  author: string;
  publishedAt: Date;
  readingTime: number;
  tags: string[];
  category: string;
  featured: boolean;
  published: boolean;
  views: number;
  likes: number;
  seo: {
    metaTitle?: string;
    metaDescription?: string;
    keywords?: string[];
  };
}

// 博客分类
export interface BlogCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  count: number;
  color: string;
}

// 博客标签
export interface BlogTag {
  id: string;
  name: string;
  slug: string;
  count: number;
  color: string;
}

// 服务类型
export interface Service {
  id: string;
  name: string;
  description: string;
  longDescription: string;
  icon: string;
  features: string[];
  pricing: {
    basic?: ServicePricing;
    standard?: ServicePricing;
    premium?: ServicePricing;
  };
  deliverables: string[];
  timeline: string;
  process: ServiceProcess[];
}

export interface ServicePricing {
  name: string;
  price: string;
  description: string;
  features: string[];
  popular?: boolean;
}

export interface ServiceProcess {
  step: number;
  title: string;
  description: string;
  duration: string;
}

// 联系表单类型
export interface ContactForm {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  subject: string;
  message: string;
  budget?: string;
  timeline?: string;
  services?: string[];
  source?: string;
}

// 社交媒体链接
export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
  username?: string;
}

// 证书/认证类型
export interface Certificate {
  id: string;
  name: string;
  issuer: string;
  issueDate: string;
  expiryDate?: string;
  credentialId?: string;
  credentialUrl?: string;
  image?: string;
}

// 奖项类型
export interface Award {
  id: string;
  title: string;
  issuer: string;
  date: string;
  description: string;
  category: string;
  image?: string;
  url?: string;
}

// API 响应类型
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

// 分页类型
export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: Pagination;
}

// 搜索类型
export interface SearchParams {
  query?: string;
  category?: string;
  tags?: string[];
  sortBy?: 'date' | 'title' | 'views' | 'likes';
  sortOrder?: 'asc' | 'desc';
  page?: number;
  limit?: number;
}

// 主题类型
export type Theme = 'light' | 'dark' | 'system';

// 语言类型
export type Language = 'zh' | 'en';

// 导航菜单类型
export interface NavItem {
  name: string;
  href: string;
  icon?: string;
  children?: NavItem[];
  external?: boolean;
}

// SEO 类型
export interface SEOData {
  title: string;
  description: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'profile';
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
}

// 统计数据类型
export interface Stats {
  projectsCompleted: number;
  yearsExperience: number;
  happyClients: number;
  awardsWon: number;
  blogPosts: number;
  totalViews: number;
}

// 第三方 API 类型
export interface UnsplashImage {
  id: string;
  urls: {
    raw: string;
    full: string;
    regular: string;
    small: string;
    thumb: string;
  };
  alt_description: string;
  user: {
    name: string;
    username: string;
  };
  links: {
    html: string;
  };
}

export interface WeatherData {
  location: string;
  temperature: number;
  description: string;
  icon: string;
  humidity: number;
  windSpeed: number;
}

export interface Quote {
  text: string;
  author: string;
  category?: string;
}

// 组件 Props 类型
export interface ComponentProps {
  className?: string;
  children?: React.ReactNode;
}

// 表单状态类型
export interface FormState {
  isSubmitting: boolean;
  isSuccess: boolean;
  error?: string;
}

// 模态框类型
export interface ModalProps extends ComponentProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
}

// 通知类型
export interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message?: string;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}
