import React, { useState, useEffect, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { handleKeyboardNavigation } from '../utils';

/**
 * Lightbox组件 - 图片查看器
 * 支持键盘导航、触摸手势、无障碍访问
 */
const Lightbox = ({ images, currentIndex, onClose, onNavigate }) => {
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // 最小滑动距离
  const minSwipeDistance = 50;

  const handlePrevious = useCallback(() => {
    if (currentIndex > 0) {
      onNavigate(currentIndex - 1);
      setIsLoading(true);
    }
  }, [currentIndex, onNavigate]);

  const handleNext = useCallback(() => {
    if (currentIndex < images.length - 1) {
      onNavigate(currentIndex + 1);
      setIsLoading(true);
    }
  }, [currentIndex, images.length, onNavigate]);

  // 键盘导航
  useEffect(() => {
    const handleKeyDown = (e) => {
      switch (e.key) {
        case 'Escape':
          onClose();
          break;
        case 'ArrowLeft':
          handlePrevious();
          break;
        case 'ArrowRight':
          handleNext();
          break;
        default:
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose, handlePrevious, handleNext]);

  // 触摸手势处理
  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      handleNext();
    } else if (isRightSwipe) {
      handlePrevious();
    }
  };

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  const currentImage = images[currentIndex];

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="lightbox-title"
    >
      {/* 关闭按钮 */}
      <button
        onClick={onClose}
        onKeyDown={(e) => handleKeyboardNavigation(e, onClose)}
        className="absolute top-4 right-4 z-60 text-white hover:text-rose-gold transition-colors duration-300 focus-visible"
        aria-label="关闭图片查看器"
      >
        <X size={32} />
      </button>

      {/* 图片计数 */}
      <div 
        id="lightbox-title"
        className="absolute top-4 left-4 z-60 text-white text-lg font-medium"
      >
        {currentIndex + 1} / {images.length}
      </div>

      {/* 导航按钮 - 上一张 */}
      {currentIndex > 0 && (
        <button
          onClick={handlePrevious}
          onKeyDown={(e) => handleKeyboardNavigation(e, handlePrevious)}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 z-60 text-white hover:text-rose-gold transition-colors duration-300 focus-visible"
          aria-label="上一张图片"
        >
          <ChevronLeft size={40} />
        </button>
      )}

      {/* 导航按钮 - 下一张 */}
      {currentIndex < images.length - 1 && (
        <button
          onClick={handleNext}
          onKeyDown={(e) => handleKeyboardNavigation(e, handleNext)}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 z-60 text-white hover:text-rose-gold transition-colors duration-300 focus-visible"
          aria-label="下一张图片"
        >
          <ChevronRight size={40} />
        </button>
      )}

      {/* 主图片区域 */}
      <div 
        className="max-w-4xl max-h-[90vh] mx-4 relative"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {/* 加载指示器 */}
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-rose-gold border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}

        <img
          src={currentImage.src || currentImage}
          alt={currentImage.alt || `图片 ${currentIndex + 1}`}
          className="w-full h-full object-contain rounded-lg shadow-2xl"
          onLoad={handleImageLoad}
        />

        {/* 图片描述 */}
        {currentImage.caption && (
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 rounded-b-lg">
            <p className="text-white text-center text-lg">{currentImage.caption}</p>
          </div>
        )}
      </div>

      {/* 缩略图导航 */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 max-w-xs overflow-x-auto">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => {
              onNavigate(index);
              setIsLoading(true);
            }}
            onKeyDown={(e) => handleKeyboardNavigation(e, () => {
              onNavigate(index);
              setIsLoading(true);
            })}
            className={`flex-shrink-0 w-12 h-12 rounded-lg overflow-hidden border-2 transition-all duration-300 focus-visible ${
              index === currentIndex 
                ? 'border-rose-gold shadow-lg' 
                : 'border-white/30 hover:border-white/60'
            }`}
            aria-label={`查看第 ${index + 1} 张图片`}
          >
            <img
              src={image.src || image}
              alt=""
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default Lightbox;
