<?php

use App\Http\Controllers\BotController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::get('/', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

Route::resource('bots', BotController::class);

Route::get('/dashboard', function () {
    $bot = auth()->user()->bots()->with('profile')->first();

    return Inertia::render('dashboard', [
        'bot_get' => $bot,
    ]);
})->middleware(['auth', 'verified'])->name('dashboard');

require __DIR__.'/settings.php';
