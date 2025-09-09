import { useState, useEffect, useRef } from 'react';

/**
 * 打字机效果Hook
 * 逐字显示文本，支持暂停、重置等功能
 */
export const useTypewriter = (text, options = {}) => {
  const {
    speed = 50,           // 打字速度（毫秒）
    delay = 0,            // 开始延迟
    loop = false,         // 是否循环
    autoStart = false,    // 是否自动开始
    onComplete = null,    // 完成回调
    cursor = true,        // 是否显示光标
  } = options;

  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [showCursor, setShowCursor] = useState(cursor);
  
  const timeoutRef = useRef(null);
  const indexRef = useRef(0);
  const isRunningRef = useRef(false);

  // 清理定时器
  const clearTimeouts = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  // 开始打字
  const start = () => {
    if (isRunningRef.current || !text) return;
    
    isRunningRef.current = true;
    setIsTyping(true);
    setIsComplete(false);
    indexRef.current = 0;
    setDisplayText('');
    
    const typeNextChar = () => {
      if (indexRef.current < text.length) {
        setDisplayText(text.slice(0, indexRef.current + 1));
        indexRef.current++;
        timeoutRef.current = setTimeout(typeNextChar, speed);
      } else {
        // 打字完成
        setIsTyping(false);
        setIsComplete(true);
        isRunningRef.current = false;
        
        if (onComplete) {
          onComplete();
        }
        
        if (loop) {
          timeoutRef.current = setTimeout(() => {
            reset();
            start();
          }, 2000);
        }
      }
    };

    timeoutRef.current = setTimeout(typeNextChar, delay);
  };

  // 暂停打字
  const pause = () => {
    clearTimeouts();
    setIsTyping(false);
    isRunningRef.current = false;
  };

  // 重置状态
  const reset = () => {
    clearTimeouts();
    setDisplayText('');
    setIsTyping(false);
    setIsComplete(false);
    indexRef.current = 0;
    isRunningRef.current = false;
  };

  // 立即完成
  const complete = () => {
    clearTimeouts();
    setDisplayText(text);
    setIsTyping(false);
    setIsComplete(true);
    isRunningRef.current = false;
    
    if (onComplete) {
      onComplete();
    }
  };

  // 光标闪烁效果
  useEffect(() => {
    if (!cursor) return;
    
    let cursorInterval;
    if (isTyping || !isComplete) {
      setShowCursor(true);
    } else {
      cursorInterval = setInterval(() => {
        setShowCursor(prev => !prev);
      }, 500);
    }

    return () => {
      if (cursorInterval) {
        clearInterval(cursorInterval);
      }
    };
  }, [isTyping, isComplete, cursor]);

  // 自动开始
  useEffect(() => {
    if (autoStart && text) {
      start();
    }
    
    return () => {
      clearTimeouts();
    };
  }, [text, autoStart]);

  // 清理
  useEffect(() => {
    return () => {
      clearTimeouts();
    };
  }, []);

  return {
    displayText,
    isTyping,
    isComplete,
    showCursor,
    start,
    pause,
    reset,
    complete,
  };
};
