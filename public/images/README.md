# 图片资源文件夹

这个文件夹用于存放网站所需的所有图片资源。

## 文件结构

```
public/images/
├── hero-bg.jpg          # 首屏背景图片 (推荐尺寸: 1920x1080)
├── timeline/            # 时间线图片
│   ├── meeting.jpg      # 第一次见面
│   ├── date1.jpg        # 第一次约会 - 图片1
│   ├── date2.jpg        # 第一次约会 - 图片2
│   ├── relationship.jpg # 确定关系
│   ├── valentine.jpg    # 第一个情人节
│   ├── travel1.jpg      # 一起旅行 - 图片1
│   ├── travel2.jpg      # 一起旅行 - 图片2
│   └── travel3.jpg      # 一起旅行 - 图片3
└── gallery/             # 相册图片
    ├── photo1.jpg       # 相册图片1
    ├── photo2.jpg       # 相册图片2
    ├── photo3.jpg       # 相册图片3
    ├── photo4.jpg       # 相册图片4
    ├── photo5.jpg       # 相册图片5
    └── photo6.jpg       # 相册图片6
```

## 图片要求

### 格式支持
- **推荐格式**: WebP（更好的压缩率）
- **备用格式**: JPEG, PNG
- **避免使用**: BMP, TIFF 等大文件格式

### 尺寸建议
- **首屏背景**: 1920x1080px (16:9)
- **时间线图片**: 800x600px 或 1:1 比例
- **相册图片**: 800x800px (1:1) 或 800x600px (4:3)

### 文件大小
- 单个图片文件不超过 2MB
- 推荐使用图片压缩工具优化文件大小

### 命名规范
- 使用小写字母和连字符
- 避免使用空格和特殊字符
- 使用描述性的文件名

## 替换图片步骤

1. 将您的图片文件放入对应的文件夹
2. 确保文件名与配置文件中的路径匹配
3. 如需修改图片路径，请编辑 `src/data/config.js` 文件

## 图片优化建议

### 在线工具
- [TinyPNG](https://tinypng.com/) - PNG/JPEG 压缩
- [Squoosh](https://squoosh.app/) - Google 的图片优化工具
- [Compressor.io](https://compressor.io/) - 多格式压缩

### 批量处理
```bash
# 使用 ImageMagick 批量调整大小
mogrify -resize 800x600 *.jpg

# 使用 cwebp 转换为 WebP 格式
for file in *.jpg; do cwebp "$file" -o "${file%.jpg}.webp"; done
```

## 注意事项

- 确保您拥有所有图片的使用权限
- 建议使用高质量的原始图片
- 考虑不同设备的显示效果
- 测试图片在不同网络条件下的加载速度
