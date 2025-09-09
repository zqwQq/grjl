// 网站配置数据 - 可以轻松修改内容
export const siteConfig = {
  // 基本信息
  title: "给小美的惊喜 — 生日快乐",
  subtitle: "这是我为你准备的小世界",
  heroImage: "/images/hero-bg.jpg", // 首屏背景图片
  music: "/music/bgm.mp3", // 背景音乐
  
  // 时间线数据
  timeline: [
    {
      date: "2022-05-10",
      title: "第一次见面",
      description: "在某某咖啡店，你点了一杯拿铁，我点了一杯美式。那时候的阳光正好，你的笑容比阳光还要温暖。从那一刻起，我就知道你是特别的。",
      images: ["/images/timeline/meeting.jpg"]
    },
    {
      date: "2022-07-15", 
      title: "第一次约会",
      description: "我们去了游乐园，你说要坐过山车，结果害怕得紧紧抓住我的手。那一刻我想，能保护你就是我最大的幸福。",
      images: ["/images/timeline/date1.jpg", "/images/timeline/date2.jpg"]
    },
    {
      date: "2022-10-01",
      title: "确定关系",
      description: "在那个秋天的黄昏，我鼓起勇气向你表白。你红着脸说'我等你这句话很久了'。那一刻，整个世界都变得温柔起来。",
      images: ["/images/timeline/relationship.jpg"]
    },
    {
      date: "2023-02-14",
      title: "第一个情人节",
      description: "我送了你99朵玫瑰，你说太俗气了，但是眼睛里全是笑意。后来你告诉我，你把花瓣都收集起来做成了书签。",
      images: ["/images/timeline/valentine.jpg"]
    },
    {
      date: "2023-08-20",
      title: "一起旅行",
      description: "我们去了海边，看日出日落，踩在沙滩上留下足迹。你说这是你最开心的一次旅行，我想以后的每一次旅行都要和你一起。",
      images: ["/images/timeline/travel1.jpg", "/images/timeline/travel2.jpg", "/images/timeline/travel3.jpg"]
    }
  ],
  
  // 相册图片
  gallery: [
    {
      src: "/images/gallery/photo1.jpg",
      alt: "美好的回忆 1",
      caption: "那个午后的阳光"
    },
    {
      src: "/images/gallery/photo2.jpg", 
      alt: "美好的回忆 2",
      caption: "你的笑容"
    },
    {
      src: "/images/gallery/photo3.jpg",
      alt: "美好的回忆 3", 
      caption: "一起的时光"
    },
    {
      src: "/images/gallery/photo4.jpg",
      alt: "美好的回忆 4",
      caption: "海边的黄昏"
    },
    {
      src: "/images/gallery/photo5.jpg",
      alt: "美好的回忆 5",
      caption: "温暖的拥抱"
    },
    {
      src: "/images/gallery/photo6.jpg",
      alt: "美好的回忆 6", 
      caption: "甜蜜的瞬间"
    }
  ],
  
  // 亲笔信内容
  letter: {
    title: "写给最特别的你",
    content: `亲爱的小美：

今天是你的生日，我想对你说很多很多话。

从遇见你的那一刻起，我的世界就变得不一样了。你的笑容像春天的阳光，温暖而明亮；你的声音像夏夜的微风，轻柔而动人。

和你在一起的每一天都是礼物。无论是一起看电影时你偷偷吃爆米花的样子，还是你生气时嘟起嘴巴的可爱模样，都深深印在我的心里。

你总是说我对你太好，但是你不知道，能够对你好是我最大的幸福。看到你开心，我就开心；看到你难过，我比你更难过。

在这个特别的日子里，我想告诉你：谢谢你来到我的生命里，让我的世界变得如此美好。愿你的每一天都充满阳光，愿你的每一个愿望都能实现。

未来的路还很长，但是只要有你在身边，我就不怕任何困难。让我们一起走过春夏秋冬，一起看遍世间美景，一起慢慢变老。

生日快乐，我最爱的人。

永远爱你的
小明

2024年3月15日`
  },
  
  // 彩蛋配置
  easterEgg: {
    message: "🎉 惊喜！愿你永远开心快乐！🎂",
    video: "/videos/surprise.mp4", // 可选的视频文件
  }
};
