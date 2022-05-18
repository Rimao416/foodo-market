<?php

namespace App\Entity;

use App\Repository\PointageRepository;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Core\Annotation\ApiResource;

/**
 * @ApiResource()
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
}
