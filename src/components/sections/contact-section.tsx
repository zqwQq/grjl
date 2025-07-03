'use client';

import * as React from 'react';
import Link from 'next/link';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  ArrowRight,
  MessageCircle,
  Calendar,
  Coffee
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Section, Card } from '@/components/layout/layout';
import { cn } from '@/lib/utils';
import { personalInfo, socialLinks } from '@/data/personal';

// 联系方式配置
const contactMethods = [
  {
    icon: Mail,
    label: '邮箱联系',
    value: personalInfo.email,
    href: `mailto:${personalInfo.email}`,
    description: '发送邮件，我会在24小时内回复',
    color: 'from-blue-500 to-blue-600',
    bgColor: 'bg-blue-50 dark:bg-blue-900/20',
  },
  {
    icon: Phone,
    label: '电话咨询',
    value: personalInfo.phone,
    href: `tel:${personalInfo.phone}`,
    description: '工作时间内可直接电话沟通',
    color: 'from-green-500 to-green-600',
    bgColor: 'bg-green-50 dark:bg-green-900/20',
  },
  {
    icon: MessageCircle,
    label: '微信咨询',
    value: 'zhengquanwei2006',
    href: '#',
    description: '扫码添加微信，随时在线交流',
    color: 'from-emerald-500 to-emerald-600',
    bgColor: 'bg-emerald-50 dark:bg-emerald-900/20',
  },
];

// 工作时间
const workingHours = [
  { day: '周一至周五', time: '9:00 - 18:00' },
  { day: '周六', time: '10:00 - 16:00' },
  { day: '周日', time: '休息（紧急项目除外）' },
];

/**
 * 联系方式卡片组件
 */
interface ContactMethodCardProps {
  method: typeof contactMethods[0];
  index: number;
  isVisible: boolean;
}

function ContactMethodCard({ method, index, isVisible }: ContactMethodCardProps) {
  return (
    <Card
      hover
      className={cn(
        'group transition-all duration-700 ease-out',
        isVisible 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-8'
      )}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      <div className="text-center space-y-4">
        {/* 图标 */}
        <div className={cn(
          'w-16 h-16 rounded-2xl flex items-center justify-center mx-auto transition-transform duration-300 group-hover:scale-110',
          method.bgColor
        )}>
          <method.icon size={32} className="text-neutral-700 dark:text-neutral-300" />
        </div>

        {/* 标题和值 */}
        <div>
          <h3 className="font-semibold text-lg text-neutral-900 dark:text-white mb-1">
            {method.label}
          </h3>
          <div className="font-mono text-primary-600 dark:text-primary-400 mb-2">
            {method.value}
          </div>
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            {method.description}
          </p>
        </div>

        {/* 联系按钮 */}
        <Button
          asChild
          variant="outline"
          className="w-full group-hover:border-primary-300 group-hover:text-primary-600 dark:group-hover:border-primary-600 dark:group-hover:text-primary-400"
        >
          <a href={method.href}>
            立即联系
            <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
          </a>
        </Button>
      </div>
    </Card>
  );
}

/**
 * 联系我区域组件
 */
export function ContactSection() {
  const [isVisible, setIsVisible] = React.useState(false);
  const sectionRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <Section 
      ref={sectionRef}
      id="contact"
      title="联系我"
      subtitle="Get In Touch"
      description="有项目想法？想要合作？或者只是想聊聊设计？我很乐意听到您的声音"
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
        {/* 左侧：联系信息 */}
        <div className="lg:col-span-2 space-y-8">
          {/* 联系方式 */}
          <div
            className={cn(
              'transition-all duration-1000 ease-out',
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
            )}
          >
            <h3 className="text-xl font-semibold text-neutral-900 dark:text-white mb-6">
              联系方式
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {contactMethods.map((method, index) => (
                <ContactMethodCard
                  key={method.label}
                  method={method}
                  index={index}
                  isVisible={isVisible}
                />
              ))}
            </div>
          </div>

          {/* 快速行动 */}
          <div
            className={cn(
              'transition-all duration-1000 ease-out delay-500',
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
            )}
          >
            <Card className="bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20 border-primary-200 dark:border-primary-800">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-gradient-to-br from-primary-600 to-secondary-600 rounded-2xl flex items-center justify-center mx-auto">
                  <Coffee size={32} className="text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">
                    约个咖啡聊聊？
                  </h3>
                  <p className="text-neutral-600 dark:text-neutral-400 mb-4">
                    如果您在深圳，我们可以面对面交流项目需求
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Button asChild variant="gradient" className="group">
                      <Link href="/contact">
                        <Calendar size={16} className="mr-2" />
                        预约会面
                      </Link>
                    </Button>
                    <Button asChild variant="outline">
                      <Link href="/portfolio">
                        查看作品集
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* 右侧：工作信息 */}
        <div
          className={cn(
            'space-y-6 transition-all duration-1000 ease-out delay-300',
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
          )}
        >
          {/* 工作时间 */}
          <Card>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center">
                  <Clock size={20} className="text-primary-600 dark:text-primary-400" />
                </div>
                <h3 className="font-semibold text-neutral-900 dark:text-white">
                  工作时间
                </h3>
              </div>
              <div className="space-y-2">
                {workingHours.map((schedule) => (
                  <div key={schedule.day} className="flex justify-between text-sm">
                    <span className="text-neutral-600 dark:text-neutral-400">
                      {schedule.day}
                    </span>
                    <span className="font-medium text-neutral-900 dark:text-white">
                      {schedule.time}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          {/* 位置信息 */}
          <Card>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-secondary-100 dark:bg-secondary-900/30 rounded-lg flex items-center justify-center">
                  <MapPin size={20} className="text-secondary-600 dark:text-secondary-400" />
                </div>
                <h3 className="font-semibold text-neutral-900 dark:text-white">
                  工作地点
                </h3>
              </div>
              <div className="text-sm text-neutral-600 dark:text-neutral-400">
                <div className="font-medium text-neutral-900 dark:text-white mb-1">
                  {personalInfo.location}
                </div>
                <p>
                  主要服务深圳及周边地区，远程合作覆盖全国
                </p>
              </div>
            </div>
          </Card>

          {/* 社交媒体 */}
          <Card>
            <div className="space-y-4">
              <h3 className="font-semibold text-neutral-900 dark:text-white">
                关注我的动态
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {socialLinks.slice(0, 4).map((social) => (
                  <a
                    key={social.platform}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 p-2 rounded-lg bg-neutral-50 dark:bg-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors text-sm"
                  >
                    <div className="w-6 h-6 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-md flex items-center justify-center text-white text-xs font-bold">
                      {social.platform.charAt(0)}
                    </div>
                    <span className="text-neutral-700 dark:text-neutral-300">
                      {social.platform}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </Card>
        </div>
      </div>
    </Section>
  );
}
