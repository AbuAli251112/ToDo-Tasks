<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\TodoController;
use App\Http\Controllers\UserController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Route::post('login', [AuthController::class, 'login']);
// Route::post('register', [AuthController::class, 'register']);

// Route::middleware(['auth'])->group(function () {

//     Route::post('logout', [AuthController::class, 'logout']);

//     // Route::get('todos', [TodoController::class, 'index']);
//     // Route::post('todos', [TodoController::class, 'store']);
//     // Route::get('todos/{todo}', [TodoController::class, 'show'])->where('todo', '[0-9]+');
//     // Route::put('todos/{todo}', [TodoController::class, 'update'])->where('todo', '[0-9]+');
//     // Route::delete('todos/{todo}', [TodoController::class, 'destroy'])->where('todo', '[0-9]+');

//     Route::resource('todos', TodoController::class)->except(['create', 'edit']);

//     Route::middleware(['role:admin'])->group(function () {
//         // Route::get('users', [UserController::class, 'index']);
//         // Route::post('users', [UserController::class, 'store']);
//         // Route::get('users/{user}', [UserController::class, 'show'])->where('user', '[0-9]+');
//         // Route::put('users/{user}', [UserController::class, 'update'])->where('user', '[0-9]+');
//         // Route::delete('users/{user}', [UserController::class, 'destroy'])->where('user', '[0-9]+');
//         Route::apiResource('users', UserController::class);
//     });
// });


Route::middleware('auth:sanctum')->group(function () {

    Route::post('logout', [AuthController::class, 'logout']);

    // Todo Resource
    Route::apiResource('todos', TodoController::class)->except(['create', 'edit']);


    // Route::middleware(['role:admin'])->group(function () {
    //     Route::apiResource('users', UserController::class);
    // });

    // Users resource
    Route::middleware(['role:admin'])->apiResource('users', UserController::class);
});

// Authentication routes
Route::post('login', [AuthController::class, 'login']);
Route::post('register', [AuthController::class, 'register']);