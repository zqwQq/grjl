# 🎂 生日礼物网页 - Birthday Gift Webpage

一个精美的单页响应式生日礼物网页，采用高端极简设计风格，包含时间线、相册、亲笔信、互动彩蛋等功能，支持 PDF 导出和完整的无障碍访问。

## ✨ 功能特色

### 🎭 核心功能
- **首屏 Hero**: 背景音乐控制，优雅的标题展示
- **时间线组件**: JSON 数据驱动，支持多图片 Lightbox 查看
- **相册组件**: 响应式网格，图片懒加载，触摸手势支持
- **亲笔信组件**: 打字机效果，PDF 导出（支持中文）
- **互动彩蛋**: 隐藏惊喜按钮，礼花效果，可重复触发

### 🎨 设计特色
- **高端极简**: 柔粉/奶cream 配色，细腻动效
- **响应式设计**: 完美适配手机、平板、桌面设备
- **无障碍支持**: ARIA 标签，键盘导航，"减少动画"选项
- **性能优化**: 图片懒加载，WebP 格式支持，资源预加载

## 🚀 快速开始

### 环境要求
- Node.js 16+ 
- npm 或 yarn 包管理器

### 安装步骤

1. **克隆项目**
```bash
git clone <repository-url>
cd birthday-gift-webpage
```

2. **安装依赖**
```bash
npm install
# 或
yarn install
```

3. **启动开发服务器**
```bash
npm run dev
# 或  
yarn dev
```

4. **访问网站**
打开浏览器访问 `http://localhost:5173`

## 📁 项目结构

```
birthday-gift-webpage/
├── public/                 # 静态资源
│   ├── images/            # 图片资源
│   │   ├── hero-bg.jpg    # 首屏背景
│   │   ├── timeline/      # 时间线图片
│   │   └── gallery/       # 相册图片
│   ├── music/             # 音频文件
│   │   └── bgm.mp3        # 背景音乐
│   ├── videos/            # 视频文件（可选）
│   │   └── surprise.mp4   # 彩蛋视频
│   └── heart.svg          # 网站图标
├── src/                   # 源代码
│   ├── components/        # React 组件
│   │   ├── Hero.jsx       # 首屏组件
│   │   ├── Timeline.jsx   # 时间线组件
│   │   ├── Gallery.jsx    # 相册组件
│   │   ├── Letter.jsx     # 亲笔信组件
│   │   ├── EasterEgg.jsx  # 彩蛋组件
│   │   ├── Lightbox.jsx   # 图片查看器
│   │   ├── LazyImage.jsx  # 懒加载图片
│   │   └── AccessibilityControls.jsx # 无障碍控制
│   ├── hooks/             # 自定义 Hooks
│   │   ├── useAudio.js    # 音频播放
│   │   ├── useTypewriter.js # 打字机效果
│   │   └── useIntersectionObserver.js # 交叉观察器
│   ├── utils/             # 工具函数
│   │   ├── index.js       # 通用工具
│   │   └── pdfGenerator.js # PDF 生成
│   ├── data/              # 配置数据
│   │   └── config.js      # 网站配置
│   ├── App.jsx            # 主应用组件
│   ├── main.jsx           # 入口文件
│   └── index.css          # 全局样式
├── package.json           # 项目配置
├── vite.config.js         # Vite 配置
├── tailwind.config.js     # Tailwind 配置
└── README.md              # 项目文档
```

## ⚙️ 自定义配置

### 修改内容

编辑 `src/data/config.js` 文件来自定义网站内容：

```javascript
export const siteConfig = {
  // 基本信息
  title: "给小美的惊喜 — 生日快乐",
  subtitle: "这是我为你准备的小世界", 
  heroImage: "/images/hero-bg.jpg",
  music: "/music/bgm.mp3",
  
  // 时间线数据
  timeline: [
    {
      date: "2022-05-10",
      title: "第一次见面", 
      description: "在某某咖啡店...",
      images: ["/images/timeline/meeting.jpg"]
    },
    // 更多时间线项目...
  ],
  
  // 相册数据
  gallery: [
    {
      src: "/images/gallery/photo1.jpg",
      alt: "美好的回忆 1",
      caption: "那个午后的阳光"
    },
    // 更多相册图片...
  ],
  
  // 亲笔信内容
  letter: {
    title: "写给最特别的你",
    content: `亲爱的小美：...`
  },
  
  // 彩蛋配置
  easterEgg: {
    message: "🎉 惊喜！愿你永远开心快乐！🎂",
    video: "/videos/surprise.mp4" // 可选
  }
};
```

### 替换资源文件

1. **图片资源**
   - 将您的图片放入 `public/images/` 对应文件夹
   - 支持 WebP、JPEG、PNG 格式
   - 推荐使用 WebP 格式以获得更好的性能

2. **音频资源**
   - 将背景音乐文件放入 `public/music/bgm.mp3`
   - 支持 MP3、OGG、WAV 格式
   - 注意版权问题，建议使用免费音乐

3. **视频资源（可选）**
   - 将彩蛋视频放入 `public/videos/surprise.mp4`
   - 支持 MP4、WebM 格式
   - 如不需要视频，可在配置中删除 `video` 字段

## 🌐 部署指南

### 构建项目

```bash
npm run build
# 或
yarn build
```

构建完成后，`dist` 文件夹包含所有静态文件。

### 部署到 Vercel

1. **安装 Vercel CLI**
```bash
npm i -g vercel
```

2. **登录并部署**
```bash
vercel login
vercel --prod
```

3. **或使用 Vercel 网页界面**
   - 访问 [vercel.com](https://vercel.com)
   - 导入 GitHub 仓库
   - 自动部署

### 部署到 Netlify

1. **使用拖拽部署**
   - 访问 [netlify.com](https://netlify.com)
   - 将 `dist` 文件夹拖拽到部署区域

2. **或连接 Git 仓库**
   - 连接 GitHub 仓库
   - 设置构建命令: `npm run build`
   - 设置发布目录: `dist`

### 部署到 GitHub Pages

1. **安装 gh-pages**
```bash
npm install --save-dev gh-pages
```

2. **添加部署脚本到 package.json**
```json
{
  "scripts": {
    "deploy": "gh-pages -d dist"
  }
}
```

3. **构建并部署**
```bash
npm run build
npm run deploy
```

### 部署到其他平台

项目生成的是纯静态文件，可以部署到任何支持静态网站的平台：
- AWS S3 + CloudFront
- Azure Static Web Apps
- Firebase Hosting
- Surge.sh
- 等等...

## 🧪 测试说明

### 手动测试步骤

1. **首屏测试**
   - [ ] 背景图片正常加载
   - [ ] 音乐播放/暂停功能正常
   - [ ] 向下滚动按钮工作
   - [ ] 响应式布局在不同设备上正常

2. **时间线测试**
   - [ ] 时间线节点按顺序显示
   - [ ] 点击图片打开 Lightbox
   - [ ] Lightbox 左右切换功能正常
   - [ ] 键盘导航（方向键、ESC）正常

3. **相册测试**
   - [ ] 图片懒加载功能正常
   - [ ] 响应式网格布局正确
   - [ ] 触摸手势（移动设备）正常
   - [ ] Lightbox 缩略图导航正常

4. **亲笔信测试**
   - [ ] 打字机效果正常播放
   - [ ] 可以跳过动画
   - [ ] PDF 导出功能正常
   - [ ] 中文字符在 PDF 中显示正确

5. **彩蛋测试**
   - [ ] 隐藏按钮可以被发现
   - [ ] 点击触发礼花效果
   - [ ] 惊喜消息正常显示
   - [ ] 视频播放功能正常（如有）
   - [ ] 可以重复触发

6. **无障碍测试**
   - [ ] 键盘导航覆盖所有交互元素
   - [ ] 屏幕阅读器可以正确读取内容
   - [ ] "减少动画"选项生效
   - [ ] 高对比度模式正常
   - [ ] ARIA 标签正确设置

7. **性能测试**
   - [ ] 首屏加载时间 < 3秒
   - [ ] 图片懒加载正常工作
   - [ ] 移动设备性能良好
   - [ ] 网络慢速条件下可用

### 浏览器兼容性

| 功能 | Chrome | Firefox | Safari | Edge |
|------|---------|---------|---------|------|
| 基础功能 | ✅ | ✅ | ✅ | ✅ |
| 音频播放 | ✅ | ✅ | ✅ | ✅ |
| PDF 导出 | ✅ | ✅ | ✅ | ✅ |
| 礼花效果 | ✅ | ✅ | ✅ | ✅ |
| WebP 图片 | ✅ | ✅ | ✅ | ✅ |

## 🔧 开发指南

### 开发环境设置

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建项目
npm run build

# 预览构建结果
npm run preview

# 代码检查
npm run lint
```

### 添加新功能

1. **创建新组件**
   - 在 `src/components/` 创建新的 JSX 文件
   - 遵循现有的代码风格和结构
   - 添加 PropTypes 和注释

2. **添加新的配置选项**
   - 在 `src/data/config.js` 中添加配置项
   - 更新相关组件以支持新配置
   - 更新文档说明

3. **自定义样式**
   - 使用 Tailwind CSS 类名
   - 在 `src/index.css` 中添加自定义样式
   - 保持设计系统的一致性

### 代码规范

- 使用 ES6+ 语法
- 组件使用函数式写法
- 遵循 React Hooks 最佳实践
- 保持代码注释的完整性
- 使用语义化的 HTML 结构

## 🎨 设计系统

### 颜色主题
```css
--soft-pink: #F8E8E8
--cream: #FFF8F0  
--blush: #FFE4E1
--rose-gold: #E8B4B8
--warm-gray: #F5F5F0
```

### 字体系统
- 主要字体: Inter (无衬线)
- 装饰字体: Georgia (衬线)
- 字号: 12px - 72px

### 间距系统
- 基础间距: 4px, 8px, 16px, 24px, 32px
- 组件间距: 64px, 96px, 128px

## 📱 移动端优化

- 响应式设计，支持所有设备尺寸
- 触摸友好的交互设计
- 优化的图片加载策略
- 移动端手势支持
- 减少动画以节省电量

## 🔒 隐私与安全

- 纯前端应用，无服务器端数据收集
- 所有数据存储在本地
- 音频/视频文件本地加载
- 无第三方跟踪代码
- 支持离线使用（构建后）

## 🤝 贡献指南

1. Fork 本项目
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 创建 Pull Request

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 💝 致谢

- [React](https://reactjs.org/) - UI 框架
- [Vite](https://vitejs.dev/) - 构建工具
- [Tailwind CSS](https://tailwindcss.com/) - CSS 框架
- [Lucide React](https://lucide.dev/) - 图标库
- [jsPDF](https://github.com/parallax/jsPDF) - PDF 生成
- [Canvas Confetti](https://github.com/catdad/canvas-confetti) - 礼花效果

## 📞 支持

如果您在使用过程中遇到问题，请：

1. 查看本文档的相关部分
2. 检查 [Issues](https://github.com/your-repo/issues) 是否有类似问题
3. 创建新的 Issue 描述您的问题

---

❤️ **用心制作，传递爱意** ❤️

希望这个生日礼物网页能为您带来美好的回忆！
