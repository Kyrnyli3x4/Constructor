<?php

namespace App\Http\Controllers\Telegram;

use App\Http\Controllers\Controller;
use Illuminate\Http\Response;
use Illuminate\Routing\ResponseFactory;
use Telegram\Bot\Laravel\Facades\Telegram;

class TelegramController extends Controller
{
    public function webhook(): Response|ResponseFactory
    {
        $update = Telegram::getWebhookUpdate();
        logger($update);

        // 1. Если это обычное сообщение
        if ($message = $update->getMessage()) {
            $chatId = $message->getChat()->getId();
            $text = $message->getText();

            Telegram::sendMessage([
                'chat_id' => $chatId,
                'text' => "Ты написал: $text",
                'buttons' => []
            ]);
        }

        // 2. Если это callback_query
        if ($callback = $update->getCallbackQuery()) {
            logger($callback);
            $chatId = $callback->getMessage()->getChat()->getId();
            $data = $callback->getData();

            Telegram::sendMessage([
                'chat_id' => $chatId,
                'text' => "Ты нажал кнопку: $data",
            ]);
        }

        return response('OK', 200);
    }
}
