import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.jsx';
import AdditionalTab from '@/pages/bots/components/tabs/AdditionalTab.jsx';
import BasicSetting from '@/pages/bots/components/tabs/BasicTab.jsx';
import MainTab from '@/pages/bots/components/tabs/MainTab.jsx';

export default function BotEditTabs({ data, setData, errors }) {
    return (
        <Tabs defaultValue="basic" className="mt-4">
            <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="basic">Базовые</TabsTrigger>
                <TabsTrigger value="main">Главные</TabsTrigger>
                <TabsTrigger value="additional">Дополнительные</TabsTrigger>
            </TabsList>

            {/* Вкладка 1: Основные настройки */}
            <TabsContent value="basic" className="space-y-4">
                <BasicSetting
                    data={data}
                    setData={setData}
                    errors={errors}
                />
            </TabsContent>

            {/* Вкладка 2: Дополнительные настройки */}
            <TabsContent value="additional" className="space-y-4">
                <AdditionalTab
                    data={data}
                    setData={setData}
                    errors={errors}
                />
            </TabsContent>

            {/* Вкладка 3: Главные настройки */}
            <TabsContent value="main" className="space-y-4">
                <MainTab
                    data={data}
                    setData={setData}
                    errors={errors}
                />
            </TabsContent>
        </Tabs>
    );
}
