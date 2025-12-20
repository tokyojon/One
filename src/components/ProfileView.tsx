import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

type ActivityItem = {
    id: number;
    icon: string;
    title: string;
    time: string;
};

const mockActivities: ActivityItem[] = [
    { id: 1, icon: 'photo_camera', title: '新しい写真を投稿しました', time: '2時間前' },
    { id: 2, icon: 'groups', title: '「東京ハイキングクラブ」コミュニティに参加しました', time: '昨日' },
    { id: 3, icon: 'military_tech', title: 'チャレンジ「ウィークリーフォト」を完了しました', time: '3日前' },
    { id: 4, icon: 'add_reaction', title: '新しいスキル「写真編集」を追加しました', time: '5日前' },
];

export default function ProfileView() {
    const navigate = useNavigate();
    const { id } = useParams();
    const { profile } = useAuth();
    const [activeTab, setActiveTab] = useState('contributions');

    // For now, show current user's profile. Later, fetch by ID
    const isOwnProfile = true;
    const displayName = profile?.name || '田中 さくら';
    const displayBio = '東京在住のデザイナー。ミニマリズムと自然からインスピレーションを得ています。週末はハイキングと写真撮影を楽しんでいます。';
    const displayRole = 'コミュニティリーダー';

    return (
        <div className="dark">
            <div className="min-h-screen bg-background-dark text-white">
                {/* Header */}
                <header className="flex h-20 items-center justify-between gap-4 px-4 sm:px-6 lg:px-8 sticky top-0 z-50 bg-background-dark/80 backdrop-blur-sm border-b border-white/10">
                    <div className="flex items-center gap-4">
                        <button onClick={() => navigate('/')} className="flex items-center gap-2">
                            <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-background-dark">
                                <span className="material-symbols-outlined text-lg">spa</span>
                            </div>
                            <span className="font-bold text-lg">結び</span>
                        </button>
                    </div>
                    <div className="flex items-center gap-4">
                        <button onClick={() => navigate('/')} className="p-2 rounded-full hover:bg-white/10 transition-colors">
                            <span className="material-symbols-outlined">notifications</span>
                        </button>
                        <button onClick={() => navigate('/profile')} className="p-2 rounded-full hover:bg-white/10 transition-colors">
                            <span className="material-symbols-outlined">settings</span>
                        </button>
                    </div>
                </header>

                <div className="w-full max-w-6xl mx-auto p-4 md:p-8">
                    {/* Mobile Header */}
                    <header className="flex items-center justify-between gap-2 p-4 mb-6 md:hidden">
                        <div className="flex items-center gap-2">
                            <button onClick={() => navigate(-1)} className="p-2">
                                <span className="material-symbols-outlined text-2xl">arrow_back</span>
                            </button>
                            <h1 className="text-xl font-bold">プロフィール</h1>
                        </div>
                        {isOwnProfile && (
                            <button onClick={() => navigate('/profile')} className="p-2">
                                <span className="material-symbols-outlined text-2xl">edit</span>
                            </button>
                        )}
                    </header>

                    <main className="grid grid-cols-1 lg:grid-cols-3 lg:gap-8">
                        {/* Sidebar */}
                        <aside className="lg:col-span-1 mb-8 lg:mb-0">
                            <div className="flex w-full flex-col gap-6 items-center">
                                {/* Avatar */}
                                <div className="bg-gradient-to-br from-primary to-blue-500 rounded-full w-40 h-40 flex items-center justify-center text-6xl font-bold text-background-dark">
                                    {displayName.charAt(0)}
                                </div>

                                {/* User Info */}
                                <div className="flex flex-col items-center justify-center gap-2">
                                    <p className="text-2xl font-bold text-center">{displayName}</p>
                                    <p className="text-primary text-sm font-bold bg-primary/20 px-3 py-1 rounded-full">
                                        {displayRole}
                                    </p>
                                    <p className="text-text-secondary text-base text-center max-w-sm mt-2">
                                        {displayBio}
                                    </p>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex w-full max-w-sm gap-3">
                                    {!isOwnProfile ? (
                                        <>
                                            <button className="flex-1 px-4 py-3 bg-white/10 hover:bg-white/20 rounded-xl font-bold transition-colors">
                                                フォローする
                                            </button>
                                            <button className="flex-1 px-4 py-3 bg-primary hover:bg-primary/90 text-background-dark rounded-xl font-bold transition-colors">
                                                メッセージを送る
                                            </button>
                                            <button className="w-11 h-11 bg-white/10 hover:bg-white/20 rounded-xl flex items-center justify-center transition-colors">
                                                <span className="material-symbols-outlined text-xl">more_horiz</span>
                                            </button>
                                        </>
                                    ) : (
                                        <button
                                            onClick={() => navigate('/profile')}
                                            className="flex-1 px-4 py-3 bg-primary hover:bg-primary/90 text-background-dark rounded-xl font-bold transition-colors"
                                        >
                                            プロフィールを編集
                                        </button>
                                    )}
                                </div>
                            </div>
                        </aside>

                        {/* Main Content */}
                        <div className="lg:col-span-2">
                            <div className="w-full">
                                {/* Tabs */}
                                <div className="border-b border-white/10 px-4">
                                    <nav className="flex gap-8 -mb-px">
                                        {[
                                            { id: 'contributions', label: '貢献ログ' },
                                            { id: 'skills', label: 'スキル' },
                                            { id: 'family', label: '家族' },
                                            { id: 'community', label: 'コミュニティ' },
                                        ].map((tab) => (
                                            <button
                                                key={tab.id}
                                                onClick={() => setActiveTab(tab.id)}
                                                className={`flex flex-col items-center justify-center border-b-[3px] pb-[13px] pt-4 ${activeTab === tab.id
                                                        ? 'border-primary text-primary'
                                                        : 'border-transparent text-text-secondary hover:text-white'
                                                    }`}
                                            >
                                                <p className="text-sm font-bold">{tab.label}</p>
                                            </button>
                                        ))}
                                    </nav>
                                </div>

                                {/* Tab Content */}
                                <div className="py-6">
                                    {activeTab === 'contributions' && (
                                        <div className="flex flex-col gap-2">
                                            {mockActivities.map((activity) => (
                                                <div
                                                    key={activity.id}
                                                    className="flex items-center gap-4 hover:bg-white/5 p-4 min-h-[72px] justify-between rounded-xl transition-colors cursor-pointer"
                                                >
                                                    <div className="flex items-center gap-4">
                                                        <div className="flex items-center justify-center rounded-lg bg-white/10 shrink-0 size-12">
                                                            <span className="material-symbols-outlined">{activity.icon}</span>
                                                        </div>
                                                        <div className="flex flex-col justify-center">
                                                            <p className="text-base font-medium line-clamp-1">{activity.title}</p>
                                                            <p className="text-text-secondary text-sm">{activity.time}</p>
                                                        </div>
                                                    </div>
                                                    <div className="shrink-0">
                                                        <span className="material-symbols-outlined">chevron_right</span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {activeTab === 'skills' && (
                                        <div className="text-center py-12 text-text-secondary">
                                            <span className="material-symbols-outlined text-4xl mb-4 block">psychology</span>
                                            <p>スキル情報は近日公開予定</p>
                                        </div>
                                    )}

                                    {activeTab === 'family' && (
                                        <div className="text-center py-12 text-text-secondary">
                                            <span className="material-symbols-outlined text-4xl mb-4 block">family_restroom</span>
                                            <p>家族情報は近日公開予定</p>
                                        </div>
                                    )}

                                    {activeTab === 'community' && (
                                        <div className="text-center py-12 text-text-secondary">
                                            <span className="material-symbols-outlined text-4xl mb-4 block">groups</span>
                                            <p>コミュニティ情報は近日公開予定</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
}
