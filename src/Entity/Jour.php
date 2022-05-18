<?php

namespace App\Entity;

use App\Repository\JourRepository;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Core\Annotation\ApiResource;
use Symfony\Component\Serializer\Annotation\Groups;
/**
 * 
 * @ORM\Entity(repositoryClass=JourRepository::class)
 * @ApiResource(
 * normalizationContext={
 * "groups"={"jour_read"}
 * }
 * )
 */
class Jour
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @Groups({"jour_read","repos_read"})
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @Groups({"jour_read","repos_read"})
     * @ORM\Column(type="date")
     */
    private $startAt;

    /**
     * @Groups({"jour_read"})
     * @ORM\ManyToOne(targetEntity=Repos::class, inversedBy="repos")
     */
    private $repos;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getStartAt(): ?\DateTimeInterface
    {
        return $this->startAt;
    }

    public function setStartAt(\DateTimeInterface $startAt): self
    {
        $this->startAt = $startAt;

        return $this;
    }

    public function getRepos(): ?Repos
    {
        return $this->repos;
    }

    public function setRepos(?Repos $repos): self
    {
        $this->repos = $repos;

        return $this;
    }
}
