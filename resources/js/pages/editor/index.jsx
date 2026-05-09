import { DndContext, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { restrictToWindowEdges } from '@dnd-kit/modifiers';
import { Head } from '@inertiajs/react';
import { useState, useEffect, useRef } from 'react';
import AppLayout from '@/layouts/app-layout.jsx';
import Canvas from '@/pages/editor/components/canvas/index.jsx';
import Toolbar from '@/pages/editor/components/Toolbar.jsx';

const breadcrumbs = [{ title: 'Editor' }];

const getInitialBotId = (bots) => {
    const savedBotId = localStorage.getItem('editor_selected_bot_id');
    const botId = savedBotId ? parseInt(savedBotId) : null;
    if (botId && bots.some(b => b.id === botId)) {
        return botId;
    }
    return null;
}

export default function Editor({ bots }) {
    const sensors = useSensors(useSensor(PointerSensor));
    const [toolbarPosition, setToolbarPosition] = useState({ x: 0, y: 20 });
    const [selectedBotId, setSelectedBotId] = useState(() => getInitialBotId(bots));
    const toolbarRef = useRef(null);

    // Обновляем selectedBotId если бот был удален
    useEffect(() => {
        if (selectedBotId && !bots.some(b => b.id === selectedBotId)) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setSelectedBotId(null);
            localStorage.removeItem('editor_selected_bot_id');
        }
    }, [bots, selectedBotId]);

    // Сохраняем выбор бота в localStorage
    const handleSelectBot = (botId) => {
        setSelectedBotId(botId);
        localStorage.setItem('editor_selected_bot_id', botId.toString());
    };

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
            <div className="flex flex-row h-full gap-6 p-4">
                <div className="relative flex h-full flex-1 flex-col overflow-hidden rounded-xl">
                    {selectedBotId ? (
                        <DndContext
                            sensors={sensors}
                            modifiers={[restrictToWindowEdges]}
                            onDragEnd={handleDragEnd}
                        >
                            <Toolbar ref={toolbarRef} position={toolbarPosition} />
                        </DndContext>
                    ) : null}
                    <Canvas botId={selectedBotId} bots={bots} onSelectBot={handleSelectBot} />
                </div>
            </div>
        </AppLayout>
    );
}
