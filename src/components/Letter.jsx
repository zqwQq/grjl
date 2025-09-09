import React, { useState, useEffect } from 'react';
import { FileText, Download, Play, RotateCcw, Heart } from 'lucide-react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { useTypewriter } from '../hooks/useTypewriter';
import { generateLetterPDF } from '../utils/pdfGenerator';
import { prefersReducedMotion, handleKeyboardNavigation } from '../utils';
import { showSuccess, showError } from './NotificationSystem';

/**
 * Letter组件 - 亲笔信展示
 * 包含打字机效果和PDF导出功能
 */
const Letter = ({ letterData }) => {
  const [isStarted, setIsStarted] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [titleRef, titleVisible] = useIntersectionObserver({ threshold: 0.3 });
  const [letterRef, letterVisible] = useIntersectionObserver({ threshold: 0.1 });
  const reduceMotion = prefersReducedMotion();

  const {
    displayText,
    isTyping,
    isComplete,
    showCursor,
    start,
    reset,
    complete,
  } = useTypewriter(letterData.content, {
    speed: reduceMotion ? 1 : 50,
    delay: 1000,
    onComplete: () => {
      console.log('打字完成');
    }
  });

  // 当组件进入视口时自动开始打字效果
  useEffect(() => {
    if (letterVisible && !isStarted && !reduceMotion) {
      setIsStarted(true);
      setTimeout(() => {
        start();
      }, 500);
    }
  }, [letterVisible, isStarted, start, reduceMotion]);

  // 如果偏好减少动画，直接显示完整文本
  useEffect(() => {
    if (reduceMotion && letterVisible) {
      complete();
    }
  }, [reduceMotion, letterVisible, complete]);

  const handleStartTyping = () => {
    if (!isStarted) {
      setIsStarted(true);
      start();
    } else {
      reset();
      setTimeout(() => {
        start();
      }, 100);
    }
  };

  const handleSkipTyping = () => {
    complete();
  };

  const handleExportPDF = async () => {
    setIsExporting(true);
    
    try {
      const result = await generateLetterPDF(letterData, 'love-letter.pdf');
      
      if (result.success) {
        showSuccess(result.message, {
          title: 'PDF导出成功',
          duration: 4000
        });
      } else {
        throw new Error(result.message || '未知错误');
      }
    } catch (error) {
      console.error('PDF导出错误:', error);
      showError(`PDF导出失败：${error.message}`, {
        title: '导出失败',
        duration: 6000
      });
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <section id="letter" className="section-padding bg-gradient-to-b from-blush to-warm-gray">
      <div className="container-custom">
        {/* 标题区域 */}
        <div 
          ref={titleRef}
          className={`text-center mb-16 lg:mb-24 transition-all duration-1000 ${
            titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          } ${reduceMotion ? 'animate-reduced-motion' : ''}`}
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <FileText className="text-rose-gold" size={32} />
            <h2 className="text-4xl lg:text-5xl font-bold text-gradient">
              {letterData.title}
            </h2>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            这是我想对你说的话，每一个字都来自内心深处，
            承载着我对你最真挚的情感。
          </p>
        </div>

        {/* 信件内容区域 */}
        <div className="max-w-4xl mx-auto">
          <div className="card bg-white/80 backdrop-blur-sm border border-rose-gold/20 shadow-2xl">
            {/* 信纸装饰 */}
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-rose-gold via-pink-300 to-rose-gold"></div>
            
            {/* 控制按钮 */}
            <div className="flex flex-wrap gap-3 mb-8 pb-6 border-b border-gray-200">
              <button
                onClick={handleStartTyping}
                onKeyDown={(e) => handleKeyboardNavigation(e, handleStartTyping)}
                disabled={isTyping}
                className={`btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 focus-visible ${
                  !reduceMotion ? 'hover:scale-105' : ''
                }`}
                aria-label={isStarted ? '重新开始打字效果' : '开始打字效果'}
              >
                {isStarted ? <RotateCcw size={18} /> : <Play size={18} />}
                {isStarted ? '重新开始' : '开始阅读'}
              </button>

              {(isTyping || isStarted) && !reduceMotion && (
                <button
                  onClick={handleSkipTyping}
                  onKeyDown={(e) => handleKeyboardNavigation(e, handleSkipTyping)}
                  className="btn-secondary flex items-center gap-2 focus-visible hover:scale-105"
                  aria-label="跳过打字效果"
                >
                  跳过动画
                </button>
              )}

              <button
                onClick={handleExportPDF}
                onKeyDown={(e) => handleKeyboardNavigation(e, handleExportPDF)}
                disabled={isExporting}
                className={`btn-secondary disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 focus-visible ${
                  !reduceMotion ? 'hover:scale-105' : ''
                }`}
                aria-label="导出为PDF"
              >
                {isExporting ? (
                  <div className="w-4 h-4 border-2 border-rose-gold border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <Download size={18} />
                )}
                {isExporting ? '导出中...' : '导出PDF'}
              </button>
            </div>

            {/* 信件正文 */}
            <div 
              ref={letterRef}
              className="relative"
            >
              <div className={`prose prose-lg max-w-none transition-all duration-500 ${
                letterVisible ? 'opacity-100' : 'opacity-0'
              }`}>
                <div 
                  className="text-gray-800 leading-relaxed whitespace-pre-line font-serif text-lg"
                  style={{ minHeight: '400px' }}
                >
                  {displayText || letterData.content}
                  {showCursor && !reduceMotion && (
                    <span className="inline-block w-0.5 h-6 bg-rose-gold ml-1 animate-blink"></span>
                  )}
                </div>
              </div>

              {/* 打字状态指示 */}
              {isTyping && (
                <div className="absolute bottom-0 right-0 flex items-center gap-2 text-sm text-gray-500">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-rose-gold rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 bg-rose-gold rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 bg-rose-gold rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                  <span>正在书写中...</span>
                </div>
              )}
            </div>

            {/* 信件签名装饰 */}
            {isComplete && (
              <div className={`mt-8 pt-6 border-t border-gray-200 flex justify-end transition-all duration-1000 ${
                isComplete ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}>
                <div className="flex items-center gap-2 text-rose-gold">
                  <Heart size={20} />
                  <span className="font-medium">用心书写</span>
                </div>
              </div>
            )}
          </div>

          {/* 装饰性元素 */}
          {!reduceMotion && (
            <div className="flex justify-center mt-8">
              <div className="flex gap-4">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="w-2 h-2 bg-rose-gold/30 rounded-full animate-float"
                    style={{
                      animationDelay: `${i * 200}ms`,
                      animationDuration: '3s',
                    }}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Letter;
