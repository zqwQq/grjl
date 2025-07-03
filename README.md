# 郑权威设计师作品集网站

一个现代化、响应式的设计师作品集网站，使用 Next.js 14 + TypeScript + Tailwind CSS 构建。

## 项目概述

这是为平面设计师郑权威打造的专业作品集网站，展示其设计作品、技能和服务。网站采用现代化的设计理念，注重用户体验和性能优化。

## 技术栈

- **框架**: Next.js 14 (App Router)
- **语言**: TypeScript
- **样式**: Tailwind CSS
- **图标**: Lucide React
- **动画**: Framer Motion
- **主题**: next-themes (支持深色/浅色模式)
- **字体**: Inter + Playfair Display

## 项目特性

### ✨ 核心功能
- 🎨 现代化设计风格
- 📱 完全响应式布局
- 🌙 深色/浅色主题切换
- ⚡ 性能优化和SEO友好
- 🎭 丰富的动画效果
- 🔧 TypeScript 类型安全

### 📄 页面结构
- **首页**: 个人介绍、技能展示、精选作品
- **关于我**: 详细个人信息、工作经历、教育背景
- **作品集**: 项目展示、分类筛选、详情页面
- **博客**: 设计文章、技术分享
- **服务**: 设计服务介绍、价格方案
- **联系**: 联系表单、联系方式

### 🎯 设计亮点
- 渐变色彩搭配
- 玻璃态效果
- 微交互动画
- 卡片式布局
- 现代化图标
- 优雅的排版

## 项目结构

```
src/
├── app/                    # Next.js App Router
│   ├── globals.css        # 全局样式
│   ├── layout.tsx         # 根布局
│   └── page.tsx           # 首页
├── components/            # 组件目录
│   ├── layout/           # 布局组件
│   ├── sections/         # 页面区域组件
│   ├── ui/               # UI基础组件
│   └── providers/        # 上下文提供者
├── data/                 # 数据文件
│   ├── personal.ts       # 个人信息
│   ├── skills.ts         # 技能数据
│   └── projects.ts       # 项目数据
├── lib/                  # 工具函数
│   └── utils.ts          # 通用工具
└── types/                # TypeScript 类型定义
    └── index.ts          # 类型声明
```

## 开发进度

### ✅ 已完成
- [x] 项目初始化和环境配置
- [x] 基础组件开发 (Layout, Header, Footer)
- [x] 主题切换功能
- [x] 首页完整开发
- [x] 响应式设计
- [x] TypeScript 类型定义
- [x] 数据结构设计

### 🚧 进行中
- [ ] 关于我页面开发
- [ ] 作品集页面开发
- [ ] 博客系统开发
- [ ] 联系页面和服务页面开发

### 📋 待开发
- [ ] API集成 (Unsplash, 天气API等)
- [ ] 性能优化和SEO配置
- [ ] 测试和部署配置

## 安装和运行

### 前提条件
- Node.js 18+ 
- npm 或 yarn

### 安装依赖
```bash
npm install
# 或
yarn install
```

### 开发环境运行
```bash
npm run dev
# 或
yarn dev
```

访问 [http://localhost:3000](http://localhost:3000) 查看网站。

### 构建生产版本
```bash
npm run build
# 或
yarn build
```

### 启动生产服务器
```bash
npm start
# 或
yarn start
```

## 部署

项目支持部署到以下平台：
- **Vercel** (推荐)
- **Netlify**
- **AWS Amplify**
- **自定义服务器**

### Vercel 部署
1. 将代码推送到 GitHub
2. 在 Vercel 中导入项目
3. 自动部署完成

## 环境变量

创建 `.env.local` 文件并添加以下变量：

```env
# Unsplash API (可选)
NEXT_PUBLIC_UNSPLASH_ACCESS_KEY=your_unsplash_access_key

# 其他API密钥
NEXT_PUBLIC_WEATHER_API_KEY=your_weather_api_key
```

## 自定义配置

### 个人信息修改
编辑 `src/data/personal.ts` 文件来更新个人信息：

```typescript
export const personalInfo: PersonalInfo = {
  name: 'Your Name',
  chineseName: '你的中文名',
  title: '你的职位',
  // ... 其他信息
};
```

### 技能数据修改
编辑 `src/data/skills.ts` 文件来更新技能信息。

### 项目数据修改
编辑 `src/data/projects.ts` 文件来更新作品集项目。

## 性能优化

- ✅ 图片懒加载
- ✅ 代码分割
- ✅ 字体优化
- ✅ CSS优化
- ✅ 预加载关键资源

## SEO优化

- ✅ Meta标签优化
- ✅ 结构化数据
- ✅ Open Graph标签
- ✅ Twitter Cards
- ✅ 语义化HTML

## 浏览器支持

- Chrome (最新版本)
- Firefox (最新版本)
- Safari (最新版本)
- Edge (最新版本)

## 贡献

欢迎提交 Issue 和 Pull Request 来改进这个项目。

## 许可证

MIT License

## 联系方式

- 邮箱: zhengquanwei@example.com
- 网站: https://zhengquanwei.com
- GitHub: https://github.com/zhengquanwei

---

**注意**: 这是一个演示项目，部分数据为虚构内容，仅用于展示网站功能和设计。
