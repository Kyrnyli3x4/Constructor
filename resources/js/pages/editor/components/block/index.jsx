import React from 'react';

export default function Block({ children, id, open }) {
    const hasContent = React.Children.count(children) > 0;

    return (
        <div
            id={id}
            className={
                `flex flex-col gap-3 w-[220px] h-[120px] border border-border rounded-xl p-4 shadow-sm transition-all hover:shadow-md hover:border-primary/40 cursor-pointer overflow-hidden`}
            onClick={open}
        >
            {hasContent ? (
                children
            ) : (
                <div className="flex w-full h-full p-4 text-muted-foreground text-sm italic justify-center items-center">
                    Add items to menu
                </div>
            )}
        </div>
    );
}

export function BlockRow({ row, onAdd }) {
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
            <div className="flex flex-wrap gap-4 rounded-3xl border border-border bg-background p-4 min-h-[160px]">
                {row.blocks.length === 0 ? (
                    <button
                        type="button"
                        onClick={() => onAdd(row.index)}
                        className="flex min-h-[120px] min-w-[220px] flex-1 items-center justify-center rounded-2xl border border-dashed border-border/60 bg-muted/10 text-sm text-muted-foreground"
                    >
                        Create first block
                    </button>
                ) : (
                    row.blocks.map((block) => (
                        <Block key={block.id} id={block.id}>
                            <div className="flex flex-col justify-between h-full">
                                <div className="text-sm font-semibold text-foreground">
                                    {block.message}
                                </div>
                                {block.command && (
                                    <div className="rounded-md bg-muted px-2 py-1 text-xs text-muted-foreground">
                                        {block.command}
                                    </div>
                                )}
                            </div>
                        </Block>
                    ))
                )}
            </div>
        </div>
    );
}
