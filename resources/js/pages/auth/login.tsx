import { Head, useForm, Link } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';
import InputError from '@/components/input-error';
import AuthLayout from '@/layouts/auth-layout';

interface LoginForm {
    email: string;
    password: string;
    remember: boolean;
}

interface LoginProps {
    status?: string;
    canResetPassword: boolean;
}

export default function Login({ status, canResetPassword }: LoginProps) {
    const { data, setData, post, processing, errors, reset } = useForm<LoginForm>({
        email: '',
        password: '',
        remember: false,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <AuthLayout title="Kyçu në llogarinë tënde" description="Shkruaj emailin dhe fjalëkalimin për të hyrë">
            <Head title="Kyçu" />

            {status && (
                <div className="mb-4 text-center text-sm font-medium text-green-400">{status}</div>
            )}

            <form className="flex flex-col gap-5" onSubmit={submit}>
                <div className="flex flex-col gap-1">
                    <label className="text-sm text-gray-300">Email Adresa</label>
                    <input
                        type="email"
                        required
                        autoFocus
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        placeholder="email@example.com"
                        className="bg-gray-800 border border-gray-700 text-white rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-pink-500 placeholder-gray-500"
                    />
                    <InputError message={errors.email} />
                </div>

                <div className="flex flex-col gap-1">
                    <div className="flex justify-between items-center">
                        <label className="text-sm text-gray-300">Fjalëkalimi</label>
                        {canResetPassword && (
                            <Link
                                href={route('password.request')}
                                className="text-xs text-pink-400 hover:text-pink-300 transition"
                            >
                                Harruat fjalëkalimin?
                            </Link>
                        )}
                    </div>
                    <input
                        type="password"
                        required
                        value={data.password}
                        onChange={(e) => setData('password', e.target.value)}
                        placeholder="Fjalekalimi"
                        className="bg-gray-800 border border-gray-700 text-white rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-pink-500 placeholder-gray-500"
                    />
                    <InputError message={errors.password} />
                </div>

                <div className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        id="remember"
                        checked={data.remember}
                        onChange={(e) => setData('remember', e.target.checked)}
                        className="accent-pink-500"
                    />
                    <label htmlFor="remember" className="text-sm text-gray-300">Më mbaj mend</label>
                </div>

                <button
                    type="submit"
                    disabled={processing}
                    className="w-full bg-pink-500 text-white py-2.5 rounded-lg font-medium hover:bg-pink-600 transition flex items-center justify-center gap-2 mt-2"
                >
                    {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                    Kyçu
                </button>

                <p className="text-center text-sm text-gray-400">
                    Nuk ke llogari?{' '}
                    <Link href={route('register')} className="text-pink-400 hover:text-pink-300 transition">
                        Regjistrohu
                    </Link>
                </p>
            </form>
        </AuthLayout>
    );
}