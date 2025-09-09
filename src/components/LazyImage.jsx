import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Image, AlertCircle, Loader } from 'lucide-react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

/**
 * LazyImage组件 - 懒加载图片
 * 支持占位符、加载状态、错误处理、重试机制
 */
const LazyImage = ({ 
  src, 
  alt = '', 
  className = '', 
  placeholderClassName = 'image-placeholder',
  onClick,
  onKeyDown,
  onLoad,
  onError,
  retryCount = 2,
  fallbackSrc,
  ...props 
}) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentRetry, setCurrentRetry] = useState(0);
  const [currentSrc, setCurrentSrc] = useState(src);
  
  const [elementRef, isVisible] = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: '100px 0px'
  });

  const imgRef = useRef(null);
  const timeoutRef = useRef(null);

  // 重试加载图片
  const retryLoad = useCallback(() => {
    if (currentRetry < retryCount) {
      setCurrentRetry(prev => prev + 1);
      setError(false);
      setLoading(true);
      
      // 添加时间戳避免缓存
      const timestamp = new Date().getTime();
      setCurrentSrc(`${src}?retry=${currentRetry + 1}&t=${timestamp}`);
    } else if (fallbackSrc && currentSrc !== fallbackSrc) {
      // 使用备用图片
      setCurrentSrc(fallbackSrc);
      setCurrentRetry(0);
      setError(false);
      setLoading(true);
    } else {
      setError(true);
      setLoading(false);
    }
  }, [currentRetry, retryCount, src, fallbackSrc, currentSrc]);

  // 处理图片加载成功
  const handleImageLoad = useCallback(() => {
    setLoaded(true);
    setLoading(false);
    setError(false);
    
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    if (onLoad) {
      onLoad();
    }
  }, [onLoad]);

  // 处理图片加载失败
  const handleImageError = useCallback(() => {
    setLoading(false);
    
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    if (onError) {
      onError();
    }
    
    // 自动重试
    setTimeout(() => {
      retryLoad();
    }, 1000);
  }, [onError, retryLoad]);

  // 当图片进入视口时开始加载
  useEffect(() => {
    if (isVisible && currentSrc && !loaded && !loading) {
      setLoading(true);
      
      // 设置加载超时
      timeoutRef.current = setTimeout(() => {
        if (!loaded) {
          handleImageError();
        }
      }, 10000); // 10秒超时
    }
  }, [isVisible, currentSrc, loaded, loading, handleImageError]);

  // 清理定时器
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // 处理点击事件
  const handleClick = useCallback((e) => {
    if (error) {
      e.preventDefault();
      retryLoad();
    } else if (onClick) {
      onClick(e);
    }
  }, [error, onClick, retryLoad]);

  return (
    <div 
      ref={elementRef} 
      className={`relative overflow-hidden ${className}`}
      onClick={handleClick}
      onKeyDown={onKeyDown}
      {...props}
    >
      {/* 占位符/加载状态 */}
      {!loaded && !error && (
        <div className={`absolute inset-0 ${placeholderClassName} flex items-center justify-center`}>
          {loading ? (
            <div className="flex flex-col items-center gap-2">
              <Loader className="w-8 h-8 text-rose-gold animate-spin" />
              <span className="text-xs text-gray-500">加载中...</span>
            </div>
          ) : (
            <div className="flex items-center justify-center w-full h-full">
              <Image className="w-12 h-12 text-gray-400" />
            </div>
          )}
        </div>
      )}

      {/* 错误状态 */}
      {error && (
        <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center group cursor-pointer hover:bg-gradient-to-br hover:from-gray-200 hover:to-gray-300 transition-all duration-300">
          <div className="text-center text-gray-500">
            <AlertCircle className="w-12 h-12 mx-auto mb-2 group-hover:text-rose-gold transition-colors duration-300" />
            <p className="text-sm mb-2">图片加载失败</p>
            <p className="text-xs text-gray-400 group-hover:text-rose-gold transition-colors duration-300">
              点击重试 ({currentRetry}/{retryCount})
            </p>
          </div>
        </div>
      )}

      {/* 实际图片 */}
      {isVisible && currentSrc && (
        <img
          ref={imgRef}
          src={currentSrc}
          alt={alt}
          onLoad={handleImageLoad}
          onError={handleImageError}
          className={`w-full h-full object-cover transition-all duration-500 ${
            loaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
          }`}
          loading="lazy"
          draggable={false}
        />
      )}

      {/* 加载进度指示器 */}
      {loading && (
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200 overflow-hidden">
          <div className="h-full bg-rose-gold animate-pulse"></div>
        </div>
      )}
    </div>
  );
};

export default LazyImage;
