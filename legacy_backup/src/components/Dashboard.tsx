import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import OnboardingModal from './OnboardingModal';

type Widget = {
  id: string;
  name: string;
  icon: string;
  description: string;
  enabled: boolean;
};

export default function Dashboard() {
  const { user, profile, signOut, refreshProfile } = useAuth();
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [showCustomization, setShowCustomization] = useState(false);
  const location = useLocation();

  // Widget management
  const [widgets, setWidgets] = useState<Widget[]>(() => {
    const saved = localStorage.getItem('dashboardWidgets');
    if (saved) {
      return JSON.parse(saved);
    }
    return [
      { id: 'my-posts', name: '自分の投稿', icon: 'table', description: 'あなたの最近の投稿とエンゲージメント。', enabled: true },
      { id: 'trending', name: 'トレンド・ハイライト', icon: 'trending_up', description: 'コミュニティで話題になっていること。', enabled: true },
      { id: 'recommendations', name: 'おすすめ', icon: 'recommend', description: 'あなたにパーソナライズされたコンテンツ。', enabled: false },
      { id: 'bookmarks', name: 'ブックマーク', icon: 'bookmark', description: '保存した投稿や記事へのクイックアクセス。', enabled: false },
    ];
  });

  useEffect(() => {
    if (profile && !profile.onboarding_completed) {
      setShowOnboarding(true);
    }
  }, [profile]);

  useEffect(() => {
    localStorage.setItem('dashboardWidgets', JSON.stringify(widgets));
  }, [widgets]);

  const handleOnboardingComplete = async () => {
    setShowOnboarding(false);
    await refreshProfile();
  };

  const toggleWidget = (id: string) => {
    setWidgets(widgets.map(w => w.id === id ? { ...w, enabled: !w.enabled } : w));
  };

  const resetWidgets = () => {
    const defaultWidgets = [
      { id: 'my-posts', name: '自分の投稿', icon: 'table', description: 'あなたの最近の投稿とエンゲージメント。', enabled: true },
      { id: 'trending', name: 'トレンド・ハイライト', icon: 'trending_up', description: 'コミュニティで話題になっていること。', enabled: true },
      { id: 'recommendations', name: 'おすすめ', icon: 'recommend', description: 'あなたにパーソナライズされたコンテンツ。', enabled: false },
      { id: 'bookmarks', name: 'ブックマーク', icon: 'bookmark', description: '保存した投稿や記事へのクイックアクセス。', enabled: false },
    ];
    setWidgets(defaultWidgets);
  };

  // Calculate profile completion percentage
  const profileCompletion = profile?.onboarding_completed ? 75 : 25;

  // Get current date and greeting
  const now = new Date();
  const hours = now.getHours();
  const greeting = hours < 12 ? 'おはようございます' : hours < 18 ? 'こんにちは' : 'こんばんは';
  const dateStr = now.toLocaleDateString('ja-JP', { weekday: 'long', month: 'long', day: 'numeric' });

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="dark">
      <div className="relative flex flex-col w-full max-w-md mx-auto min-h-screen overflow-x-hidden bg-background-dark pb-24">
        {/* Header */}
        <header className="sticky top-0 z-30 flex flex-col gap-2 bg-background-dark/90 backdrop-blur-md px-5 pt-12 pb-2 transition-colors">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-text-secondary text-sm font-medium tracking-wide uppercase">{dateStr}</p>
              <h1 className="text-2xl font-bold leading-tight tracking-tight text-white">
                {greeting}、{profile?.name}さん
              </h1>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowCustomization(true)}
                className="relative flex items-center justify-center w-10 h-10 rounded-full bg-surface-dark/50 hover:bg-surface-dark transition text-white"
              >
                <span className="material-symbols-outlined">tune</span>
              </button>
              <button
                onClick={signOut}
                className="relative flex items-center justify-center w-10 h-10 rounded-full bg-surface-dark/50 hover:bg-surface-dark transition text-white"
              >
                <span className="material-symbols-outlined">logout</span>
              </button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex flex-col gap-6 px-4 pt-4">
          {/* Profile Snippet Card */}
          <div className="bg-surface-dark p-4 rounded-xl shadow-sm flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="bg-gradient-to-br from-primary to-blue-500 rounded-full h-14 w-14 flex items-center justify-center text-2xl font-bold text-background-dark">
                  {profile?.name?.charAt(0) || 'U'}
                </div>
                <div className="absolute -bottom-1 -right-1 bg-background-dark rounded-full p-0.5">
                  <div className="w-4 h-4 bg-primary rounded-full border-2 border-background-dark"></div>
                </div>
              </div>
              <div className="flex flex-col">
                <p className="text-base font-bold leading-tight text-white">{profile?.name}</p>
                <p className="text-text-secondary text-xs font-normal">デジタル市民 • ワンネスキングダム</p>
              </div>
            </div>
            <div className="flex flex-col items-end gap-1">
              <div className="flex items-center gap-1 text-xs text-primary font-bold">
                <span>{profileCompletion}%</span>
                <span className="material-symbols-outlined text-[14px]">bolt</span>
              </div>
              <div className="w-16 h-1.5 bg-gray-700 rounded-full overflow-hidden">
                <div className="h-full bg-primary rounded-full" style={{ width: `${profileCompletion}%` }}></div>
              </div>
            </div>
          </div>

          {/* Story Carousel */}
          <div className="flex flex-col gap-2">
            <h2 className="text-lg font-bold px-1 text-white">最近の更新</h2>
            <div className="flex w-full overflow-x-auto scrollbar-hide pb-2 -mx-4 px-4 gap-4 snap-x">
              {/* My Story */}
              <div className="flex flex-col items-center gap-2 snap-start">
                <div className="relative w-16 h-16 rounded-full p-[2px] border-2 border-dashed border-gray-600 flex items-center justify-center cursor-pointer">
                  <div className="w-full h-full bg-gradient-to-br from-primary to-blue-500 rounded-full opacity-60 flex items-center justify-center text-2xl font-bold text-background-dark">
                    {profile?.name?.charAt(0) || 'U'}
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="material-symbols-outlined text-white drop-shadow-md">add</span>
                  </div>
                </div>
                <p className="text-xs font-medium text-center text-white">追加</p>
              </div>
            </div>
          </div>

          {/* Feed Section */}
          <div className="flex flex-col gap-6">
            <h2 className="text-lg font-bold px-1 text-white">発見</h2>

            {/* Welcome Card */}
            <div className="flex flex-col rounded-2xl bg-surface-dark overflow-hidden shadow-sm">
              <div className="p-4 flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-primary to-blue-500 rounded-full flex items-center justify-center text-lg font-bold text-background-dark">
                      王
                    </div>
                    <div>
                      <p className="text-base font-bold leading-tight text-white">ワンネスキングダム</p>
                      <p className="text-text-secondary text-xs">たった今</p>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-gray-300 leading-relaxed">
                  ワンネスキングダムへようこそ！ここでは、愛、平和、調和を基盤とした新しいコミュニティを一緒に築いていきます。貢献を通じてOPを獲得し、つながりを深めましょう。🌟
                </p>
                {/* Reaction Bar */}
                <div className="flex items-center gap-6 pt-2 border-t border-gray-800/50 mt-1">
                  <button className="flex items-center gap-1.5 text-text-secondary hover:text-primary transition-colors">
                    <span className="material-symbols-outlined text-[20px]">favorite</span>
                    <span className="text-xs font-semibold">42</span>
                  </button>
                  <button className="flex items-center gap-1.5 text-text-secondary hover:text-white transition-colors">
                    <span className="material-symbols-outlined text-[20px]">chat_bubble</span>
                    <span className="text-xs font-semibold">12</span>
                  </button>
                  <button className="flex items-center gap-1.5 text-text-secondary hover:text-white transition-colors ml-auto">
                    <span className="material-symbols-outlined text-[20px]">share</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Info Card */}
            {!profile?.onboarding_completed && (
              <div className="flex flex-col rounded-2xl bg-surface-dark overflow-hidden shadow-sm border-2 border-primary/30">
                <div className="p-4 flex flex-col gap-3">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-primary text-[32px]">info</span>
                    <div>
                      <p className="text-base font-bold leading-tight text-white">プロフィールを完成させましょう</p>
                      <p className="text-text-secondary text-xs">オンボーディングを完了してください</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-300 leading-relaxed">
                    プロフィールを完成させて、コミュニティの一員として活動を始めましょう。質問に答えることで、あなたに最適なつながりを見つけることができます。
                  </p>
                  <button
                    onClick={() => setShowOnboarding(true)}
                    className="w-full py-2 bg-primary text-background-dark rounded-lg font-bold hover:bg-primary/90 transition-colors"
                  >
                    今すぐ始める
                  </button>
                </div>
              </div>
            )}
          </div>
        </main>

        {/* Floating Action Button */}
        <div className="fixed bottom-24 right-4 z-40">
          <button className="flex items-center justify-center w-14 h-14 bg-primary text-background-dark rounded-full shadow-[0_4px_14px_rgba(43,238,121,0.4)] hover:scale-105 active:scale-95 transition-all">
            <span className="material-symbols-outlined text-[28px]">add</span>
          </button>
        </div>

        {/* Bottom Navigation */}
        <nav className="fixed bottom-0 w-full max-w-md z-50 bg-background-dark/80 backdrop-blur-lg border-t border-white/5 pb-6 pt-3 px-6">
          <ul className="flex justify-between items-center">
            <li>
              <Link to="/" className={`flex flex-col items-center gap-1 ${isActive('/') ? 'text-primary' : 'text-text-secondary hover:text-white'} transition-colors`}>
                <span className="material-symbols-outlined" style={{ fontVariationSettings: isActive('/') ? "'FILL' 1" : "'FILL' 0" }}>home</span>
                <span className="text-[10px] font-medium">ホーム</span>
              </Link>
            </li>
            <li>
              <Link to="/explore" className={`flex flex-col items-center gap-1 ${isActive('/explore') ? 'text-primary' : 'text-text-secondary hover:text-white'} transition-colors`}>
                <span className="material-symbols-outlined">explore</span>
                <span className="text-[10px] font-medium">探索</span>
              </Link>
            </li>
            <li>
              <Link to="/wallet" className={`flex flex-col items-center gap-1 ${isActive('/wallet') ? 'text-primary' : 'text-text-secondary hover:text-white'} transition-colors relative`}>
                <div className="relative">
                  <span className="material-symbols-outlined">account_balance_wallet</span>
                </div>
                <span className="text-[10px] font-medium">ウォレット</span>
              </Link>
            </li>
            <li>
              <Link to="/profile" className={`flex flex-col items-center gap-1 ${isActive('/profile') ? 'text-primary' : 'text-text-secondary hover:text-white'} transition-colors`}>
                <span className="material-symbols-outlined">person</span>
                <span className="text-[10px] font-medium">プロフィール</span>
              </Link>
            </li>
          </ul>
        </nav>

        {/* Onboarding Modal */}
        {/* Customization Modal */}
        {showCustomization && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="bg-surface-dark rounded-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-surface-dark border-b border-white/10 p-6 flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-white">ダッシュボードのカスタマイズ</h2>
                  <p className="text-text-secondary text-sm mt-1">ウィジェットを追加または削除して、ダッシュボードを整理します。</p>
                </div>
                <button onClick={() => setShowCustomization(false)} className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                  <span className="material-symbols-outlined text-white">close</span>
                </button>
              </div>
              <div className="p-6">
                <div className="flex flex-col gap-4">
                  {widgets.map((widget) => (
                    <div key={widget.id} className="flex items-center gap-4 p-4 rounded-lg border border-white/10 bg-background-dark">
                      <div className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-white/10 text-white">
                        <span className="material-symbols-outlined text-2xl">{widget.icon}</span>
                      </div>
                      <div className="flex-1">
                        <p className="text-base font-medium text-white">{widget.name}</p>
                        <p className="text-sm text-text-secondary">{widget.description}</p>
                      </div>
                      <button
                        onClick={() => toggleWidget(widget.id)}
                        className={`px-4 py-2 rounded-lg font-medium transition-colors ${widget.enabled
                            ? 'bg-primary text-background-dark hover:bg-primary/90'
                            : 'bg-white/10 text-white hover:bg-white/20'
                          }`}
                      >
                        {widget.enabled ? '有効' : '無効'}
                      </button>
                    </div>
                  ))}
                </div>
                <div className="flex gap-4 mt-6 pt-6 border-t border-white/10">
                  <button
                    onClick={resetWidgets}
                    className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg font-medium transition-colors"
                  >
                    デフォルトに戻す
                  </button>
                  <button
                    onClick={() => setShowCustomization(false)}
                    className="px-4 py-2 bg-primary hover:bg-primary/90 text-background-dark rounded-lg font-medium transition-colors"
                  >
                    変更を保存
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {showOnboarding && (
          <OnboardingModal
            userId={user?.id || ''}
            onComplete={handleOnboardingComplete}
            onClose={() => setShowOnboarding(false)}
          />
        )}
      </div>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
