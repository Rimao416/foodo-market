<?php
namespace App\Controller;

use App\Entity\Jour;
use App\Entity\Repos;
use Doctrine\ORM\EntityManagerInterface;

class RemoveHolidayController{
    public function __invoke(EntityManagerInterface $manager,Repos $data)
    {
        $id=$data->getId();
        $jours=$manager->createQuery('DELETE FROM App\Entity\Jour j WHERE j.repos = :repos')
        ->setParameter('repos',$id)
        ->getResult();
    }
}
?>