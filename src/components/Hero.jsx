import React, { useState, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { useAudio } from '../hooks/useAudio';
import { prefersReducedMotion, scrollToElement, handleKeyboardNavigation } from '../utils';

/**
 * Hero组件 - 首屏展示
 * 包含背景图片、标题、音乐控制等功能
 */
const Hero = ({ title, subtitle, heroImage, musicSrc }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const { isPlaying, isLoaded, toggle, setVolume } = useAudio(musicSrc);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    // 延迟显示内容以创建更好的视觉效果
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleMuteToggle = () => {
    if (isMuted) {
      setVolume(0.3);
      setIsMuted(false);
    } else {
      setVolume(0);
      setIsMuted(true);
    }
  };

  const handleScrollDown = () => {
    scrollToElement('timeline', 80);
  };

  const reduceMotion = prefersReducedMotion();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* 背景图片 */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="背景图片"
          className={`w-full h-full object-cover transition-opacity duration-1000 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={handleImageLoad}
          loading="eager"
        />
        {/* 渐变叠加层 */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/40"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-rose-gold/10 to-pink-400/10"></div>
      </div>

      {/* 主要内容 */}
      <div className={`relative z-10 text-center px-4 max-w-4xl mx-auto transition-all duration-1000 ${
        showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      } ${reduceMotion ? 'animate-reduced-motion' : ''}`}>
        {/* 主标题 */}
        <h1 className={`text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 text-shadow ${
          !reduceMotion ? 'animate-fade-in' : ''
        }`}>
          {title}
        </h1>

        {/* 副标题 */}
        <p className={`text-xl md:text-2xl text-white/90 mb-12 font-light text-shadow ${
          !reduceMotion ? 'animate-slide-up' : ''
        }`}>
          {subtitle}
        </p>

        {/* 音乐控制按钮 */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <button
            onClick={toggle}
            onKeyDown={(e) => handleKeyboardNavigation(e, toggle)}
            disabled={!isLoaded}
            className={`btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 focus-visible ${
              !reduceMotion ? 'hover:scale-105' : ''
            }`}
            aria-label={isPlaying ? '暂停音乐' : '播放音乐'}
          >
            {isPlaying ? <Pause size={20} /> : <Play size={20} />}
            {isPlaying ? '暂停音乐' : '播放音乐'}
          </button>

          <button
            onClick={handleMuteToggle}
            onKeyDown={(e) => handleKeyboardNavigation(e, handleMuteToggle)}
            disabled={!isLoaded}
            className={`btn-secondary disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 focus-visible ${
              !reduceMotion ? 'hover:scale-105' : ''
            }`}
            aria-label={isMuted ? '取消静音' : '静音'}
          >
            {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
            {isMuted ? '取消静音' : '音量'}
          </button>
        </div>

        {/* 向下滚动提示 */}
        <div className={`${!reduceMotion ? 'animate-bounce' : ''}`}>
          <button
            onClick={handleScrollDown}
            onKeyDown={(e) => handleKeyboardNavigation(e, handleScrollDown)}
            className="text-white/80 hover:text-white transition-colors duration-300 focus-visible"
            aria-label="向下滚动查看更多内容"
          >
            <div className="flex flex-col items-center gap-2">
              <span className="text-sm font-medium">探索更多</span>
              <svg 
                className="w-6 h-6" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
          </button>
        </div>
      </div>

      {/* 装饰性粒子效果 (仅在非减少动画模式下显示) */}
      {!reduceMotion && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-5">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-white/20 rounded-full animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${3 + Math.random() * 2}s`,
              }}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default Hero;
