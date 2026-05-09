import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
} from '@/components/ui/sheet.jsx'

export default function Sheets({
                                   open,
                                   onClose,
                                   blockId,
                                   isFirst,
                                   onValidate,
                                   initialMessage = "",
                                   initialCommand = ""
                               }) {
    const [message, setMessage] = useState(initialMessage)
    const [command, setCommand] = useState(initialCommand)

    const handleSave = () => {
        // Здесь можно сохранить данные
        onValidate(blockId, { message, command });
        onClose();
    };

    return (
        <Sheet open={open} onOpenChange={onClose}>
            <SheetContent className="flex flex-col gap-4">
                {/* Header with its own close (X) – already provided by SheetContent */}
                <SheetHeader>
                    <SheetTitle>Создания сообщений</SheetTitle>
                    <SheetDescription>
                        Добавте модули для вашего уникального сообщения
                    </SheetDescription>
                </SheetHeader>

                <div className="grid flex-1 auto-rows-min gap-5 px-4">
                    {isFirst && (
                        <div className="grid gap-3">
                            <Label htmlFor="command">Команда</Label>
                            <Input
                                id="command"
                                value={command}
                                onChange={(e) => setCommand(e.target.value)}
                                placeholder="/start"
                                autoFocus
                            />
                        </div>
                    )}
                    <div className="grid gap-3">
                        <Label htmlFor="sheet-demo-name">Сообщение</Label>
                        <Input
                            id="sheet-demo-name"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Впишите ваше сообщение"
                        />
                    </div>
                </div>

                {/* Footer with two creation buttons + close button */}
                <SheetFooter className="flex-col sm:flex-row gap-2">
                    <Button onClick={handleSave}>Сохранить</Button>
                    <SheetClose asChild>
                        <Button variant="secondary" onClick={onClose}>
                            Закрыть
                        </Button>
                    </SheetClose>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}
