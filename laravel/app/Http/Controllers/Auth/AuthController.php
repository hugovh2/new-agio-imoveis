<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    // Método para registrar um novo usuário
    public function register(Request $request)
    {
      dd('teste');
    }

    // Método para autenticar um usuário (login)
    public function login(Request $request)
    {
        // Validação dos dados
        $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string',
        ]);

        // Tentar autenticar o usuário
        if (!auth()->attempt($request->only('email', 'password'))) {
            return response()->json(['message' => 'Credenciais inválidas'], 401);
        }

        // Buscar o usuário autenticado
        $user = User::where('email', $request->email)->firstOrFail();

        // Gerar token de acesso
        $token = $user->createToken('auth_token')->plainTextToken;

        // Retornar resposta com o usuário e o token
        return response()->json([
            'user' => $user,
            'token' => $token,
        ]);
    }

    // Método para deslogar o usuário (revogar token)
    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json(['message' => 'Logout realizado com sucesso']);
    }
}
