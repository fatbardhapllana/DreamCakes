import { router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';

interface Order {
    id: number;
    total_price: number;
    status: string;
    notes: string;
    created_at: string;
}

interface Props {
    orders: Order[];
}

export default function OrdersIndex({ orders }: Props) {
    const getStatusBadge = (status: string) => {
        const styles: Record<string, string> = {
            pending: 'bg-yellow-100 text-yellow-700',
            confirmed: 'bg-blue-100 text-blue-700',
            delivered: 'bg-green-100 text-green-700',
            cancelled: 'bg-red-100 text-red-700',
        };
        const labels: Record<string, string> = {
            pending: 'Në pritje',
            confirmed: 'Konfirmuar',
            delivered: 'Dorëzuar',
            cancelled: 'Anuluar',
        };
        return (
            <span className={`text-xs px-2 py-1 rounded-full font-medium ${styles[status] || 'bg-gray-100 text-gray-700'}`}>
                {labels[status] || status}
            </span>
        );
    };

    return (
        <AppLayout>
            <div className="p-6 max-w-3xl mx-auto">
                <h1 className="text-3xl font-bold mb-6">📦 Porositë e Mia</h1>

                {orders.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-gray-500 text-lg mb-4">Nuk ke porosi ende!</p>
                        <button
                            onClick={() => router.get('/cakes')}
                            className="bg-pink-500 text-white px-6 py-2 rounded-lg hover:bg-pink-600"
                        >
                            Shiko Tortat
                        </button>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {orders.map((order) => (
                            <div key={order.id} className="border rounded-lg p-4 shadow-sm">
                                <div className="flex justify-between items-center mb-2">
                                    <h2 className="font-bold text-lg">Porosia #{order.id}</h2>
                                    {getStatusBadge(order.status)}
                                </div>
                                <p className="text-pink-600 font-bold text-xl">{order.total_price} EUR</p>
                                {order.notes && (
                                    <p className="text-gray-500 text-sm mt-1">Shënime: {order.notes}</p>
                                )}
                                <p className="text-gray-400 text-xs mt-2">
                                    {new Date(order.created_at).toLocaleDateString('sq-AL')}
                                </p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </AppLayout>
    );
}