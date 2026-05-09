import React from 'react';

export default function Block({ children, id, open }) {
    // Check if there are any valid children (ignores empty fragments, null, undefined)
    const hasContent = React.Children.count(children) > 0;

    return (
        <div
            id={id}
            className={`
            flex flex-col gap-3
            w-[220px] h-[120px]
            border border-border
            rounded-xl p-4
            shadow-sm
            transition-all
            hover:shadow-md hover:border-primary/40
            cursor-pointer
            overflow-hidden
      `}
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
