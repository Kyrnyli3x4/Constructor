import { useState } from 'react';
import { Button } from '@/components/ui/button.jsx';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx';
import BotEditModal from '@/pages/bots/BotEditModal.jsx';
import AddBotCard from './AddBotCard.jsx';

export default function BotsGrid({ bots }) {
    const [editingBot, setEditingBot] = useState(null);

    return (
        <>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {bots.map((bot) => {
                    const profile = bot.profile || {};
                    // Парсим settings (если строка, то преобразуем, иначе оставляем объект)
                    const settings = typeof profile.settings === 'string'
                        ? JSON.parse(profile.settings)
                        : (profile.settings || {});

                    const displayName = settings.name || profile.username || `Bot #${bot.id}`;
                    const username = profile.username ? `@${profile.username}` : null;

                    return (
                        <Card key={bot.id} className="transition hover:shadow-lg">
                            <CardHeader className="flex flex-row items-center gap-4">
                                {profile.avatar_url && (
                                    <img
                                        src={profile.avatar_url}
                                        alt="Bot avatar"
                                        className="h-12 w-12 rounded-full object-cover"
                                    />
                                )}
                                <div className="flex-1">
                                    <CardTitle className="text-lg">{displayName}</CardTitle>
                                    {username && (
                                        <CardDescription className="text-sm text-gray-500">
                                            {username}
                                        </CardDescription>
                                    )}
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <p className="text-sm text-gray-500">
                                    Platform: {bot.platform}
                                </p>
                                {profile.description_name && (
                                    <p className="text-sm text-gray-600 line-clamp-2">
                                        {profile.description_name}
                                    </p>
                                )}
                                <div className="flex justify-end w-full pt-2">
                                    <Button variant="outline" onClick={() => setEditingBot(bot)}>
                                        Manage bot
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    );
                })}
                <AddBotCard />
            </div>
            {editingBot && (
                <BotEditModal
                    bot={editingBot}
                    open={!!editingBot}
                    onClose={() => setEditingBot(null)}
                />
            )}
        </>
    );
}
