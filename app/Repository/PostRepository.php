<?php

namespace App\Repository;


use App\Models\Post;

class PostRepository
{
    public function paginate(int $perPage = 10){
        return Post::with('user')->latest()->paginate($perPage);
    }
    public function create(array $data): Post{
        return Post::create($data);
    }
    public function update(Post $post, array $data): Post{
        $post->update($data);
        return $post;
    }
    public function delete(Post $post): bool{
       return $post->delete();
        
    }







}
