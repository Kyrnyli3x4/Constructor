import { Link } from '@inertiajs/react';
import { PlusIcon } from 'lucide-react';
import { Button } from '@/components/ui/button.jsx';
import { Card, CardContent } from '@/components/ui/card.jsx';
import bots from '@/routes/bots/index.ts';

export default function AddBotCard({ label = 'Create your new bot!' }) {
    return (
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
                    <span>{label}</span>
                </Link>
            </CardContent>
        </Card>
    );
}
