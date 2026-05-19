import { Head, useForm, Link } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';
import InputError from '@/components/input-error';
import AuthLayout from '@/layouts/auth-layout';

interface RegisterForm {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
}

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm<RegisterForm>({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <AuthLayout title="Krijo një llogari" description="Shkruaj të dhënat e tua për të krijuar llogarinë">
            <Head title="Regjistrohu" />

            <form className="flex flex-col gap-5" onSubmit={submit}>
                <div className="flex flex-col gap-1">
                    <label className="text-sm text-gray-300">Emri i plotë</label>
                    <input
                        type="text"
                        required
                        autoFocus
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        disabled={processing}
                        placeholder="Emri yt"
                        className="bg-gray-800 border border-gray-700 text-white rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-pink-500 placeholder-gray-500"
                    />
                    <InputError message={errors.name} />
                </div>

                <div className="flex flex-col gap-1">
                    <label className="text-sm text-gray-300">Email Adresa</label>
                    <input
                        type="email"
                        required
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        disabled={processing}
                        placeholder="email@example.com"
                        className="bg-gray-800 border border-gray-700 text-white rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-pink-500 placeholder-gray-500"
                    />
                    <InputError message={errors.email} />
                </div>

                <div className="flex flex-col gap-1">
                    <label className="text-sm text-gray-300">Fjalëkalimi</label>
                    <input
                        type="password"
                        required
                        value={data.password}
                        onChange={(e) => setData('password', e.target.value)}
                        disabled={processing}
                        placeholder="Fjalekalimi"
                        className="bg-gray-800 border border-gray-700 text-white rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-pink-500 placeholder-gray-500"
                    />
                    <InputError message={errors.password} />
                </div>

                <div className="flex flex-col gap-1">
                    <label className="text-sm text-gray-300">Konfirmo fjalëkalimin</label>
                    <input
                        type="password"
                        required
                        value={data.password_confirmation}
                        onChange={(e) => setData('password_confirmation', e.target.value)}
                        disabled={processing}
                        placeholder="Konfirmo fjalekalimin"
                        className="bg-gray-800 border border-gray-700 text-white rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-pink-500 placeholder-gray-500"
                    />
                    <InputError message={errors.password_confirmation} />
                </div>

                <button
                    type="submit"
                    disabled={processing}
                    className="w-full bg-pink-500 text-white py-2.5 rounded-lg font-medium hover:bg-pink-600 transition flex items-center justify-center gap-2 mt-2"
                >
                    {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                    Regjistrohu
                </button>

                <p className="text-center text-sm text-gray-400">
                    Ke llogari?{' '}
                    <Link href={route('login')} className="text-pink-400 hover:text-pink-300 transition">
                        Kyqu
                    </Link>
                </p>
            </form>
        </AuthLayout>
    );
}