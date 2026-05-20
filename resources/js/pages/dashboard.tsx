import { Head, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';

interface Order {
    id: number;
    total_price: number;
    status: string;
    created_at: string;
}

interface Props {
    totalCakes: number;
    totalOrders: number;
    isAdmin: boolean;
    activeOrder: Order | null;
}

export default function Dashboard({ totalCakes, totalOrders, isAdmin, activeOrder }: Props) {
    const getStatusLabel = (status: string) => {
        const labels: Record<string, string> = {
            pending: 'Ne pritje',
            confirmed: 'Konfirmuar',
            delivered: 'Dorezuar',
            cancelled: 'Anuluar',
        };
        return labels[status] || status;
    };

    const getStatusColor = (status: string) => {
        if (status === 'pending') return 'text-yellow-400';
        if (status === 'confirmed') return 'text-blue-400';
        return 'text-green-400';
    };

    return (
        <AppLayout>
            <Head title="Ballina" />
            <div className="min-h-screen bg-gray-950 text-white p-6">

                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-white">Mirë se erdhe në DreamCakes! 🍰</h1>
                    <p className="text-gray-400 mt-1">
                        {isAdmin ? 'Menaxho DreamCakes nga paneli i adminit.' : 'Porosit tortat tona të freskëta.'}
                    </p>
                </div>

                {/* Admin Stats */}
                {isAdmin && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 text-center">
                            <p className="text-4xl font-bold text-pink-500">{totalCakes}</p>
                            <p className="text-gray-400 mt-1 text-sm">Torta në Menu</p>
                        </div>
                        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 text-center">
                            <p className="text-4xl font-bold text-pink-500">{totalOrders}</p>
                            <p className="text-gray-400 mt-1 text-sm">Porosi Totale</p>
                        </div>
                    </div>
                )}

                {/* Admin Buttons */}
                {isAdmin && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                        <button
                            onClick={() => router.get('/cakes')}
                            className="bg-gray-900 border border-gray-800 rounded-xl p-5 text-left hover:border-pink-500 transition group"
                        >
                            <p className="text-2xl mb-2">🍰</p>
                            <p className="font-bold text-white group-hover:text-pink-400">Shiko Tortat</p>
                            <p className="text-gray-500 text-sm">Shfleto listën e tortave</p>
                        </button>
                        <button
                            onClick={() => router.get('/admin')}
                            className="bg-gray-900 border border-gray-800 rounded-xl p-5 text-left hover:border-pink-500 transition group"
                        >
                            <p className="text-2xl mb-2">⚙️</p>
                            <p className="font-bold text-white group-hover:text-pink-400">Paneli Admin</p>
                            <p className="text-gray-500 text-sm">Menaxho tortat dhe porositë</p>
                        </button>
                    </div>
                )}

                {/* Customer Content */}
                {!isAdmin && (
                    <>
                        {/* Banner */}
                        <div className="bg-pink-600 rounded-xl p-6 mb-8 flex items-center justify-between">
                            <div>
                                <p className="text-white font-bold text-xl mb-1">Porosit sot dhe merr dorëzim falas!</p>
                                <p className="text-pink-100 text-sm">Oferta e limituar — vlefshme vetëm sot</p>
                            </div>
                            <button
                                onClick={() => router.get('/cakes')}
                                className="bg-white text-pink-600 px-5 py-2 rounded-lg font-bold hover:bg-pink-50 transition whitespace-nowrap ml-4"
                            >
                                Porosit Tani
                            </button>
                        </div>

                        {/* Porosia Aktive */}
                        {activeOrder && (
                            <div className="mb-8">
                                <h2 className="text-lg font-semibold text-gray-300 mb-3">Porosia Aktive</h2>
                                <div className="bg-gray-900 border border-gray-800 rounded-xl p-5 flex justify-between items-center">
                                    <div>
                                        <p className="font-bold text-white">Porosia #{activeOrder.id}</p>
                                        <p className={`font-medium text-sm mt-1 ${getStatusColor(activeOrder.status)}`}>
                                            {getStatusLabel(activeOrder.status)}
                                        </p>
                                        <p className="text-pink-500 font-bold mt-1">{activeOrder.total_price} EUR</p>
                                        <p className="text-gray-500 text-xs mt-1">
                                            {new Date(activeOrder.created_at).toLocaleDateString('sq-AL')}
                                        </p>
                                    </div>
                                    <button
                                        onClick={() => router.get('/orders')}
                                        className="bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-pink-600 transition text-sm font-medium"
                                    >
                                        Shiko Detajet
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Pse DreamCakes */}
                        <div className="mb-8">
                            <h2 className="text-lg font-semibold text-gray-300 mb-4">Pse DreamCakes?</h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 text-center">
                                    <p className="text-4xl mb-3">🎂</p>
                                    <p className="font-bold text-white mb-1">Freskëta cdo ditë</p>
                                    <p className="text-gray-500 text-sm">Të bëra me ingredientë natyralë dhe me dashuri</p>
                                </div>
                                <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 text-center">
                                    <p className="text-4xl mb-3">🛒</p>
                                    <p className="font-bold text-white mb-1">Porosi e lehtë</p>
                                    <p className="text-gray-500 text-sm">Porosit online dhe merr konfirmim menjeherë</p>
                                </div>
                                <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 text-center">
                                    <p className="text-4xl mb-3">🚚</p>
                                    <p className="font-bold text-white mb-1">Dorëzim i shpejtë</p>
                                    <p className="text-gray-500 text-sm">Dorezojmë drejt te dera juaj</p>
                                </div>
                            </div>
                        </div>

                        {/* Kontakti */}
                        <div className="border border-gray-800 rounded-xl p-6 bg-gray-900">
                            <h2 className="text-lg font-semibold text-white mb-4">Na Kontakto</h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="flex items-center gap-3">
                                    <span className="text-2xl">📞</span>
                                    <div>
                                        <p className="text-gray-400 text-xs">Telefoni</p>
                                        <p className="text-white font-medium">+383 44 123 456</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="text-2xl">📸</span>
                                    <div>
                                        <p className="text-gray-400 text-xs">Instagram</p>
                                        <p className="text-pink-400 font-medium">@dreamcakes</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="text-2xl">✉️</span>
                                    <div>
                                        <p className="text-gray-400 text-xs">Email</p>
                                        <p className="text-white font-medium">info@dreamcakes.com</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </AppLayout>
    );
}