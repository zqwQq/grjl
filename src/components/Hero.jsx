import React, { useState, useEffect, useCallback } from 'react';
import { Play, Pause, Volume2, VolumeX, AlertCircle, Loader } from 'lucide-react';
import { useAudio } from '../hooks/useAudio';
import { prefersReducedMotion, scrollToElement, handleKeyboardNavigation } from '../utils';

/**
 * Hero组件 - 首屏展示
 * 包含背景图片、标题、音乐控制等功能
 */
const Hero = ({ title, subtitle, heroImage, musicSrc }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [userInteracted, setUserInteracted] = useState(false);
  
  const { 
    isPlaying, 
    isLoaded, 
    error: audioError, 
    toggle, 
    volume,
    toggleMute 
  } = useAudio(musicSrc);

  useEffect(() => {
    // 延迟显示内容以创建更好的视觉效果
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  const handleImageLoad = useCallback(() => {
    setImageLoaded(true);
    setImageError(false);
  }, []);

  const handleImageError = useCallback(() => {
    setImageError(true);
    console.error('Hero image failed to load:', heroImage);
  }, [heroImage]);

  const handleMusicToggle = useCallback(async () => {
    if (!userInteracted) {
      setUserInteracted(true);
    }
    await toggle();
  }, [toggle, userInteracted]);

  const handleMuteToggle = useCallback(() => {
    toggleMute();
  }, [toggleMute]);

  const handleScrollDown = useCallback(() => {
    scrollToElement('timeline', 80);
  }, []);

  const reduceMotion = prefersReducedMotion();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* 背景图片 */}
      <div className="absolute inset-0 z-0">
        {!imageError ? (
          <img
            src={heroImage}
            alt="背景图片"
            className={`w-full h-full object-cover transition-opacity duration-1000 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={handleImageLoad}
            onError={handleImageError}
            loading="eager"
          />
        ) : (
          // 备用背景
          <div className="w-full h-full bg-gradient-to-br from-soft-pink via-blush to-rose-gold"></div>
        )}
        
        {/* 加载占位符 */}
        {!imageLoaded && !imageError && (
          <div className="absolute inset-0 bg-gradient-to-br from-soft-pink via-blush to-rose-gold flex items-center justify-center">
            <Loader className="w-8 h-8 text-white animate-spin" />
          </div>
        )}
        
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
          {title || '生日快乐'}
        </h1>

        {/* 副标题 */}
        <p className={`text-xl md:text-2xl text-white/90 mb-12 font-light text-shadow ${
          !reduceMotion ? 'animate-slide-up' : ''
        }`}>
          {subtitle || '为你准备的特别礼物'}
        </p>

        {/* 音频错误提示 */}
        {audioError && (
          <div className="mb-6 p-4 bg-red-500/20 backdrop-blur-sm rounded-lg border border-red-500/30">
            <div className="flex items-center gap-2 text-white">
              <AlertCircle size={20} />
              <span className="text-sm">{audioError}</span>
            </div>
          </div>
        )}

        {/* 音乐控制按钮 */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <button
            onClick={handleMusicToggle}
            onKeyDown={(e) => handleKeyboardNavigation(e, handleMusicToggle)}
            disabled={!musicSrc}
            className={`btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 focus-visible transition-all duration-300 ${
              !reduceMotion ? 'hover:scale-105' : ''
            }`}
            aria-label={isPlaying ? '暂停音乐' : '播放音乐'}
            title={!isLoaded ? '音频加载中...' : ''}
          >
            {!isLoaded && musicSrc ? (
              <Loader size={20} className="animate-spin" />
            ) : isPlaying ? (
              <Pause size={20} />
            ) : (
              <Play size={20} />
            )}
            {!isLoaded && musicSrc ? '加载中...' : isPlaying ? '暂停音乐' : '播放音乐'}
          </button>

          {musicSrc && (
            <button
              onClick={handleMuteToggle}
              onKeyDown={(e) => handleKeyboardNavigation(e, handleMuteToggle)}
              disabled={!isLoaded}
              className={`btn-secondary disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 focus-visible transition-all duration-300 ${
                !reduceMotion ? 'hover:scale-105' : ''
              }`}
              aria-label={volume === 0 ? '取消静音' : '静音'}
            >
              {volume === 0 ? <VolumeX size={20} /> : <Volume2 size={20} />}
              {volume === 0 ? '取消静音' : '音量'}
            </button>
          )}
        </div>

        {/* 向下滚动提示 */}
        <div className={`${!reduceMotion ? 'animate-bounce' : ''}`}>
          <button
            onClick={handleScrollDown}
            onKeyDown={(e) => handleKeyboardNavigation(e, handleScrollDown)}
            className="text-white/80 hover:text-white transition-colors duration-300 focus-visible group"
            aria-label="向下滚动查看更多内容"
          >
            <div className="flex flex-col items-center gap-2">
              <span className="text-sm font-medium">探索更多</span>
              <svg 
                className={`w-6 h-6 transition-transform duration-300 ${
                  !reduceMotion ? 'group-hover:translate-y-1' : ''
                }`}
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
          {[...Array(15)].map((_, i) => (
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
