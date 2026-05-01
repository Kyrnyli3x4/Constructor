import { useState } from 'react';
import Block from '@/pages/editor/components/block/index.jsx';
import TextComponent from '@/pages/editor/components/message/index.jsx';
import Sheets from '@/pages/editor/components/sheet/index.jsx';

export default function Canvas() {


    const [open, setOpen] = useState(false)
    const handlerOpen = () => {
        setOpen(!open);
    }


    return (
        <div className="flex-1 overflow-hidden p-6 bg-muted/30 rounded-xl">
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
