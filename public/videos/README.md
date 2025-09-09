# 视频资源文件夹

这个文件夹用于存放互动彩蛋的视频文件（可选）。

## 文件结构

```
public/videos/
└── surprise.mp4         # 彩蛋惊喜视频（可选）
```

## 视频要求

### 格式支持
- **推荐格式**: MP4 (H.264 编码)
- **备用格式**: WebM, OGV
- **避免格式**: AVI, MOV, FLV

### 文件规格
- **分辨率**: 720p (1280x720) 或 1080p (1920x1080)
- **帧率**: 24fps 或 30fps
- **编码**: H.264 (视频) + AAC (音频)
- **时长**: 建议 5-30 秒

### 文件大小
- 建议控制在 10MB 以内
- 考虑移动设备的网络环境

## 视频内容建议

### 适合的内容
- 短小精悍的祝福视频
- 有趣的动画片段
- 美好的回忆片段
- 创意的表达方式

### 技术要求
- 画面清晰，色彩鲜艳
- 音频清楚（如有）
- 适合循环播放

## 替换视频步骤

1. 将您的视频文件重命名为 `surprise.mp4`
2. 放入 `public/videos/` 文件夹
3. 如需使用其他文件名，请修改 `src/data/config.js` 中的 `easterEgg.video` 字段
4. 如不需要视频，可以删除该字段或设为 `null`

## 视频优化

### 在线工具
- [CloudConvert](https://cloudconvert.com/) - 视频格式转换
- [Clipchamp](https://clipchamp.com/) - 在线视频编辑
- [HandBrake](https://handbrake.fr/) - 开源视频转换工具

### 压缩建议
```bash
# 使用 FFmpeg 压缩视频
ffmpeg -i input.mov -c:v libx264 -crf 23 -c:a aac -b:a 128k output.mp4

# 调整分辨率
ffmpeg -i input.mp4 -vf scale=1280:720 output.mp4

# 减少文件大小
ffmpeg -i input.mp4 -c:v libx264 -crf 28 -c:a aac -b:a 96k output.mp4
```

## 浏览器兼容性

| 格式 | Chrome | Firefox | Safari | Edge |
|------|---------|---------|---------|------|
| MP4  | ✅      | ✅       | ✅      | ✅   |
| WebM | ✅      | ✅       | ❌      | ✅   |
| OGV  | ✅      | ✅       | ❌      | ❌   |

## 移动设备考虑

- 使用较低的比特率以减少加载时间
- 考虑自动播放限制
- 提供播放控制按钮
- 测试在不同设备上的表现

## 版权注意

⚠️ **重要提醒**：
- 确保您拥有视频内容的使用权限
- 避免使用受版权保护的影视内容
- 推荐使用自己拍摄或创作的内容

## 无视频选项

如果您不想使用视频功能：
1. 在 `src/data/config.js` 中删除或注释 `easterEgg.video` 字段
2. 彩蛋将只显示文字消息和礼花效果
3. 这样可以减少页面加载时间
