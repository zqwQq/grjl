import React, { useState, useEffect, useRef } from 'react';
import { Gift, Sparkles, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';
import { prefersReducedMotion, handleKeyboardNavigation } from '../utils';

/**
 * EasterEgg组件 - 互动彩蛋
 * 隐藏的惊喜按钮，点击触发礼花效果和特殊消息
 */
const EasterEgg = ({ easterEggData, position = 'bottom-right' }) => {
  const [isFound, setIsFound] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const videoRef = useRef(null);
  const reduceMotion = prefersReducedMotion();

  // 位置样式映射
  const positionStyles = {
    'top-left': 'top-4 left-4',
    'top-right': 'top-4 right-4',
    'bottom-left': 'bottom-4 left-4',
    'bottom-right': 'bottom-4 right-4',
    'center': 'top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2',
  };

  // 礼花配置
  const confettiConfig = {
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 },
    colors: ['#E8B4B8', '#FFE4E1', '#F8E8E8', '#FFB6C1', '#FFC0CB']
  };

  // 触发礼花效果
  const triggerConfetti = () => {
    if (reduceMotion) return;

    // 多次爆发创造更丰富的效果
    const duration = 3000;
    const animationEnd = Date.now() + duration;

    const randomInRange = (min, max) => {
      return Math.random() * (max - min) + min;
    };

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        clearInterval(interval);
        return;
      }

      const particleCount = 50 * (timeLeft / duration);
      
      // 左侧爆发
      confetti({
        ...confettiConfig,
        particleCount: particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
      });
      
      // 右侧爆发
      confetti({
        ...confettiConfig,
        particleCount: particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
      });
    }, 250);

    // 中心大爆发
    setTimeout(() => {
      confetti({
        ...confettiConfig,
        particleCount: 200,
        spread: 100,
        origin: { x: 0.5, y: 0.5 }
      });
    }, 500);
  };

  // 播放视频（如果有）
  const playVideo = () => {
    if (easterEggData.video && videoRef.current) {
      videoRef.current.play().catch(console.error);
    }
  };

  // 处理彩蛋点击
  const handleEasterEggClick = () => {
    setClickCount(prev => prev + 1);
    setIsActive(true);
    
    // 触发视觉效果
    triggerConfetti();
    
    // 显示消息
    setShowMessage(true);
    
    // 播放视频
    playVideo();
    
    // 重置状态
    setTimeout(() => {
      setIsActive(false);
    }, 1000);

    setTimeout(() => {
      setShowMessage(false);
    }, 5000);
  };

  // 鼠标悬停发现彩蛋
  const handleMouseEnter = () => {
    if (!isFound) {
      setIsFound(true);
    }
  };

  // 键盘发现彩蛋
  useEffect(() => {
    const handleKeyPress = (e) => {
      // 按下特殊组合键发现彩蛋 (Ctrl + Shift + H)
      if (e.ctrlKey && e.shiftKey && e.key === 'H') {
        setIsFound(true);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  return (
    <>
      {/* 隐藏的彩蛋按钮 */}
      <div className={`fixed ${positionStyles[position]} z-40`}>
        <button
          onClick={handleEasterEggClick}
          onMouseEnter={handleMouseEnter}
          onKeyDown={(e) => handleKeyboardNavigation(e, handleEasterEggClick)}
          className={`group relative transition-all duration-500 focus-visible ${
            isFound 
              ? 'opacity-100 scale-100' 
              : 'opacity-20 hover:opacity-60 scale-75'
          } ${
            isActive ? 'animate-bounce' : ''
          } ${
            reduceMotion ? 'animate-reduced-motion' : ''
          }`}
          aria-label="惊喜彩蛋"
          title={isFound ? '点击获得惊喜！' : '神秘的按钮...'}
        >
          <div className={`relative w-12 h-12 bg-gradient-to-br from-rose-gold to-pink-400 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 ${
            !reduceMotion ? 'group-hover:scale-110 group-hover:shadow-xl' : ''
          }`}>
            {/* 按钮图标 */}
            {isFound ? (
              <Gift size={20} className="text-white" />
            ) : (
              <div className="w-3 h-3 bg-white/60 rounded-full"></div>
            )}

            {/* 发现后的装饰效果 */}
            {isFound && !reduceMotion && (
              <>
                <div className="absolute -inset-1 bg-gradient-to-br from-rose-gold to-pink-400 rounded-full opacity-30 animate-ping"></div>
                <Sparkles 
                  size={16} 
                  className="absolute -top-2 -right-2 text-rose-gold animate-pulse" 
                />
              </>
            )}
          </div>

          {/* 悬停提示 */}
          {isFound && (
            <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="bg-black/80 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                点击获得惊喜！
              </div>
            </div>
          )}

          {/* 点击次数指示 */}
          {clickCount > 0 && (
            <div className="absolute -top-2 -left-2 w-5 h-5 bg-rose-gold rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-bold">{clickCount}</span>
            </div>
          )}
        </button>
      </div>

      {/* 惊喜消息弹窗 */}
      {showMessage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
          <div className={`bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 max-w-md mx-4 text-center transform transition-all duration-500 ${
            showMessage ? 'scale-100 opacity-100' : 'scale-75 opacity-0'
          } ${
            reduceMotion ? 'animate-reduced-motion' : 'animate-bounce'
          }`}>
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-rose-gold to-pink-400 rounded-full flex items-center justify-center">
                <Heart size={32} className="text-white" />
              </div>
            </div>
            
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              🎉 惊喜时刻！
            </h3>
            
            <p className="text-lg text-gray-600 leading-relaxed">
              {easterEggData.message}
            </p>

            {/* 装饰性元素 */}
            {!reduceMotion && (
              <div className="flex justify-center mt-6 gap-2">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="w-2 h-2 bg-rose-gold rounded-full animate-bounce"
                    style={{
                      animationDelay: `${i * 100}ms`,
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* 视频播放（如果提供） */}
      {easterEggData.video && showMessage && (
        <div className="fixed inset-0 z-40 bg-black/50 flex items-center justify-center">
          <div className="relative max-w-2xl mx-4">
            <video
              ref={videoRef}
              className="w-full rounded-lg shadow-2xl"
              controls
              autoPlay
              muted
              loop
            >
              <source src={easterEggData.video} type="video/mp4" />
              您的浏览器不支持视频播放。
            </video>
            
            <button
              onClick={() => setShowMessage(false)}
              className="absolute top-4 right-4 w-8 h-8 bg-black/50 text-white rounded-full flex items-center justify-center hover:bg-black/70 transition-colors duration-300"
              aria-label="关闭视频"
            >
              ×
            </button>
          </div>
        </div>
      )}

      {/* 发现提示（仅在未发现时显示） */}
      {!isFound && (
        <div className="fixed bottom-4 left-4 z-30 max-w-xs">
          <div className={`bg-black/70 text-white text-sm px-3 py-2 rounded-lg opacity-0 transition-opacity duration-1000 ${
            clickCount === 0 ? 'opacity-100' : 'opacity-0'
          }`}>
            💡 提示：页面中隐藏着一个神秘按钮，试着找找看！
          </div>
        </div>
      )}
    </>
  );
};

export default EasterEgg;
