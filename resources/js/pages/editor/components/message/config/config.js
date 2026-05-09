import { MessageCirclePlus } from 'lucide-react';


export const textSchema = {
    id:'text123',
    type: 'text',
    content: '<p>The first text</p>',
    settings: {
        icon: <MessageCirclePlus/>,
        label: 'Текстовый модуль',
        placeholder: 'Введите текст ...',
        parse_mode: 'html', // || markdown
        disable_web_page_preview: false,
        protect_content: false,
        disable_notification: false,
    }
}
