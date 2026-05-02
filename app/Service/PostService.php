<?php

namespace App\Service;

use App\Repository\PostRepository;
use App\Models\Post;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Auth;
use App\Models\User as UserModel;
use App\Models\Role as RoleModel;

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
        $data['slug'] = Str::slug($data['title']);
        return $this->postRepository->update($post, $data);
    }
        public function deletePost(Post $post): bool
    {
        return $this->postRepository->delete($post);
    }
    public function assignRole(UserModel $user, RoleModel $role): void
    {
        $role = RoleModel::where('name', $role)->first();
        if (!$role) {
            throw new \Exception('Role not found');
        }
        $user->roles()->attach($role->id);
    }

}