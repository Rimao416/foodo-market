<?php

namespace App\Entity;

use App\Repository\PosteRepository;
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
     * @Groups({"postes_read","departements_read"})
     */
    private $id;

    /**
     * @Assert\NotBlank(message="Le nom du Poste est obligatoire")
     * @Groups({"postes_read","departements_read"})
     * @ORM\Column(type="string", length=255)
     */
    private $Designation;

    /**
     *
     * @Groups({"postes_read","departements_read"})
     * @ORM\ManyToOne(targetEntity=Departement::class, inversedBy="postes")
     */
    private $departement;

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
}
