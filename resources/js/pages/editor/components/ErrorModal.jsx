import { AlertCircle } from 'lucide-react'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from '@/components/ui/dialog'

export default function ErrorModal({ errors, onClose }) {
    const errorList = Object.entries(errors).filter(([, error]) => error !== null)

    return (
        <Dialog open={errorList.length > 0} onOpenChange={onClose}>
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <div className="flex items-center gap-2">
                        <AlertCircle className="h-5 w-5 text-red-500" />
                        <DialogTitle>Ошибки валидации</DialogTitle>
                    </div>
                    <DialogDescription>
                        Найдены ошибки в следующих блоках:
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-3 max-h-[400px] overflow-y-auto">
                    {errorList.map(([blockId, error]) => (
                        <div
                            key={blockId}
                            className="p-3 bg-red-50 border border-red-200 rounded-lg"
                        >
                            <p className="text-sm font-semibold text-red-900">
                                Блок #{blockId}
                            </p>
                            <p className="text-sm text-red-800 mt-1">{error}</p>
                        </div>
                    ))}
                </div>

                <div className="pt-4 border-t flex justify-end">
                    <button
                        onClick={onClose}
                        className="text-sm font-medium text-primary hover:text-primary/80"
                    >
                        Закрыть
                    </button>
                </div>
            </DialogContent>
        </Dialog>
    )
}
