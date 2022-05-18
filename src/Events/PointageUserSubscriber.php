<?php
    namespace App\Events;

use ApiPlatform\Core\EventListener\EventPriorities;
use App\Entity\Pointage;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpKernel\Event\GetResponseForControllerResultEvent;
use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Component\Security\Core\Security;

    class PointageUserSubscriber implements EventSubscriberInterface{
        private $security;
        public function __construct(Security $security)
        {   
            $this->security=$security;
        }
        public static function getSubscribedEvents()
        {
            return [
                KernelEvents::VIEW => ['setUserForPointage',EventPriorities::PRE_VALIDATE]
            ];
        }
        public function setUserForPointage(GetResponseForControllerResultEvent $event){
            $poitange=$event->getControllerResult();
            $method=$event->getRequest()->getMethod();
            if($poitange instanceof Pointage && $method == 'POST'){
                $user=$this->security->getUser();
                $poitange->setUser($user);
            }

        }
    }