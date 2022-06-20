<?php
    namespace App\Events;

use ApiPlatform\Core\EventListener\EventPriorities;
use App\Entity\Notification;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpKernel\Event\GetResponseForControllerResultEvent;
use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Component\Security\Core\Security;
use Doctrine\ORM\EntityManagerInterface;

    class NotificationUserSubscriber implements EventSubscriberInterface{
        private $security;
        private $manager;
        public function __construct(Security $security,EntityManagerInterface $manager)
        {   
            $this->security=$security;
            $this->manager=$manager;
        }
        public static function getSubscribedEvents()
        {
            return [
                KernelEvents::VIEW => ['setUserForNotification',EventPriorities::PRE_VALIDATE]
            ];
        }
        public function setUserForNotification(GetResponseForControllerResultEvent $event){
            $conge=$event->getControllerResult();
            $method=$event->getRequest()->getMethod();
            if($conge instanceof Notification && $method == 'POST'){
                 $user=$this->security->getUser();
                 $conge->setUser($user);
                 
            //    $user_id=$poitange->getUser()->getId();
            //    $matricule=$this->manager->createQuery('SELECT u.matricule FROM App\Entity\User u WHERE u.id= :matricule')
            //    ->setParameter('matricule',$user_id)
            //    ->getResult();
            //      $poitange->setMatricule(10);
            //    $poitange->setMatricule($matricule[0]["matricule"]);
            //      $poitange->setAuteur($user);
            }
        }
    }