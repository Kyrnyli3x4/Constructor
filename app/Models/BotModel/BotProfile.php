<?php

namespace App\Models\BotModel;

use Illuminate\Database\Eloquent\Model;

class BotProfile extends Model
{
    protected $table = 'bot_profiles';

    protected $fillable = [
        'bot_id',
        'username',
        'settings',   // обратите внимание: множественное число
    ];

    protected $casts = [
        'settings' => 'array', // автоматически преобразовывать JSON в массив/объект
    ];

    // Связь с ботом
    public function bot()
    {
        return $this->belongsTo(Bot::class);
    }
}
