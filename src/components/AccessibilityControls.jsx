import React, { useState, useEffect } from 'react';
import { Settings, Eye, EyeOff, Volume2, VolumeX } from 'lucide-react';
import { handleKeyboardNavigation } from '../utils';

/**
 * AccessibilityControls组件 - 无障碍控制面板
 * 提供动画控制、音频控制等无障碍功能
 */
const AccessibilityControls = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [highContrast, setHighContrast] = useState(false);
  const [muteAll, setMuteAll] = useState(false);

  // 检查用户偏好设置
  useEffect(() => {
    // 检查减少动画偏好
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setReduceMotion(prefersReducedMotion);

    // 检查高对比度偏好
    const prefersHighContrast = window.matchMedia('(prefers-contrast: high)').matches;
    setHighContrast(prefersHighContrast);

    // 从localStorage读取用户设置
    const savedReduceMotion = localStorage.getItem('reduce-motion') === 'true';
    const savedHighContrast = localStorage.getItem('high-contrast') === 'true';
    const savedMuteAll = localStorage.getItem('mute-all') === 'true';

    if (savedReduceMotion !== null) setReduceMotion(savedReduceMotion);
    if (savedHighContrast !== null) setHighContrast(savedHighContrast);
    if (savedMuteAll !== null) setMuteAll(savedMuteAll);
  }, []);

  // 应用减少动画设置
  useEffect(() => {
    document.documentElement.classList.toggle('reduce-motion', reduceMotion);
    localStorage.setItem('reduce-motion', reduceMotion.toString());
  }, [reduceMotion]);

  // 应用高对比度设置
  useEffect(() => {
    document.documentElement.classList.toggle('high-contrast', highContrast);
    localStorage.setItem('high-contrast', highContrast.toString());
  }, [highContrast]);

  // 应用静音设置
  useEffect(() => {
    // 静音所有音频元素
    const audioElements = document.querySelectorAll('audio, video');
    audioElements.forEach(element => {
      if (muteAll) {
        element.muted = true;
      } else {
        element.muted = false;
      }
    });
    localStorage.setItem('mute-all', muteAll.toString());
  }, [muteAll]);

  // 键盘快捷键
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Alt + A 打开无障碍面板
      if (e.altKey && e.key === 'a') {
        e.preventDefault();
        setIsOpen(prev => !prev);
      }
      
      // Alt + M 切换动画
      if (e.altKey && e.key === 'm') {
        e.preventDefault();
        setReduceMotion(prev => !prev);
      }
      
      // Alt + C 切换对比度
      if (e.altKey && e.key === 'c') {
        e.preventDefault();
        setHighContrast(prev => !prev);
      }
      
      // Alt + S 切换声音
      if (e.altKey && e.key === 's') {
        e.preventDefault();
        setMuteAll(prev => !prev);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <>
      {/* 控制按钮 */}
      <div className="fixed top-4 left-4 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          onKeyDown={(e) => handleKeyboardNavigation(e, () => setIsOpen(!isOpen))}
          className="w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center hover:bg-white transition-all duration-300 focus-visible border border-gray-200"
          aria-label="打开无障碍设置"
          title="无障碍设置 (Alt+A)"
        >
          <Settings size={20} className="text-gray-700" />
        </button>
      </div>

      {/* 控制面板 */}
      {isOpen && (
        <div className="fixed top-20 left-4 z-50 bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl border border-gray-200 p-6 min-w-64">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">无障碍设置</h3>
            <button
              onClick={() => setIsOpen(false)}
              onKeyDown={(e) => handleKeyboardNavigation(e, () => setIsOpen(false))}
              className="w-6 h-6 text-gray-500 hover:text-gray-700 focus-visible"
              aria-label="关闭设置面板"
            >
              ×
            </button>
          </div>

          <div className="space-y-4">
            {/* 减少动画 */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Eye size={16} className="text-gray-600" />
                <label htmlFor="reduce-motion" className="text-sm font-medium text-gray-700">
                  减少动画
                </label>
              </div>
              <button
                id="reduce-motion"
                onClick={() => setReduceMotion(!reduceMotion)}
                onKeyDown={(e) => handleKeyboardNavigation(e, () => setReduceMotion(!reduceMotion))}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus-visible ${
                  reduceMotion ? 'bg-rose-gold' : 'bg-gray-300'
                }`}
                role="switch"
                aria-checked={reduceMotion}
                aria-label="切换减少动画设置"
                title="键盘快捷键: Alt+M"
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    reduceMotion ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            {/* 高对比度 */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <EyeOff size={16} className="text-gray-600" />
                <label htmlFor="high-contrast" className="text-sm font-medium text-gray-700">
                  高对比度
                </label>
              </div>
              <button
                id="high-contrast"
                onClick={() => setHighContrast(!highContrast)}
                onKeyDown={(e) => handleKeyboardNavigation(e, () => setHighContrast(!highContrast))}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus-visible ${
                  highContrast ? 'bg-rose-gold' : 'bg-gray-300'
                }`}
                role="switch"
                aria-checked={highContrast}
                aria-label="切换高对比度设置"
                title="键盘快捷键: Alt+C"
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    highContrast ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            {/* 静音所有音频 */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {muteAll ? <VolumeX size={16} className="text-gray-600" /> : <Volume2 size={16} className="text-gray-600" />}
                <label htmlFor="mute-all" className="text-sm font-medium text-gray-700">
                  静音音频
                </label>
              </div>
              <button
                id="mute-all"
                onClick={() => setMuteAll(!muteAll)}
                onKeyDown={(e) => handleKeyboardNavigation(e, () => setMuteAll(!muteAll))}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus-visible ${
                  muteAll ? 'bg-rose-gold' : 'bg-gray-300'
                }`}
                role="switch"
                aria-checked={muteAll}
                aria-label="切换音频静音设置"
                title="键盘快捷键: Alt+S"
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    muteAll ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>

          {/* 快捷键说明 */}
          <div className="mt-6 pt-4 border-t border-gray-200">
            <h4 className="text-sm font-medium text-gray-700 mb-2">键盘快捷键</h4>
            <div className="text-xs text-gray-600 space-y-1">
              <div>Alt + A: 打开/关闭设置</div>
              <div>Alt + M: 切换动画</div>
              <div>Alt + C: 切换对比度</div>
              <div>Alt + S: 切换音频</div>
            </div>
          </div>
        </div>
      )}

      {/* 遮罩层 */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  );
};

export default AccessibilityControls;
