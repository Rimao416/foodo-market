<?php

namespace App\DataFixtures;
use Faker\Factory;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;
use App\Entity\User;
use App\Entity\Departement;

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
        $listes_des_departements=["Ain",'Aisne',"Allier","Hautes-alpes","Adèche","Ariège","Creuse","Doubs","Drome","Gers","Gironde","Indre","Isère"];
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
        for($j=0;$j<10;$j++){
            $depart=new Departement();
            $depart->setNom($listes_des_departements[$j]);
            $manager->persist($depart);
        }

        $manager->flush();
    }
}
