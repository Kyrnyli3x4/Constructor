import { useContext, useState } from 'react';
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
import {StorageContext} from '@/pages/editor/components/canvas/storage.jsx';
import Sheets from '@/pages/editor/components/sheet/index.jsx';

function SelectBot (){
    const [storage] = useStorage(useContext(StorageContext))
    return (
        <Select>
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
    )
}

const createBlockId = (() => {
    let nextId = 1;
    return () => `block-${nextId++}`;
})();

export default function Canvas() {
    const [storage] = useStorage(useContext(StorageContext));
    const [open, setOpen] = useState(false);
    const [pendingRowIndex, setPendingRowIndex] = useState(0);
    const [rows, setRows] = useState([{ id: 'row-0', blocks: [] }]);

    const handlerOpen = (rowIndex) => {
        setPendingRowIndex(rowIndex);
        setOpen(true);
    };

    const handlerClose = () => {
        setOpen(false);
        setPendingRowIndex(0);
    };

    const handleSave = (data) => {
        setRows((prevRows) => {
            const targetIndex = Math.min(Math.max(0, pendingRowIndex), prevRows.length - 1);
            const targetRow = prevRows[targetIndex] || prevRows[prevRows.length - 1];
            const wasEmptyTarget = targetRow.blocks.length === 0;

            const nextRows = prevRows.map((row, index) => {
                if (index !== targetIndex) {
                    return row;
                }

                return {
                    ...row,
                    blocks: [
                        ...row.blocks,
                        {
                            id: createBlockId(),
                            message: data.message || 'New block',
                            command: data.command,
                            buttons: data.buttons,
                        },
                    ],
                };
            });

            if (targetIndex === prevRows.length - 1 && wasEmptyTarget) {
                nextRows.push({ id: `row-${prevRows.length}`, blocks: [] });
            }

            return nextRows;
        });

        handlerClose();
    };

    return (
        <div className="flex flex-col flex-1 overflow-hidden p-6 bg-muted/30 rounded-xl gap-4">
            <SelectBot />

            <div className="h-full rounded-xl border shadow-inner p-6">
                <div className="grid gap-6">
                    {rows.map((row, index) => (
                        <BlockRow
                            key={row.id}
                            row={{ ...row, index }}
                            onAdd={handlerOpen}
                        />
                    ))}
                </div>
                <Sheets open={open} onClose={handlerClose} onSave={handleSave} />
            </div>
        </div>
    );
}
