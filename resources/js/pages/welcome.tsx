import { Link, usePage } from '@inertiajs/react';
import { Head } from '@inertiajs/react';

export default function Welcome() {
    const { auth } = usePage().props as any;

    return (
        <>
            <Head title="DreamCakes" />
            <div className="min-h-screen bg-gray-950 text-white flex flex-col">

                {/* Navbar */}
                <nav className="px-8 py-5 flex justify-between items-center border-b border-gray-800">
                    <div className="flex items-center gap-2">
                        <span className="text-2xl">🍰</span>
                        <span className="text-xl font-bold text-white tracking-tight">DreamCakes</span>
                    </div>
                </nav>

                {/* Hero */}
                <div className="flex-1 flex flex-col items-center justify-center text-center px-6 py-24">
                    <div className="inline-block bg-pink-500/10 border border-pink-500/20 text-pink-400 px-4 py-1 rounded-full text-sm font-medium mb-8">
                        Ëmbëlsi e freskët, e sjellë tek ju.
                    </div>
                    <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight tracking-tight">
                        Çdo tortë, e krijuar me <br />
                        <span className="text-pink-500">dashuri & pasion</span>
                    </h1>
                    <p className="text-gray-400 text-xl mb-10 max-w-md">
                        Porosit online tortën e ëndrrave tua. Të freskëta çdo ditë, të sjella me shumë kujdes.
                    </p>
                    <div className="flex gap-4">
                        {auth?.user ? (
                            <Link
                                href="/cakes"
                                className="bg-pink-500 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-pink-600 transition"
                            >
                                Shiko Tortat →
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href="/register"
                                    className="bg-pink-500 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-pink-600 transition"
                                >
                                    Regjistrohu
                                </Link>
                                
                                <Link
                                    href="/login"
                                    className="bg-pink-500 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-pink-600 transition"
                                >
                                    Kyçu
                                </Link>
                            </>
                        )}
                    </div>
                </div>

                {/* Footer */}
                <div className="text-center py-5 text-gray-600 text-sm border-t border-gray-800">
                    © 2026 DreamCakes. All rights reserved.
                </div>
            </div>
        </>
    );
}