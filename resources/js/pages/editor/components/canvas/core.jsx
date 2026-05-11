export const createBlockId = (() => {
    let nextId = 1;
    return () => `block-${nextId++}`;
})();

export const createRowId = (() => {
    let nextId = 1;
    return () => `row-${nextId++}`;
})();

export function findBlockLocation(rows, blockId) {
    for (let rowIndex = 0; rowIndex < rows.length; rowIndex += 1) {
        const blockIndex = rows[rowIndex].blocks.findIndex((block) => block.id === blockId);
        if (blockIndex !== -1) {
            return { rowIndex, blockIndex, block: rows[rowIndex].blocks[blockIndex] };
        }
    }
    return null;
}

export function normalizeRows(rows) {
    const normalized = rows.filter((row, index) => row.blocks.length > 0 || index === rows.length - 1);
    if (normalized.length === 0) {
        return [{ id: 'row-0', blocks: [] }];
    }
    if (normalized[normalized.length - 1].blocks.length > 0) {
        normalized.push({ id: createRowId(), blocks: [] });
    }
    return normalized;
}
