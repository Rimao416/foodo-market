<?php
    namespace App\Events;

use ApiPlatform\Core\EventListener\EventPriorities;
use App\Entity\Pointage;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpKernel\Event\GetResponseForControllerResultEvent;
use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Component\Security\Core\Security;
use Doctrine\ORM\EntityManagerInterface;

    class TeletravailUserSubscriber implements EventSubscriberInterface{
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
                KernelEvents::VIEW => ['setUserForTeletravail',EventPriorities::PRE_VALIDATE]
            ];
        }
        public function setUserForTeletravail(GetResponseForControllerResultEvent $event){
            $teletravail=$event->getControllerResult();
            $method=$event->getRequest()->getMethod();
            if($teletravail instanceof Pointage && $method == 'POST'){
                 $user=$this->security->getUser();
                 $teletravail->setUser($user);
              $user_id=$teletravail->getUser()->getId();
               $matricule=$this->manager->createQuery('SELECT u.matricule FROM App\Entity\User u WHERE u.id= :matricule')
               ->setParameter('matricule',$user_id)
               ->getResult();
                 $teletravail->setMatricule(10);
               $teletravail->setMatricule($matricule[0]["matricule"]);
                 $teletravail->setAuteur($user);
            }
        }
    }