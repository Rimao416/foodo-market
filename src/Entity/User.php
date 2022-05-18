<?php

namespace App\Entity;

use App\Repository\UserRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Security\Core\User\UserInterface;
use ApiPlatform\Core\Annotation\ApiResource;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ApiResource(
 * normalizationContext={
 * "groups"={"users_read"}
 * },
 * denormalizationContext={"disable_type_enforcement"=true}
 * )
 * @ORM\Entity(repositoryClass=UserRepository::class)
 */
class User implements UserInterface
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups({"users_read","postes_read"})
     */
    private $id;

    /**
     * 
     * @Assert\Email(message="Le mail est incorrecte")
     * @Assert\NotBlank(message="Le champ mail doit être remplie")
     * @Groups({"users_read","postes_read"})
     * @ORM\Column(type="string", length=180, unique=true)
     */
    private $email;

    /**
     * @Groups({"users_read","postes_read"})
     * @ORM\Column(type="json")
     */
    private $roles = [];

    /**
     * @var string The hashed password
     * @Assert\NotBlank(message="Le mot de passe ne doit pas être vide")
     * @ORM\Column(type="string")
     */
    private $password;

    /**
     * @Assert\NotBlank(message="Le nom ne doit pas être vide")
     * @Groups({"users_read","postes_read"})
     * @ORM\Column(type="string", length=255)
     */
    private $firstName;

    /**
     * @Assert\NotBlank(message="Le prenom ne doit pas être vide")
     * @Groups({"users_read","postes_read"})
     * @ORM\Column(type="string", length=255)
     */
    private $lastName;

    /**
     * @Groups({"users_read","postes_read"})
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $photo;

    /**
     * @Assert\NotBlank(message="L'adresse ne doit pas être vide")
     * @Groups({"users_read","postes_read"})
     * @ORM\Column(type="string", length=255)
     */
    private $adresse;

    /**
     * @Groups({"users_read","postes_read"})
     * @Assert\NotBlank(message="La date d'envoie doit être renseigné")
     * @Assert\DateTime(message="Vous devez mettre une date correcte")
     * @ORM\Column(type="datetime")
     */
    private $comeAt;

    /**
     * @Groups({"users_read","postes_read"})
     * @ORM\ManyToOne(targetEntity=Poste::class, inversedBy="users")
     * @ORM\JoinColumn(nullable=false)
     */
    private $poste;

    /**
     * @ORM\OneToMany(targetEntity=Pointage::class, mappedBy="user")
     */
    private $pointages;

    public function __construct()
    {
        $this->pointages = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): self
    {
        $this->email = $email;

        return $this;
    }

    /**
     * A visual identifier that represents this user.
     *
     * @see UserInterface
     */
    public function getUsername(): string
    {
        return (string) $this->email;
    }

    /**
     * @see UserInterface
     */
    public function getRoles(): array
    {
        $roles = $this->roles;
        // guarantee every user at least has ROLE_USER
        $roles[] = 'ROLE_USER';

        return array_unique($roles);
    }

    public function setRoles(array $roles): self
    {
        $this->roles = $roles;

        return $this;
    }

    /**
     * @see UserInterface
     */
    public function getPassword(): string
    {
        return $this->password;
    }

    public function setPassword(string $password): self
    {
        $this->password = $password;

        return $this;
    }

    /**
     * Returning a salt is only needed, if you are not using a modern
     * hashing algorithm (e.g. bcrypt or sodium) in your security.yaml.
     *
     * @see UserInterface
     */
    public function getSalt(): ?string
    {
        return null;
    }

    /**
     * @see UserInterface
     */
    public function eraseCredentials()
    {
        // If you store any temporary, sensitive data on the user, clear it here
        // $this->plainPassword = null;
    }

    public function getFirstName(): ?string
    {
        return $this->firstName;
    }

    public function setFirstName(string $firstName): self
    {
        $this->firstName = $firstName;

        return $this;
    }

    public function getLastName(): ?string
    {
        return $this->lastName;
    }

    public function setLastName(string $lastName): self
    {
        $this->lastName = $lastName;

        return $this;
    }

    public function getPhoto(): ?string
    {
        return $this->photo;
    }

    public function setPhoto(?string $photo): self
    {
        $this->photo = $photo;

        return $this;
    }

    public function getAdresse(): ?string
    {
        return $this->adresse;
    }

    public function setAdresse(string $adresse): self
    {
        $this->adresse = $adresse;

        return $this;
    }

    public function getComeAt(): ?\DateTimeInterface
    {
        return $this->comeAt;
    }

    public function setComeAt($comeAt): self
    {
        $this->comeAt = $comeAt;

        return $this;
    }

    public function getPoste(): ?Poste
    {
        return $this->poste;
    }

    public function setPoste(?Poste $poste): self
    {
        $this->poste = $poste;

        return $this;
    }

    /**
     * @return Collection<int, Pointage>
     */
    public function getPointages(): Collection
    {
        return $this->pointages;
    }

    public function addPointage(Pointage $pointage): self
    {
        if (!$this->pointages->contains($pointage)) {
            $this->pointages[] = $pointage;
            $pointage->setUser($this);
        }

        return $this;
    }

    public function removePointage(Pointage $pointage): self
    {
        if ($this->pointages->removeElement($pointage)) {
            // set the owning side to null (unless already changed)
            if ($pointage->getUser() === $this) {
                $pointage->setUser(null);
            }
        }

        return $this;
    }
}
