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

Route::resource('bots', BotController::class)->middleware(['auth', 'verified']);

Route::get('/dashboard', function () {
    $bots = auth()->user()->bots()->with('profile')->get();
    return Inertia::render('dashboard', [
        'Bots' => $bots,
    ]);
})->middleware(['auth', 'verified'])->name('dashboard');

Route::get('editor', function () {
    return Inertia::render('editor/index', []);
})->middleware(['auth', 'verified'])->name('editor.index');

require __DIR__.'/settings.php';
