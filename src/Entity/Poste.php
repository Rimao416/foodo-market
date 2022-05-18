<?php

namespace App\Entity;

use App\Repository\PosteRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;
use ApiPlatform\Core\Annotation\ApiResource;
use Symfony\Component\Serializer\Annotation\Groups;
/**
 * @ApiResource(
 * normalizationContext={
 * "groups"={"postes_read"}
 * })
 * @ORM\Entity(repositoryClass=PosteRepository::class)
 */
class Poste
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups({"postes_read","departements_read","users_read"})
     */
    private $id;

    /**
     * @Assert\NotBlank(message="Le nom du Poste est obligatoire")
     * @Groups({"postes_read","departements_read","users_read"})
     * @ORM\Column(type="string", length=255)
     */
    private $Designation;

    /**
     *
     * @Groups({"postes_read","departements_read","users_read"})
     * @ORM\ManyToOne(targetEntity=Departement::class, inversedBy="postes")
     */
    private $departement;

    /**
     * @ORM\OneToMany(targetEntity=User::class, mappedBy="poste")
     */
    private $users;

    public function __construct()
    {
        $this->users = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getDesignation(): ?string
    {
        return $this->Designation;
    }

    public function setDesignation(string $Designation): self
    {
        $this->Designation = $Designation;

        return $this;
    }

    public function getDepartement(): ?Departement
    {
        return $this->departement;
    }

    public function setDepartement(?Departement $departement): self
    {
        $this->departement = $departement;

        return $this;
    }

    /**
     * @return Collection<int, User>
     */
    public function getUsers(): Collection
    {
        return $this->users;
    }

    public function addUser(User $user): self
    {
        if (!$this->users->contains($user)) {
            $this->users[] = $user;
            $user->setPoste($this);
        }

        return $this;
    }

    public function removeUser(User $user): self
    {
        if ($this->users->removeElement($user)) {
            // set the owning side to null (unless already changed)
            if ($user->getPoste() === $this) {
                $user->setPoste(null);
            }
        }

        return $this;
    }
}
