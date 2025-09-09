import React, { useEffect } from 'react';
import Hero from './components/Hero';
import Timeline from './components/Timeline';
import Gallery from './components/Gallery';
import Letter from './components/Letter';
import EasterEgg from './components/EasterEgg';
import AccessibilityControls from './components/AccessibilityControls';
import { siteConfig } from './data/config';

/**
 * 主应用组件
 * 整合所有页面组件并提供完整的用户体验
 */
function App() {
  // 设置页面标题和元信息
  useEffect(() => {
    document.title = siteConfig.title;
    
    // 设置meta标签
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', `${siteConfig.subtitle} - 一个特别的生日礼物网页`);
    }

    // 设置主题色
    const metaThemeColor = document.createElement('meta');
    metaThemeColor.name = 'theme-color';
    metaThemeColor.content = '#E8B4B8';
    document.head.appendChild(metaThemeColor);

    // 设置视口meta
    const metaViewport = document.querySelector('meta[name="viewport"]');
    if (metaViewport) {
      metaViewport.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=5.0');
    }

    return () => {
      // 清理
      if (document.head.contains(metaThemeColor)) {
        document.head.removeChild(metaThemeColor);
      }
    };
  }, []);

  // 处理页面加载完成
  useEffect(() => {
    const handleLoad = () => {
      // 页面加载完成后的处理
      document.body.classList.add('loaded');
    };

    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
      return () => window.removeEventListener('load', handleLoad);
    }
  }, []);

  // 预加载关键资源
  useEffect(() => {
    const preloadResources = () => {
      // 预加载首屏图片
      if (siteConfig.heroImage) {
        const img = new Image();
        img.src = siteConfig.heroImage;
      }

      // 预加载音频文件
      if (siteConfig.music) {
        const audio = new Audio();
        audio.preload = 'metadata';
        audio.src = siteConfig.music;
      }
    };

    preloadResources();
  }, []);

  return (
    <div className="App">
      {/* 跳转到主要内容的链接（屏幕阅读器友好） */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-rose-gold text-white px-4 py-2 rounded-lg z-50"
      >
        跳转到主要内容
      </a>

      {/* 无障碍控制面板 */}
      <AccessibilityControls />

      {/* 主要内容 */}
      <main id="main-content" role="main">
        {/* Hero 部分 */}
        <Hero
          title={siteConfig.title}
          subtitle={siteConfig.subtitle}
          heroImage={siteConfig.heroImage}
          musicSrc={siteConfig.music}
        />

        {/* 时间线部分 */}
        <Timeline timelineData={siteConfig.timeline} />

        {/* 相册部分 */}
        <Gallery galleryData={siteConfig.gallery} />

        {/* 亲笔信部分 */}
        <Letter letterData={siteConfig.letter} />
      </main>

      {/* 页脚 */}
      <footer className="bg-gradient-to-r from-soft-pink to-blush py-8 text-center">
        <div className="container-custom">
          <p className="text-gray-600 mb-2">
            ❤️ 用心制作的生日礼物网页 ❤️
          </p>
          <p className="text-sm text-gray-500">
            {new Date().getFullYear()} · 愿每一天都充满爱与快乐
          </p>
        </div>
      </footer>

      {/* 互动彩蛋 */}
      <EasterEgg 
        easterEggData={siteConfig.easterEgg} 
        position="bottom-right" 
      />

      {/* 页面加载指示器 */}
      <div id="loading-indicator" className="fixed inset-0 z-50 bg-cream flex items-center justify-center transition-opacity duration-500 opacity-0 pointer-events-none">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-rose-gold/30 border-t-rose-gold rounded-full animate-spin mb-4"></div>
          <p className="text-gray-600 font-medium">正在加载美好回忆...</p>
        </div>
      </div>

      {/* 结构化数据 (SEO) */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": siteConfig.title,
          "description": siteConfig.subtitle,
          "url": window.location.href,
          "author": {
            "@type": "Person",
            "name": "Anonymous"
          },
          "dateCreated": new Date().toISOString(),
          "inLanguage": "zh-CN"
        })}
      </script>
    </div>
  );
}

export default App;
