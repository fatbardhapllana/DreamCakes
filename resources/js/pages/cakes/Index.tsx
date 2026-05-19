import { useState } from 'react';
import { router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';

interface Cake {
    id: number;
    name: string;
    description: string;
    price: number;
    category: string;
    is_available: boolean;
    image: string | null;
}

interface Props {
    cakes: Cake[];
    search: string;
    category: string;
}

export default function CakesIndex({ cakes, search, category }: Props) {
    const [searchQuery, setSearchQuery] = useState(search || '');
    const [cartMessage, setCartMessage] = useState('');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get('/cakes', { search: searchQuery });
    };

    const handleFilter = (cat: string) => {
        router.get('/cakes', { category: cat });
    };

    const handleAddToCart = (cake: Cake) => {
        if (!cake.is_available) return;
        router.post('/cart', { cake_id: cake.id, quantity: 1 }, {
            preserveScroll: true,
            onSuccess: () => {
                setCartMessage(`✓ "${cake.name}" u shtua në shportë!`);
                setTimeout(() => setCartMessage(''), 3000);
            },
        });
    };

    const getBadgeClass = (isAvailable: boolean) => {
        if (isAvailable) return 'bg-green-100 text-green-700';
        return 'bg-red-100 text-red-700';
    };

    const categories = [
        { value: '', label: 'Të gjitha' },
        { value: 'dasma', label: 'Dasma' },
        { value: 'ditëlindje', label: 'Ditëlindje' },
        { value: 'çokollatë', label: 'Çokollatë' },
        { value: 'fruta', label: 'Fruta' },
        { value: 'klasike', label: 'Klasike' },
    ];

    return (
        <AppLayout>
            <div className="p-6">
                <h1 className="text-3xl font-bold mb-4">Tortat Tona 🍰</h1>

                {cartMessage && (
                    <div className="mb-4 px-4 py-3 bg-green-100 text-green-700 rounded-lg font-medium">
                        {cartMessage}
                    </div>
                )}

                <form onSubmit={handleSearch} className="mb-4 flex gap-2">
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Kërko tortë..."
                        className="border rounded px-4 py-2 w-full"
                    />
                    <button
                        type="submit"
                        className="bg-pink-500 text-white px-6 py-2 rounded hover:bg-pink-600"
                    >
                        Kërko
                    </button>
                </form>

                <div className="flex gap-2 flex-wrap mb-6">
                    {categories.map((cat) => (
                        <button
                            key={cat.value}
                            onClick={() => handleFilter(cat.value)}
                            className={`px-4 py-1.5 rounded-full text-sm font-medium transition ${
                                category === cat.value
                                    ? 'bg-pink-500 text-white'
                                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                            }`}
                        >
                            {cat.label}
                        </button>
                    ))}
                </div>

                {cakes.length === 0 ? (
                    <p className="text-gray-500">Nuk u gjetën torta!</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {cakes.map((cake) => (
                            <div key={cake.id} className="border border-gray-800 rounded-xl shadow hover:shadow-lg transition flex flex-col justify-between overflow-hidden bg-gray-900">
                                {cake.image ? (
                                    <div className="w-full h-56 overflow-hidden">
                                        <img
                                            src={`/storage/${cake.image}`}
                                            alt={cake.name}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                ) : (
                                    <div className="w-full h-56 bg-gray-800 flex items-center justify-center text-5xl">
                                        🍰
                                    </div>
                                )}
                                <div className="p-4 flex flex-col flex-1 justify-between">
                                    <div>
                                        <h2 className="text-xl font-semibold">{cake.name}</h2>
                                        <p className="text-gray-400 text-sm mt-1">{cake.description}</p>
                                        <p className="text-pink-500 font-bold mt-2">{cake.price} EUR</p>
                                        <span className={"text-xs px-2 py-1 rounded-full mt-2 inline-block " + getBadgeClass(cake.is_available)}>
                                            {cake.is_available ? 'E disponueshme' : 'E padisponueshme'}
                                        </span>
                                        <p className="text-gray-500 text-xs mt-1">Kategoria: {cake.category}</p>
                                    </div>
                                    <button
                                        onClick={() => handleAddToCart(cake)}
                                        disabled={!cake.is_available}
                                        className={`mt-4 w-full py-2 rounded-lg font-medium transition ${
                                            cake.is_available
                                                ? 'bg-pink-500 text-white hover:bg-pink-600'
                                                : 'bg-gray-700 text-gray-500 cursor-not-allowed'
                                        }`}
                                    >
                                        {cake.is_available ? '🛒 Shto në Shportë' : 'E padisponueshme'}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </AppLayout>
    );
}