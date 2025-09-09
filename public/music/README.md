# 音频资源文件夹

这个文件夹用于存放网站所需的音频文件。

## 文件结构

```
public/music/
└── bgm.mp3              # 背景音乐文件
```

## 音频要求

### 格式支持
- **推荐格式**: MP3 (最广泛支持)
- **备用格式**: OGG, WAV
- **现代格式**: AAC, M4A

### 文件规格
- **采样率**: 44.1kHz 或 48kHz
- **比特率**: 128kbps - 320kbps
- **声道**: 立体声 (Stereo)
- **时长**: 建议 2-5 分钟（支持循环播放）

### 文件大小
- 建议控制在 5MB 以内
- 考虑网络加载速度

## 音频内容建议

### 适合的音乐类型
- 轻音乐、钢琴曲
- 温柔的流行歌曲
- 古典音乐片段
- 自然声音（雨声、海浪声等）

### 避免的音乐类型
- 过于激烈的音乐
- 歌词内容不合适的歌曲
- 版权保护严格的商业音乐

## 替换音频步骤

1. 将您的音频文件重命名为 `bgm.mp3`
2. 放入 `public/music/` 文件夹
3. 如需使用其他文件名，请修改 `src/data/config.js` 中的 `music` 字段

## 版权注意事项

⚠️ **重要提醒**：
- 确保您拥有音频文件的使用权限
- 避免使用受版权保护的商业音乐
- 推荐使用：
  - 自己创作的音乐
  - 免费/开源音乐
  - 已获得授权的音乐

## 免费音乐资源

### 推荐网站
- [Freesound](https://freesound.org/) - 免费音效和音乐
- [Incompetech](https://incompetech.com/) - Kevin MacLeod 的免费音乐
- [YouTube Audio Library](https://www.youtube.com/audiolibrary) - YouTube 音频库
- [Pixabay Music](https://pixabay.com/music/) - Pixabay 音乐
- [Pexels Music](https://www.pexels.com/music/) - Pexels 音乐

### 音乐风格建议
- "Romantic Piano"
- "Soft Acoustic"
- "Gentle Instrumental"
- "Love Ballad Instrumental"

## 音频优化

### 在线工具
- [Online Audio Converter](https://online-audio-converter.com/) - 格式转换
- [MP3smaller](https://www.mp3smaller.com/) - MP3 压缩

### 本地工具
```bash
# 使用 FFmpeg 转换和压缩
ffmpeg -i input.wav -b:a 128k output.mp3

# 调整音量
ffmpeg -i input.mp3 -filter:a "volume=0.5" output.mp3
```

## 浏览器兼容性

| 格式 | Chrome | Firefox | Safari | Edge |
|------|---------|---------|---------|------|
| MP3  | ✅      | ✅       | ✅      | ✅   |
| OGG  | ✅      | ✅       | ❌      | ❌   |
| WAV  | ✅      | ✅       | ✅      | ✅   |
| AAC  | ✅      | ❌       | ✅      | ✅   |

## 用户体验建议

- 音量设置为适中（约30%）
- 提供播放/暂停控制
- 支持静音选项
- 考虑用户的偏好设置
