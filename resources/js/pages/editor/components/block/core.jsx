import React, { forwardRef } from 'react';

const Block = forwardRef(({ children, className = '', style, ...props }, ref) => {
    const hasContent = React.Children.count(children) > 0;

    return (
        <div
            ref={ref}
            style={style}
            {...props}
            className={`relative flex flex-col justify-between gap-3 w-[240px] h-[160px] min-h-[160px] overflow-hidden border border-border rounded-xl bg-background p-4 shadow-sm ${className}`}
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
});

export default Block;
