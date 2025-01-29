<?php

use App\Http\Controllers\Auth\AuthController;
use Illuminate\Support\Facades\Route;

// Registro de novo usuário
Route::post('/register', [AuthController::class, 'register']);

// Login de usuário
Route::post('/login', [AuthController::class, 'login']);

// Logout de usuário
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');
