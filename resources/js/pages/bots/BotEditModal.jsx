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
import BotEditTabs from '@/pages/bots/components/BotEditTabs.jsx';
import bots from '@/routes/bots/index.ts';

export default function BotEditModal({ bot, open, onClose }) {
    const { data, setData, put, processing, errors, reset } = useForm({
        bot_id: bot.id,
        platform: bot.platform,
        webhook: bot.webhook || '',
        // данные профиля
        username: bot.profile?.username || '',
        display_name: bot.profile?.display_name || '',
        description_name: bot.profile?.description || '',
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
        put(bots.update(bot.id), {
            onSuccess: onClose,
        });
    };

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[600px]">
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>Edit Bot: {bot.profile?.username || bot.id}</DialogTitle>
                    </DialogHeader>

                    <BotEditTabs
                        data={data}
                        setData={setData}
                        errors={errors}
                    />

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
