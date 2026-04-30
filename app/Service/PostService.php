<?php

namespace App\Service;

use App\Repository\PostRepository;
use App\Models\Post;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Auth;

class PostService
{
    protected $postRepository;
    public function __construct(PostRepository $postRepository)
    {
        $this->postRepository = $postRepository;
    }
    public function getPaginatedPosts(): LengthAwarePaginator
    {
        return $this->postRepository->paginate();
    }
        public function createPost(array $data): Post
    {
        $data['slug'] = Str::slug($data['title']);
        $data['user_id'] = Auth::user()->id;
        $data['published_at'] =  $data['published_at'] ?? now();
        return $this->postRepository->create($data);
        
    }
        public function updatePost(Post $post, array $data): Post
    {
        if ($post->user_id !== Auth::user()->id) {
            throw new \Exception('You are not authorized to update this post');
        }
        $data['slug'] = Str::slug($data['title']);
        return $this->postRepository->update($post, $data);
    }
        public function deletePost(Post $post): bool
    {
        if ($post->user_id !== Auth::user()->id) {
            throw new \Exception('You are not authorized to delete this post');
        }
        return $this->postRepository->delete($post);
    }

}