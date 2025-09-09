import React, { useState, useMemo } from 'react';
import { Camera, Grid, Heart } from 'lucide-react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { prefersReducedMotion, handleKeyboardNavigation } from '../utils';
import LazyImage from './LazyImage';
import Lightbox from './Lightbox';

/**
 * GalleryItem组件 - 单个相册项目
 */
const GalleryItem = ({ image, index, onClick, delay = 0 }) => {
  const [elementRef, isVisible] = useIntersectionObserver({ threshold: 0.2 });
  const reduceMotion = prefersReducedMotion();

  return (
    <div
      ref={elementRef}
      className={`group relative aspect-square rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      } ${reduceMotion ? 'animate-reduced-motion' : 'hover:scale-[1.02]'}`}
      style={{ 
        transitionDelay: `${delay}ms` 
      }}
    >
      <button
        onClick={() => onClick(index)}
        onKeyDown={(e) => handleKeyboardNavigation(e, () => onClick(index))}
        className="w-full h-full focus-visible"
        aria-label={`查看图片：${image.caption || image.alt || `图片 ${index + 1}`}`}
      >
        <LazyImage
          src={image.src}
          alt={image.alt || `相册图片 ${index + 1}`}
          className="w-full h-full"
        />

        {/* 悬停遮罩 */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute bottom-0 left-0 right-0 p-4">
            {image.caption && (
              <p className="text-white text-sm font-medium mb-2">{image.caption}</p>
            )}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-white/80">
                <Camera size={16} />
                <span className="text-xs">点击查看</span>
              </div>
              <Heart size={16} className="text-rose-gold" />
            </div>
          </div>
        </div>

        {/* 放大图标 */}
        <div className="absolute top-4 right-4 w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
          </svg>
        </div>
      </button>
    </div>
  );
};

/**
 * Gallery组件 - 相册主组件
 */
const Gallery = ({ galleryData }) => {
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [titleRef, titleVisible] = useIntersectionObserver({ threshold: 0.3 });
  const reduceMotion = prefersReducedMotion();

  // 计算响应式网格列数
  const gridCols = useMemo(() => {
    const count = galleryData.length;
    if (count <= 2) return 'grid-cols-1 sm:grid-cols-2';
    if (count <= 4) return 'grid-cols-2 lg:grid-cols-2';
    if (count <= 6) return 'grid-cols-2 lg:grid-cols-3';
    return 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4';
  }, [galleryData.length]);

  const handleImageClick = (index) => {
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const navigateLightbox = (index) => {
    setLightboxIndex(index);
  };

  return (
    <section id="gallery" className="section-padding bg-gradient-to-b from-soft-pink to-blush">
      <div className="container-custom">
        {/* 标题区域 */}
        <div 
          ref={titleRef}
          className={`text-center mb-16 lg:mb-24 transition-all duration-1000 ${
            titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          } ${reduceMotion ? 'animate-reduced-motion' : ''}`}
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <Grid className="text-rose-gold" size={32} />
            <h2 className="text-4xl lg:text-5xl font-bold text-gradient">
              美好瞬间
            </h2>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            用镜头捕捉的每一个瞬间，都是我们爱情故事中最珍贵的片段。
            这些照片见证了我们一起走过的路，记录了我们共同的欢声笑语。
          </p>
        </div>

        {/* 相册网格 */}
        <div className={`grid ${gridCols} gap-4 md:gap-6 lg:gap-8 max-w-6xl mx-auto`}>
          {galleryData.map((image, index) => (
            <GalleryItem
              key={index}
              image={image}
              index={index}
              onClick={handleImageClick}
              delay={index * 100}
            />
          ))}
        </div>

        {/* 统计信息 */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-4 bg-white/60 backdrop-blur-sm rounded-full px-6 py-3 shadow-lg">
            <div className="flex items-center gap-2">
              <Camera size={20} className="text-rose-gold" />
              <span className="font-medium text-gray-700">{galleryData.length} 张照片</span>
            </div>
            <div className="w-1 h-6 bg-gray-300 rounded-full"></div>
            <div className="flex items-center gap-2">
              <Heart size={20} className="text-rose-gold" />
              <span className="font-medium text-gray-700">无数个美好回忆</span>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <Lightbox
          images={galleryData}
          currentIndex={lightboxIndex}
          onClose={closeLightbox}
          onNavigate={navigateLightbox}
        />
      )}
    </section>
  );
};

export default Gallery;
