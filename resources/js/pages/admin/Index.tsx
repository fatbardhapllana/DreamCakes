import { useState } from 'react';
import { router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';

interface Cake {
    id: number;
    name: string;
    price: number;
    category: string;
    is_available: boolean;
}

interface OrderItem {
    id: number;
    quantity: number;
    price: number;
    cake: Cake;
}

interface Order {
    id: number;
    total_price: number;
    status: string;
    notes: string;
    created_at: string;
    user: {
        name: string;
        email: string;
    };
    items: OrderItem[];
}

interface Props {
    orders: Order[];
    cakes: Cake[];
    filterStatus: string;
}

export default function AdminIndex({ orders, cakes, filterStatus }: Props) {
    const [expandedOrder, setExpandedOrder] = useState<number | null>(null);

    const handleStatusChange = (orderId: number, status: string) => {
        router.patch(`/admin/orders/${orderId}/status`, { status });
    };

    const handleDeleteOrder = (id: number) => {
        if (confirm('A je i sigurt qe deshiron ta fshish kete porosi?')) {
            router.delete(`/admin/orders/${id}`);
        }
    };

    const handleDeleteCake = (id: number) => {
        if (confirm('A je i sigurt qe deshiron ta fshish kete torte?')) {
            router.delete(`/cakes/${id}`);
        }
    };

    const handleFilterStatus = (status: string) => {
        router.get('/admin', { status });
    };

    const getStatusBadge = (status: string) => {
        const styles: Record<string, string> = {
            pending: 'bg-yellow-100 text-yellow-700',
            confirmed: 'bg-blue-100 text-blue-700',
            delivered: 'bg-green-100 text-green-700',
            cancelled: 'bg-red-100 text-red-700',
        };
        const labels: Record<string, string> = {
            pending: 'Ne pritje',
            confirmed: 'Konfirmuar',
            delivered: 'Dorezuar',
            cancelled: 'Anuluar',
        };
        return (
            <span className={`text-xs px-2 py-1 rounded-full font-medium ${styles[status] || 'bg-gray-100'}`}>
                {labels[status] || status}
            </span>
        );
    };

    return (
        <AppLayout>
            <div className="p-6">
                <h1 className="text-3xl font-bold mb-8">Paneli i Adminit</h1>

                <div className="mb-10">
                    <h2 className="text-2xl font-bold mb-4">Porositë</h2>

                    <div className="flex gap-2 mb-4 flex-wrap">
                        {['', 'pending', 'confirmed', 'delivered', 'cancelled'].map((status) => (
                            <button
                                key={status}
                                onClick={() => handleFilterStatus(status)}
                                className={`px-4 py-1.5 rounded-full text-sm font-medium transition ${
                                    filterStatus === status
                                        ? 'bg-pink-500 text-white'
                                        : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                                }`}
                            >
                                {status === '' ? 'Te gjitha' :
                                 status === 'pending' ? 'Ne pritje' :
                                 status === 'confirmed' ? 'Konfirmuar' :
                                 status === 'delivered' ? 'Dorezuar' : 'Anuluar'}
                            </button>
                        ))}
                    </div>

                    {orders.length === 0 ? (
                        <p className="text-gray-500">Nuk ka porosi.</p>
                    ) : (
                        <div className="space-y-3">
                            {orders.map((order) => (
                                <div key={order.id} className="border border-gray-800 rounded-lg shadow-sm overflow-hidden bg-gray-900">
                                    <div className="p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                                        <div>
                                            <p className="font-bold">Porosia #{order.id}</p>
                                            <p className="text-sm text-gray-500">{order.user?.name} - {order.user?.email}</p>
                                            <p className="text-pink-500 font-bold">{order.total_price} EUR</p>
                                            <p className="text-gray-400 text-xs">{new Date(order.created_at).toLocaleDateString('sq-AL')}</p>
                                        </div>
                                        <div className="flex items-center gap-2 flex-wrap">
                                            {getStatusBadge(order.status)}
                                            <select
                                                defaultValue={order.status}
                                                onChange={(e) => handleStatusChange(order.id, e.target.value)}
                                                className="bg-gray-800 border border-gray-700 text-white rounded px-2 py-1 text-sm"
                                            >
                                                <option value="pending">Ne pritje</option>
                                                <option value="confirmed">Konfirmuar</option>
                                                <option value="delivered">Dorezuar</option>
                                                <option value="cancelled">Anuluar</option>
                                            </select>
                                            <button
                                                onClick={() => setExpandedOrder(expandedOrder === order.id ? null : order.id)}
                                                className="bg-gray-700 text-gray-300 px-3 py-1 rounded text-sm hover:bg-gray-600"
                                            >
                                                {expandedOrder === order.id ? 'Mbyll' : 'Detaje'}
                                            </button>
                                            <button
                                                onClick={() => handleDeleteOrder(order.id)}
                                                className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
                                            >
                                                Fshi
                                            </button>
                                        </div>
                                    </div>

                                    {expandedOrder === order.id && (
                                        <div className="border-t border-gray-800 bg-gray-950 p-4">
                                            <p className="font-medium text-sm mb-2 text-gray-300">Tortat e porositura:</p>
                                            <div className="space-y-2">
                                                {order.items?.length > 0 ? order.items.map((item) => (
                                                    <div key={item.id} className="flex justify-between items-center bg-gray-900 rounded p-2 border border-gray-800 text-sm">
                                                        <span className="font-medium text-white">{item.cake?.name}</span>
                                                        <span className="text-gray-400">x{item.quantity}</span>
                                                        <span className="text-pink-500 font-bold">{item.price * item.quantity} EUR</span>
                                                    </div>
                                                )) : (
                                                    <p className="text-gray-400 text-sm">Nuk ka detaje te disponueshme.</p>
                                                )}
                                            </div>
                                            {order.notes && (
                                                <p className="text-gray-400 text-sm mt-3">Shenime: {order.notes}</p>
                                            )}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div>
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-2xl font-bold">Menaxho Tortat</h2>
                        <button
                            onClick={() => router.get('/cakes/create')}
                            className="bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-pink-600"
                        >
                            + Shto Torte
                        </button>
                    </div>
                    <div className="space-y-3">
                        {cakes.map((cake) => (
                            <div key={cake.id} className="border border-gray-800 rounded-lg p-4 shadow-sm flex justify-between items-center bg-gray-900">
                                <div>
                                    <p className="font-semibold text-white">{cake.name}</p>
                                    <p className="text-pink-500 font-bold">{cake.price} EUR</p>
                                    <p className="text-gray-400 text-xs">Kategoria: {cake.category}</p>
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => router.get(`/cakes/${cake.id}/edit`)}
                                        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 text-sm"
                                    >
                                        Edito
                                    </button>
                                    <button
                                        onClick={() => handleDeleteCake(cake.id)}
                                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm"
                                    >
                                        Fshi
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}