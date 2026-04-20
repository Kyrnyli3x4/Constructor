<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class StoreBotRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool // TODO: метод для проверки авторизациия пользователя если false то 403
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'token' => 'required|string|unique:bots,token|regex:/^\d+:[A-Za-z0-9_-]+$/',
            'platform' => 'required|in:telegram,discord,whatsapp',
            'name' => 'nullable|string|max:255',   // это имя сохранится в bot_profiles
        ];
    }

    public function messages()
    {
        return [
            'token.required' => 'Bot token is required.',
            'token.unique' => 'This token is already used.',
            'platform.in' => 'Please select a valid platform.',
        ];
    }
}
