import { useMemo } from 'react';
import { useGame } from '../context/GameContext';

export default function ProfilePage() {
  const { 状态, set状态, 今日签到, 重置房间 } = useGame();

  const 解锁主题 = useMemo(() => {
    const themes = new Set();
    状态.已拥有家具数组.forEach((id) => {
      if (id.includes('cream')) themes.add('奶油温馨');
      if (id.includes('wood')) themes.add('原木日系');
      if (id.includes('french')) themes.add('轻法式');
    });
    return [...themes];
  }, [状态.已拥有家具数组]);

  return (
    <div className="space-y-3 pb-32">
      <section className="rounded-2xl bg-white p-4 shadow-sm text-sm">
        <p>当前金币数量：{状态.当前金币}</p>
        <p>已拥有家具数量：{状态.已拥有家具数组.length}</p>
        <p>已解锁主题：{解锁主题.length ? 解锁主题.join('、') : '暂无'}</p>
      </section>

      <button onClick={今日签到} className="min-h-[44px] w-full rounded-xl bg-pink-200 text-pink-700 shadow-sm">每日签到（每天一次 +100 金币）</button>
      <button onClick={() => set状态((p) => ({ ...p, 深色模式: !p.深色模式 }))} className="min-h-[44px] w-full rounded-xl bg-white shadow-sm">
        切换{状态.深色模式 ? '浅色' : '深色'}模式
      </button>
      <button onClick={重置房间} className="min-h-[44px] w-full rounded-xl bg-white text-rose-500 shadow-sm">重置房间</button>
    </div>
  );
}
