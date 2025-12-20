import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function AccountSettings() {
    const { profile, signOut } = useAuth();
    const navigate = useNavigate();
    const [activeSection, setActiveSection] = useState('profile');

    const handleSignOut = async () => {
        await signOut();
        navigate('/');
    };

    return (
        <div className="dark">
            <div className="min-h-screen bg-background-dark text-white">
                {/* Header */}
                <header className="sticky top-0 z-10 flex w-full items-center justify-between border-b border-white/10 px-4 sm:px-10 py-3 bg-background-dark/80 backdrop-blur-sm">
                    <div className="flex items-center gap-8">
                        <div className="flex items-center gap-4">
                            <button onClick={() => navigate('/')} className="text-white hover:text-primary transition-colors">
                                <span className="material-symbols-outlined">arrow_back</span>
                            </button>
                            <h2 className="text-lg font-bold">設定</h2>
                        </div>
                    </div>
                    <button
                        onClick={handleSignOut}
                        className="flex items-center gap-2 px-4 py-2 bg-surface-dark hover:bg-surface-dark/80 rounded-lg transition-colors"
                    >
                        <span className="material-symbols-outlined text-xl">logout</span>
                        <span className="hidden sm:inline">ログアウト</span>
                    </button>
                </header>

                <main className="flex flex-1 justify-center py-5 sm:py-10 px-4">
                    <div className="flex w-full max-w-6xl gap-8">
                        {/* Side Navigation */}
                        <aside className="w-1/4 hidden md:block">
                            <div className="flex h-full flex-col rounded-xl bg-surface-dark p-4 border border-white/10">
                                <div className="flex flex-col gap-4">
                                    <div className="flex gap-3 items-center">
                                        <div className="bg-gradient-to-br from-primary to-blue-500 rounded-full h-10 w-10 flex items-center justify-center text-lg font-bold text-background-dark">
                                            {profile?.name?.charAt(0) || 'U'}
                                        </div>
                                        <div className="flex flex-col">
                                            <h1 className="text-base font-medium">{profile?.name}</h1>
                                            <p className="text-text-secondary text-sm">@{profile?.name?.toLowerCase().replace(' ', '_')}</p>
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-2 mt-4">
                                        <button
                                            onClick={() => setActiveSection('profile')}
                                            className={`flex items-center gap-3 px-3 py-2 rounded-lg ${activeSection === 'profile' ? 'bg-primary/20 text-primary' : 'hover:bg-white/5'
                                                }`}
                                        >
                                            <span className="material-symbols-outlined text-2xl">person</span>
                                            <p className="text-sm font-medium">プロフィール編集</p>
                                        </button>
                                        <button
                                            onClick={() => setActiveSection('notifications')}
                                            className={`flex items-center gap-3 px-3 py-2 rounded-lg ${activeSection === 'notifications' ? 'bg-primary/20 text-primary' : 'hover:bg-white/5'
                                                }`}
                                        >
                                            <span className="material-symbols-outlined text-2xl">notifications</span>
                                            <p className="text-sm font-medium">通知設定</p>
                                        </button>
                                        <button
                                            onClick={() => setActiveSection('privacy')}
                                            className={`flex items-center gap-3 px-3 py-2 rounded-lg ${activeSection === 'privacy' ? 'bg-primary/20 text-primary' : 'hover:bg-white/5'
                                                }`}
                                        >
                                            <span className="material-symbols-outlined text-2xl">lock</span>
                                            <p className="text-sm font-medium">プライバシー設定</p>
                                        </button>
                                        <button
                                            onClick={() => setActiveSection('security')}
                                            className={`flex items-center gap-3 px-3 py-2 rounded-lg ${activeSection === 'security' ? 'bg-primary/20 text-primary' : 'hover:bg-white/5'
                                                }`}
                                        >
                                            <span className="material-symbols-outlined text-2xl">shield</span>
                                            <p className="text-sm font-medium">セキュリティ</p>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </aside>

                        {/* Main Content */}
                        <div className="flex-1 flex flex-col gap-8">
                            {/* Profile Section */}
                            {activeSection === 'profile' && (
                                <section className="flex flex-col gap-6 p-6 rounded-xl bg-surface-dark border border-white/10">
                                    <div className="flex flex-wrap justify-between gap-3 pb-4 border-b border-white/10">
                                        <div className="flex flex-col gap-2">
                                            <p className="text-2xl font-bold">プロフィール編集</p>
                                            <p className="text-text-secondary text-base">アカウント情報を更新します。</p>
                                        </div>
                                    </div>
                                    <div className="flex p-4">
                                        <div className="flex w-full flex-col gap-4 sm:flex-row sm:justify-between sm:items-center">
                                            <div className="flex gap-4 items-center">
                                                <div className="bg-gradient-to-br from-primary to-blue-500 rounded-full h-24 w-24 flex items-center justify-center text-3xl font-bold text-background-dark">
                                                    {profile?.name?.charAt(0) || 'U'}
                                                </div>
                                                <div className="flex flex-col justify-center">
                                                    <p className="text-xl font-bold">プロフィール写真</p>
                                                    <p className="text-text-secondary text-sm">JPG、GIF、またはPNG。最大サイズは800Kです。</p>
                                                </div>
                                            </div>
                                            <button className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors">
                                                画像をアップロード
                                            </button>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4">
                                        <label className="flex flex-col">
                                            <p className="text-sm font-medium pb-2">ユーザー名</p>
                                            <input
                                                className="px-4 py-3 rounded-lg bg-background-dark border border-white/20 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/50"
                                                defaultValue={`@${profile?.name?.toLowerCase().replace(' ', '_')}`}
                                            />
                                        </label>
                                        <label className="flex flex-col">
                                            <p className="text-sm font-medium pb-2">表示名</p>
                                            <input
                                                className="px-4 py-3 rounded-lg bg-background-dark border border-white/20 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/50"
                                                defaultValue={profile?.name}
                                            />
                                        </label>
                                        <label className="flex flex-col md:col-span-2">
                                            <p className="text-sm font-medium pb-2">自己紹介</p>
                                            <textarea
                                                className="px-4 py-3 rounded-lg bg-background-dark border border-white/20 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/50 min-h-[120px]"
                                                defaultValue="ワンネスキングダムの市民です。"
                                            />
                                        </label>
                                        <label className="flex flex-col md:col-span-2">
                                            <p className="text-sm font-medium pb-2">メールアドレス</p>
                                            <input
                                                className="px-4 py-3 rounded-lg bg-background-dark border border-white/20 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/50"
                                                defaultValue={profile?.email}
                                                disabled
                                            />
                                        </label>
                                    </div>
                                    <div className="flex justify-end gap-4 p-4 mt-4 border-t border-white/10">
                                        <button className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors">
                                            キャンセル
                                        </button>
                                        <button className="px-4 py-2 bg-primary hover:bg-primary/90 text-background-dark rounded-lg transition-colors font-bold">
                                            変更を保存
                                        </button>
                                    </div>
                                </section>
                            )}

                            {/* Notifications Section */}
                            {activeSection === 'notifications' && (
                                <section className="flex flex-col gap-6 p-6 rounded-xl bg-surface-dark border border-white/10">
                                    <div className="flex flex-wrap justify-between gap-3 pb-4 border-b border-white/10">
                                        <div className="flex flex-col gap-2">
                                            <p className="text-2xl font-bold">通知設定</p>
                                            <p className="text-text-secondary text-base">通知の受け取り方を管理します。</p>
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-4 p-4">
                                        {[
                                            { title: '新しいフォロワー', desc: '新しいフォロワーができたときに通知します。', enabled: true },
                                            { title: 'コメント', desc: 'あなたの投稿にコメントがあったときに通知します。', enabled: true },
                                            { title: 'いいね', desc: 'あなたの投稿に「いいね」があったときに通知します。', enabled: false },
                                            { title: 'メール通知', desc: '重要な更新をメールで受け取ります。', enabled: true },
                                        ].map((item, idx) => (
                                            <div key={idx} className="flex items-center justify-between">
                                                <div>
                                                    <p className="font-medium">{item.title}</p>
                                                    <p className="text-sm text-text-secondary">{item.desc}</p>
                                                </div>
                                                <button
                                                    className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ${item.enabled ? 'bg-primary' : 'bg-gray-600'
                                                        }`}
                                                >
                                                    <span className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition duration-200 ${item.enabled ? 'translate-x-5' : 'translate-x-0'}`} />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="flex justify-end gap-4 p-4 mt-4 border-t border-white/10">
                                        <button className="px-4 py-2 bg-primary hover:bg-primary/90 text-background-dark rounded-lg transition-colors font-bold">
                                            変更を保存
                                        </button>
                                    </div>
                                </section>
                            )}

                            {/* Privacy Section */}
                            {activeSection === 'privacy' && (
                                <section className="flex flex-col gap-6 p-6 rounded-xl bg-surface-dark border border-white/10">
                                    <div className="flex flex-wrap justify-between gap-3 pb-4 border-b border-white/10">
                                        <div className="flex flex-col gap-2">
                                            <p className="text-2xl font-bold">プライバシー設定</p>
                                            <p className="text-text-secondary text-base">アカウントの公開範囲を管理します。</p>
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-6 p-4">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="font-medium">非公開アカウント</p>
                                                <p className="text-sm text-text-secondary">オンにすると、あなたが承認した人のみがあなたの投稿を見ることができます。</p>
                                            </div>
                                            <button className="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-gray-600 transition-colors duration-200">
                                                <span className="inline-block h-5 w-5 transform rounded-full bg-white shadow transition duration-200 translate-x-0" />
                                            </button>
                                        </div>
                                        <div>
                                            <p className="font-medium mb-2">ブロックしたアカウント</p>
                                            <p className="text-sm text-text-secondary mb-4">ブロックしたアカウントはあなたの投稿を見たり、あなたに連絡したりできなくなります。</p>
                                            <button className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors">
                                                ブロックリストを管理
                                            </button>
                                        </div>
                                    </div>
                                </section>
                            )}

                            {/* Security Section */}
                            {activeSection === 'security' && (
                                <section className="flex flex-col gap-6 p-6 rounded-xl bg-surface-dark border border-white/10">
                                    <div className="flex flex-wrap justify-between gap-3 pb-4 border-b border-white/10">
                                        <div className="flex flex-col gap-2">
                                            <p className="text-2xl font-bold">セキュリティ</p>
                                            <p className="text-text-secondary text-base">パスワードの変更とアカウントの保護。</p>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4">
                                        <label className="flex flex-col">
                                            <p className="text-sm font-medium pb-2">現在のパスワード</p>
                                            <input
                                                type="password"
                                                className="px-4 py-3 rounded-lg bg-background-dark border border-white/20 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/50"
                                                defaultValue="••••••••••"
                                            />
                                        </label>
                                        <div></div>
                                        <label className="flex flex-col">
                                            <p className="text-sm font-medium pb-2">新しいパスワード</p>
                                            <input
                                                type="password"
                                                placeholder="新しいパスワードを入力"
                                                className="px-4 py-3 rounded-lg bg-background-dark border border-white/20 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/50"
                                            />
                                        </label>
                                        <label className="flex flex-col">
                                            <p className="text-sm font-medium pb-2">新しいパスワードの確認</p>
                                            <input
                                                type="password"
                                                placeholder="パスワードを再入力"
                                                className="px-4 py-3 rounded-lg bg-background-dark border border-white/20 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/50"
                                            />
                                        </label>
                                    </div>
                                    <div className="flex justify-end gap-4 p-4 mt-4 border-t border-white/10">
                                        <button className="px-4 py-2 bg-primary hover:bg-primary/90 text-background-dark rounded-lg transition-colors font-bold">
                                            パスワードを更新
                                        </button>
                                    </div>
                                </section>
                            )}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
