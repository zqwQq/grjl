import React, { useState } from 'react';
import { Calendar, MapPin, Heart, Image } from 'lucide-react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { formatDate, prefersReducedMotion, handleKeyboardNavigation } from '../utils';
import Lightbox from './Lightbox';

/**
 * TimelineItem组件 - 单个时间线节点
 */
const TimelineItem = ({ item, index, onImageClick }) => {
  const [elementRef, isVisible] = useIntersectionObserver({ threshold: 0.2 });
  const reduceMotion = prefersReducedMotion();
  const isEven = index % 2 === 0;

  return (
    <div 
      ref={elementRef}
      className={`relative flex items-center ${isEven ? 'flex-row' : 'flex-row-reverse'} mb-16 lg:mb-24`}
    >
      {/* 连接线 */}
      <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-rose-gold to-pink-400 opacity-30"></div>

      {/* 时间线节点 */}
      <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-rose-gold rounded-full border-4 border-white shadow-lg z-10"></div>

      {/* 内容区域 */}
      <div className={`w-full lg:w-5/12 ${isEven ? 'lg:pr-16' : 'lg:pl-16'}`}>
        <div 
          className={`card transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          } ${reduceMotion ? 'animate-reduced-motion' : ''}`}
          style={{ 
            transitionDelay: `${index * 200}ms` 
          }}
        >
          {/* 日期标签 */}
          <div className="flex items-center gap-2 mb-4 text-rose-gold">
            <Calendar size={18} />
            <span className="font-medium">{formatDate(item.date)}</span>
          </div>

          {/* 标题 */}
          <h3 className="text-2xl font-bold text-gray-800 mb-3 flex items-center gap-2">
            <Heart size={20} className="text-rose-gold" />
            {item.title}
          </h3>

          {/* 描述 */}
          <p className="text-gray-600 leading-relaxed mb-6">
            {item.description}
          </p>

          {/* 图片网格 */}
          {item.images && item.images.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-gray-500">
                <Image size={16} />
                <span className="text-sm font-medium">珍贵回忆</span>
              </div>
              
              <div className={`grid gap-3 ${
                item.images.length === 1 ? 'grid-cols-1' :
                item.images.length === 2 ? 'grid-cols-2' :
                'grid-cols-2 lg:grid-cols-3'
              }`}>
                {item.images.map((image, imgIndex) => (
                  <button
                    key={imgIndex}
                    onClick={() => onImageClick(item.images, imgIndex)}
                    onKeyDown={(e) => handleKeyboardNavigation(e, () => onImageClick(item.images, imgIndex))}
                    className="relative group overflow-hidden rounded-lg aspect-square focus-visible"
                    aria-label={`查看图片 ${imgIndex + 1}`}
                  >
                    <img
                      src={image}
                      alt={`${item.title} - 图片 ${imgIndex + 1}`}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                          <Image size={16} className="text-white" />
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* 装饰性引用标记 */}
          <div className={`absolute -top-2 ${isEven ? '-left-2' : '-right-2'} w-6 h-6 bg-rose-gold/20 rounded-full flex items-center justify-center`}>
            <Heart size={12} className="text-rose-gold" />
          </div>
        </div>
      </div>

      {/* 空白区域（用于对称布局） */}
      <div className="hidden lg:block w-5/12"></div>
    </div>
  );
};

/**
 * Timeline组件 - 时间线主组件
 */
const Timeline = ({ timelineData }) => {
  const [lightboxImages, setLightboxImages] = useState(null);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [titleRef, titleVisible] = useIntersectionObserver({ threshold: 0.3 });
  const reduceMotion = prefersReducedMotion();

  const handleImageClick = (images, index) => {
    setLightboxImages(images);
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxImages(null);
  };

  const navigateLightbox = (index) => {
    setLightboxIndex(index);
  };

  return (
    <section id="timeline" className="section-padding bg-gradient-to-b from-cream to-soft-pink">
      <div className="container-custom">
        {/* 标题区域 */}
        <div 
          ref={titleRef}
          className={`text-center mb-16 lg:mb-24 transition-all duration-1000 ${
            titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          } ${reduceMotion ? 'animate-reduced-motion' : ''}`}
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-gradient mb-6">
            我们的时光印记
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            每一个瞬间都是珍贵的回忆，每一段时光都值得被铭记。
            让我们一起回顾那些美好的时刻，感受爱情的温度。
          </p>
        </div>

        {/* 时间线内容 */}
        <div className="relative max-w-6xl mx-auto">
          {timelineData.map((item, index) => (
            <TimelineItem
              key={index}
              item={item}
              index={index}
              onImageClick={handleImageClick}
            />
          ))}

          {/* 时间线结束装饰 */}
          <div className="flex justify-center mt-16">
            <div className="w-16 h-16 bg-gradient-to-br from-rose-gold to-pink-400 rounded-full flex items-center justify-center shadow-xl">
              <Heart size={24} className="text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {lightboxImages && (
        <Lightbox
          images={lightboxImages}
          currentIndex={lightboxIndex}
          onClose={closeLightbox}
          onNavigate={navigateLightbox}
        />
      )}
    </section>
  );
};

export default Timeline;
