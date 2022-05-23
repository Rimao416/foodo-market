<?php
    namespace App\Events;

use ApiPlatform\Core\EventListener\EventPriorities;
use App\Entity\Pointage;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpKernel\Event\GetResponseForControllerResultEvent;
use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Component\Security\Core\Security;

    class MatriculeUserSubscriber implements EventSubscriberInterface{
        public static function getSubscribedEvents()
        {
            return [
                KernelEvents::VIEW => ['setMatriculeForPointage',EventPriorities::PRE_WRITE]
            ];
        }
        public function setMatriculeForPointage(GetResponseForControllerResultEvent $event){
            $pointage=$event->getControllerResult();
            $method=$event->getRequest()->getMethod();
            if($pointage instanceof Pointage && $method == 'POST'){
                dd($pointage->getUser());
            }
        }
    }