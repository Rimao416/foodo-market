<?php

namespace App\Entity;

use App\Repository\ReposRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use ApiPlatform\Core\Annotation\ApiResource;
/**
 * @ApiResource(
 * normalizationContext={
 * "groups"={"repos_read"}
 * },itemOperations={"PATCH","DELETE","GET","PUT","remove"={
 * "method"="delete",
 * "path"="/repos/{id}/delete",
 * "controller"="App\Controller\RemoveHolidayController"
 * }}
 * )
 * @ORM\Entity(repositoryClass=ReposRepository::class)
 */
class Repos
{
    /**
     * @ORM\Id
     * @Groups({"repos_read"})
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @Groups({"repos_read"})
     * @ORM\Column(type="string", length=255)
     */
    private $nom;

    /**
     * @Groups({"repos_read"})
     * @ORM\OneToMany(targetEntity=Jour::class, mappedBy="repos",cascade={"persist","remove"})
     */
    private $repos;

    public function __construct()
    {
        $this->repos = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getNom(): ?string
    {
        return $this->nom;
    }

    public function setNom(string $nom): self
    {
        $this->nom = $nom;

        return $this;
    }

    /**
     * @return Collection<int, Jour>
     */
    public function getRepos(): Collection
    {
        return $this->repos;
    }

    public function addRepo(Jour $repo): self
    {
        if (!$this->repos->contains($repo)) {
            $this->repos[] = $repo;
            $repo->setRepos($this);
        }

        return $this;
    }

    public function removeRepo(Jour $repo): self
    {
        if ($this->repos->removeElement($repo)) {
            // set the owning side to null (unless already changed)
            if ($repo->getRepos() === $this) {
                $repo->setRepos(null);
            }
        }

        return $this;
    }
}
