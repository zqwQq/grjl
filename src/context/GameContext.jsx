import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import furnitureData from '../data/furniture.json';
import { getTodayKey, loadGameState, saveGameState } from '../utils/storage';

const GameContext = createContext(null);

const 初始状态 = {
  当前金币: 1000,
  已拥有家具数组: ['bed_cream_01'],
  已摆放家具数组: [],
  当前情绪状态: '今天开心',
  当前主题: '奶油温馨',
  当前时间: '早晨',
  深色模式: false,
  上次签到日期: ''
};

export function GameProvider({ children }) {
  const [状态, set状态] = useState(初始状态);

  useEffect(() => {
    const 本地 = loadGameState();
    if (本地) set状态((旧) => ({ ...旧, ...本地 }));
  }, []);

  useEffect(() => {
    saveGameState(状态);
  }, [状态]);

  const 家具Map = useMemo(() => Object.fromEntries(furnitureData.map((f) => [f.id, f])), []);

  const 购买家具 = (id) => {
    const item = 家具Map[id];
    if (!item || 状态.已拥有家具数组.includes(id) || 状态.当前金币 < item.价格) return false;
    set状态((prev) => ({
      ...prev,
      当前金币: prev.当前金币 - item.价格,
      已拥有家具数组: [...prev.已拥有家具数组, id]
    }));
    return true;
  };

  const 摆放家具 = (id) => {
    const item = 家具Map[id];
    if (!item) return;
    set状态((prev) => ({
      ...prev,
      已摆放家具数组: [
        ...prev.已摆放家具数组,
        {
          id: `${id}_${Date.now()}`,
          名称: item.名称,
          分类: item.分类,
          价格: item.价格,
          图片路径: item.图片,
          宽度: item.默认宽度,
          高度: item.默认高度,
          层级: prev.已摆放家具数组.length + 1,
          x: 120,
          y: 120,
          rotation: 0,
          scale: 1,
          sourceId: id
        }
      ]
    }));
  };

  const 更新摆放家具 = (id, patch) => {
    set状态((prev) => ({
      ...prev,
      已摆放家具数组: prev.已摆放家具数组.map((it) => (it.id === id ? { ...it, ...patch } : it))
    }));
  };

  const 删除摆放家具 = (id) => {
    set状态((prev) => ({ ...prev, 已摆放家具数组: prev.已摆放家具数组.filter((it) => it.id !== id) }));
  };

  const 收回仓库 = (id) => {
    删除摆放家具(id);
  };

  const 今日签到 = () => {
    const today = getTodayKey();
    if (状态.上次签到日期 === today) return false;
    set状态((prev) => ({ ...prev, 当前金币: prev.当前金币 + 100, 上次签到日期: today }));
    return true;
  };

  const 重置房间 = () => set状态((prev) => ({ ...初始状态, 深色模式: prev.深色模式 }));

  const value = {
    家具数据: furnitureData,
    状态,
    set状态,
    购买家具,
    摆放家具,
    更新摆放家具,
    删除摆放家具,
    收回仓库,
    今日签到,
    重置房间
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}

export function useGame() {
  return useContext(GameContext);
}
