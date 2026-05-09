import { AlertCircle } from 'lucide-react'
import { useMemo } from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'

export default function BotSelector({ bots, selectedBotId, onSelectBot }) {
    const localSelectedBotId = useMemo(() => selectedBotId, [selectedBotId])

    const handleSelectChange = (botId) => {
        const id = parseInt(botId)
        onSelectBot(id)
    }

    if (!bots || bots.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center gap-4 p-8 border border-yellow-200 rounded-lg bg-yellow-50">
                <div className="flex items-center gap-2 text-yellow-800">
                    <AlertCircle className="h-5 w-5" />
                    <span className="font-semibold">Нет доступных ботов</span>
                </div>
                <p className="text-sm text-yellow-700">
                    Создайте бота в разделе "Мои боты" для начала работы в редакторе
                </p>
            </div>
        )
    }

    return (
        <div className="flex flex-col gap-4 p-6 border border-dashed border-primary rounded-lg">
            <h3 className="font-semibold text-sm">Выберите бота для редактирования</h3>
            <Select value={localSelectedBotId?.toString() || ''} onValueChange={handleSelectChange}>
                <SelectTrigger>
                    <SelectValue placeholder="Выберите бота..." />
                </SelectTrigger>
                <SelectContent>
                    {bots.map(bot => (
                        <SelectItem key={bot.id} value={bot.id.toString()}>
                            {bot.profile?.username || `Bot #${bot.id}`}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    )
}
