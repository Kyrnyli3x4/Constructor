export default function Block({ children }) {
    return (
        <div
            className="
                flex flex-col gap-3
                w-[220px] min-h-[120px]
                border border-border
                rounded-xl p-4
                bg-white shadow-sm
                transition-all
                hover:shadow-md hover:border-primary/40
            "
        >
            {children}
        </div>
    );
}
