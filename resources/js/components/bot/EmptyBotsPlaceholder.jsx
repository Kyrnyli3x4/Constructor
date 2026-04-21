import { Card, CardContent } from '@/components/ui/card.jsx';
import AddBotCard from './AddBotCard.jsx';

export default function EmptyBotsPlaceholder() {
    return (
        <Card size="sm" className="mx-auto w-full max-w-sm">
            <CardContent className="flex h-full w-full flex-col items-center justify-center">
                <AddBotCard label="Create your first bot!" />
            </CardContent>
        </Card>
    );
}
