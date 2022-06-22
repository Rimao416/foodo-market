<?php
namespace App\Controller;

use App\Entity\Enregistrement;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Response;
use App\Repository\EnregistrementRepository;

class PointageDetailUser{
 
    public function __invoke(EnregistrementRepository $repo,int $matricule,int $annee)
    {
        $data=$repo->findByMatricule($matricule,$annee);
        // $data=$manager->createQuery("SELECT e FROM App\Entity\Enregistrement e WHERE e.matricule = :matricule AND  e.sentAt LIKE '%  e.sentAt:year' ")
        // ->setParameter('matricule',$matricule)
        // ->setParameter('year',2022)
        // ->getResult();
        return $data;
    }
}
?>