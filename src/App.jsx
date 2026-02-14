import { useMemo, useState } from 'react';
import { GameProvider, useGame } from './context/GameContext';
import BottomNav from './components/BottomNav';
import RoomPage from './components/RoomPage';
import ShopPage from './components/ShopPage';
import MoodPage from './components/MoodPage';
import ProfilePage from './components/ProfilePage';

function AppShell() {
  const [tab, setTab] = useState('房间');
  const { 状态 } = useGame();

  const 页面标题 = useMemo(() => ({ 房间: '我的房间', 商店: '家具商店', 心情: '今日心情', 我的: '我的' }[tab]), [tab]);

  return (
    <div className={状态.深色模式 ? 'dark' : ''}>
      <main className="mx-auto min-h-screen max-w-md bg-[#fffaf7] px-3 pb-24 pt-4 text-slate-700 dark:bg-slate-900 dark:text-slate-100">
        <h1 className="mb-3 text-lg font-semibold">{页面标题}</h1>
        {tab === '房间' && <RoomPage />}
        {tab === '商店' && <ShopPage />}
        {tab === '心情' && <MoodPage />}
        {tab === '我的' && <ProfilePage />}
      </main>
      <BottomNav activeTab={tab} onChange={setTab} />
    </div>
  );
}

export default function App() {
  return (
    <GameProvider>
      <AppShell />
    </GameProvider>
  );
}
