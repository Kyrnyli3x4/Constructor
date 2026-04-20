import { useForm } from '@inertiajs/react';
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import bots from '@/routes/bots/index.ts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.jsx';
import { Textarea } from '@/components/ui/textarea.jsx';
import BasicSetting from '@/pages/bots/components/basic.jsx';

export default function BotEditModal({ bot, open, onClose }) {
    const { data, setData, put, processing, errors, reset } = useForm({
        platform: bot.platform,
        webhook: bot.webhook || '',
        // данные профиля
        username: bot.profile?.username || '',
        display_name: bot.profile?.display_name || '',
        description: bot.profile?.description || '',
        settings: bot.profile?.settings ? JSON.parse(bot.profile.settings) : {},
    });

    // Сброс формы при закрытии
    useEffect(() => {
        if (!open) {
            reset();
        }
    }, [open]);

    const handleSubmit = (e) => {
        e.preventDefault();
        bots.create(bot.id).then(onClose())
    };

    // Обработчики для настроек (пример)
    const updateSetting = (key, value) => {
        setData('settings', { ...data.settings, [key]: value });
    };

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[600px]">
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>Edit Bot: {bot.profile?.username || bot.id}</DialogTitle>
                    </DialogHeader>

                    <Tabs defaultValue="basic" className="mt-4">
                        <TabsList className="grid w-full grid-cols-3">
                            <TabsTrigger value="basic">Основные</TabsTrigger>
                            <TabsTrigger value="additional">Дополнительные</TabsTrigger>
                            <TabsTrigger value="main">Главные</TabsTrigger>
                        </TabsList>

                        {/* Вкладка 1: Основные настройки */}
                        <TabsContent value="basic" className="space-y-4">
                            <BasicSetting
                                data={data}
                                errors={errors}
                            />
                        </TabsContent>

                        {/* Вкладка 2: Дополнительные настройки */}
                        <TabsContent value="additional" className="space-y-4">
                            <div>
                                <Label htmlFor="webhook">Webhook URL</Label>
                                <Input
                                    id="webhook"
                                    value={data.webhook}
                                    onChange={(e) => setData('webhook', e.target.value)}
                                    placeholder="https://example.com/webhook"
                                />
                            </div>
                            <div>
                                <Label htmlFor="description">Description</Label>
                                <Textarea
                                    id="description"
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                    placeholder="Bot description"
                                />
                            </div>
                        </TabsContent>

                        {/* Вкладка 3: Главные (пример с настройками JSON) */}
                        <TabsContent value="main" className="space-y-4">
                            <div>
                                <Label htmlFor="timezone">Timezone</Label>
                                <Input
                                    id="timezone"
                                    value={data.settings.timezone || ''}
                                    onChange={(e) => updateSetting('timezone', e.target.value)}
                                    placeholder="UTC"
                                />
                            </div>
                            <div>
                                <Label htmlFor="language">Language</Label>
                                <select
                                    id="language"
                                    value={data.settings.language || 'en'}
                                    onChange={(e) => updateSetting('language', e.target.value)}
                                    className="w-full border rounded p-2"
                                >
                                    <option value="en">English</option>
                                    <option value="ru">Русский</option>
                                </select>
                            </div>
                        </TabsContent>
                    </Tabs>

                    <DialogFooter className="mt-6">
                        <Button type="button" variant="outline" onClick={onClose}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={processing}>
                            {processing ? 'Saving...' : 'Save changes'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
