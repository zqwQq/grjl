const tabs = [
  { key: '房间', label: '🏠 我的房间' },
  { key: '商店', label: '🛍 家具商店' },
  { key: '心情', label: '🌸 今日心情' },
  { key: '我的', label: '👤 我的' }
];

export default function BottomNav({ activeTab, onChange }) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 mx-auto max-w-md border-t bg-white/95 px-2 pb-4 pt-2 backdrop-blur">
      <ul className="grid grid-cols-4 gap-1">
        {tabs.map((tab) => (
          <li key={tab.key}>
            <button
              onClick={() => onChange(tab.key)}
              className={`min-h-[48px] w-full rounded-2xl px-1 text-xs font-medium transition ${
                activeTab === tab.key ? 'bg-pink-100 text-pink-700 shadow' : 'text-slate-500'
              }`}
            >
              {tab.label}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
