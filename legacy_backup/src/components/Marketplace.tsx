import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const mockListings = [
    { id: 1, title: 'ガーデンデザインのヘルプが必要', user: '田中 由紀', tags: 'ガーデニング, デザイン', image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400' },
    { id: 2, title: '日本語の家庭教師を探しています', user: '伊藤 春', tags: '言語, 家庭教師', image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400' },
    { id: 3, title: '平日午後の犬の散歩が必要', user: '佐藤 愛理', tags: 'ペット, 犬の散歩', image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400' },
    { id: 4, title: 'ソファの移動を手伝ってください', user: '鈴木 海斗', tags: '力仕事, 引っ越し', image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400' },
    { id: 5, title: '小規模イベントの写真家を募集', user: '高橋 凛', tags: '写真撮影, イベント', image: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=400' },
    { id: 6, title: 'ウェブサイトデザインの相談', user: '渡辺 颯太', tags: 'ウェブデザイン, UX', image: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=400' },
    { id: 7, title: 'IKEA家具の組み立てが必要', user: '中村 芽衣', tags: '家具, 組み立て', image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400' },
    { id: 8, title: '手作りバースデーケーキのリクエスト', user: '山本 蓮', tags: 'ベーキング, 料理', image: 'https://images.unsplash.com/photo-1558636508-e0db3814bd1d?w=400' },
];

export default function Marketplace() {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('find');
    const [searchQuery, setSearchQuery] = useState('');

    const filteredListings = mockListings.filter(listing =>
        listing.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        listing.tags.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="dark">
            <div className="min-h-screen bg-background-dark text-white pb-24">
                {/* Header */}
                <header className="flex h-16 w-full items-center justify-between px-4 md:px-10 border-b border-white/10 bg-background-dark/80 backdrop-blur-sm sticky top-0 z-10">
                    <button onClick={() => navigate('/')} className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-3xl text-primary">local_florist</span>
                        <span className="text-xl font-bold">Kizuna</span>
                    </button>
                    <nav className="hidden md:flex items-center gap-6">
                        <button onClick={() => navigate('/')} className="text-sm font-medium hover:text-primary transition-colors">
                            ホーム
                        </button>
                        <button className="text-sm font-bold text-primary">マーケットプレイス</button>
                    </nav>
                    <div className="flex items-center gap-3">
                        <button className="flex items-center justify-center rounded-full h-10 w-10 bg-surface-dark">
                            <span className="material-symbols-outlined">notifications</span>
                        </button>
                        <button onClick={() => navigate('/profile')} className="flex items-center justify-center rounded-full h-10 w-10 bg-surface-dark">
                            <span className="material-symbols-outlined">person</span>
                        </button>
                    </div>
                </header>

                <main className="flex flex-1 justify-center py-5">
                    <div className="flex flex-col w-full max-w-5xl px-4 md:px-10">
                        {/* Page Header */}
                        <header className="flex items-center justify-between border-b border-white/10 px-0 md:px-10 py-3 mb-4">
                            <div className="flex items-center gap-4">
                                <span className="material-symbols-outlined text-primary">local_florist</span>
                                <h1 className="text-xl font-bold">マーケットプレイス</h1>
                            </div>
                            <button className="flex items-center gap-2 px-5 py-3 bg-primary text-background-dark rounded-full font-bold shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 transition-shadow">
                                <span className="material-symbols-outlined text-2xl">add_circle</span>
                                <span className="hidden sm:inline">出品する</span>
                            </button>
                        </header>

                        {/* Tab Toggle */}
                        <div className="flex px-0 md:px-4 py-3">
                            <div className="flex h-10 flex-1 items-center justify-center rounded-xl bg-surface-dark p-1">
                                <button
                                    onClick={() => setActiveTab('find')}
                                    className={`flex h-full grow items-center justify-center rounded-lg px-2 text-sm font-medium transition-all ${activeTab === 'find' ? 'bg-background-dark shadow text-white' : 'text-text-secondary'
                                        }`}
                                >
                                    探す
                                </button>
                                <button
                                    onClick={() => setActiveTab('offer')}
                                    className={`flex h-full grow items-center justify-center rounded-lg px-2 text-sm font-medium transition-all ${activeTab === 'offer' ? 'bg-background-dark shadow text-white' : 'text-text-secondary'
                                        }`}
                                >
                                    提供する
                                </button>
                            </div>
                        </div>

                        {/* Search Bar */}
                        <div className="px-0 md:px-4 py-3">
                            <div className="flex items-stretch rounded-xl h-12 bg-surface-dark">
                                <div className="flex items-center justify-center pl-4">
                                    <span className="material-symbols-outlined text-text-secondary">search</span>
                                </div>
                                <input
                                    className="flex-1 bg-transparent px-4 focus:outline-none text-white placeholder:text-text-secondary"
                                    placeholder="スキル、キーワードで検索"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                        </div>

                        {/* Filters */}
                        <div className="flex gap-3 px-0 md:px-4 py-3 overflow-x-auto">
                            <button className="flex h-8 shrink-0 items-center gap-2 rounded-full bg-surface-dark pl-4 pr-2">
                                <p className="text-sm font-medium">カテゴリー</p>
                                <span className="material-symbols-outlined text-lg text-text-secondary">arrow_drop_down</span>
                            </button>
                            <button className="flex h-8 shrink-0 items-center gap-2 rounded-full bg-surface-dark pl-4 pr-2">
                                <p className="text-sm font-medium">距離</p>
                                <span className="material-symbols-outlined text-lg text-text-secondary">arrow_drop_down</span>
                            </button>
                        </div>

                        {/* Listings Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-0 md:p-4">
                            {filteredListings.map((listing) => (
                                <div key={listing.id} className="flex flex-col gap-3 pb-3 cursor-pointer hover:opacity-80 transition-opacity">
                                    <div
                                        className="w-full aspect-[3/4] bg-cover bg-center rounded-xl"
                                        style={{ backgroundImage: `url(${listing.image})` }}
                                    />
                                    <div>
                                        <p className="text-base font-medium">{listing.title}</p>
                                        <p className="text-sm text-text-secondary">{listing.user}</p>
                                        <p className="text-sm text-text-secondary">{listing.tags}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
