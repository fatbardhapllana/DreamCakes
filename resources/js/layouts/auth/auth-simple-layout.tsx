import { Link } from '@inertiajs/react';

interface AuthLayoutProps {
    children: React.ReactNode;
    title?: string;
    description?: string;
}

export default function AuthSimpleLayout({ children, title, description }: AuthLayoutProps) {
    return (
        <div className="min-h-screen bg-gray-950 flex items-center justify-center p-6">
            <div className="w-full max-w-sm">

                {/* Logo */}
                <div className="flex flex-col items-center mb-8">
                    <Link href="/" className="flex items-center gap-2 mb-6">
                        <span className="text-3xl">🍰</span>
                        <span className="text-2xl font-bold text-white tracking-tight">DreamCakes</span>
                    </Link>
                    <h1 className="text-2xl font-bold text-white">{title}</h1>
                    <p className="text-gray-400 text-sm mt-1 text-center">{description}</p>
                </div>

                {/* Card */}
                <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8">
                    {children}
                </div>

                {/* Back to home */}
                <p className="text-center text-gray-600 text-sm mt-6">
                    <Link href="/" className="hover:text-gray-400 transition">
                        ← Back to home
                    </Link>
                </p>
            </div>
        </div>
    );
}