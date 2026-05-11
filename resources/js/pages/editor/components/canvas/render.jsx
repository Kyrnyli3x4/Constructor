import { useContext, useEffect, useState } from 'react';
import {
    DndContext,
    PointerSensor,
    useSensor,
    useSensors,
} from '@dnd-kit/core';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select.jsx';
import { BlockRow } from '@/pages/editor/components/block/index.jsx';
import useStorage from '@/pages/editor/components/canvas/interface.jsx';
import { StorageContext } from '@/pages/editor/components/canvas/storage.jsx';
import BlockSheet from '@/pages/editor/components/sheet/index.jsx';
import {
    createBlockId,
    createRowId,
    findBlockLocation,
    normalizeRows,
} from '@/pages/editor/components/canvas/core.jsx';

function SelectBot({ selectedBot, setSelectedBot }) {
    const [storage] = useStorage(useContext(StorageContext));

    return (
        <Select value={selectedBot} onValueChange={setSelectedBot}>
            <SelectTrigger className="w-full max-w-48">
                <SelectValue placeholder="Select a bot" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>The bot's</SelectLabel>
                    {storage.bots.map((params) => (
                        <SelectItem key={params.id} value={params.id}>
                            {params.profile.username}
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    );
}


export default function Canvas({ errors, setErrors }) {
    const [storage] = useStorage(useContext(StorageContext));
    const [open, setOpen] = useState(false);
    const [pendingRowIndex, setPendingRowIndex] = useState(0);
    const [editingBlock, setEditingBlock] = useState(null);
    const [selectedBot, setSelectedBot] = useState(() => {
        return localStorage.getItem('canvas-selectedBot') || '';
    });
    const [rows, setRows] = useState(() => {
        const saved = localStorage.getItem('canvas-rows');
        return saved ? JSON.parse(saved) : [{ id: 'row-0', blocks: [] }];
    });
    const sensors = useSensors(useSensor(PointerSensor));

    useEffect(() => {
        localStorage.setItem('canvas-rows', JSON.stringify(rows));
    }, [rows]);

    useEffect(() => {
        localStorage.setItem('canvas-selectedBot', selectedBot);
    }, [selectedBot]);

    const handlerOpen = (rowIndex) => {
        setPendingRowIndex(rowIndex);
        setEditingBlock(null);
        setOpen(true);
    };

    const handlerEdit = (rowIndex, blockIndex) => {
        setEditingBlock({ rowIndex, blockIndex });
        setOpen(true);
    };

    const handlerClose = () => {
        setOpen(false);
        setEditingBlock(null);
    };

    const validateBlockData = (data) => {
        const blockErrors = [];
        if (!data.message || data.message.trim() === '') {
            blockErrors.push('Message is required');
        }
        if (data.buttons && data.buttons.length > 0) {
            const labels = data.buttons.map(btn => btn.label?.trim()).filter(Boolean);
            if (labels.length !== new Set(labels).size) {
                blockErrors.push('Button labels must be unique');
            }
        }
        return blockErrors;
    };

    const handleSave = (data) => {
        const blockErrors = validateBlockData(data);
        const blockId = editingBlock ? rows[editingBlock.rowIndex].blocks[editingBlock.blockIndex].id : createBlockId();

        setRows((prevRows) => {
            let newRows;
            if (editingBlock) {
                newRows = prevRows.map((row, rowIndex) => {
                    if (rowIndex !== editingBlock.rowIndex) {
                        return row;
                    }

                    return {
                        ...row,
                        blocks: row.blocks.map((block, blockIndex) => {
                            if (blockIndex !== editingBlock.blockIndex) {
                                return block;
                            }

                            return {
                                ...block,
                                message: data.message || 'New block',
                                command: data.command,
                                buttons: data.buttons,
                            };
                        }),
                    };
                });
            } else {
                const targetIndex = Math.min(Math.max(0, pendingRowIndex), prevRows.length - 1);
                const wasEmptyTarget = prevRows[targetIndex]?.blocks.length === 0;

                newRows = prevRows.map((row, index) => {
                    if (index !== targetIndex) {
                        return row;
                    }

                    return {
                        ...row,
                        blocks: [
                            ...row.blocks,
                            {
                                id: blockId,
                                message: data.message || 'New block',
                                command: data.command,
                                buttons: data.buttons,
                            },
                        ],
                    };
                });

                if (targetIndex === prevRows.length - 1 && wasEmptyTarget) {
                    newRows.push({ id: createRowId(), blocks: [] });
                }
            }

            return normalizeRows(newRows);
        });

        setErrors((prevErrors) => {
            const filtered = prevErrors.filter(err => err.blockId !== blockId);
            if (blockErrors.length > 0) {
                // Найти номер блока
                let blockNumber = 1;
                for (let r = 0; r < rows.length; r++) {
                    for (let b = 0; b < rows[r].blocks.length; b++) {
                        if (rows[r].blocks[b].id === blockId) {
                            blockNumber = r * 10 + b + 1; // Простая нумерация
                            break;
                        }
                    }
                }
                filtered.push({ blockId, blockNumber, errors: blockErrors });
            }
            return filtered;
        });

        handlerClose();
    };

    const handleDelete = (rowIndex, blockIndex) => {
        const blockId = rows[rowIndex].blocks[blockIndex].id;
        setRows((prevRows) => {
            const nextRows = prevRows.map((row, index) => {
                if (index !== rowIndex) {
                    return row;
                }

                return {
                    ...row,
                    blocks: row.blocks.filter((_, indexBlock) => indexBlock !== blockIndex),
                };
            });

            return normalizeRows(nextRows);
        });
        setErrors((prevErrors) => prevErrors.filter(err => err.blockId !== blockId));
    };

    const handleDragEnd = ({ active, over }) => {
        if (!over || active.id === over.id) {
            return;
        }

        setRows((prevRows) => {
            const activeLocation = findBlockLocation(prevRows, active.id);
            if (!activeLocation) {
                return prevRows;
            }

            const nextRows = prevRows.map((row) => ({
                ...row,
                blocks: [...row.blocks],
            }));

            const [activeBlock] = nextRows[activeLocation.rowIndex].blocks.splice(activeLocation.blockIndex, 1);
            if (!activeBlock) {
                return prevRows;
            }

            if (over.id.startsWith('row-')) {
                const targetRowIndex = nextRows.findIndex((row) => row.id === over.id);
                if (targetRowIndex === -1) {
                    return normalizeRows(nextRows);
                }

                nextRows[targetRowIndex].blocks.push(activeBlock);
                return normalizeRows(nextRows);
            }

            const targetLocation = findBlockLocation(nextRows, over.id);
            if (!targetLocation) {
                return normalizeRows(nextRows);
            }

            let insertIndex = targetLocation.blockIndex;
            if (
                targetLocation.rowIndex === activeLocation.rowIndex &&
                targetLocation.blockIndex > activeLocation.blockIndex
            ) {
                insertIndex -= 1;
            }

            nextRows[targetLocation.rowIndex].blocks.splice(insertIndex, 0, activeBlock);
            return normalizeRows(nextRows);
        });
    };

    const editingInitialData = editingBlock
        ? rows[editingBlock.rowIndex]?.blocks[editingBlock.blockIndex]
        : null;

    return (
        <div className="flex flex-col flex-1 overflow-hidden p-6 bg-muted/30 rounded-xl gap-4">
            <div>
                <SelectBot selectedBot={selectedBot} setSelectedBot={setSelectedBot} />
                {!selectedBot && (
                    <p className="text-red-500 text-sm mt-1">Необходимо выбрать бота</p>
                )}
            </div>

            <div className="h-full rounded-xl border shadow-inner p-6">
                <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
                    <div className="grid gap-6">
                        {rows.map((row, index) => (
                            <BlockRow
                                key={row.id}
                                row={{ ...row, index }}
                                onAdd={handlerOpen}
                                onEdit={handlerEdit}
                                onDelete={handleDelete}
                            />
                        ))}
                    </div>
                </DndContext>
                <BlockSheet
                    open={open}
                    onClose={handlerClose}
                    onSave={handleSave}
                    initialData={editingInitialData}
                />
            </div>
        </div>
    );
}
