import React, { useState, useEffect } from 'react';
import { Download, Image, Music, Settings, RefreshCw, Check, X } from 'lucide-react';
import { generateResourcePack, checkResourceExists } from '../utils/placeholderGenerator';
import { showSuccess, showInfo } from './NotificationSystem';

/**
 * 资源管理器组件
 * 帮助用户检查、管理和生成示例资源
 */
const ResourceManager = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [resourceStatus, setResourceStatus] = useState({});
  const [isChecking, setIsChecking] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  // 需要检查的资源列表
  const requiredResources = [
    { path: '/images/hero-bg.jpg', name: '首屏背景图片', type: 'image' },
    { path: '/music/bgm.mp3', name: '背景音乐', type: 'audio' },
    { path: '/images/timeline/meeting.jpg', name: '第一次见面', type: 'image' },
    { path: '/images/timeline/date1.jpg', name: '第一次约会1', type: 'image' },
    { path: '/images/timeline/date2.jpg', name: '第一次约会2', type: 'image' },
    { path: '/images/timeline/relationship.jpg', name: '确定关系', type: 'image' },
    { path: '/images/timeline/valentine.jpg', name: '情人节', type: 'image' },
    { path: '/images/timeline/travel1.jpg', name: '旅行1', type: 'image' },
    { path: '/images/timeline/travel2.jpg', name: '旅行2', type: 'image' },
    { path: '/images/timeline/travel3.jpg', name: '旅行3', type: 'image' },
    { path: '/images/gallery/photo1.jpg', name: '相册1', type: 'image' },
    { path: '/images/gallery/photo2.jpg', name: '相册2', type: 'image' },
    { path: '/images/gallery/photo3.jpg', name: '相册3', type: 'image' },
    { path: '/images/gallery/photo4.jpg', name: '相册4', type: 'image' },
    { path: '/images/gallery/photo5.jpg', name: '相册5', type: 'image' },
    { path: '/images/gallery/photo6.jpg', name: '相册6', type: 'image' },
  ];

  // 检查资源状态
  const checkResources = async () => {
    setIsChecking(true);
    const status = {};

    for (const resource of requiredResources) {
      try {
        const exists = await checkResourceExists(resource.path);
        status[resource.path] = exists;
      } catch {
        status[resource.path] = false;
      }
    }

    setResourceStatus(status);
    setIsChecking(false);
  };

  // 生成示例资源包
  const generateExampleResources = async () => {
    setIsGenerating(true);
    
    try {
      const resourcePack = generateResourcePack();
      resourcePack.download();
      
      showSuccess('示例资源包已生成并开始下载', {
        title: '资源生成成功',
        duration: 5000
      });
    } catch (error) {
      console.error('资源生成失败:', error);
      showError(`资源生成失败: ${error.message}`);
    } finally {
      setIsGenerating(false);
    }
  };

  // 组件挂载时检查资源
  useEffect(() => {
    if (isOpen) {
      checkResources();
    }
  }, [isOpen]);

  const existingCount = Object.values(resourceStatus).filter(Boolean).length;
  const totalCount = requiredResources.length;
  const completionRate = totalCount > 0 ? (existingCount / totalCount) * 100 : 0;

  return (
    <>
      {/* 触发按钮 */}
      <div className="fixed bottom-4 left-4 z-40">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center hover:bg-white transition-all duration-300 focus-visible border border-gray-200"
          aria-label="资源管理器"
          title="资源管理器"
        >
          <Settings size={20} className="text-gray-700" />
        </button>
      </div>

      {/* 管理面板 */}
      {isOpen && (
        <div className="fixed bottom-20 left-4 z-50 bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl border border-gray-200 p-6 min-w-80 max-w-md">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
              <Image size={20} className="text-rose-gold" />
              资源管理器
            </h3>
            <button
              onClick={() => setIsOpen(false)}
              className="w-6 h-6 text-gray-500 hover:text-gray-700 focus-visible"
              aria-label="关闭面板"
            >
              <X size={16} />
            </button>
          </div>

          {/* 资源状态概览 */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">资源完整性</span>
              <span className="text-sm text-gray-500">
                {existingCount}/{totalCount}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-rose-gold h-2 rounded-full transition-all duration-300"
                style={{ width: `${completionRate}%` }}
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">
              {completionRate === 100 
                ? '所有资源已准备就绪' 
                : `还需要 ${totalCount - existingCount} 个资源文件`
              }
            </p>
          </div>

          {/* 操作按钮 */}
          <div className="space-y-3 mb-6">
            <button
              onClick={checkResources}
              disabled={isChecking}
              className="w-full btn-secondary flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <RefreshCw size={16} className={isChecking ? 'animate-spin' : ''} />
              {isChecking ? '检查中...' : '重新检查资源'}
            </button>

            <button
              onClick={generateExampleResources}
              disabled={isGenerating}
              className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <Download size={16} />
              {isGenerating ? '生成中...' : '下载示例资源包'}
            </button>
          </div>

          {/* 资源列表 */}
          <div className="max-h-64 overflow-y-auto">
            <h4 className="text-sm font-medium text-gray-700 mb-3">资源状态详情</h4>
            <div className="space-y-2">
              {requiredResources.map((resource) => (
                <div 
                  key={resource.path}
                  className="flex items-center justify-between py-2 px-3 rounded-lg bg-gray-50"
                >
                  <div className="flex items-center gap-2 flex-1 min-w-0">
                    {resource.type === 'image' ? (
                      <Image size={14} className="text-gray-400 flex-shrink-0" />
                    ) : (
                      <Music size={14} className="text-gray-400 flex-shrink-0" />
                    )}
                    <span className="text-sm text-gray-600 truncate">
                      {resource.name}
                    </span>
                  </div>
                  <div className="flex-shrink-0">
                    {resourceStatus[resource.path] ? (
                      <Check size={14} className="text-green-500" />
                    ) : (
                      <X size={14} className="text-red-500" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 使用说明 */}
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h4 className="text-sm font-medium text-blue-800 mb-2">使用说明</h4>
            <div className="text-xs text-blue-600 space-y-1">
              <p>1. 点击"重新检查资源"查看当前状态</p>
              <p>2. 缺失资源会显示红色×标记</p>
              <p>3. 点击"下载示例资源包"获取占位符文件</p>
              <p>4. 将您的真实文件替换到对应路径</p>
            </div>
          </div>
        </div>
      )}

      {/* 遮罩层 */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/10 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  );
};

export default ResourceManager;
