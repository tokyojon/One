'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Auth from './Auth';

export default function LandingPage() {
    const [showAuth, setShowAuth] = useState(false);
    const [authMode, setAuthMode] = useState<'login' | 'register'>('register');

    const handleAuthClick = (mode: 'login' | 'register') => {
        setAuthMode(mode);
        setShowAuth(true);
    };

    if (showAuth) {
        return <Auth initialMode={authMode} />;
    }

    return (
        <div className="min-h-screen flex flex-col">
            {/* Header */}
            <header className="sticky top-0 z-50 w-full transition-colors duration-300 bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg">
                <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
                    <Link className="flex items-center gap-2 font-bold text-lg" href="/">
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8">
                            <defs>
                                <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" style={{ stopColor: '#fbbf24', stopOpacity: 1 }} />
                                    <stop offset="100%" style={{ stopColor: '#f59e0b', stopOpacity: 1 }} />
                                </linearGradient>
                            </defs>
                            <path
                                d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2Z"
                                stroke="url(#grad1)"
                                strokeWidth="1.5"
                            />
                            <path d="M12 6V18M18 12H6" stroke="url(#grad1)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path
                                d="M12 12C14.2091 12 16 10.2091 16 8C16 5.79086 14.2091 4 12 4C9.79086 4 8 5.79086 8 8C8 10.2091 9.79086 12 12 12Z"
                                transform="rotate(45 12 12)"
                                stroke="url(#grad1)"
                                strokeWidth="1.5"
                                strokeOpacity="0.7"
                            />
                        </svg>
                        <span>ワンネスキングダム</span>
                    </Link>
                    <nav className="flex items-center gap-4">
                        <button
                            onClick={() => handleAuthClick('login')}
                            className="px-4 py-2 rounded-md hover:bg-white/10 transition-colors"
                        >
                            ログイン
                        </button>
                        <button
                            onClick={() => handleAuthClick('register')}
                            className="px-4 py-2 bg-white/90 text-purple-600 hover:bg-white rounded-md transition-colors font-medium"
                        >
                            登録
                        </button>
                    </nav>
                </div>
            </header>

            <main className="flex-grow">
                {/* Hero Section */}
                <section className="relative w-full h-[60vh] md:h-[80vh] flex items-center justify-center text-center text-white overflow-hidden">
                    <div className="absolute inset-0">
                        <Image
                            src="/hero-image.png"
                            alt="Hero Background"
                            fill
                            className="object-cover object-center"
                            priority
                        />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-900/60 via-blue-900/50 to-indigo-900/60"></div>
                    <div className="relative z-10 p-4 max-w-4xl mx-auto animate-fade-in">
                        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4 drop-shadow-lg">ワンネスキングダムへようこそ</h1>
                        <p className="text-lg md:text-2xl mb-8 text-white/95 drop-shadow-md">
                            貢献、つながり、愛、平和、そして調和に基づく新しいソーシャルモデル。
                        </p>
                        <button
                            onClick={() => handleAuthClick('register')}
                            className="px-8 py-3 bg-white text-purple-600 hover:bg-gray-100 rounded-md transition-all duration-300 hover:scale-105 font-medium text-lg shadow-lg"
                        >
                            私たちの王国に参加する
                        </button>
                    </div>
                </section>

                {/* Features Section */}
                <section id="features" className="w-full py-16 md:py-24 bg-gray-50">
                    <div className="container mx-auto px-4">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-bold mb-4">愛と貢献のメタソーシャルプラットフォーム</h2>
                            <p className="text-gray-600 max-w-2xl mx-auto">
                                私たちは、価値が経済力や軍事力ではなく、愛とつながりによって定義される新しい国際コミュニティ国家を構築しています。
                            </p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="rounded-lg border bg-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 p-6">
                                <div className="text-center">
                                    <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <span className="text-3xl">💝</span>
                                    </div>
                                    <h3 className="text-2xl font-semibold mb-3">貢献とつながり</h3>
                                    <p className="text-gray-600">あなたの愛、学び、貢献の行動は、私たちのコミュニティ内で価値として視覚化され、循環します。</p>
                                </div>
                            </div>
                            <div className="rounded-lg border bg-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 p-6">
                                <div className="text-center">
                                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <span className="text-3xl">🌐</span>
                                    </div>
                                    <h3 className="text-2xl font-semibold mb-3">ヒューマンネットワークの構築</h3>
                                    <p className="text-gray-600">フォロー、評価、推薦を通じて有意義な関係を築き、デジタルな家族の絆さえも形成します。</p>
                                </div>
                            </div>
                            <div className="rounded-lg border bg-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 p-6">
                                <div className="text-center">
                                    <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <span className="text-3xl">🤖</span>
                                    </div>
                                    <h3 className="text-2xl font-semibold mb-3">AIを活用したコミュニティ</h3>
                                    <p className="text-gray-600">
                                        私たちのプラットフォームは、公正なマッチング、推薦、そして私たちの王国の安全と調和を確保するためにAIを使用しています。
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* How to Become a Citizen */}
                <section className="w-full py-16 md:py-24 bg-white">
                    <div className="container mx-auto px-4">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-bold mb-4">市民になる方法</h2>
                            <p className="text-gray-600 max-w-2xl mx-auto">ワンネスキングダムでの旅を始めるには、これらの簡単な手順に従ってください。</p>
                        </div>
                        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                            <div className="flex flex-col items-center">
                                <div className="w-16 h-16 bg-purple-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mb-4 shadow-lg">
                                    1
                                </div>
                                <h3 className="text-xl font-semibold mb-2">アカウントを登録</h3>
                                <p className="text-gray-600">あなたのプロフィールを作成し、ワンネスへの旅を始めましょう。</p>
                            </div>
                            <div className="flex flex-col items-center">
                                <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mb-4 shadow-lg">
                                    2
                                </div>
                                <h3 className="text-xl font-semibold mb-2">AIによる認証</h3>
                                <p className="text-gray-600">高度なAI強化認証プロセスであなたの身元を保護します。</p>
                            </div>
                            <div className="flex flex-col items-center">
                                <div className="w-16 h-16 bg-indigo-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mb-4 shadow-lg">
                                    3
                                </div>
                                <h3 className="text-xl font-semibold mb-2">貢献し、繁栄する</h3>
                                <p className="text-gray-600">コミュニティと関わり、あなたの才能を分かち合い、王国の中で成長してください。</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* OP System Section */}
                <section className="w-full py-16 md:py-24 bg-gradient-to-br from-amber-50 to-orange-50">
                    <div className="container mx-auto px-4">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-bold mb-4">🪙 OP制度</h2>
                            <p className="text-gray-700 max-w-3xl mx-auto text-lg">
                                愛・平和・調和・貢献を基準に、会員が提供・共有・成長を通してポイント（価値）を循環させる仕組みです。
                            </p>
                        </div>
                        <div className="max-w-6xl mx-auto space-y-8">
                            <div className="rounded-lg border bg-white shadow-xl p-6">
                                <h3 className="text-2xl font-semibold mb-4">基本理念</h3>
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <h4 className="font-semibold text-lg mb-2">💱 基本情報</h4>
                                        <ul className="space-y-2 text-gray-600">
                                            <li>• <strong>通貨名:</strong> OP</li>
                                            <li>• <strong>換算レート:</strong> 1 OP = 100円</li>
                                            <li>• <strong>会員登録:</strong> 無料</li>
                                            <li>• <strong>最終目標:</strong> 「王様の王様」= 真のワンネス達成者</li>
                                        </ul>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-lg mb-2">✨ 7つの軸</h4>
                                        <div className="grid grid-cols-2 gap-2 text-sm">
                                            <div className="bg-amber-100 p-2 rounded text-center">愛</div>
                                            <div className="bg-blue-100 p-2 rounded text-center">知恵</div>
                                            <div className="bg-green-100 p-2 rounded text-center">公正</div>
                                            <div className="bg-red-100 p-2 rounded text-center">力</div>
                                            <div className="bg-purple-100 p-2 rounded text-center">超能力</div>
                                            <div className="bg-pink-100 p-2 rounded text-center">治療</div>
                                            <div className="bg-indigo-100 p-2 rounded col-span-2 text-center">審判</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="rounded-lg border bg-white shadow-lg p-6">
                                    <h3 className="text-xl font-semibold mb-4">🎯 基本活動ポイント</h3>
                                    <div className="space-y-3">
                                        <div className="flex justify-between items-center p-3 rounded-lg bg-gray-50">
                                            <span className="text-sm">提供登録（AI審査通過）</span>
                                            <span className="font-semibold text-purple-600">+1 OP</span>
                                        </div>
                                        <div className="flex justify-between items-center p-3 rounded-lg bg-gray-50">
                                            <span className="text-sm">紹介成功</span>
                                            <span className="font-semibold text-purple-600">+1 OP</span>
                                        </div>
                                        <div className="flex justify-between items-center p-3 rounded-lg bg-gray-50">
                                            <span className="text-sm">会員同士が繋がる</span>
                                            <span className="font-semibold text-purple-600">+1 OP</span>
                                        </div>
                                        <div className="flex justify-between items-center p-3 rounded-lg bg-gray-50">
                                            <span className="text-sm">寄付を行う</span>
                                            <span className="font-semibold text-purple-600">+1 OP</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="rounded-lg border bg-white shadow-lg p-6">
                                    <h3 className="text-xl font-semibold mb-4">❤️ 家族制度ポイント</h3>
                                    <div className="space-y-3">
                                        <div className="flex justify-between items-center p-3 rounded-lg bg-gray-50">
                                            <span className="text-sm">夫・妻になる</span>
                                            <span className="font-semibold text-purple-600">+10 OP</span>
                                        </div>
                                        <div className="flex justify-between items-center p-3 rounded-lg bg-amber-100 border-2 border-amber-300">
                                            <span className="text-sm">夫婦になる</span>
                                            <span className="font-semibold text-amber-700">+200 OP</span>
                                        </div>
                                        <div className="flex justify-between items-center p-3 rounded-lg bg-gray-50">
                                            <span className="text-sm">子供になる</span>
                                            <span className="font-semibold text-purple-600">+10 OP</span>
                                        </div>
                                        <div className="flex justify-between items-center p-3 rounded-lg bg-gray-50">
                                            <span className="text-sm">兄弟・姉妹になる</span>
                                            <span className="font-semibold text-purple-600">+10 OP</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="rounded-lg border bg-gradient-to-br from-amber-100 to-yellow-100 shadow-xl p-6">
                                <h3 className="text-2xl font-semibold mb-4">👑 称号制度</h3>
                                <p className="text-gray-700 mb-4">
                                    貢献度と累計ポイントにより称号を自動認定します。各7軸（愛・知恵・公正・力・超能力・治療・審判）に対して3段階の称号があります。
                                </p>
                                <div className="grid md:grid-cols-3 gap-4">
                                    <div className="bg-white p-4 rounded-lg shadow-md border-2 border-amber-200">
                                        <h4 className="text-xl font-bold mb-2">賢者</h4>
                                        <p className="text-purple-600 font-semibold mb-1">1,000 OP</p>
                                        <p className="text-sm text-gray-600">各軸の賢者として認定</p>
                                    </div>
                                    <div className="bg-white p-4 rounded-lg shadow-md border-2 border-amber-200">
                                        <h4 className="text-xl font-bold mb-2">君</h4>
                                        <p className="text-purple-600 font-semibold mb-1">10,000 OP</p>
                                        <p className="text-sm text-gray-600">各軸の君として認定</p>
                                    </div>
                                    <div className="bg-white p-4 rounded-lg shadow-md border-2 border-amber-200">
                                        <h4 className="text-xl font-bold mb-2">王様</h4>
                                        <p className="text-purple-600 font-semibold mb-1">100,000 OP</p>
                                        <p className="text-sm text-gray-600">各軸の王様として認定</p>
                                    </div>
                                </div>
                                <div className="mt-6 p-4 bg-white rounded-lg border-2 border-amber-300">
                                    <p className="font-semibold text-center text-lg">🌟 最高称号: 王様の王様 - 1,000,000 OP 🌟</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="w-full py-16 md:py-24 bg-gradient-to-br from-purple-600 to-blue-600 text-white">
                    <div className="container mx-auto px-4 text-center">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">世界を変える準備はできていますか？</h2>
                        <p className="max-w-2xl mx-auto mb-8 text-white/90">
                            愛、平和、調和の基盤の上に築かれた社会を創造することに専念する世界的な運動に参加してください。あなたの旅は今始まります。
                        </p>
                        <button
                            onClick={() => handleAuthClick('register')}
                            className="px-8 py-3 bg-white text-purple-600 hover:bg-gray-100 rounded-md transition-all duration-300 hover:scale-105 font-medium text-lg shadow-lg"
                        >
                            あなたの旅を始める
                        </button>
                    </div>
                </section>
            </main>
        </div>
    );
}
