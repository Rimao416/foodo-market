<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20220618213550 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE enregistrement ADD matricule_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE enregistrement ADD CONSTRAINT FK_15FA02F9AAADC05 FOREIGN KEY (matricule_id) REFERENCES user (id)');
        $this->addSql('CREATE INDEX IDX_15FA02F9AAADC05 ON enregistrement (matricule_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE enregistrement DROP FOREIGN KEY FK_15FA02F9AAADC05');
        $this->addSql('DROP INDEX IDX_15FA02F9AAADC05 ON enregistrement');
        $this->addSql('ALTER TABLE enregistrement DROP matricule_id');
    }
}
