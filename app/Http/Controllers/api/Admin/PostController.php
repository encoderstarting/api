<?php

namespace App\Http\Controllers\Api\Admin;
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
    public function __construct(private PostService $postService){
        $this->postService = $postService;
    }
    public function store(StorePostRequest $request)
    {
        $data = $request->validated();
        $post = $this->postService->createPost($data);
        return new PostResource($post);
    }
    public function update(UpdatePostRequest $request, Post $post)
    {
        $data = $request->validated();
        $post = $this->postService->updatePost($post, $data);
        return new PostResource($post);
    }
    public function destroy(Post $post)
    {
        $this->postService->deletePost($post);
        return response()->json(['message' => 'пост удален']);
    }
}
