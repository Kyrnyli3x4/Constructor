import { useState } from 'react';
import { Input } from '@/components/ui/input.jsx';
import { Label } from '@/components/ui/label.jsx';
import { Separator } from '@/components/ui/separator.jsx';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs.jsx';
import { Textarea } from '@/components/ui/textarea.jsx';

export default function BasicSetting({ data, setData, errors }) {
    const [avatarPreview, setAvatarPreview] = useState(data.avatar_url || null);
    const [avatarError, setAvatarError] = useState('');

    // Валидация и обработка файла
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) {
            setData('avatar_file', null);
            setAvatarPreview(null);
            setAvatarError('');
            return;
        }

        const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
        if (!allowedTypes.includes(file.type)) {
            setAvatarError('Only JPEG, PNG, WEBP, GIF are allowed');
            setData('avatar_file', null);
            setAvatarPreview(null);
            return;
        }
        if (file.size > 2 * 1024 * 1024) {
            setAvatarError('File size must be less than 2MB');
            setData('avatar_file', null);
            setAvatarPreview(null);
            return;
        }

        setAvatarError('');
        setData('avatar_file', file);
        setData('avatar_url', ''); // очищаем URL при выборе файла

        const reader = new FileReader();
        reader.onloadend = () => setAvatarPreview(reader.result);
        reader.readAsDataURL(file);
    };

    // Валидация и обработка URL
    const handleUrlChange = (url) => {
        setData('avatar_url', url);
        setData('avatar_file', null);
        setAvatarPreview(url);
        setAvatarError('');

        if (url && !/^https?:\/\/.+/.test(url)) {
            setAvatarError('Please enter a valid URL (http:// or https://)');
        }
    };

    return (
        <div className="flex flex-col gap-4">
            {/* AVATAR */}
            <div>
                <Label>Bot avatar</Label>
                <Tabs defaultValue="url" className="mt-2">
                    <TabsList>
                        <TabsTrigger value="url">By URL</TabsTrigger>
                        <TabsTrigger value="file">Upload file</TabsTrigger>
                    </TabsList>
                    <TabsContent value="url" className="space-y-2">
                        <Input
                            type="url"
                            placeholder="https://example.com/avatar.jpg"
                            value={data.avatar_url || ''}
                            onChange={(e) => handleUrlChange(e.target.value)}
                        />
                        <p className="text-xs text-gray-500">Enter a direct link to an image (JPEG, PNG, WEBP, GIF)</p>
                    </TabsContent>
                    <TabsContent value="file" className="space-y-2">
                        <Input
                            type="file"
                            accept="image/jpeg,image/png,image/webp,image/gif"
                            onChange={handleFileChange}
                        />
                        <p className="text-xs text-gray-500">Max size: 2MB. Allowed: JPEG, PNG, WEBP, GIF</p>
                    </TabsContent>
                </Tabs>
                {avatarError && <p className="text-red-500 text-sm mt-1">{avatarError}</p>}
                {errors.avatar_file && <p className="text-red-500 text-sm mt-1">{errors.avatar_file}</p>}
                {errors.avatar_url && <p className="text-red-500 text-sm mt-1">{errors.avatar_url}</p>}

                {avatarPreview && (
                    <div className="mt-2">
                        <p className="text-sm font-medium">Preview:</p>
                        <img src={avatarPreview} alt="Avatar preview" className="mt-1 h-20 w-20 rounded-full object-cover border" />
                    </div>
                )}
            </div>

            <Separator />

            {/* DESCRIPTION */}
            <div>
                <Label htmlFor="description_name">Description</Label>
                <Textarea
                    className="mt-2"
                    id="description_name"
                    value={data.description_name || ''}
                    onChange={(e) => setData('description_name', e.target.value)}
                    placeholder="Custom bot description"
                />
                {errors.description_name && <p className="text-red-500 text-sm mt-1">{errors.description_name}</p>}
            </div>

            <Separator />

            {/* DISPLAY NAME */}
            <div>
                <Label htmlFor="display_name">Display name</Label>
                <Input
                    className="mt-2"
                    id="display_name"
                    value={data.settings.name || ''}
                    onChange={(e) => setData('display_name', e.target.value)}
                    placeholder="Custom bot name"
                />
                {errors.display_name && <p className="text-red-500 text-sm mt-1">{errors.display_name}</p>}
            </div>
        </div>
    );
}
