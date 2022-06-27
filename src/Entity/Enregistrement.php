<?php

namespace App\Entity;

use App\Repository\EnregistrementRepository;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Core\Annotation\ApiResource;
use Symfony\Component\Serializer\Annotation\Groups;
use App\Controller\PointageDetailUser;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;
use ApiPlatform\Core\Annotation\ApiFilter;

/**
 * @ApiResource(
 * attributes={
 * "pagination_enabled"=true,
 * },
 * normalizationContext={
 * "groups"={"pointage_read"}
 * },collectionOperations={"POST","GET","getDetail"={
 * "method"="get",
 * "path"="/enregistrements/details/{matricule}/{annee}",
 * "controller"="App\Controller\PointageDetailUser"
 * },
 * "getExport"={
 * "method"="get",
 * "path"="/enregistrements/pointage/{date}/data",
 * "controller"="App\Controller\PointageGroupUser"
 * }}
 * )
 * @ApiFilter(SearchFilter::class,properties={"firstName","id"})
 * @ORM\Entity(repositoryClass=EnregistrementRepository::class)
 */
class Enregistrement
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @Groups({"pointage_read","users_read"})
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @Groups({"pointage_read","users_read"})
     * @ORM\Column(type="integer")
     */
    private $jourAbsence;

    /**
     * @Groups({"pointage_read","users_read"})
     * @ORM\Column(type="integer")
     */
    private $jourTravail;

    /**
     * @Groups({"pointage_read","users_read"})
     * @ORM\Column(type="integer")
     */
    private $heureSupp;

    /**
     * @Groups({"pointage_read","users_read"})
     * @ORM\Column(type="integer")
     */
    private $heureRetard;

    /**
     * @Groups({"pointage_read","users_read"})
     * @ORM\ManyToOne(targetEntity=User::class, inversedBy="enregistrements")
     */
    private $matricule;

    /**
     * @Groups({"pointage_read","users_read"})
     * @ORM\Column(type="string",length=255)
     */
    private $sentAt;


    public function getId(): ?int
    {
        return $this->id;
    }

    public function getJourAbsence(): ?int
    {
        return $this->jourAbsence;
    }

    public function setJourAbsence(int $jourAbsence): self
    {
        $this->jourAbsence = $jourAbsence;

        return $this;
    }

    public function getJourTravail(): ?int
    {
        return $this->jourTravail;
    }

    public function setJourTravail(int $jourTravail): self
    {
        $this->jourTravail = $jourTravail;

        return $this;
    }

    public function getHeureSupp(): ?int
    {
        return $this->heureSupp;
    }

    public function setHeureSupp(int $heureSupp): self
    {
        $this->heureSupp = $heureSupp;

        return $this;
    }

    public function getHeureRetard(): ?int
    {
        return $this->heureRetard;
    }

    public function setHeureRetard(int $heureRetard): self
    {
        $this->heureRetard = $heureRetard;

        return $this;
    }

    public function getMatricule(): ?User
    {
        return $this->matricule;
    }

    public function setMatricule(?User $matricule): self
    {
        $this->matricule = $matricule;

        return $this;
    }

    public function getSentAt(): ?string
    {
        return $this->sentAt;
    }

    public function setSentAt(string $sentAt): self
    {
        $this->sentAt = $sentAt;

        return $this;
    }
}
