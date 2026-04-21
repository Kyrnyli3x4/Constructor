import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch'; // если используете Switch для уведомлений
import { Textarea } from '@/components/ui/textarea';

export default function AdditionalTab({ data, setData, errors }) {
    // Функция обновления конкретного ключа в settings
    const updateSetting = (key, value) => {
        setData('settings', {
            ...data.settings,
            [key]: value,
        });
    };

    // Получаем текущие настройки с защитой от undefined
    const settings = data.settings || {};

    return (
        <div className="space-y-4">
            {/* Время отправки */}
            <div className="space-y-1">
                <Label htmlFor="send_time">Время отправки (UTC)</Label>
                <Input
                    id="send_time"
                    type="time"
                    value={settings.send_time || ''}
                    onChange={(e) => updateSetting('send_time', e.target.value)}
                    placeholder="09:00"
                />
                <p className="text-xs text-gray-500">Укажите время, когда бот будет отправлять сообщения (24h).</p>
            </div>

            {/* Ограничение по сообщениям */}
            <div className="space-y-1">
                <Label htmlFor="message_limit">Ограничение по сообщениям</Label>
                <Input
                    id="message_limit"
                    type="number"
                    min="0"
                    value={settings.message_limit ?? ''}
                    onChange={(e) => updateSetting('message_limit', e.target.valueAsNumber)}
                    placeholder="100"
                />
                <p className="text-xs text-gray-500">Максимальное количество сообщений в сутки (0 — без лимита).</p>
            </div>

            {/* Уведомления (Switch) */}
            <div className="flex items-center justify-between">
                <div>
                    <Label htmlFor="notifications">Уведомления</Label>
                    <p className="text-xs text-gray-500">Включить уведомления о новых сообщениях?</p>
                </div>
                <Switch
                    id="notifications"
                    checked={settings.notifications ?? false}
                    onCheckedChange={(checked) => updateSetting('notifications', checked)}
                />
            </div>

            {/* Глобальные переменные (Textarea для JSON) */}
            <div className="space-y-1">
                <Label htmlFor="global_vars">Глобальные переменные (JSON)</Label>
                <Textarea
                    id="global_vars"
                    value={settings.global_vars ? JSON.stringify(settings.global_vars, null, 2) : ''}
                    onChange={(e) => {
                        try {
                            const parsed = JSON.parse(e.target.value);
                            updateSetting('global_vars', parsed);
                        } catch {
                            // если невалидный JSON, пока не обновляем
                        }
                    }}
                    placeholder='{"key": "value"}'
                    rows={5}
                />
                <p className="text-xs text-gray-500">Определите переменные в формате JSON для использования в сценариях.</p>
                {errors['settings.global_vars'] && (
                    <p className="text-red-500 text-sm">{errors['settings.global_vars']}</p>
                )}
            </div>

            {/* Отображение глобальных ошибок settings, если есть */}
            {errors.settings && typeof errors.settings === 'string' && (
                <p className="text-red-500 text-sm">{errors.settings}</p>
            )}
        </div>
    );
}
