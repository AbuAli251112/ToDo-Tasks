<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Todo;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class TodoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = Auth::user();

        $todos = null;
        if ($user->hasRole('admin')) {
            $todos = Todo::all();
        } else if ($user->hasRole('user')) {
            $todos = $user->todos;
        }
        return response()->json($todos);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            // 'status' => 'required|in:pending,completed',
            'status' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $user = Auth::user();

        $todo = new Todo([
            'title' => $request->input('title'),
            'description' => $request->input('description'),
        ]);

        $user->todos()->save($todo);

        return response()->json($todo, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Todo $todo)
    {
        $user = Auth::user();
    
        if (!$user->hasRole('admin') && $user->id !== $todo->user_id) {
            return response()->json(['message' => 'Not authorized to access this resource'], 403);
        }
    
        return response()->json($todo);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Todo $todo)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'status' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $user = Auth::user();

        if (!$user->hasRole('admin') && $user->id !== $todo->user_id) {
            return response()->json(['message' => 'Not authorized to access this resource'], 403);
        }

        $todo->title = $request->input('title');
        $todo->description = $request->input('description');
        $todo->status = $request->input('status');
        $todo->save();

        return response()->json($todo);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Todo $todo)
    {
        $user = Auth::user();

        if (!$user->hasRole('admin') && $user->id !== $todo->user_id) {
            return response()->json(['message' => 'Not authorized to access this resource'], 403);
        }

        $todo->delete();

        return response()->json(['message' => 'Todo deleted Successfully']);
    }
}
