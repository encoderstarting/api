<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Post;
use App\Http\Resources\PostResource;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use App\Http\Requests\StorePostRequest;
use App\Http\Requests\UpdatePostRequest;
use App\Service\PostService;

class PostController extends Controller
{
    public function __construct(private PostService $postService)
    {
        $this->postService = $postService;
    }
    public function index()
    {
        $posts = $this->postService->getPaginatedPosts();
        return PostResource::collection($posts);
    }
    public function show(Post $post)
    {
        return new PostResource($post->load('user'));
    }
}
