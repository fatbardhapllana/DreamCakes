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
}

interface Props {
    cakes: Cake[];
    search: string;
}

export default function CakesIndex({ cakes, search }: Props) {
    const [searchQuery, setSearchQuery] = useState(search || '');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get('/cakes', { search: searchQuery });
    };

    const getBadgeClass = (isAvailable: boolean) => {
        if (isAvailable) return 'bg-green-100 text-green-700';
        return 'bg-red-100 text-red-700';
    };

    return (
        <AppLayout>
            <div className="p-6">
                <h1 className="text-3xl font-bold mb-6">Tortat Tona</h1>

                <form onSubmit={handleSearch} className="mb-6 flex gap-2">
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Kerko torte..."
                        className="border rounded px-4 py-2 w-full"
                    />
                    <button
                        type="submit"
                        className="bg-pink-500 text-white px-6 py-2 rounded hover:bg-pink-600"
                    >
                        Kerko
                    </button>
                </form>

                {cakes.length === 0 ? (
                    <p className="text-gray-500">Nuk u gjeten torta!</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {cakes.map((cake) => (
                            <div key={cake.id} className="border rounded-lg p-4 shadow hover:shadow-md transition">
                                <h2 className="text-xl font-semibold">{cake.name}</h2>
                                <p className="text-gray-600 text-sm mt-1">{cake.description}</p>
                                <p className="text-pink-600 font-bold mt-2">{cake.price} EUR</p>
                                <span className={"text-xs px-2 py-1 rounded-full mt-2 inline-block " + getBadgeClass(cake.is_available)}>
                                    {cake.is_available ? 'E disponueshme' : 'E padisponueshme'}
                                </span>
                                <p className="text-gray-400 text-xs mt-1">Kategoria: {cake.category}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </AppLayout>
    );
}