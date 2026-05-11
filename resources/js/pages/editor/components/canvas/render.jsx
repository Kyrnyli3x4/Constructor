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
import Block from '@/pages/editor/components/block/index.jsx';
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

export default function Canvas() {

    const [open, setOpen] = useState(false);
    const handlerOpen = () => {
        setOpen(!open)
    }


    return (
        <div className="flex flex-col flex-1 overflow-hidden p-6 bg-muted/30 rounded-xl gap-4">
            <SelectBot/>

            <div className="h-full rounded-xl border shadow-inner p-6">
                <Block open={handlerOpen}>

                </Block>
                <Sheets open={open} onClose={handlerOpen} />
            </div>
        </div>
    )
}
