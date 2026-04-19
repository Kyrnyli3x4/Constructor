import { Head, useForm } from '@inertiajs/react';
import {
    Field,
    FieldLabel,
} from '@/components/ui/field.jsx';

import { Input } from "@/components/ui/input.jsx"
import { Label } from '@/components/ui/label.jsx';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import AppLayout from '@/layouts/app-layout.jsx';

const breadcrumbs = [
    {
        title: 'Create Bot',
    },
];

export default function CreateBot() {
    const { data, setData, post, processing, errors } = useForm({
        token: '',
        platform: 'telegram',
        name: '',
    });

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Bot" />
            <form onSubmit={e => { e.preventDefault(); post('/bots'); }} className="flex flex-col items-center gap-6 p-4">

                {/* Обязательные поля - зона внимания */}
                <div className="w-full md:w-1/2 border-2 rounded-2xl p-4 border-amber-400 bg-amber-50/20">
                    <div className="flex items-center gap-2 mb-3">
                        <span className="text-amber-600 font-bold">⚠️</span>
                        <Label className="text-amber-800 font-semibold">Required information</Label>
                    </div>
                    <Field>
                        <FieldLabel htmlFor="bot-token">Bot token *</FieldLabel>
                        <Input
                            id="bot-token"
                            type="password"
                            placeholder="Enter your token"
                            value={data.token}
                            onChange={e => setData('token', e.target.value)}
                        />
                        {errors.token && <span className="text-red-500 text-sm">{errors.token}</span>}
                    </Field>
                    <Field className="mt-3">
                        <FieldLabel htmlFor="platform">Platform *</FieldLabel>
                        <Select
                            value={data.platform}
                            onValueChange={val => setData('platform', val)}
                        >
                            <SelectTrigger id="platform">
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
                                id="bot-name"
                                type="text"
                                placeholder="e.g., My Assistant"
                                value={data.name}
                                onChange={e => setData('name', e.target.value)}
                            />
                            {errors.name && <span className="text-red-500 text-sm">{errors.name}</span>}
                        </Field>
                        <p className="text-xs text-gray-400 mt-2">
                            If not provided, the bot's default name will be used.
                        </p>
                    </div>
                </details>

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

