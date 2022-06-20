<?php 
namespace App\Controller;
use Symfony\Component\Security\Core\Security;
use Doctrine\ORM\EntityManagerInterface;
use App\Entity\Conge;
use App\Entity\User;
use App\Repository\NotificationRepository;
use Symfony\Component\Routing\Annotation\Route;

class CongeNotificationController{
    private $repository;
    private $manager;
    public function __construct(NotificationRepository $repository,EntityManagerInterface $manager)
        {   
            $this->manager=$manager;
            $this->repository=$repository;
        }
    public function __invoke()    
        {
            return($this->manager->createQuery('SELECT c FROM App\Entity\Notification n INNER JOIN App\Entity\Conge c WITH n.notificationId=c.id WHERE n.notificationType =:not_type AND c.status=:c_stat')
            ->setParameter('not_type','CONGE')
            ->setParameter('c_stat','EN ATTENTE')
            ->getResult());
        }
}
