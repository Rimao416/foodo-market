<?php
namespace App\Events;

use ApiPlatform\Core\EventListener\EventPriorities;
use App\Entity\User;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpKernel\Event\GetResponseForControllerResultEvent;
use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

class PasswordEncoderSubscriber implements EventSubscriberInterface{
    private $encoder;
    public function __construct(UserPasswordEncoderInterface $encoder)
    {   
        $this->encoder=$encoder;
        
    }
    public static function getSubscribedEvents()
    {
        return [
            KernelEvents::VIEW =>['encodePassword',EventPriorities::PRE_WRITE]
        ];
    }
    public function encodePassword(GetResponseForControllerResultEvent $event){
        $result=$event->getControllerResult();
        $method=$event->getRequest()->getMethod();
        if($result instanceof User && $method=="POST"){
            $hash=$this->encoder->encodePassword($result,$result->getPassword());
            $result->setPassword($hash);
        }
    }
}

?>