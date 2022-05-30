<?php

namespace App\Entity;

use App\Repository\PointageRepository;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Core\Annotation\ApiResource;

/**
 * @ApiResource()
 * @ORM\Table(name="Teletravail")
 * @ORM\Entity(repositoryClass=PointageRepository::class)
 */
class Pointage
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $startAt;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $endAt;

    /**
     * @ORM\ManyToOne(targetEntity=User::class, inversedBy="pointages")
     */
    private $user;

    /**
     * @ORM\Column(type="date")
     */
    private $pointeAt;

    /**
     * @ORM\ManyToOne(targetEntity=User::class, inversedBy="pointes")
     */
    private $auteur;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $status;

    /**
     * @ORM\Column(type="integer")
     */
    private $matricule;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getStartAt(): ?string
    {
        return $this->startAt;
    }

    public function setStartAt(string $startAt): self
    {
        $this->startAt = $startAt;

        return $this;
    }

    public function getEndAt(): ?string
    {
        return $this->endAt;
    }

    public function setEndAt(string $endAt): self
    {
        $this->endAt = $endAt;

        return $this;
    }

    public function getUser(): ?user
    {
        return $this->user;
    }

    public function setUser(?user $user): self
    {
        $this->user = $user;

        return $this;
    }

    public function getPointeAt(): ?\DateTimeInterface
    {
        return $this->pointeAt;
    }

    public function setPointeAt(\DateTimeInterface $pointeAt): self
    {
        $this->pointeAt = $pointeAt;

        return $this;
    }

    public function getAuteur(): ?User
    {
        return $this->auteur;
    }

    public function setAuteur(?User $auteur): self
    {
        $this->auteur = $auteur;

        return $this;
    }

    public function getStatus(): ?string
    {
        return $this->status;
    }

    public function setStatus(string $status): self
    {
        $this->status = $status;

        return $this;
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
}
