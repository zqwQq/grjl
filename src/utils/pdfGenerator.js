import jsPDF from 'jspdf';

/**
 * PDF生成工具 - 完全重写，支持更好的中文显示和错误处理
 * 支持中文字体，创建带有封面和信件内容的PDF
 */
export class PDFGenerator {
  constructor() {
    this.doc = null;
    this.pageWidth = 210; // A4 宽度 (mm)
    this.pageHeight = 297; // A4 高度 (mm)
    this.margin = 25;
    this.lineHeight = 7;
    this.fontSize = {
      title: 24,
      subtitle: 16,
      body: 12,
      caption: 10,
    };
    this.colors = {
      primary: [232, 180, 184], // rose-gold
      secondary: [248, 232, 232], // soft-pink
      text: [60, 60, 60],
      lightText: [120, 120, 120],
    };
  }

  /**
   * 创建新的PDF文档
   */
  createDocument() {
    try {
      this.doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
        compress: true
      });

      // 设置文档属性
      this.doc.setProperties({
        title: '生日礼物 - 亲笔信',
        subject: '特别的生日礼物',
        author: '匿名',
        creator: '生日礼物网页',
        producer: 'jsPDF'
      });

      return this.doc;
    } catch (error) {
      console.error('PDF文档创建失败:', error);
      throw new Error('PDF文档创建失败');
    }
  }

  /**
   * 绘制装饰性边框
   */
  drawDecorativeBorder() {
    // 外边框
    this.doc.setDrawColor(...this.colors.primary);
    this.doc.setLineWidth(1);
    this.doc.rect(this.margin - 10, this.margin - 10, 
                  this.pageWidth - 2 * (this.margin - 10), 
                  this.pageHeight - 2 * (this.margin - 10));

    // 内边框
    this.doc.setLineWidth(0.5);
    this.doc.rect(this.margin - 5, this.margin - 5, 
                  this.pageWidth - 2 * (this.margin - 5), 
                  this.pageHeight - 2 * (this.margin - 5));

    // 装饰角落
    const cornerSize = 10;
    const corners = [
      [this.margin, this.margin],
      [this.pageWidth - this.margin, this.margin],
      [this.margin, this.pageHeight - this.margin],
      [this.pageWidth - this.margin, this.pageHeight - this.margin]
    ];

    this.doc.setFillColor(...this.colors.primary);
    corners.forEach(([x, y]) => {
      this.doc.circle(x, y, 2, 'F');
    });
  }

  /**
   * 添加封面页
   */
  addCoverPage(title, subtitle, date) {
    if (!this.doc) this.createDocument();

    try {
      // 背景渐变效果（使用多个矩形模拟渐变）
      const gradientSteps = 20;
      for (let i = 0; i < gradientSteps; i++) {
        const alpha = i / gradientSteps;
        const r = Math.round(255 - alpha * (255 - this.colors.secondary[0]));
        const g = Math.round(255 - alpha * (255 - this.colors.secondary[1]));
        const b = Math.round(255 - alpha * (255 - this.colors.secondary[2]));
        
        this.doc.setFillColor(r, g, b);
        this.doc.rect(0, i * (this.pageHeight / gradientSteps), 
                      this.pageWidth, this.pageHeight / gradientSteps, 'F');
      }

      // 绘制装饰边框
      this.drawDecorativeBorder();

      // 标题处理
      this.doc.setFontSize(this.fontSize.title);
      this.doc.setTextColor(...this.colors.text);
      
      const maxWidth = this.pageWidth - 2 * this.margin;
      const titleLines = this.doc.splitTextToSize(title || '生日快乐', maxWidth);
      const titleY = this.pageHeight * 0.25;
      
      titleLines.forEach((line, index) => {
        const textWidth = this.doc.getTextWidth(line);
        const x = (this.pageWidth - textWidth) / 2;
        this.doc.text(line, x, titleY + index * (this.lineHeight + 2));
      });

      // 副标题
      if (subtitle) {
        this.doc.setFontSize(this.fontSize.subtitle);
        this.doc.setTextColor(...this.colors.lightText);
        
        const subtitleLines = this.doc.splitTextToSize(subtitle, maxWidth);
        const subtitleY = titleY + titleLines.length * (this.lineHeight + 2) + 15;
        
        subtitleLines.forEach((line, index) => {
          const textWidth = this.doc.getTextWidth(line);
          const x = (this.pageWidth - textWidth) / 2;
          this.doc.text(line, x, subtitleY + index * this.lineHeight);
        });
      }

      // 装饰性图案
      this.doc.setFontSize(32);
      this.doc.setTextColor(...this.colors.primary);
      
      // 爱心符号
      const heartSymbols = ['♥', '♡', '♥'];
      const heartY = this.pageHeight * 0.5;
      const spacing = 15;
      const startX = (this.pageWidth - (heartSymbols.length - 1) * spacing) / 2;
      
      heartSymbols.forEach((symbol, index) => {
        const x = startX + index * spacing;
        this.doc.text(symbol, x, heartY);
      });

      // 日期
      if (date) {
        this.doc.setFontSize(this.fontSize.caption);
        this.doc.setTextColor(...this.colors.lightText);
        const dateText = `制作日期：${date}`;
        const dateWidth = this.doc.getTextWidth(dateText);
        this.doc.text(dateText, (this.pageWidth - dateWidth) / 2, this.pageHeight * 0.8);
      }

      // 底部装饰文字
      this.doc.setFontSize(this.fontSize.caption);
      this.doc.setTextColor(...this.colors.lightText);
      const footerText = '❤️ 用心制作的特别礼物 ❤️';
      const footerWidth = this.doc.getTextWidth(footerText);
      this.doc.text(footerText, (this.pageWidth - footerWidth) / 2, this.pageHeight - 30);

      return this;
    } catch (error) {
      console.error('封面页创建失败:', error);
      throw new Error('封面页创建失败');
    }
  }

  /**
   * 添加信件内容页
   */
  addLetterPage(content) {
    if (!this.doc) this.createDocument();

    try {
      this.doc.addPage();

      // 创建信纸背景
      this.createLetterBackground();

      // 设置文本样式
      this.doc.setFontSize(this.fontSize.body);
      this.doc.setTextColor(...this.colors.text);

      // 处理文本内容
      if (!content || content.trim() === '') {
        content = '这里是信件内容，请在配置中添加您想要说的话...';
      }

      const lines = content.split('\n');
      let currentY = this.margin + 20;
      const maxWidth = this.pageWidth - 2 * this.margin - 10;
      let pageNumber = 1;

      lines.forEach((line, lineIndex) => {
        if (line.trim() === '') {
          // 空行
          currentY += this.lineHeight * 1.5;
        } else {
          // 处理段落缩进
          const isNewParagraph = lineIndex === 0 || lines[lineIndex - 1].trim() === '';
          const indent = isNewParagraph ? 10 : 0;
          
          // 分割长行
          const wrappedLines = this.doc.splitTextToSize(line, maxWidth - indent);
          
          wrappedLines.forEach((wrappedLine, wrapIndex) => {
            // 检查是否需要新页面
            if (currentY > this.pageHeight - this.margin - 30) {
              this.doc.addPage();
              pageNumber++;
              
              // 新页面背景
              this.createLetterBackground();
              
              currentY = this.margin + 20;
              this.doc.setFontSize(this.fontSize.body);
              this.doc.setTextColor(...this.colors.text);
            }

            // 第一行段落缩进
            const xPosition = this.margin + (wrapIndex === 0 ? indent : 0);
            this.doc.text(wrappedLine, xPosition, currentY);
            currentY += this.lineHeight;
          });
          
          // 段落间距
          currentY += this.lineHeight * 0.5;
        }
      });

      return this;
    } catch (error) {
      console.error('信件页面创建失败:', error);
      throw new Error('信件页面创建失败');
    }
  }

  /**
   * 创建信纸背景
   */
  createLetterBackground() {
    // 页面背景
    this.doc.setFillColor(255, 253, 250); // 温暖的白色
    this.doc.rect(0, 0, this.pageWidth, this.pageHeight, 'F');

    // 信纸边框
    this.doc.setFillColor(255, 255, 255);
    this.doc.setDrawColor(...this.colors.primary);
    this.doc.setLineWidth(0.5);
    this.doc.roundedRect(this.margin - 10, this.margin - 10, 
                        this.pageWidth - 2 * (this.margin - 10), 
                        this.pageHeight - 2 * (this.margin - 10), 
                        5, 5, 'FD');

    // 装饰性线条（信纸效果）
    this.doc.setDrawColor(...this.colors.secondary);
    this.doc.setLineWidth(0.2);
    
    // 顶部装饰线
    const decorativeY = this.margin + 5;
    this.doc.line(this.margin, decorativeY, this.pageWidth - this.margin, decorativeY);
    
    // 左侧边距线
    const marginLineX = this.margin + 15;
    this.doc.setDrawColor(255, 200, 200);
    this.doc.line(marginLineX, this.margin, marginLineX, this.pageHeight - this.margin);
  }

  /**
   * 添加页脚
   */
  addFooter(text = '❤️ 用心制作 ❤️') {
    if (!this.doc) return this;

    try {
      const pageCount = this.doc.internal.getNumberOfPages();
      
      for (let i = 1; i <= pageCount; i++) {
        this.doc.setPage(i);
        
        // 跳过封面页的页脚
        if (i === 1) continue;
        
        // 页脚背景
        this.doc.setFillColor(250, 250, 250);
        this.doc.rect(0, this.pageHeight - 20, this.pageWidth, 20, 'F');
        
        // 页脚文本
        this.doc.setFontSize(this.fontSize.caption);
        this.doc.setTextColor(...this.colors.lightText);
        
        if (text) {
          const textWidth = this.doc.getTextWidth(text);
          this.doc.text(text, (this.pageWidth - textWidth) / 2, this.pageHeight - 10);
        }
        
        // 页码（仅内容页）
        if (i > 1) {
          const pageText = `第 ${i - 1} 页`;
          const pageTextWidth = this.doc.getTextWidth(pageText);
          this.doc.text(pageText, this.pageWidth - this.margin, this.pageHeight - 10);
        }
        
        // 装饰线
        this.doc.setDrawColor(...this.colors.secondary);
        this.doc.setLineWidth(0.3);
        this.doc.line(this.margin, this.pageHeight - 15, 
                     this.pageWidth - this.margin, this.pageHeight - 15);
      }

      return this;
    } catch (error) {
      console.error('页脚添加失败:', error);
      return this;
    }
  }

  /**
   * 保存PDF文件
   */
  save(filename = 'love-letter.pdf') {
    if (!this.doc) {
      throw new Error('PDF文档未创建');
    }

    try {
      // 确保文件名有正确的扩展名
      if (!filename.toLowerCase().endsWith('.pdf')) {
        filename += '.pdf';
      }
      
      // 添加时间戳避免文件名冲突
      const timestamp = new Date().toISOString().slice(0, 19).replace(/[:]/g, '-');
      const finalFilename = filename.replace('.pdf', `_${timestamp}.pdf`);
      
      this.doc.save(finalFilename);
      return { success: true, filename: finalFilename };
    } catch (error) {
      console.error('PDF保存失败:', error);
      return { success: false, error: error.message };
    }
  }

  /**
   * 获取PDF数据URL
   */
  getDataURL() {
    if (!this.doc) {
      throw new Error('PDF文档未创建');
    }

    try {
      return this.doc.output('datauristring');
    } catch (error) {
      console.error('PDF数据获取失败:', error);
      throw new Error('PDF数据获取失败');
    }
  }

  /**
   * 获取PDF Blob对象
   */
  getBlob() {
    if (!this.doc) {
      throw new Error('PDF文档未创建');
    }

    try {
      return this.doc.output('blob');
    } catch (error) {
      console.error('PDF Blob获取失败:', error);
      throw new Error('PDF Blob获取失败');
    }
  }

  /**
   * 预览PDF（在新窗口中打开）
   */
  preview() {
    if (!this.doc) {
      throw new Error('PDF文档未创建');
    }

    try {
      const dataUri = this.getDataURL();
      const newWindow = window.open();
      if (newWindow) {
        newWindow.document.write(`
          <iframe src="${dataUri}" 
                  style="width:100%; height:100%; border:none;" 
                  title="PDF预览">
          </iframe>
        `);
      } else {
        throw new Error('无法打开新窗口，请检查浏览器设置');
      }
    } catch (error) {
      console.error('PDF预览失败:', error);
      throw new Error('PDF预览失败');
    }
  }
}

/**
 * 快速生成信件PDF的工具函数
 */
export const generateLetterPDF = async (letterData, filename) => {
  if (!letterData || typeof letterData !== 'object') {
    throw new Error('无效的信件数据');
  }

  const generator = new PDFGenerator();
  
  try {
    // 创建PDF
    generator
      .addCoverPage(
        letterData.title || '亲笔信',
        letterData.subtitle || '来自心底的话语',
        new Date().toLocaleDateString('zh-CN', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })
      )
      .addLetterPage(letterData.content || '请在配置中添加信件内容...')
      .addFooter('❤️ 用心制作 ❤️');
    
    // 保存文件
    const result = generator.save(filename || 'love-letter.pdf');
    
    if (result.success) {
      return {
        success: true,
        message: `PDF已成功生成：${result.filename}`,
        filename: result.filename
      };
    } else {
      return {
        success: false,
        message: `PDF生成失败：${result.error}`,
        error: result.error
      };
    }
  } catch (error) {
    console.error('PDF生成失败:', error);
    return {
      success: false,
      message: `PDF生成失败：${error.message}`,
      error: error.message
    };
  }
};
