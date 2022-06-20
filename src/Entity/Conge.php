<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\CongeRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ApiResource(
 * normalizationContext={
 * "groups"={"conges_read"}
 * },
 * collectionOperations={"POST","GET","single"={
 * "method"="get",
 * "path"="/conges/single",
 * "controller"="App\Controller\SingleCongeController"
 * }}
 * )
 * @ORM\Entity(repositoryClass=CongeRepository::class)
 */
class Conge
{
    /**
     * @ORM\Id
     * @Groups({"conges_read","users_read"})
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @Groups({"conges_read","users_read"})
     * @ORM\Column(type="datetime")
     */
    private $DateDebut;

    /**
     * @Groups({"conges_read","users_read"})
     * @ORM\Column(type="datetime")
     */
    private $DateFin;

    /**
     * @Groups({"conges_read","users_read"})
     * @ORM\Column(type="string", length=255)
     */
    private $motif;

    /**
     * @Groups({"conges_read","users_read"})
     * @ORM\Column(type="string", length=255,nullable=true)
     */
    private $file;

    /**
     * @Groups({"conges_read","users_read"})
     * @ORM\Column(type="text", nullable=true)
     */
    private $explication;

    /**
     * @Groups({"conges_read","users_read"})
     * @ORM\ManyToOne(targetEntity=User::class, inversedBy="conges")
     */
    private $user;

    /**
     * @Groups({"conges_read","users_read"})
     * @ORM\Column(type="string", length=255)
     */
    private $status;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getDateDebut(): ?\DateTimeInterface
    {
        return $this->DateDebut;
    }

    public function setDateDebut(\DateTimeInterface $DateDebut): self
    {
        $this->DateDebut = $DateDebut;

        return $this;
    }

    public function getDateFin(): ?\DateTimeInterface
    {
        return $this->DateFin;
    }

    public function setDateFin(\DateTimeInterface $DateFin): self
    {
        $this->DateFin = $DateFin;

        return $this;
    }

    public function getMotif(): ?string
    {
        return $this->motif;
    }

    public function setMotif(string $motif): self
    {
        $this->motif = $motif;

        return $this;
    }

    public function getFile(): ?string
    {
        return $this->file;
    }

    public function setFile(string $file): self
    {
        $this->file = $file;

        return $this;
    }

    public function getExplication(): ?string
    {
        return $this->explication;
    }

    public function setExplication(?string $explication): self
    {
        $this->explication = $explication;

        return $this;
    }

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(?User $user): self
    {
        $this->user = $user;

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
}
