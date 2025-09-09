import React, { useState, useRef, useEffect } from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

/**
 * LazyImage组件 - 懒加载图片
 * 支持占位符、加载状态、错误处理
 */
const LazyImage = ({ 
  src, 
  alt, 
  className = '', 
  placeholderClassName = 'image-placeholder',
  onClick,
  onKeyDown,
  ...props 
}) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const [elementRef, isVisible] = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: '50px 0px'
  });

  const imgRef = useRef(null);

  useEffect(() => {
    if (isVisible && src && !loaded && !error) {
      const img = new Image();
      img.onload = () => {
        setLoaded(true);
      };
      img.onerror = () => {
        setError(true);
      };
      img.src = src;
    }
  }, [isVisible, src, loaded, error]);

  const handleImageLoad = () => {
    setLoaded(true);
  };

  const handleImageError = () => {
    setError(true);
  };

  return (
    <div 
      ref={elementRef} 
      className={`relative overflow-hidden ${className}`}
      onClick={onClick}
      onKeyDown={onKeyDown}
      {...props}
    >
      {/* 占位符 */}
      {!loaded && !error && (
        <div className={`absolute inset-0 ${placeholderClassName}`}>
          <div className="flex items-center justify-center w-full h-full">
            <div className="w-8 h-8 border-2 border-rose-gold/30 border-t-rose-gold rounded-full animate-spin"></div>
          </div>
        </div>
      )}

      {/* 错误状态 */}
      {error && (
        <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
          <div className="text-center text-gray-500">
            <svg className="w-12 h-12 mx-auto mb-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
            </svg>
            <p className="text-sm">图片加载失败</p>
          </div>
        </div>
      )}

      {/* 实际图片 */}
      {isVisible && src && (
        <img
          ref={imgRef}
          src={src}
          alt={alt}
          onLoad={handleImageLoad}
          onError={handleImageError}
          className={`w-full h-full object-cover transition-opacity duration-500 ${
            loaded ? 'opacity-100' : 'opacity-0'
          }`}
          loading="lazy"
        />
      )}
    </div>
  );
};

export default LazyImage;
