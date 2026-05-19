import { useState } from 'react';
import { router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';

export default function CakeCreate() {
    const [form, setForm] = useState({
        name: '',
        description: '',
        price: '',
        category: '',
        is_available: true,
    });
    const [image, setImage] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setImage(file);
        if (file) setPreview(URL.createObjectURL(file));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', form.name);
        formData.append('description', form.description);
        formData.append('price', form.price);
        formData.append('category', form.category);
        formData.append('is_available', form.is_available ? '1' : '0');
        if (image) formData.append('image', image);
        router.post('/cakes', formData, {
            onError: (err) => setErrors(err),
        });
    };

    const inputClass = "w-full bg-gray-800 border border-gray-700 text-white rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-pink-500 placeholder-gray-500";

    return (
        <AppLayout>
            <div className="p-8 max-w-2xl mx-auto">
                <h1 className="text-3xl font-bold mb-8">🍰 Shto Tortë të Re</h1>
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-sm font-medium mb-2 text-gray-300">Emri</label>
                        <input type="text" value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                            className={inputClass}
                            placeholder="p.sh. Torta Çokollatë" />
                        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2 text-gray-300">Përshkrimi</label>
                        <textarea value={form.description}
                            onChange={(e) => setForm({ ...form, description: e.target.value })}
                            className={inputClass} rows={4}
                            placeholder="Përshkruaj tortën..." />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2 text-gray-300">Çmimi (EUR)</label>
                        <input type="number" value={form.price}
                            onChange={(e) => setForm({ ...form, price: e.target.value })}
                            className={inputClass}
                            placeholder="p.sh. 45" />
                        {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2 text-gray-300">Kategoria</label>
                        <select value={form.category}
                            onChange={(e) => setForm({ ...form, category: e.target.value })}
                            className={inputClass}>
                            <option value="">Zgjidh kategorinë</option>
                            <option value="klasike">Klasike</option>
                            <option value="çokollatë">Çokollatë</option>
                            <option value="fruta">Fruta</option>
                            <option value="dasma">Dasma</option>
                            <option value="ditëlindje">Ditëlindje</option>
                        </select>
                        {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2 text-gray-300">Foto e Tortës</label>
                        <label className="flex flex-col items-center justify-center w-full bg-gray-800 border border-gray-700 border-dashed rounded-lg px-4 py-8 cursor-pointer hover:border-pink-500 transition">
                            <p className="text-gray-400 text-sm">📷 Zgjidh foton e tortës</p>
                            <p className="text-gray-600 text-xs mt-1">JPG, PNG, WEBP — max 2MB</p>
                            <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                        </label>
                        {preview && (
                            <img src={preview} alt="Preview"
                                className="mt-3 w-full h-56 object-cover rounded-lg border border-gray-700" />
                        )}
                        {errors.image && <p className="text-red-500 text-sm mt-1">{errors.image}</p>}
                    </div>

                    <div className="flex items-center gap-2">
                        <input type="checkbox" checked={form.is_available}
                            onChange={(e) => setForm({ ...form, is_available: e.target.checked })}
                            id="is_available" className="accent-pink-500 w-4 h-4" />
                        <label htmlFor="is_available" className="text-sm font-medium text-gray-300">E disponueshme</label>
                    </div>

                    <div className="flex gap-3 pt-2">
                        <button type="submit"
                            className="bg-pink-500 text-white px-8 py-3 rounded-lg hover:bg-pink-600 font-medium">
                            Shto Tortën
                        </button>
                        <button type="button" onClick={() => router.get('/admin')}
                            className="bg-gray-700 text-gray-300 px-8 py-3 rounded-lg hover:bg-gray-600 font-medium">
                            Anulo
                        </button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}