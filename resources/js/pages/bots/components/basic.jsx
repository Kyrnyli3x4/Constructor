import { Input } from '@/components/ui/input.jsx';
import { Label } from '@/components/ui/label.jsx';

export default function BasicSetting({data, errors}) {
    return (
        <div className="flex flex-col gap-4">
            <div>
                <Label htmlFor="platform">Platform</Label>
                <select
                    id="platform"
                    value={data.platform}
                    onChange={(e) => setData('platform', e.target.value)}
                    className="w-full border rounded p-2 mt-2"
                >
                    <option value="telegram">Telegram</option>
                    <option value="discord">Discord</option>
                    <option value="whatsapp">WhatsApp</option>
                </select>
                {errors.platform && <p className="text-red-500 text-sm">{errors.platform}</p>}
            </div>
            <div>
                <Label htmlFor="display_name">Display Name</Label>
                <Input
                    className="mt-2"
                    id="display_name"
                    value={data.display_name}
                    onChange={(e) => setData('display_name', e.target.value)}
                    placeholder="Custom bot name"
                />
            </div>
            <div>
                <Label htmlFor="username">Telegram Username</Label>
                <Input
                    className="mt-2"
                    id="username"
                    value={data.username}
                    onChange={(e) => setData('username', e.target.value)}
                    placeholder="@my_bot"
                />
                {errors.username && <p className="text-red-500 text-sm">{errors.username}</p>}
            </div>
        </div>
    )
}
