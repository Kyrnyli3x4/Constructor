export default function TextPreview({ message, maxLength = 50 }) {
    if (!message) return null

    const displayText = message.length > maxLength
        ? message.substring(0, maxLength) + '...'
        : message

    return (
        <div className="px-2 py-1 bg-primary/10 text-xs text-primary rounded border border-primary/20 line-clamp-2">
            {displayText}
        </div>
    )
}
