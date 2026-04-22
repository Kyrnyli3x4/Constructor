import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout.jsx';
import Canvas from '@/pages/editor/components/Canvas.jsx';
import Toolbar from '@/pages/editor/components/Toolbar.jsx';

const breadcrumbs = [
    { title: 'Editor' },
];

export default function Editor() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Editor" />

            <div className="relative flex h-full flex-1 flex-col overflow-hidden rounded-xl">
                <Toolbar/>
                <Canvas/>
            </div>
        </AppLayout>
    );
}
