import { useMemo, useState } from 'react';
import { useGame } from '../context/GameContext';

const 分类列表 = ['床', '桌子', '灯', '植物', '装饰', '墙纸地板'];

function 家具卡({ item, onAdd }) {
  return (
    <button onClick={() => onAdd(item.id)} className="flex min-h-[52px] items-center justify-between rounded-xl bg-pink-50 px-3 py-2 text-left">
      <span>{item.图片} {item.名称}</span>
      <span className="text-xs text-slate-500">已拥有</span>
    </button>
  );
}

export default function RoomPage() {
  const { 状态, 家具数据, 摆放家具, 更新摆放家具, 删除摆放家具, 收回仓库, set状态 } = useGame();
  const [当前分类, set当前分类] = useState('床');
  const [选中ID, set选中ID] = useState('');

  const 拥有家具 = 家具数据.filter((f) => 状态.已拥有家具数组.includes(f.id) && f.分类 === 当前分类);
  const 选中家具 = 状态.已摆放家具数组.find((it) => it.id === 选中ID);

  const 情绪遮罩 = useMemo(() => ({
    '有点疲惫': 'bg-indigo-200/30',
    '今天开心': 'bg-yellow-100/30',
    '想安静一下': 'bg-emerald-200/30'
  }[状态.当前情绪状态] || 'bg-white/20'), [状态.当前情绪状态]);

  const onDrag = (e, id) => {
    const parent = e.currentTarget.parentElement.getBoundingClientRect();
    const x = Math.round((e.clientX - parent.left) / 20) * 20;
    const y = Math.round((e.clientY - parent.top) / 20) * 20;
    更新摆放家具(id, { x, y });
  };

  return (
    <div className="space-y-3 pb-40">
      <header className="rounded-2xl bg-white p-3 shadow-sm">
        <div className="flex items-center justify-between text-sm">
          <span>金币：{状态.当前金币}</span>
          <div className="flex gap-2">
            <button className="min-h-[44px] rounded-xl bg-slate-100 px-3" onClick={() => set状态((p) => ({ ...p, 当前时间: p.当前时间 === '早晨' ? '夜晚' : '早晨' }))}>{状态.当前时间}</button>
            <button className="min-h-[44px] rounded-xl bg-slate-100 px-3">设置</button>
          </div>
        </div>
      </header>

      <section className="relative h-[360px] overflow-hidden rounded-3xl border bg-gradient-to-b from-pink-100 to-amber-50">
        <div className={`absolute inset-0 ${情绪遮罩}`} />
        <div className="absolute right-4 top-3 rounded-full bg-white/70 px-3 py-1 text-xs">窗外：{状态.当前情绪状态}</div>
        <div className="absolute inset-0 bg-[linear-gradient(#ffffff55_1px,transparent_1px),linear-gradient(90deg,#ffffff55_1px,transparent_1px)] bg-[size:20px_20px]" />
        {状态.已摆放家具数组.map((item) => (
          <button
            key={item.id}
            className={`absolute flex items-center justify-center rounded-xl bg-white/80 text-2xl shadow ${选中ID === item.id ? 'ring-2 ring-pink-400' : ''}`}
            style={{ left: item.x, top: item.y, width: item.宽度, height: item.高度, zIndex: item.层级, transform: `rotate(${item.rotation}deg) scale(${item.scale})` }}
            onClick={() => set选中ID(item.id)}
            onPointerMove={(e) => e.pressure > 0 && onDrag(e, item.id)}
          >
            {item.图片路径}
          </button>
        ))}

        {选中家具 && (
          <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-2 rounded-2xl bg-white p-2 shadow-lg">
            <button className="min-h-[44px] rounded-xl bg-pink-100 px-3" onClick={() => 更新摆放家具(选中家具.id, { rotation: (选中家具.rotation + 15) % 360 })}>旋转</button>
            <button className="min-h-[44px] rounded-xl bg-pink-100 px-3" onClick={() => 更新摆放家具(选中家具.id, { scale: Number((选中家具.scale + 0.1).toFixed(2)) })}>缩放</button>
            <button className="min-h-[44px] rounded-xl bg-pink-100 px-3" onClick={() => 删除摆放家具(选中家具.id)}>删除</button>
            <button className="min-h-[44px] rounded-xl bg-pink-100 px-3" onClick={() => 收回仓库(选中家具.id)}>收回仓库</button>
          </div>
        )}
      </section>

      <section className="rounded-2xl bg-white p-3 shadow-sm">
        <div className="mb-3 flex gap-2 overflow-x-auto">
          {分类列表.map((分类) => (
            <button key={分类} onClick={() => set当前分类(分类)} className={`min-h-[44px] shrink-0 rounded-full px-4 ${当前分类 === 分类 ? 'bg-pink-200 text-pink-700' : 'bg-slate-100'}`}>
              {分类}
            </button>
          ))}
        </div>
        <div className="max-h-48 space-y-2 overflow-y-auto">
          {拥有家具.length ? 拥有家具.map((item) => <家具卡 key={item.id} item={item} onAdd={摆放家具} />) : <p className="py-6 text-center text-sm text-slate-400">该分类暂无已拥有家具</p>}
        </div>
      </section>
    </div>
  );
}
