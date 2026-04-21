<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreBotRequest;
use App\Models\BotModel\Bot;
use App\Models\BotModel\BotProfile;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;
use Inertia\Inertia;

class BotController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('bots/CreateBot', []);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreBotRequest $request)
    {
        $response = Http::withoutVerifying()->get("https://api.telegram.org/bot{$request->token}/getMe"); // FIXME: исправить, потому что данный метод не использует SSL

        if ($response->successful() && $response->status() == 200) {
            $bot = Bot::create([
                'user_id' => auth()->id(),
                'token' => $request->token,
                'platform' => $request->platform,
            ]);

            // 3. Создаём профиль бота
            BotProfile::create([
                'bot_id' => $bot->id,
                'username' => $response->json('result.username'),
                'settings' => json_encode([
                    'name' => $response->json('result.first_name').' '.$response->json('result.last_name'),
                    'status' => 'active',
                    // 'description' => $response->json('result.description'),
                ]), // или null, или массив по умолчанию
            ]);
            $bots = auth()->user()->bots()->with('profile')->get();

            return Inertia::render('dashboard', [
                'bot_get' => $bot,
            ]);

        }

        return back()->withErrors(['token' => 'Неверный токен бота.']);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        dd($request);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $delete = DB::table('bots')->where('id', $id)->delete();

        return Inertia::render('dashboard', [
            'delete' => $delete,
        ]);
    }
}
