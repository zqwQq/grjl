import { useState } from 'react';
import { useGame } from '../context/GameContext';

const 主题包 = ['奶油温馨', '原木日系', '轻法式'];

export default function ShopPage() {
  const { 家具数据, 状态, 购买家具 } = useGame();
  const [当前主题, set当前主题] = useState('奶油温馨');

  const 列表 = 家具数据.filter((f) => f.主题 === 当前主题);

  return (
    <div className="space-y-3 pb-32">
      <section className="rounded-2xl bg-white p-3 shadow-sm">
        <p className="mb-2 text-sm text-slate-500">主题包切换</p>
        <div className="flex gap-2 overflow-x-auto">
          {主题包.map((item) => (
            <button key={item} onClick={() => set当前主题(item)} className={`min-h-[44px] shrink-0 rounded-full px-4 ${当前主题 === item ? 'bg-pink-200 text-pink-700' : 'bg-slate-100'}`}>{item}</button>
          ))}
        </div>
      </section>

      <section className="grid grid-cols-2 gap-3">
        {列表.map((item) => {
          const 已拥有 = 状态.已拥有家具数组.includes(item.id);
          const 金币不足 = 状态.当前金币 < item.价格;
          return (
            <article key={item.id} className="rounded-2xl bg-white p-3 shadow-sm">
              <div className="mb-2 flex h-24 items-center justify-center rounded-xl bg-pink-50 text-4xl">{item.图片}</div>
              <h3 className="text-sm font-medium">{item.名称}</h3>
              <p className="mb-2 text-xs text-slate-500">价格：{item.价格} 金币</p>
              <button
                disabled={已拥有 || 金币不足}
                onClick={() => 购买家具(item.id)}
                className="min-h-[44px] w-full rounded-xl bg-pink-200 text-sm text-pink-700 disabled:bg-slate-100 disabled:text-slate-400"
              >
                {已拥有 ? '已购买' : 金币不足 ? '金币不足' : '购买'}
              </button>
            </article>
          );
        })}
      </section>
    </div>
  );
}
