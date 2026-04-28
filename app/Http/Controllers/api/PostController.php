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
        $posts = Post::with('user')->paginate(10) ->latest();
        return PostResource::collection($posts);
    }
    public function show(Post $post)
    {
        $post->load('user');

        return new PostResource($post);
    }
    public function store(Request $request)
    {
        $data = $request ->validate;
        $post = Post::create([
            'title' => $data['title'],
            'content' => $data['content'],
            'user_id' => Auth::user()->id,
            'slug' => Str::slug($data['title']),
            'published_at' => $data['published_at'] ?? now(),
        ]);
        return new PostResource($post->load('user'));
      
    }
    public function update(Request $request, Post $post)
    {
        $data = $request ->validate;
        $post->update($data);
        return new PostResource($post->load('user'));
    }
    public function destroy(Post $post)
    {
        $post->delete();
        return response()->json(['message' => 'пост удален']);
    }
}
