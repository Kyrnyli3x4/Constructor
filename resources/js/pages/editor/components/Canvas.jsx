import Block from '@/pages/editor/components/elements/block.jsx';
import TextComponent from '@/pages/editor/components/elements/TextComponent.jsx';

export default function Canvas() {
    return (
        <div className="flex-1 overflow-hidden p-6 bg-muted/30 rounded-xl dark">
            <div className="h-full rounded-xl border bg-white shadow-inner p-6 ">
                <Block>
                    <TextComponent/>
                    <div className="p-2 border rounded-lg">component button</div>
                </Block>
            </div>
        </div>
    )
}
