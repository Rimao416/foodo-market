<?php 
namespace App\Controller;
use Symfony\Component\Security\Core\Security;
use Doctrine\ORM\EntityManagerInterface;
use App\Entity\Conge;
use App\Entity\User;
use Symfony\Component\Routing\Annotation\Route;

class SingleCongeController{
    private $security;
    private $manager;
    public function __construct(Security $security,EntityManagerInterface $manager)
        {   
            $this->security=$security;
            $this->manager=$manager;
        }
    public function __invoke()    
        {
            $user=$this->security->getUser();
            // ($user->getId());
            return ($this->manager->createQuery('SELECT u FROM App\Entity\Conge u WHERE u.user= :conge_id')
               ->setParameter('conge_id',$user->getId())
               ->getResult());
        }
}
