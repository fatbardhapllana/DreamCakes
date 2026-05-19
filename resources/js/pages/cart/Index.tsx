import { useState } from 'react';
import { router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';

interface Cake {
    id: number;
    name: string;
    price: number;
}

interface CartItem {
    id: number;
    quantity: number;
    cake: Cake;
}

interface Props {
    items: CartItem[];
    total: number;
}

export default function CartIndex({ items, total }: Props) {
    const [showCheckout, setShowCheckout] = useState(false);
    const [form, setForm] = useState({
        address: '',
        phone: '',
        notes: '',
    });

    const handleRemove = (id: number) => {
        router.delete(`/cart/${id}`);
    };

    const handleCheckout = (e: React.FormEvent) => {
        e.preventDefault();
        router.post('/orders', { notes: `Adresa: ${form.address} | Tel: ${form.phone} | Shenime: ${form.notes}` });
    };

    const inputClass = "w-full bg-gray-800 border border-gray-700 text-white rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-pink-500 placeholder-gray-500";

    return (
        <AppLayout>
            <div className="p-6 max-w-3xl mx-auto">
                <h1 className="text-3xl font-bold mb-6">Shporta Ime</h1>

                {items.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-gray-500 text-lg mb-4">Shporta eshte bosh!</p>
                        <button
                            onClick={() => router.get('/cakes')}
                            className="bg-pink-500 text-white px-6 py-2 rounded-lg hover:bg-pink-600"
                        >
                            Shiko Tortat
                        </button>
                    </div>
                ) : (
                    <>
                        <div className="space-y-4 mb-6">
                            {items.map((item) => (
                                <div key={item.id} className="flex items-center justify-between border border-gray-800 rounded-lg p-4 bg-gray-900">
                                    <div>
                                        <h2 className="text-lg font-semibold text-white">{item.cake.name}</h2>
                                        <p className="text-gray-400 text-sm">Sasia: {item.quantity}</p>
                                        <p className="text-pink-500 font-bold">{item.cake.price * item.quantity} EUR</p>
                                    </div>
                                    <button
                                        onClick={() => handleRemove(item.id)}
                                        className="text-red-500 hover:text-red-400 font-medium"
                                    >
                                        Largo
                                    </button>
                                </div>
                            ))}
                        </div>

                        <div className="border-t border-gray-800 pt-4 mb-6">
                            <div className="flex justify-between items-center">
                                <span className="text-xl font-bold">Totali:</span>
                                <span className="text-2xl font-bold text-pink-500">{total} EUR</span>
                            </div>
                        </div>

                        {!showCheckout ? (
                            <button
                                onClick={() => setShowCheckout(true)}
                                className="w-full bg-pink-500 text-white py-3 rounded-lg font-bold text-lg hover:bg-pink-600 transition"
                            >
                                Vazhdo me Porosine
                            </button>
                        ) : (
                            <div className="border border-gray-800 rounded-xl p-6 bg-gray-900">
                                <h2 className="text-xl font-bold mb-4 text-white">Detajet e Porosise</h2>
                                <form onSubmit={handleCheckout} className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-1">
                                            Adresa e Dorezimit *
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            value={form.address}
                                            onChange={(e) => setForm({ ...form, address: e.target.value })}
                                            placeholder="p.sh. Rr. Nena Tereze, Nr. 12, Prishtine"
                                            className={inputClass}
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-1">
                                            Numri i Telefonit *
                                        </label>
                                        <input
                                            type="tel"
                                            required
                                            value={form.phone}
                                            onChange={(e) => setForm({ ...form, phone: e.target.value })}
                                            placeholder="p.sh. +383 44 123 456"
                                            className={inputClass}
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-1">
                                            Shenime Shtese (opsionale)
                                        </label>
                                        <textarea
                                            value={form.notes}
                                            onChange={(e) => setForm({ ...form, notes: e.target.value })}
                                            placeholder="p.sh. Kati i 2-te..."
                                            rows={3}
                                            className={inputClass}
                                        />
                                    </div>

                                    <div className="flex gap-3 pt-2">
                                        <button
                                            type="submit"
                                            className="flex-1 bg-pink-500 text-white py-3 rounded-lg font-bold hover:bg-pink-600 transition"
                                        >
                                            Konfirmo Porosine
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setShowCheckout(false)}
                                            className="px-6 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 transition"
                                        >
                                            Kthehu
                                        </button>
                                    </div>
                                </form>
                            </div>
                        )}
                    </>
                )}
            </div>
        </AppLayout>
    );
}