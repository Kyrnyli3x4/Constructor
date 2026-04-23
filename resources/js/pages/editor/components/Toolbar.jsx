import { useDraggable } from '@dnd-kit/core';
import { GripVertical, ImageIcon, Plus, SquarePen } from 'lucide-react';
import { forwardRef } from 'react';
import { Button } from '@/components/ui/button.jsx';

const Toolbar = forwardRef(({ position }, ref) => {
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
            <div className="relative rounded-xl border bg-white/80 backdrop-blur-md shadow-lg">
                {/* DRAG HANDLE */}
                <div
                    className="flex justify-center rotate-90 cursor-grab"
                    {...listeners}
                    {...attributes}
                >
                    <GripVertical className="h-5 w-5 text-muted-foreground" />
                </div>

                {/* TOP BLUR */}
                <div className="pointer-events-none absolute left-0 right-0 h-15 bg-gradient-to-b from-white/90 via-white/40 to-transparent rounded-t-xl z-10" />

                {/* SCROLLABLE CONTENT */}
                <div className="max-h-[180px] overflow-y-auto px-2 pb-4 pt-2 flex flex-col gap-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
                    <Button variant="outline" size="icon"><Plus /></Button>
                    <Button variant="outline" size="icon"><SquarePen /></Button>
                    <Button variant="outline" size="icon"><ImageIcon /></Button>
                    <Button variant="outline" size="icon"><Plus /></Button>
                    <Button variant="outline" size="icon"><SquarePen /></Button>
                    <Button variant="outline" size="icon"><ImageIcon /></Button>
                </div>

                {/* BOTTOM BLUR */}
                <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-15 bg-gradient-to-t from-white/90 via-white/40 to-transparent rounded-b-xl z-10" />
            </div>
        </div>
    );
})


export default Toolbar
