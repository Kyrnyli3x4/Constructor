<?php

namespace App\Models\BotModel;

use App\Models\User;
use Illuminate\Database\Eloquent\Model;

class Bot extends Model
{
    protected $table = 'bots';

    protected $fillable = [
        'user_id',
        'token',
        'platform',
        'webhook',
    ];

    // Отношения
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function profile()
    {
        return $this->hasOne(BotProfile::class);
    }

//    // Автоматическое создание профиля после создания бота
//    protected static function booted()
//    {
//        static::created(function ($bot) {
//            $bot->profile()->create([]); // пустой профиль, имя можно будет задать позже
//        });
//    }

    // Аксессор для удобного получения имени (если есть)
    public function getDisplayNameAttribute()
    {
        return $this->profile->name ?? 'Bot #' . $this->id;
    }
}
