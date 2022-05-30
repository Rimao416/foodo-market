<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20220526172242 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE Teletravail (id INT AUTO_INCREMENT NOT NULL, user_id INT DEFAULT NULL, auteur_id INT DEFAULT NULL, start_at VARCHAR(255) NOT NULL, end_at VARCHAR(255) NOT NULL, pointe_at DATE NOT NULL, status VARCHAR(255) NOT NULL, matricule INT NOT NULL, INDEX IDX_BB97A9D4A76ED395 (user_id), INDEX IDX_BB97A9D460BB6FE6 (auteur_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE Teletravail ADD CONSTRAINT FK_BB97A9D4A76ED395 FOREIGN KEY (user_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE Teletravail ADD CONSTRAINT FK_BB97A9D460BB6FE6 FOREIGN KEY (auteur_id) REFERENCES user (id)');
        $this->addSql('DROP TABLE pointage');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE pointage (id INT AUTO_INCREMENT NOT NULL, user_id INT DEFAULT NULL, auteur_id INT DEFAULT NULL, start_at VARCHAR(255) CHARACTER SET utf8mb4 NOT NULL COLLATE `utf8mb4_unicode_ci`, end_at VARCHAR(255) CHARACTER SET utf8mb4 NOT NULL COLLATE `utf8mb4_unicode_ci`, pointe_at DATE NOT NULL, status VARCHAR(255) CHARACTER SET utf8mb4 NOT NULL COLLATE `utf8mb4_unicode_ci`, matricule INT NOT NULL, INDEX IDX_7591B20A76ED395 (user_id), INDEX IDX_7591B2060BB6FE6 (auteur_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB COMMENT = \'\' ');
        $this->addSql('ALTER TABLE pointage ADD CONSTRAINT FK_7591B20A76ED395 FOREIGN KEY (user_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE pointage ADD CONSTRAINT FK_7591B2060BB6FE6 FOREIGN KEY (auteur_id) REFERENCES user (id)');
        $this->addSql('DROP TABLE Teletravail');
    }
}
