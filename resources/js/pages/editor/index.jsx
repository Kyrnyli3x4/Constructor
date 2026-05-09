import { DndContext, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { restrictToWindowEdges } from '@dnd-kit/modifiers';
import { Head } from '@inertiajs/react';
import { useState, useEffect, useRef } from 'react';
import AppLayout from '@/layouts/app-layout.jsx';
import Canvas from '@/pages/editor/components/Canvas.jsx';
import Toolbar from '@/pages/editor/components/Toolbar.jsx';
const breadcrumbs = [{ title: 'Editor' }];

export default function Editor() {
    const sensors = useSensors(useSensor(PointerSensor));
    const [toolbarPosition, setToolbarPosition] = useState({ x: 0, y: 20 });
    const toolbarRef = useRef(null);

    // Установка начальной позиции по центру
    useEffect(() => {
        if (!toolbarRef.current) return;
        const rect = toolbarRef.current.getBoundingClientRect();
        setToolbarPosition({
            x: (window.innerWidth - rect.width) / 2,
            y: 20,
        });
    }, []);

    // Корректировка при ресайзе
    useEffect(() => {
        const handleResize = () => {
            if (!toolbarRef.current) return;
            const rect = toolbarRef.current.getBoundingClientRect();
            const maxX = window.innerWidth - rect.width;
            const maxY = window.innerHeight - rect.height;
            setToolbarPosition(prev => ({
                x: Math.min(Math.max(prev.x, 0), maxX),
                y: Math.min(Math.max(prev.y, 0), maxY),
            }));
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleDragEnd = (event) => {
        const { delta } = event;
        setToolbarPosition(prev => {
            let newX = prev.x + delta.x;
            let newY = prev.y + delta.y;
            if (toolbarRef.current) {
                const rect = toolbarRef.current.getBoundingClientRect();
                const maxX = window.innerWidth - rect.width;
                const maxY = window.innerHeight - rect.height;
                newX = Math.min(Math.max(newX, 0), maxX);
                newY = Math.min(Math.max(newY, 0), maxY);
            }
            return { x: newX, y: newY };
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Editor" />
            <div className="flex flex-row h-full">
                <div className="relative flex h-full flex-1 flex-col overflow-hidden rounded-xl">
                    <DndContext
                        sensors={sensors}
                        modifiers={[restrictToWindowEdges]}
                        onDragEnd={handleDragEnd}
                    >
                        <Toolbar ref={toolbarRef} position={toolbarPosition} />
                    </DndContext>
                    <Canvas />
                </div>
            </div>
        </AppLayout>
    );
}
