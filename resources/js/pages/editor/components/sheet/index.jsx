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
                                   onClose,               // called when sheet should close
                                   onAddTextElement,      // receives { text: string }
                                   onAddButtonElement,    // receives { label: string, onClick? }
                                   initialMessage = "Enter your text here..."
                               }) {
    const [message, setMessage] = useState(initialMessage)
    const [feedback, setFeedback] = useState("")

    // Helper to show temporary feedback
    const showFeedback = (msg) => {
        setFeedback(msg)
        setTimeout(() => setFeedback(""), 2000)
    }

    const handleAddText = () => {
        if (message.trim()) {
            onAddTextElement?.({ text: message })
            showFeedback("✅ Text element added")
            // Do NOT close – allows adding more
        } else {
            showFeedback("⚠️ Please enter a message first")
        }
    }

    const handleAddButton = () => {
        if (message.trim()) {
            onAddButtonElement?.({ label: message, onClick: () => alert(message) })
            showFeedback("🔘 Button element added")
        } else {
            showFeedback("⚠️ Please enter a label for the button")
        }
    }

    return (
        <Sheet open={open} onOpenChange={onClose}>
            <SheetContent className="flex flex-col gap-4">
                {/* Header with its own close (X) – already provided by SheetContent */}
                <SheetHeader>
                    <SheetTitle>Field edit message</SheetTitle>
                    <SheetDescription>
                        Add a text message or turn it into an interactive button.
                    </SheetDescription>
                </SheetHeader>

                {/* Main content */}
                <div className="grid flex-1 auto-rows-min gap-5 px-4">
                    <div className="grid gap-3">
                        <Label htmlFor="sheet-demo-name">Message / Button label</Label>
                        <Input
                            id="sheet-demo-name"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="e.g., Click me or Hello world"
                            autoFocus
                        />
                    </div>

                    {/* Feedback area for UX */}
                    {feedback && (
                        <div className="text-sm text-muted-foreground text-center">
                            {feedback}
                        </div>
                    )}
                </div>

                {/* Footer with two creation buttons + close button */}
                <SheetFooter className="flex-col sm:flex-row gap-2">
                    <Button onClick={handleAddText} variant="outline" className="flex-1">
                        + Add text element
                    </Button>
                    <Button onClick={handleAddButton} variant="default" className="flex-1">
                        + Add button element
                    </Button>
                    <SheetClose asChild>
                        <Button variant="secondary" onClick={onClose}>
                            Close
                        </Button>
                    </SheetClose>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}
