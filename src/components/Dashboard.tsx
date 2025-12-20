import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import OnboardingModal from './OnboardingModal';

export default function Dashboard() {
  const { user, profile, signOut, refreshProfile } = useAuth();
  const [showOnboarding, setShowOnboarding] = useState(false);

  useEffect(() => {
    if (profile && !profile.onboarding_completed) {
      setShowOnboarding(true);
    }
  }, [profile]);

  const handleOnboardingComplete = async () => {
    setShowOnboarding(false);
    await refreshProfile();
  };

  // Calculate profile completion percentage
  const profileCompletion = profile?.onboarding_completed ? 75 : 25;

  // Get current date and greeting
  const now = new Date();
  const hours = now.getHours();
  const greeting = hours < 12 ? 'おはようございます' : hours < 18 ? 'こんにちは' : 'こんばんは';
  const dateStr = now.toLocaleDateString('ja-JP', { weekday: 'long', month: 'long', day: 'numeric' });

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
            <button
              onClick={signOut}
              className="relative flex items-center justify-center w-10 h-10 rounded-full bg-surface-dark/50 hover:bg-surface-dark transition text-white"
            >
              <span className="material-symbols-outlined">logout</span>
            </button>
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
              <a className="flex flex-col items-center gap-1 text-primary" href="#">
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>home</span>
                <span className="text-[10px] font-medium">ホーム</span>
              </a>
            </li>
            <li>
              <a className="flex flex-col items-center gap-1 text-text-secondary hover:text-white transition-colors" href="#">
                <span className="material-symbols-outlined">explore</span>
                <span className="text-[10px] font-medium">探索</span>
              </a>
            </li>
            <li>
              <a className="flex flex-col items-center gap-1 text-text-secondary hover:text-white transition-colors relative" href="#">
                <div className="relative">
                  <span className="material-symbols-outlined">chat_bubble</span>
                  <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-primary rounded-full border-2 border-background-dark"></span>
                </div>
                <span className="text-[10px] font-medium">チャット</span>
              </a>
            </li>
            <li>
              <a className="flex flex-col items-center gap-1 text-text-secondary hover:text-white transition-colors" href="#">
                <span className="material-symbols-outlined">person</span>
                <span className="text-[10px] font-medium">プロフィール</span>
              </a>
            </li>
          </ul>
        </nav>

        {/* Onboarding Modal */}
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
