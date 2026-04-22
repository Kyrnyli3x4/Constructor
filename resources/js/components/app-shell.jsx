// AppShell.jsx
import { useState, useEffect } from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';

export function AppShell({ children, variant = 'header' }) {
    // 1. Читаем начальное состояние из localStorage, а не из пропсов
    const [isOpen, setIsOpen] = useState(() => {
        if (typeof window === 'undefined') return true;
        const saved = localStorage.getItem('sidebar_open');
        // Если в localStorage ничего нет, по умолчанию панель открыта
        return saved !== null ? saved === 'true' : true;
    });

    // 2. Сохраняем новое состояние в localStorage при каждом его изменении
    useEffect(() => {
        localStorage.setItem('sidebar_open', String(isOpen));
    }, [isOpen]);

    if (variant === 'header') {
        return <div className="flex min-h-screen w-full flex-col">{children}</div>;
    }

    // 3. Используем локальное состояние для управления провайдером
    return (
        <SidebarProvider open={isOpen} onOpenChange={setIsOpen}>
            {children}
        </SidebarProvider>
    );
}
