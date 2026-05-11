import { useEffect, useState } from 'react'
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
import { Textarea } from "@/components/ui/textarea"

let nextButtonId = 1

export default function Sheets({ open, onClose, onSave, initialData }) {
    const [showCommand, setShowCommand] = useState(false)
    const [commandText, setCommandText] = useState('')
    const [mainMessage, setMainMessage] = useState('')
    const [buttons, setButtons] = useState([])

    useEffect(() => {
        if (!open) {
            setShowCommand(false)
            setCommandText('')
            setMainMessage('')
            setButtons([])
            return
        }

        setShowCommand(Boolean(initialData?.command))
        setCommandText(initialData?.command ?? '')
        setMainMessage(initialData?.message ?? '')
        setButtons(
            (initialData?.buttons ?? []).map((btn) => ({
                id: btn.id ?? nextButtonId++,
                label: btn.label ?? '',
                command: btn.command ?? '',
            }))
        )
    }, [open, initialData])

    const handleAddCommand = () => setShowCommand(true)
    const handleRemoveCommand = () => {
        setShowCommand(false)
        setCommandText('')
    }

    const addButton = () => {
        setButtons((prev) => [
            ...prev,
            { id: nextButtonId++, label: '', command: '' },
        ])
    }

    const removeButton = (id) => {
        setButtons((prev) => prev.filter((b) => b.id !== id))
    }

    const updateButton = (id, field, value) => {
        setButtons((prev) => prev.map((b) => (b.id === id ? { ...b, [field]: value } : b)))
    }

    const handleSave = () => {
        const data = {
            message: mainMessage,
            command: showCommand ? commandText : null,
            buttons: buttons.length > 0 ? buttons : undefined,
        }
        onSave?.(data)
        onClose()
    }

    return (
        <Sheet open={open} onOpenChange={onClose}>
            <SheetContent className="flex flex-col gap-4">
                <SheetHeader className="flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                        <SheetTitle>Field create message</SheetTitle>
                        <SheetDescription>
                            Add a text message or turn it into an interactive button.
                        </SheetDescription>
                    </div>
                </SheetHeader>

                <div className="flex-1 overflow-y-auto px-1">
                    <div className="grid gap-5">
                        {/* Optional command field */}
                        <div className="grid gap-2">
                            {!showCommand ? (
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={handleAddCommand}
                                    className="w-fit"
                                >
                                    + Add command
                                </Button>
                            ) : (
                                <div className="grid gap-2">
                                    <div className="flex items-center justify-between">
                                        <Label htmlFor="command">Command</Label>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={handleRemoveCommand}
                                            className="h-6 w-6"
                                        >
                                            ✕
                                        </Button>
                                    </div>
                                    <Input
                                        id="command"
                                        placeholder="Enter command"
                                        value={commandText}
                                        onChange={(e) => setCommandText(e.target.value)}
                                    />
                                </div>
                            )}
                        </div>

                        {/* Main message textarea */}
                        <div className="grid gap-2">
                            <Label htmlFor="main-message">Message / Button label</Label>
                            <Textarea
                                id="main-message"
                                placeholder="e.g., Click me or Hello world"
                                value={mainMessage}
                                onChange={(e) => setMainMessage(e.target.value)}
                                rows={3}
                            />
                        </div>

                        {/* Dynamic buttons */}
                        <div className="grid gap-3">
                            <div className="flex items-center justify-between">
                                <Label>Buttons</Label>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={addButton}
                                    className="w-fit"
                                >
                                    + Add button
                                </Button>
                            </div>
                            {buttons.length > 0 && (
                                <div className="grid gap-4">
                                    {buttons.map((btn) => (
                                        <div
                                            key={btn.id}
                                            className="grid gap-2 p-3 border rounded-md relative"
                                        >
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="absolute top-1 right-1 h-6 w-6"
                                                onClick={() => removeButton(btn.id)}
                                            >
                                                ✕
                                            </Button>
                                            <div className="grid gap-1">
                                                <Label htmlFor={`btn-label-${btn.id}`}>Label</Label>
                                                <Input
                                                    id={`btn-label-${btn.id}`}
                                                    placeholder="Button text"
                                                    value={btn.label}
                                                    onChange={(e) =>
                                                        updateButton(btn.id, 'label', e.target.value)
                                                    }
                                                />
                                            </div>
                                            <div className="grid gap-1">
                                                <Label htmlFor={`btn-command-${btn.id}`}>
                                                    Command (optional)
                                                </Label>
                                                <Input
                                                    id={`btn-command-${btn.id}`}
                                                    placeholder="Button command"
                                                    value={btn.command}
                                                    onChange={(e) =>
                                                        updateButton(btn.id, 'command', e.target.value)
                                                    }
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <SheetFooter className="flex-col sm:flex-row gap-2">
                    <Button onClick={handleSave}>Save</Button>
                    <SheetClose asChild>
                        <Button variant="outline" onClick={onClose}>
                            Close
                        </Button>
                    </SheetClose>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}
