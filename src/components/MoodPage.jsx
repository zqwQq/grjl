import { useMemo } from 'react';
import { useGame } from '../context/GameContext';

const moods = [
  { 名称: '有点疲惫', 文案: '给房间一点柔和蓝光', 推荐: ['法式落地灯', '奶油云朵床', '奶油绿植'] },
  { 名称: '今天开心', 文案: '暖阳洒进窗边，心情加分', 推荐: ['原木学习桌', '月光小夜灯', '蕾丝挂画'] },
  { 名称: '想安静一下', 文案: '清新静谧，适合独处', 推荐: ['原木收纳柜', '奶油绿植', '轻法床榻'] }
];

export default function MoodPage() {
  const { 状态, set状态 } = useGame();
  const 当前 = useMemo(() => moods.find((m) => m.名称 === 状态.当前情绪状态), [状态.当前情绪状态]);

  return (
    <div className="space-y-3 pb-32">
      {moods.map((mood) => (
        <button
          key={mood.名称}
          onClick={() => set状态((p) => ({ ...p, 当前情绪状态: mood.名称 }))}
          className={`w-full rounded-2xl p-4 text-left shadow-sm min-h-[88px] ${状态.当前情绪状态 === mood.名称 ? 'bg-pink-100 ring-2 ring-pink-300' : 'bg-white'}`}
        >
          <h3 className="font-medium">{mood.名称}</h3>
          <p className="mt-1 text-sm text-slate-500">{mood.文案}</p>
        </button>
      ))}

      <section className="rounded-2xl bg-white p-4 shadow-sm">
        <h4 className="mb-2 font-medium">为你推荐家具</h4>
        <ul className="space-y-1 text-sm text-slate-600">
          {当前?.推荐.map((item) => <li key={item}>• {item}</li>)}
        </ul>
      </section>
    </div>
  );
}
