import { Head, useForm } from '@inertiajs/react';
import { useEffect, useRef } from 'react';
import {
    Field,
    FieldLabel,
} from '@/components/ui/field.jsx';
import { Input } from "@/components/ui/input.jsx";
import { Label } from '@/components/ui/label.jsx';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import AppLayout from '@/layouts/app-layout.jsx';

const breadcrumbs = [
    {
        title: 'Create Bot',
    },
];

export default function CreateBot() {
    const { data, setData, post, processing, errors, reset } = useForm({
        token: '',
        platform: 'telegram',
        name: '',
    });

    // Рефы для полей (для скролла и фокуса)
    const tokenRef = useRef(null);
    const nameRef = useRef(null);

    // При появлении ошибок – скроллим к первому полю с ошибкой
    useEffect(() => {
        if (errors.token) {
            tokenRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
            tokenRef.current?.focus();
        } else if (errors.name) {
            nameRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
            nameRef.current?.focus();
        }
    }, [errors]);

    // Клиентская валидация перед отправкой
    const handleSubmit = (e) => {
        e.preventDefault();

        // Простая проверка на клиенте
        if (!data.token.trim()) {
            // Можно показать ошибку через useForm, но у нас нет такого метода.
            // Вместо этого используем alert или кастомное состояние.
            // Но лучше положиться на сервер. Для удобства добавим кастомную ошибку.
            alert('Bot token is required.');
            tokenRef.current?.focus();
            return;
        }

        post('/bots');
    };

    // Определяем, есть ли ошибка в поле
    const hasError = (field) => !!errors[field];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Bot" />
            <form onSubmit={handleSubmit} className="flex flex-col items-center gap-6 p-4">

                {/* Обязательные поля - зона внимания */}
                <div className="w-full md:w-1/2 border-2 rounded-2xl p-4 border-amber-400 bg-amber-50/20">
                    <div className="flex items-center gap-2 mb-3">
                        <span className="text-amber-600 font-bold">⚠️</span>
                        <Label className="text-amber-800 font-semibold">Required information</Label>
                    </div>

                    {/* Поле токена */}
                    <Field>
                        <FieldLabel htmlFor="bot-token">Bot token *</FieldLabel>
                        <Input
                            ref={tokenRef}
                            id="bot-token"
                            type="text"
                            placeholder="Enter your token"
                            value={data.token}
                            onChange={e => setData('token', e.target.value)}
                            autoComplete="off"
                            className={hasError('token') ? 'border-red-500 ring-red-500' : ''}
                        />
                        {errors.token && (
                            <span className="text-red-500 text-sm mt-1 block">{errors.token}</span>
                        )}
                        <p className="text-xs text-gray-400 mt-1">
                            You can get the token from @BotFather in Telegram.
                        </p>
                    </Field>

                    {/* Поле платформы */}
                    <Field className="mt-3">
                        <FieldLabel htmlFor="platform">Platform *</FieldLabel>
                        <Select
                            value={data.platform}
                            onValueChange={val => setData('platform', val)}
                        >
                            <SelectTrigger id="platform" className={hasError('platform') ? 'border-red-500' : ''}>
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectItem value="telegram">Telegram</SelectItem>
                                    <SelectItem value="discord">Discord</SelectItem>
                                    <SelectItem value="whatsapp">WhatsApp</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        {errors.platform && (
                            <span className="text-red-500 text-sm mt-1 block">{errors.platform}</span>
                        )}
                    </Field>
                </div>

                {/* Раскрывающийся блок для дополнительной информации */}
                <details className="w-full md:w-1/2 border-2 rounded-2xl p-4 border-blue-100">
                    <summary className="cursor-pointer font-medium text-gray-600 select-none flex items-center gap-2">
                        <span className="text-lg">▼</span> Optional: Bot display name
                    </summary>
                    <div className="mt-4 pt-3 border-t border-gray-200">
                        <Field>
                            <FieldLabel htmlFor="bot-name">Bot display name</FieldLabel>
                            <Input
                                ref={nameRef}
                                id="bot-name"
                                type="text"
                                placeholder="e.g., My Assistant"
                                value={data.name}
                                onChange={e => setData('name', e.target.value)}
                                autoComplete="off"
                                className={hasError('name') ? 'border-red-500' : ''}
                            />
                            {errors.name && (
                                <span className="text-red-500 text-sm mt-1 block">{errors.name}</span>
                            )}
                        </Field>
                        <p className="text-xs text-gray-400 mt-2">
                            If not provided, the bot's default name will be used.
                        </p>
                    </div>
                </details>

                {/* Глобальная ошибка (например, 500) */}
                {errors.server && (
                    <div className="w-full md:w-1/2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                        {errors.server}
                    </div>
                )}

                <button
                    type="submit"
                    disabled={processing}
                    className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition"
                >
                    {processing ? 'Creating...' : 'Create Bot'}
                </button>
            </form>
        </AppLayout>
    );
}
