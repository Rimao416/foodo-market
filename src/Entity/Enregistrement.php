<?php

namespace App\Entity;

use App\Repository\EnregistrementRepository;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Core\Annotation\ApiResource;

/**
 * @ApiResource()
 * @ORM\Table(name="Pointage")
 * @ORM\Entity(repositoryClass=EnregistrementRepository::class)
 */
class Enregistrement
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="integer")
     */
    private $matricule;

    /**
     * @ORM\Column(type="integer")
     */
    private $jourTravail;

    /**
     * @ORM\Column(type="integer")
     */
    private $jourAbsence;

    /**
     * @ORM\Column(type="integer")
     */
    private $heureSupp;

    /**
     * @ORM\Column(type="integer")
     */
    private $heureRetard;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getMatricule(): ?int
    {
        return $this->matricule;
    }

    public function setMatricule(int $matricule): self
    {
        $this->matricule = $matricule;

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

    public function getJourAbsence(): ?int
    {
        return $this->jourAbsence;
    }

    public function setJourAbsence(int $jourAbsence): self
    {
        $this->jourAbsence = $jourAbsence;

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
}
