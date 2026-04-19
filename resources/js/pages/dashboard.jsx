import { Head, Link} from '@inertiajs/react';
import { PlusIcon } from 'lucide-react';
import { Button } from '@/components/ui/button.jsx';
import { Card, CardContent } from '@/components/ui/card.jsx';
import AppLayout from '@/layouts/app-layout.jsx';
import bots from '@/routes/bots/index.ts';
import { dashboard } from '@/routes/index.ts';

const breadcrumbs = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
];

export default function Dashboard(bot_get) {

    console.log(bot_get)

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col items-center justify-center gap-4 overflow-x-auto rounded-xl p-4">
                {bot_get == null ?
                    (<p>your bots</p>)
                :(
                    <Card size="sm" className="mx-auto w-full max-w-sm">
                        <CardContent className="flex h-full w-full flex-col items-center justify-center">
                            <Link href={bots.create()} className="flex flex-col gap-4 items-center">
                                <Button
                                    variant="outline"
                                    className="h-15 w-15 rounded-full"
                                >
                                    <PlusIcon/>
                                </Button>
                                <span>Create your first bot !</span>
                            </Link>
                        </CardContent>
                    </Card>
                )}

            </div>
        </AppLayout>
    );
}

