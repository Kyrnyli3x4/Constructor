import { useForm } from '@inertiajs/react';

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button.jsx';
import { Label } from '@/components/ui/label.jsx';
import { Separator } from '@/components/ui/separator.jsx';
import { Switch } from '@/components/ui/switch.jsx';
import bots from '@/routes/bots/index.ts';
import { dashboard } from '@/routes/index.ts';

export default function MainTab({ data, setData, errors }) {
    // Берём ID бота из data (предполагается, что data.id передан из формы)
    const botId = data.bot_id;

    // useForm для удаления и для сброса (можно отдельно)
    const { delete: destroy, post, processing } = useForm();

    const deleteBot = () => {
        if (!botId) return;
        console.log(botId)
        destroy(bots.destroy(botId), {
            onSuccess: () => {
                window.location.href = dashboard.url(); // так можно, но лучше использовать Inertia.visit
            },
        });
    };

    const dropWebhook = () => {
        if (!botId) return;
        post(bots.index(), {
            preserveScroll: true,
            onSuccess: () => {
                // Обновляем поле webhook в форме (опционально)
                setData('webhook', null);
                // Можно показать уведомление
            },
        });
    };


    return (
        <div className="space-y-6">
            {/* Блок статуса */}

            <div className="flex items-center justify-between">
                <div>
                    <Label htmlFor="bot-status" className="text-base">Bot status</Label>
                    <p className="text-sm text-gray-500">
                        When disabled, the bot will not respond to new messages.
                    </p>
                </div>
                <Switch
                    id="bot-status"
                    checked={data.is_active ?? true}
                    onCheckedChange={(checked) => setData('is_active', checked)}
                />
            </div>

            <Separator/>

            {/* Danger Zone в стиле GitHub */}
            <div className="mt-6 border border-red-300 rounded-lg p-4 bg-red-50/30">
                <h3 className="text-sm font-semibold text-red-700 mb-3">Danger Zone</h3>
                <div className="space-y-4">
                    {/* Удаление бота */}

                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium">Delete this bot</p>
                            <p className="text-xs text-gray-500">
                                Once deleted, it cannot be recovered.
                            </p>
                        </div>
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button variant="destructive" size="sm">
                                    Delete bot
                                </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        This action cannot be undone. This will permanently delete the bot
                                        "{data.username || data.display_name || `#${botId}`}" and remove all associated data.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction onClick={deleteBot} disabled={processing}>
                                        Yes, delete bot
                                    </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </div>

                    <Separator/>

                    {/* Сброс вебхука */}
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium">Reset webhook</p>
                            <p className="text-xs text-gray-500">
                                Remove current webhook URL. Bot will stop receiving updates.
                            </p>
                        </div>
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="border-red-300 text-red-700 hover:bg-red-50"
                                >
                                    Drop webhook
                                </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Remove webhook?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        This will immediately stop Telegram from sending updates to your server.
                                        You can set a new webhook later.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction onClick={dropWebhook} disabled={processing}>
                                        Yes, remove webhook
                                    </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </div>
                </div>
            </div>
        </div>
    );
}
