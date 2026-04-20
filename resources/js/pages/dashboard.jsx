import { Head, Link } from '@inertiajs/react';
import { PlusIcon } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button.jsx';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx';
import AppLayout from '@/layouts/app-layout.jsx';
import BotEditModal from '@/pages/bots/BotEditModal.jsx';
import bots from '@/routes/bots/index.ts';
import { dashboard } from '@/routes/index.ts';

const breadcrumbs = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
];

export default function Dashboard({ Bots }) { // ✅ правильное имя пропа (множественное число)
    const [editingBot, setEditingBot] = useState(null);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                {!Bots ? (
                    <Card size="sm" className="mx-auto w-full max-w-sm">
                        <CardContent className="flex h-full w-full flex-col items-center justify-center">
                            <Link
                                href={bots.create()}
                                className="flex flex-col items-center gap-4"
                            >
                                <Button
                                    variant="outline"
                                    className="h-15 w-15 rounded-full"
                                >
                                    <PlusIcon />
                                </Button>
                                <span>Create your first bot!</span>
                            </Link>
                        </CardContent>
                    </Card>
                ) : (
                    // 🤖 Есть боты – показываем их список
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {Bots.map((bot) => (
                            <Card
                                key={bot.id}
                                className="transition hover:shadow-lg"
                            >
                                <CardHeader>
                                    <CardTitle>
                                        {bot.profile?.username ||
                                            `Bot #${bot.id}`}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-sm text-gray-500">
                                        Platform: {bot.platform}
                                    </p>
                                    <div className="flex justify-end w-full">
                                        <Button variant={'outline'} onClick={() => setEditingBot(bot)}>Manage bot</Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                        <Card className="transition hover:shadow-lg">
                            <CardContent className="flex h-full w-full flex-col items-center justify-center">
                                <Link
                                    href={bots.create()}
                                    className="flex flex-col items-center gap-4"
                                >
                                    <Button
                                        variant="outline"
                                        className="h-15 w-15 rounded-full"
                                    >
                                        <PlusIcon />
                                    </Button>
                                    <span>Create your new bot!</span>
                                </Link>
                            </CardContent>
                        </Card>
                    </div>
                )}
            </div>
            {editingBot && (
                <BotEditModal
                    bot={editingBot}
                    open={!!editingBot}
                    onClose={() => setEditingBot(null)}
                />
            )}
        </AppLayout>
    );
}
