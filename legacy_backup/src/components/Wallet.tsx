import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const mockTransactions = [
    { id: 1, type: 'gift', title: '中村 優太さんからギフト', date: '2023年10月26日', amount: 500, positive: true },
    { id: 2, type: 'favorite', title: '投稿への「いいね！」', date: '2023年10月25日', amount: 10, positive: true },
    { id: 3, type: 'exchange', title: 'ONTへの変換', date: '2023年10月24日', amount: -1000, positive: false },
    { id: 4, type: 'login', title: 'ログインボーナス', date: '2023年10月23日', amount: 5, positive: true },
    { id: 5, type: 'gift', title: '田中さんへギフト送信', date: '2023年10月22日', amount: -100, positive: false },
    { id: 6, type: 'favorite', title: 'コメントへの返信', date: '2023年10月21日', amount: 15, positive: true },
];

const getIcon = (type: string) => {
    switch (type) {
        case 'gift':
            return 'card_giftcard';
        case 'favorite':
            return 'favorite';
        case 'exchange':
            return 'currency_exchange';
        case 'login':
            return 'login';
        default:
            return 'payments';
    }
};

export default function Wallet() {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('all');

    const totalPoints = 12405;
    const convertibleONT = 3000;

    const filteredTransactions = mockTransactions.filter((tx) => {
        if (activeTab === 'earned') return tx.positive;
        if (activeTab === 'spent') return !tx.positive;
        return true;
    });

    return (
        <div className="dark">
            <div className="min-h-screen bg-background-dark text-white">
                {/* Header */}
                <header className="sticky top-0 z-10 flex h-20 w-full items-center justify-center border-b border-white/10 bg-background-dark/80 backdrop-blur-lg">
                    <div className="flex h-full w-full max-w-[960px] items-center justify-between px-4">
                        <a className="text-2xl font-black" href="#" onClick={() => navigate('/')}>
                            Oneness
                        </a>
                        <nav className="hidden items-center gap-6 md:flex">
                            <button onClick={() => navigate('/')} className="text-sm font-bold text-white/60 hover:text-primary">
                                ホーム
                            </button>
                            <button onClick={() => navigate('/explore')} className="text-sm font-bold text-white/60 hover:text-primary">
                                発見
                            </button>
                            <button className="text-sm font-bold text-primary">ウォレット</button>
                        </nav>
                        <div className="flex items-center gap-4">
                            <button onClick={() => navigate('/profile')}>
                                <span className="material-symbols-outlined">notifications</span>
                            </button>
                            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary to-blue-500 flex items-center justify-center font-bold text-background-dark">
                                U
                            </div>
                        </div>
                    </div>
                </header>

                <main className="flex h-full grow flex-col">
                    <div className="flex flex-1 justify-center py-5 md:py-10">
                        <div className="flex flex-col max-w-[960px] flex-1 px-4 md:px-0">
                            {/* Back Button */}
                            <div className="flex justify-between gap-2 px-4 py-3 items-center">
                                <button onClick={() => navigate('/')} className="p-2">
                                    <span className="material-symbols-outlined text-2xl">arrow_back</span>
                                </button>
                            </div>

                            {/* Page Title */}
                            <div className="flex flex-wrap justify-between gap-3 p-4">
                                <p className="text-4xl font-black">ウォレット</p>
                            </div>

                            {/* Balance Card */}
                            <div className="p-4">
                                <div className="flex flex-col items-stretch justify-start rounded-xl bg-primary/20 p-6">
                                    <div className="flex w-full flex-col gap-2">
                                        <p className="text-primary/80 text-sm font-normal">現在のワンネスポイント (WNP)</p>
                                        <p className="text-4xl font-bold">{totalPoints.toLocaleString()}</p>
                                        <div className="flex items-end gap-3 justify-between mt-4">
                                            <div className="flex flex-col gap-1">
                                                <p className="text-primary/80 text-base font-normal">換金可能なONT</p>
                                                <p className="text-lg font-bold">{convertibleONT.toLocaleString()}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex justify-stretch">
                                <div className="flex flex-1 gap-3 flex-wrap px-4 py-3 justify-start">
                                    <button className="flex flex-1 min-w-[84px] items-center justify-center rounded-xl h-12 px-5 bg-primary text-background-dark font-bold hover:bg-primary/90 transition-colors">
                                        ポイントを送る
                                    </button>
                                    <button className="flex flex-1 min-w-[84px] items-center justify-center rounded-xl h-12 px-5 bg-white/10 hover:bg-white/20 font-bold transition-colors">
                                        ONTに変換
                                    </button>
                                </div>
                            </div>

                            {/* Transaction Tabs */}
                            <div className="pb-3 pt-6">
                                <div className="flex border-b border-white/10 px-4 gap-8">
                                    <button
                                        onClick={() => setActiveTab('all')}
                                        className={`flex flex-col items-center justify-center border-b-[3px] pb-[13px] pt-4 ${activeTab === 'all' ? 'border-b-primary text-primary' : 'border-b-transparent text-white/60'
                                            }`}
                                    >
                                        <p className="text-sm font-bold">すべて</p>
                                    </button>
                                    <button
                                        onClick={() => setActiveTab('earned')}
                                        className={`flex flex-col items-center justify-center border-b-[3px] pb-[13px] pt-4 ${activeTab === 'earned' ? 'border-b-primary text-primary' : 'border-b-transparent text-white/60'
                                            }`}
                                    >
                                        <p className="text-sm font-bold">獲得</p>
                                    </button>
                                    <button
                                        onClick={() => setActiveTab('spent')}
                                        className={`flex flex-col items-center justify-center border-b-[3px] pb-[13px] pt-4 ${activeTab === 'spent' ? 'border-b-primary text-primary' : 'border-b-transparent text-white/60'
                                            }`}
                                    >
                                        <p className="text-sm font-bold">使用</p>
                                    </button>
                                </div>
                            </div>

                            {/* Transaction List */}
                            <div className="flex flex-col gap-2 p-4">
                                {filteredTransactions.map((tx) => (
                                    <div key={tx.id} className="flex items-center gap-4 rounded-lg p-3 hover:bg-white/5 transition-colors">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10">
                                            <span className="material-symbols-outlined text-2xl">{getIcon(tx.type)}</span>
                                        </div>
                                        <div className="flex-grow">
                                            <p className="font-bold">{tx.title}</p>
                                            <p className="text-sm text-white/60">{tx.date}</p>
                                        </div>
                                        <p className={`font-bold ${tx.positive ? 'text-green-500' : 'text-red-500'}`}>
                                            {tx.positive ? '+' : ''}{tx.amount} WNP
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
