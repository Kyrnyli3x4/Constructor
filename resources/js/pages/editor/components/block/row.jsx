import { useDraggable, useDroppable } from '@dnd-kit/core';
import { GripVertical, Pencil, Trash2 } from 'lucide-react';
import Block from './core.jsx';

function DraggableBlock({ block, rowIndex, blockIndex, onEdit, onDelete }) {
    const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
        id: block.id,
        data: { type: 'block', rowIndex, blockIndex },
    });

    const { isOver, setNodeRef: setDroppableRef } = useDroppable({
        id: block.id,
    });

    const setRefs = (node) => {
        setNodeRef(node);
        setDroppableRef(node);
    };

    const visibleButtons = (block.buttons ?? []).slice(0, 2);
    const hiddenButtons = (block.buttons?.length ?? 0) - visibleButtons.length;

    return (
        <Block
            ref={setRefs}
            style={
                transform
                    ? {
                          transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
                          zIndex: 10,
                      }
                    : undefined
            }
            className={
                `${isDragging ? 'opacity-70' : ''} ${isOver ? 'ring-2 ring-primary/50' : ''}`
            }
        >
            <div className="absolute left-3 top-3 z-10">
                <button
                    type="button"
                    {...listeners}
                    {...attributes}
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-border bg-muted/80 text-muted-foreground transition hover:bg-muted"
                    aria-label="Drag block"
                >
                    <GripVertical className="h-4 w-4" />
                </button>
            </div>

            <div className="absolute right-3 top-3 flex items-center gap-2 z-10">
                <button
                    type="button"
                    onClick={(event) => {
                        event.stopPropagation();
                        onEdit();
                    }}
                    className="rounded-full bg-muted/80 p-1 text-muted-foreground transition hover:bg-muted"
                    aria-label="Edit block"
                >
                    <Pencil className="h-4 w-4" />
                </button>
                <button
                    type="button"
                    onClick={(event) => {
                        event.stopPropagation();
                        onDelete();
                    }}
                    className="rounded-full bg-muted/80 p-1 text-muted-foreground transition hover:bg-muted"
                    aria-label="Delete block"
                >
                    <Trash2 className="h-4 w-4" />
                </button>
            </div>

            <div className="flex h-full flex-col justify-between gap-3 pt-3">
                <div>
                    <div className="text-sm font-semibold text-foreground">{block.message}</div>
                    {block.command && (
                        <div className="mt-2 rounded-md bg-muted px-2 py-1 text-xs text-muted-foreground">
                            {block.command}
                        </div>
                    )}
                </div>

                {(block.buttons?.length ?? 0) > 0 && (
                    <div className="flex items-center gap-2 overflow-hidden">
                        {visibleButtons.map((button) => (
                            <div
                                key={button.id}
                                className="min-w-0 shrink rounded-xl border border-border px-2 py-1 text-xs font-medium text-foreground"
                            >
                                {button.label || 'Button'}
                            </div>
                        ))}
                        {hiddenButtons > 0 && (
                            <div className="rounded-full border border-border px-2 py-1 text-[10px] uppercase text-muted-foreground">
                                +{hiddenButtons}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </Block>
    );
}

export default function BlockRow({ row, onAdd, onEdit, onDelete }) {
    const { isOver, setNodeRef } = useDroppable({ id: row.id });

    return (
        <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between gap-3">
                <div className="text-xs font-medium uppercase tracking-[0.24em] text-muted-foreground">
                    Field {row.index + 1}
                </div>
                <button
                    type="button"
                    onClick={() => onAdd(row.index)}
                    className="rounded-full border border-border px-3 py-1 text-sm transition hover:bg-muted"
                >
                    + Add block
                </button>
            </div>
            <div
                ref={setNodeRef}
                className={`flex flex-wrap gap-4 rounded-3xl border border-border bg-background p-4 min-h-[180px] ${
                    isOver ? 'ring-2 ring-primary/50' : ''
                }`}
            >
                {row.blocks.length === 0 ? (
                    <button
                        type="button"
                        onClick={() => onAdd(row.index)}
                        className="flex min-h-[160px] min-w-[240px] items-center justify-center rounded-2xl border border-dashed border-border/60 bg-muted/10 text-sm text-muted-foreground"
                    >
                        Create first block
                    </button>
                ) : (
                    row.blocks.map((block, blockIndex) => (
                        <DraggableBlock
                            key={block.id}
                            block={block}
                            rowIndex={row.index}
                            blockIndex={blockIndex}
                            onEdit={() => onEdit(row.index, blockIndex)}
                            onDelete={() => onDelete(row.index, blockIndex)}
                        />
                    ))
                )}
            </div>
        </div>
    );
}
