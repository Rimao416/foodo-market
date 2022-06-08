<?php 
namespace App\Controller;

use App\Entity\Conge;
use Symfony\Component\HttpFoundation\Request;
class FilesImageController {

    public function __invoke(Request $request)
    {

        $post=$request->attributes;
      
        if(!($post instanceof Conge)){
            throw new \RuntimeException('article attendu');
        }
        dd($post);
        // $post->setFile($request->files->get('file'));
        // $post->setUpdatedAt(new \DateTime());
        // dd($post);
        // return $post;
    }
}
