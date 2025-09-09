/**
 * 占位符资源生成器
 * 为演示和开发提供默认的图片、音频等资源
 */

// 生成占位符图片的 Data URL
export const generatePlaceholderImage = (width = 800, height = 600, text = '示例图片', bgColor = '#F8E8E8', textColor = '#E8B4B8') => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  
  canvas.width = width;
  canvas.height = height;
  
  // 背景渐变
  const gradient = ctx.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, bgColor);
  gradient.addColorStop(1, '#FFE4E1');
  
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);
  
  // 添加装饰性图案
  ctx.fillStyle = 'rgba(232, 180, 184, 0.1)';
  for (let i = 0; i < 20; i++) {
    const x = Math.random() * width;
    const y = Math.random() * height;
    const radius = Math.random() * 30 + 10;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();
  }
  
  // 文字
  ctx.fillStyle = textColor;
  ctx.font = `${Math.min(width, height) / 20}px Inter, sans-serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(text, width / 2, height / 2);
  
  // 添加尺寸信息
  ctx.font = `${Math.min(width, height) / 30}px Inter, sans-serif`;
  ctx.fillStyle = 'rgba(232, 180, 184, 0.7)';
  ctx.fillText(`${width} × ${height}`, width / 2, height / 2 + 40);
  
  return canvas.toDataURL('image/png');
};

// 生成静音音频文件
export const generateSilentAudio = (duration = 30) => {
  const sampleRate = 44100;
  const numChannels = 2;
  const numSamples = sampleRate * duration;
  
  const arrayBuffer = new ArrayBuffer(44 + numSamples * numChannels * 2);
  const view = new DataView(arrayBuffer);
  
  // WAV 文件头
  const writeString = (offset, string) => {
    for (let i = 0; i < string.length; i++) {
      view.setUint8(offset + i, string.charCodeAt(i));
    }
  };
  
  writeString(0, 'RIFF');
  view.setUint32(4, 36 + numSamples * numChannels * 2, true);
  writeString(8, 'WAVE');
  writeString(12, 'fmt ');
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true);
  view.setUint16(22, numChannels, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, sampleRate * numChannels * 2, true);
  view.setUint16(32, numChannels * 2, true);
  view.setUint16(34, 16, true);
  writeString(36, 'data');
  view.setUint32(40, numSamples * numChannels * 2, true);
  
  // 静音数据（全部为0）
  for (let i = 0; i < numSamples * numChannels; i++) {
    view.setInt16(44 + i * 2, 0, true);
  }
  
  const blob = new Blob([arrayBuffer], { type: 'audio/wav' });
  return URL.createObjectURL(blob);
};

// 检查资源是否存在
export const checkResourceExists = async (url) => {
  try {
    const response = await fetch(url, { method: 'HEAD' });
    return response.ok;
  } catch {
    return false;
  }
};

// 为配置提供备用资源
export const getResourceWithFallback = async (primaryUrl, fallbackGenerator) => {
  if (!primaryUrl) {
    return fallbackGenerator();
  }
  
  const exists = await checkResourceExists(primaryUrl);
  return exists ? primaryUrl : fallbackGenerator();
};

// 生成完整的示例资源配置
export const generateExampleResources = () => {
  const resources = {
    heroImage: generatePlaceholderImage(1920, 1080, '首屏背景图片', '#F8E8E8'),
    music: generateSilentAudio(120), // 2分钟静音音频
    timeline: {
      meeting: generatePlaceholderImage(800, 600, '第一次见面', '#FFE4E1'),
      date1: generatePlaceholderImage(800, 600, '第一次约会 1', '#F8E8E8'),
      date2: generatePlaceholderImage(800, 600, '第一次约会 2', '#FFF8F0'),
      relationship: generatePlaceholderImage(800, 600, '确定关系', '#FFE4E1'),
      valentine: generatePlaceholderImage(800, 600, '情人节', '#F8E8E8'),
      travel1: generatePlaceholderImage(800, 600, '一起旅行 1', '#FFF8F0'),
      travel2: generatePlaceholderImage(800, 600, '一起旅行 2', '#FFE4E1'),
      travel3: generatePlaceholderImage(800, 600, '一起旅行 3', '#F8E8E8'),
    },
    gallery: Array.from({ length: 6 }, (_, i) => 
      generatePlaceholderImage(800, 800, `相册图片 ${i + 1}`, 
        ['#F8E8E8', '#FFE4E1', '#FFF8F0'][i % 3])
    )
  };
  
  return resources;
};

// 应用示例资源到配置
export const applyExampleResources = (config) => {
  const resources = generateExampleResources();
  
  return {
    ...config,
    heroImage: config.heroImage || resources.heroImage,
    music: config.music || resources.music,
    timeline: config.timeline.map((item, index) => ({
      ...item,
      images: item.images.map((img, imgIndex) => {
        // 如果图片路径不存在或无法访问，使用生成的占位符
        const timelineKeys = Object.keys(resources.timeline);
        const fallbackKey = timelineKeys[index % timelineKeys.length];
        return img || resources.timeline[fallbackKey];
      })
    })),
    gallery: config.gallery.map((item, index) => ({
      ...item,
      src: item.src || resources.gallery[index % resources.gallery.length]
    }))
  };
};

// 创建下载链接
export const createDownloadLink = (dataUrl, filename) => {
  const link = document.createElement('a');
  link.href = dataUrl;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

// 生成示例资源包
export const generateResourcePack = () => {
  const resources = generateExampleResources();
  
  return {
    download: () => {
      // 下载所有生成的资源
      Object.entries(resources.timeline).forEach(([key, dataUrl]) => {
        createDownloadLink(dataUrl, `timeline-${key}.png`);
      });
      
      resources.gallery.forEach((dataUrl, index) => {
        createDownloadLink(dataUrl, `gallery-photo${index + 1}.png`);
      });
      
      createDownloadLink(resources.heroImage, 'hero-background.png');
      createDownloadLink(resources.music, 'background-music.wav');
    },
    resources
  };
};
