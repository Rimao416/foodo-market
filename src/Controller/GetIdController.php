<?php 
namespace App\Controller;

use App\Entity\User;
use Symfony\Component\Routing\Annotation\Route;

class GetIdController{
    public function __invoke(int $data): void
    {
     echo($data);
    }
}
