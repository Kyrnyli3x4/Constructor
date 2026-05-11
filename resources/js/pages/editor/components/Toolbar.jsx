import { useDraggable } from '@dnd-kit/core';
import { GripVertical, ImageIcon, MessageCircle, Plus, SquarePen } from 'lucide-react';
import { forwardRef } from 'react';
import { Button } from '@/components/ui/button.jsx';
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip"

const Toolbar = forwardRef(({ position, errors }, ref) => {
    const { listeners, attributes, transform, isDragging } = useDraggable({
        id: 'toolbar',
    });

    const style = {
        position: 'absolute',
        left: position.x,
        top: position.y,
        transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
        zIndex: 20,
        cursor: isDragging ? 'grabbing' : 'auto',
    };

    return (
        <div ref={ref} style={style}>
            <div className="relative rounded-xl border backdrop-blur-md shadow-lg">
                {/* DRAG HANDLE */}
                <div
                    className="flex justify-center rotate-90 cursor-grab"
                    {...listeners}
                    {...attributes}
                >
                    <GripVertical className="h-5 w-5 text-muted-foreground" />
                </div>
                <div className="max-h-[180px] overflow-y-auto px-2 pb-4 pt-2 flex flex-col gap-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">

                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button variant="outline" size='icon'><MessageCircle/></Button>
                        </TooltipTrigger>
                        <TooltipContent side="right">
                            {errors.length > 0 ? (
                                <div>
                                    {errors.map((error, index) => (
                                        <p key={index}>В блоке {error.blockNumber} имеется ошибка: {error.errors.join(', ')}</p>
                                    ))}
                                </div>
                            ) : (
                                <p>Нет ошибок</p>
                            )}
                        </TooltipContent>
                    </Tooltip>

                    <Button variant="outline" size="icon"><Plus /></Button>
                    <Button variant="outline" size="icon"><SquarePen /></Button>
                    <Button variant="outline" size="icon"><ImageIcon /></Button>
                    <Button variant="outline" size="icon"><Plus /></Button>
                    <Button variant="outline" size="icon"><SquarePen /></Button>
                    <Button variant="outline" size="icon"><ImageIcon /></Button>
                </div>
            </div>
        </div>
    );
})


export default Toolbar
