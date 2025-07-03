import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import { ThemeProvider } from '@/components/providers/theme-provider';
import { personalInfo } from '@/data/personal';
import './globals.css';

// 字体配置
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

// SEO 元数据配置
export const metadata: Metadata = {
  title: {
    default: `${personalInfo.chineseName} - ${personalInfo.title}`,
    template: `%s | ${personalInfo.chineseName}`,
  },
  description: personalInfo.bio,
  keywords: [
    '平面设计师',
    '电商设计师',
    '品牌设计',
    '视觉设计',
    '包装设计',
    '网页设计',
    '郑权威',
    'Zheng Quanwei',
    '深圳设计师',
    '设计作品集',
  ],
  authors: [
    {
      name: personalInfo.chineseName,
      url: personalInfo.website,
    },
  ],
  creator: personalInfo.chineseName,
  publisher: personalInfo.chineseName,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(personalInfo.website),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'zh_CN',
    url: personalInfo.website,
    title: `${personalInfo.chineseName} - ${personalInfo.title}`,
    description: personalInfo.bio,
    siteName: `${personalInfo.chineseName}的设计作品集`,
    images: [
      {
        url: personalInfo.avatar,
        width: 1200,
        height: 630,
        alt: `${personalInfo.chineseName} - ${personalInfo.title}`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${personalInfo.chineseName} - ${personalInfo.title}`,
    description: personalInfo.bio,
    images: [personalInfo.avatar],
    creator: '@zhengquanwei',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
    yahoo: 'your-yahoo-verification-code',
  },
  category: 'design',
  classification: 'Business',
  referrer: 'origin-when-cross-origin',
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0a' },
  ],
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
    userScalable: true,
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: personalInfo.chineseName,
  },
  applicationName: `${personalInfo.chineseName}的设计作品集`,
  appLinks: {
    web: {
      url: personalInfo.website,
      should_fallback: true,
    },
  },
  archives: [`${personalInfo.website}/blog`],
  assets: [`${personalInfo.website}/assets`],
  bookmarks: [`${personalInfo.website}/portfolio`],
  category: 'design',
  other: {
    'msapplication-TileColor': '#ed7420',
    'msapplication-config': '/browserconfig.xml',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'black-translucent',
    'format-detection': 'telephone=no',
  },
};

/**
 * 根布局组件
 * 为整个应用提供基础的 HTML 结构和全局样式
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html 
      lang="zh-CN" 
      className={`${inter.variable} ${playfair.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* 预连接到外部资源 */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://images.unsplash.com" />
        
        {/* Favicon 和应用图标 */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        
        {/* 浏览器配置 */}
        <meta name="msapplication-TileColor" content="#ed7420" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        
        {/* 性能优化 */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//images.unsplash.com" />
        <link rel="dns-prefetch" href="//api.unsplash.com" />
        
        {/* 结构化数据 */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Person',
              name: personalInfo.chineseName,
              alternateName: personalInfo.name,
              description: personalInfo.bio,
              url: personalInfo.website,
              image: personalInfo.avatar,
              sameAs: [
                'https://behance.net/zhengquanwei',
                'https://dribbble.com/zhengquanwei',
                'https://instagram.com/zhengquanwei_design',
                'https://linkedin.com/in/zhengquanwei',
              ],
              jobTitle: personalInfo.title,
              worksFor: {
                '@type': 'Organization',
                name: '自由设计师',
              },
              address: {
                '@type': 'PostalAddress',
                addressLocality: '深圳',
                addressCountry: 'CN',
              },
              email: personalInfo.email,
              telephone: personalInfo.phone,
              birthDate: personalInfo.birthDate,
              knowsAbout: [
                '平面设计',
                '电商设计',
                '品牌设计',
                '包装设计',
                '网页设计',
                'UI/UX设计',
              ],
            }),
          }}
        />
      </head>
      <body className="font-sans antialiased">
        {/* 主题提供者 */}
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {/* 应用内容 */}
          {children}
          
          {/* 全局脚本 */}
          <script
            dangerouslySetInnerHTML={{
              __html: `
                // 防止 FOUC (Flash of Unstyled Content)
                (function() {
                  const theme = localStorage.getItem('theme') || 'system';
                  const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                  const actualTheme = theme === 'system' ? systemTheme : theme;
                  
                  if (actualTheme === 'dark') {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                })();
              `,
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
