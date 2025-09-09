import React, { useState, useEffect, useCallback } from 'react';
import { X, CheckCircle, XCircle, AlertCircle, Info } from 'lucide-react';

/**
 * 通知系统组件
 * 提供全局通知功能，支持多种类型和自动消失
 */
const NotificationSystem = () => {
  const [notifications, setNotifications] = useState([]);

  // 添加通知
  const addNotification = useCallback((notification) => {
    const id = Date.now() + Math.random();
    const newNotification = {
      id,
      type: 'info',
      duration: 5000,
      ...notification,
    };

    setNotifications(prev => [...prev, newNotification]);

    // 自动移除
    if (newNotification.duration > 0) {
      setTimeout(() => {
        removeNotification(id);
      }, newNotification.duration);
    }

    return id;
  }, []);

  // 移除通知
  const removeNotification = useCallback((id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  }, []);

  // 清空所有通知
  const clearAll = useCallback(() => {
    setNotifications([]);
  }, []);

  // 全局方法注册
  useEffect(() => {
    // 将方法挂载到 window 对象，供其他组件使用
    window.showNotification = addNotification;
    window.removeNotification = removeNotification;
    window.clearAllNotifications = clearAll;

    return () => {
      delete window.showNotification;
      delete window.removeNotification;
      delete window.clearAllNotifications;
    };
  }, [addNotification, removeNotification, clearAll]);

  const getIcon = (type) => {
    switch (type) {
      case 'success':
        return <CheckCircle size={20} />;
      case 'error':
        return <XCircle size={20} />;
      case 'warning':
        return <AlertCircle size={20} />;
      default:
        return <Info size={20} />;
    }
  };

  const getTypeClasses = (type) => {
    switch (type) {
      case 'success':
        return 'bg-green-500 border-green-600';
      case 'error':
        return 'bg-red-500 border-red-600';
      case 'warning':
        return 'bg-yellow-500 border-yellow-600';
      default:
        return 'bg-blue-500 border-blue-600';
    }
  };

  if (notifications.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-50 space-y-3 max-w-sm">
      {notifications.map((notification, index) => (
        <div
          key={notification.id}
          className={`
            ${getTypeClasses(notification.type)}
            text-white px-4 py-3 rounded-lg shadow-lg border
            transform transition-all duration-300 ease-in-out
            ${index === 0 ? 'translate-x-0 opacity-100' : 'translate-x-2 opacity-95'}
          `}
          style={{
            transform: `translateY(${index * 4}px) scale(${1 - index * 0.02})`,
          }}
        >
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 mt-0.5">
              {getIcon(notification.type)}
            </div>
            
            <div className="flex-1 min-w-0">
              {notification.title && (
                <h4 className="font-medium text-sm mb-1 truncate">
                  {notification.title}
                </h4>
              )}
              <p className="text-sm opacity-90 leading-relaxed">
                {notification.message}
              </p>
            </div>
            
            <button
              onClick={() => removeNotification(notification.id)}
              className="flex-shrink-0 ml-2 opacity-70 hover:opacity-100 transition-opacity duration-200"
              aria-label="关闭通知"
            >
              <X size={16} />
            </button>
          </div>
          
          {/* 进度条 */}
          {notification.duration > 0 && (
            <div className="absolute bottom-0 left-0 h-1 bg-white/30 rounded-b-lg overflow-hidden">
              <div 
                className="h-full bg-white/60 rounded-b-lg animate-pulse"
                style={{
                  animation: `shrink ${notification.duration}ms linear forwards`
                }}
              />
            </div>
          )}
        </div>
      ))}
      
      {/* 清空所有按钮 */}
      {notifications.length > 1 && (
        <button
          onClick={clearAll}
          className="w-full text-center text-xs text-gray-500 hover:text-gray-700 transition-colors duration-200 py-2"
        >
          清空所有通知
        </button>
      )}
      
      <style jsx>{`
        @keyframes shrink {
          from { width: 100%; }
          to { width: 0%; }
        }
      `}</style>
    </div>
  );
};

// 便捷方法
export const showNotification = (message, type = 'info', options = {}) => {
  if (typeof window !== 'undefined' && window.showNotification) {
    return window.showNotification({
      message,
      type,
      ...options
    });
  }
};

export const showSuccess = (message, options = {}) => {
  return showNotification(message, 'success', options);
};

export const showError = (message, options = {}) => {
  return showNotification(message, 'error', { duration: 7000, ...options });
};

export const showWarning = (message, options = {}) => {
  return showNotification(message, 'warning', options);
};

export const showInfo = (message, options = {}) => {
  return showNotification(message, 'info', options);
};

export default NotificationSystem;
