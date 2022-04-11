<?php

namespace App\DataFixtures;
use Faker\Factory;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;
use App\Entity\User;

class AppFixtures extends Fixture
{
    private $encoder;
    private $i=1;
    private $lien="https://randomuser.me/api/portraits/women/";
    public function __construct(UserPasswordEncoderInterface $encoder)
    {  
        $this->encoder=$encoder;
    }
    public function load(ObjectManager $manager): void
    {
        $entry=$this->lien.$this->i.".jpg";
        $faker=Factory::create();
        for($u=0;$u<30;$u++){
            $user=new User();
            $hash=$this->encoder->encodePassword($user,"password");
            $user->setEmail($faker->email)
            ->setPassword($hash)
            ->setFirstName($faker->firstName()) 
            ->setLastName($faker->lastName)
            ->setPhoto($entry)
            ->setAdresse("Rue de valence")
            ->setComeAt($faker->dateTimeBetween('-6 months'));
                

                $this->i++;
                $manager->persist($user);
        }

        $manager->flush();
    }
}
