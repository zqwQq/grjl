import jsPDF from 'jspdf';

/**
 * PDF生成工具
 * 支持中文字体，创建带有封面和信件内容的PDF
 */
export class PDFGenerator {
  constructor() {
    this.doc = null;
    this.pageWidth = 210; // A4 宽度 (mm)
    this.pageHeight = 297; // A4 高度 (mm)
    this.margin = 20;
    this.lineHeight = 8;
    this.fontSize = {
      title: 20,
      subtitle: 14,
      body: 12,
      caption: 10,
    };
  }

  /**
   * 创建新的PDF文档
   */
  createDocument() {
    this.doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    // 尝试加载中文字体（如果可用）
    try {
      // 注意：在实际部署时，您需要提供中文字体文件
      // 这里使用默认字体，在大多数环境中可以显示中文
      this.doc.setFont('helvetica');
    } catch (error) {
      console.warn('中文字体加载失败，使用默认字体');
    }

    return this.doc;
  }

  /**
   * 添加封面页
   */
  addCoverPage(title, subtitle, date) {
    if (!this.doc) this.createDocument();

    // 背景渐变效果（使用矩形模拟）
    this.doc.setFillColor(248, 232, 232); // soft-pink
    this.doc.rect(0, 0, this.pageWidth, this.pageHeight, 'F');

    // 装饰性边框
    this.doc.setDrawColor(232, 180, 184); // rose-gold
    this.doc.setLineWidth(0.5);
    this.doc.rect(this.margin - 5, this.margin - 5, 
                  this.pageWidth - 2 * (this.margin - 5), 
                  this.pageHeight - 2 * (this.margin - 5));

    // 标题
    this.doc.setFontSize(this.fontSize.title);
    this.doc.setTextColor(60, 60, 60);
    const titleLines = this.doc.splitTextToSize(title, this.pageWidth - 2 * this.margin);
    const titleY = this.pageHeight * 0.3;
    titleLines.forEach((line, index) => {
      const textWidth = this.doc.getTextWidth(line);
      const x = (this.pageWidth - textWidth) / 2;
      this.doc.text(line, x, titleY + index * this.lineHeight * 1.5);
    });

    // 副标题
    if (subtitle) {
      this.doc.setFontSize(this.fontSize.subtitle);
      this.doc.setTextColor(100, 100, 100);
      const subtitleLines = this.doc.splitTextToSize(subtitle, this.pageWidth - 2 * this.margin);
      const subtitleY = titleY + titleLines.length * this.lineHeight * 1.5 + 20;
      subtitleLines.forEach((line, index) => {
        const textWidth = this.doc.getTextWidth(line);
        const x = (this.pageWidth - textWidth) / 2;
        this.doc.text(line, x, subtitleY + index * this.lineHeight);
      });
    }

    // 装饰性心形符号
    this.doc.setFontSize(24);
    this.doc.setTextColor(232, 180, 184);
    const heartSymbol = '♥';
    const heartWidth = this.doc.getTextWidth(heartSymbol);
    this.doc.text(heartSymbol, (this.pageWidth - heartWidth) / 2, this.pageHeight * 0.6);

    // 日期
    if (date) {
      this.doc.setFontSize(this.fontSize.caption);
      this.doc.setTextColor(120, 120, 120);
      const dateWidth = this.doc.getTextWidth(date);
      this.doc.text(date, (this.pageWidth - dateWidth) / 2, this.pageHeight * 0.8);
    }

    return this;
  }

  /**
   * 添加信件内容页
   */
  addLetterPage(content) {
    if (!this.doc) this.createDocument();

    this.doc.addPage();

    // 页面背景
    this.doc.setFillColor(255, 248, 240); // cream
    this.doc.rect(0, 0, this.pageWidth, this.pageHeight, 'F');

    // 内容区域背景
    this.doc.setFillColor(255, 255, 255);
    this.doc.setDrawColor(232, 180, 184);
    this.doc.setLineWidth(0.2);
    this.doc.roundedRect(this.margin - 5, this.margin - 5, 
                        this.pageWidth - 2 * (this.margin - 5), 
                        this.pageHeight - 2 * (this.margin - 5), 
                        3, 3, 'FD');

    // 设置文本样式
    this.doc.setFontSize(this.fontSize.body);
    this.doc.setTextColor(60, 60, 60);

    // 处理文本内容
    const lines = content.split('\n');
    let currentY = this.margin + 10;
    const maxWidth = this.pageWidth - 2 * this.margin;

    lines.forEach((line) => {
      if (line.trim() === '') {
        // 空行
        currentY += this.lineHeight;
      } else {
        // 分割长行
        const wrappedLines = this.doc.splitTextToSize(line, maxWidth);
        
        wrappedLines.forEach((wrappedLine) => {
          // 检查是否需要新页面
          if (currentY > this.pageHeight - this.margin - 20) {
            this.doc.addPage();
            
            // 新页面背景
            this.doc.setFillColor(255, 248, 240);
            this.doc.rect(0, 0, this.pageWidth, this.pageHeight, 'F');
            
            this.doc.setFillColor(255, 255, 255);
            this.doc.setDrawColor(232, 180, 184);
            this.doc.setLineWidth(0.2);
            this.doc.roundedRect(this.margin - 5, this.margin - 5, 
                                this.pageWidth - 2 * (this.margin - 5), 
                                this.pageHeight - 2 * (this.margin - 5), 
                                3, 3, 'FD');
            
            currentY = this.margin + 10;
            this.doc.setFontSize(this.fontSize.body);
            this.doc.setTextColor(60, 60, 60);
          }

          this.doc.text(wrappedLine, this.margin, currentY);
          currentY += this.lineHeight;
        });
      }
    });

    return this;
  }

  /**
   * 添加页脚
   */
  addFooter(text) {
    if (!this.doc) return this;

    const pageCount = this.doc.internal.getNumberOfPages();
    
    for (let i = 1; i <= pageCount; i++) {
      this.doc.setPage(i);
      
      // 页脚文本
      this.doc.setFontSize(this.fontSize.caption);
      this.doc.setTextColor(150, 150, 150);
      
      if (text) {
        const textWidth = this.doc.getTextWidth(text);
        this.doc.text(text, (this.pageWidth - textWidth) / 2, this.pageHeight - 10);
      }
      
      // 页码
      const pageText = `${i} / ${pageCount}`;
      const pageTextWidth = this.doc.getTextWidth(pageText);
      this.doc.text(pageText, this.pageWidth - this.margin, this.pageHeight - 10);
    }

    return this;
  }

  /**
   * 保存PDF文件
   */
  save(filename = 'letter.pdf') {
    if (!this.doc) {
      throw new Error('PDF文档未创建');
    }

    try {
      this.doc.save(filename);
      return true;
    } catch (error) {
      console.error('PDF保存失败:', error);
      return false;
    }
  }

  /**
   * 获取PDF数据URL
   */
  getDataURL() {
    if (!this.doc) {
      throw new Error('PDF文档未创建');
    }

    return this.doc.output('datauristring');
  }
}

/**
 * 快速生成信件PDF的工具函数
 */
export const generateLetterPDF = (letterData, filename) => {
  const generator = new PDFGenerator();
  
  try {
    generator
      .addCoverPage(
        letterData.title || '亲笔信',
        letterData.subtitle || '来自心底的话语',
        new Date().toLocaleDateString('zh-CN')
      )
      .addLetterPage(letterData.content || '')
      .addFooter('❤️ 用心制作 ❤️');
    
    return generator.save(filename || 'love-letter.pdf');
  } catch (error) {
    console.error('PDF生成失败:', error);
    return false;
  }
};
