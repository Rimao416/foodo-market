<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\NotificationRepository;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ApiResource(
 * collectionOperations={"POST","GET","builder"={
 * "method"="get",
 * "path"="/notifications/join",
 * "controller"="App\Controller\CongeNotificationController"
 * }}
 * )
 * @ORM\Entity(repositoryClass=NotificationRepository::class)
 */
class Notification
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\ManyToOne(targetEntity=User::class, inversedBy="notifications")
     */
    private $user;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $notificationType;

    /**
     * @ORM\Column(type="integer")
     */
    private $notificationId;

    public function getId(): ?int
    {
        return $this->id;
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

    public function getNotificationType(): ?string
    {
        return $this->notificationType;
    }

    public function setNotificationType(string $notificationType): self
    {
        $this->notificationType = $notificationType;

        return $this;
    }

    public function getNotificationId(): ?int
    {
        return $this->notificationId;
    }

    public function setNotificationId(int $notificationId): self
    {
        $this->notificationId = $notificationId;

        return $this;
    }
}
