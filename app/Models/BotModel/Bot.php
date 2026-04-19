<?php

namespace App\Models\BotModel;

use Illuminate\Database\Eloquent\Model;

class Bot extends Model
{
    protected $table = 'bots';
    public function profile()
    {
        return $this->hasOne(BotProfile::class);
    }

}
