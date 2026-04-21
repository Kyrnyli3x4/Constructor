import { Head } from '@inertiajs/react';
import BotsGrid from '@/components/bot/BotsGrid.jsx';
import EmptyBotsPlaceholder from '@/components/bot/EmptyBotsPlaceholder.jsx';
import AppLayout from '@/layouts/app-layout.jsx';
import { dashboard } from '@/routes/index.ts';

const breadcrumbs = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
];

export default function Dashboard({ Bots }) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                {!Bots ? (
                    <EmptyBotsPlaceholder />
                ) : (
                    <BotsGrid bots={Bots} />
                )}
            </div>
        </AppLayout>
    );
}
