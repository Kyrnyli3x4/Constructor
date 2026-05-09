import { useState } from 'react';
import Block from '@/pages/editor/components/block/index.jsx';
import Sheets from '@/pages/editor/components/sheet/index.jsx';

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"


export default function Canvas({bots}) {
    const [open, setOpen] = useState(false)
    const handlerOpen = () => {
        setOpen(!open);
    }

    return (
        <div className="flex flex-col flex-1 overflow-hidden p-6 bg-muted/30 rounded-xl gap-4">

            <Select>
                <SelectTrigger className="w-full max-w-48">
                    <SelectValue placeholder="Select a bot" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectLabel>The bot's</SelectLabel>
                        {bots.map((params) =>
                            <SelectItem value={params.id}>{params.profile.username}</SelectItem>
                        )}
                    </SelectGroup>
                </SelectContent>
            </Select>

            <div className="h-full rounded-xl border shadow-inner p-6 ">

                <Block open={handlerOpen}>
                    {/*<TextComponent/>*/}
                    {/*<div className="p-2 border rounded-lg">component button</div>*/}
                </Block>

                <Sheets open={open} onClose={handlerOpen}/>

            </div>
        </div>
    )
}
