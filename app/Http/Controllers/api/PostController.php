<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Post;
use App\Http\Resources\PostResource;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;



class PostController extends Controller
{
    public function index()
    {
        $posts = Post::with('user')->latest() ->paginate(10);
        return PostResource::collection($posts);
    }
    public function show(Post $post)
    {
        $post->load('user');

        return new PostResource($post);
    }
    public function store(Request $request)
    {
        $data = $request ->validate([
            'content' => 'required|string|max:255',
            'title' => 'required|string|max:255',
            'published_at' => 'nullable|date',
        ]);
        $post = Post::create([
            'user_id' => Auth::user()->id,
            'content' => $data['content'],
            'title' => $data['title'],
            'slug' => Str::slug($data['title']),
            'published_at' => $data['published_at'] ?? now(),
        ]);
        return new PostResource($post->load('user'));
      
    }
    public function update(Request $request, Post $post)
    {
        $data = $request ->validate([
            'content' => 'required|string|max:255',
            'title' => 'required|string|max:255',
            'published_at' => 'nullable|date',
        ]);
        $post->update($data);
        return new PostResource($post->load('user'));
    }
    public function destroy(Post $post)
    {
        $post->delete();
        return response()->json(['message' => 'пост удален']);
    }
}
