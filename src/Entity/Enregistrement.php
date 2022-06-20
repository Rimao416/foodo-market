<?php

namespace App\Entity;

use App\Repository\EnregistrementRepository;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Core\Annotation\ApiResource;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ApiResource(
 * normalizationContext={
 * "groups"={"pointage_read"}
 * }
 * )
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
}
