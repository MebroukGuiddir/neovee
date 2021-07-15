<?php

namespace AppBundle\Entity;

use DateTime;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * Article
 *
 * @ORM\Table(name="article")
 * @ORM\Entity(repositoryClass="AppBundle\Repository\ArticleRepository")
 */
class Article
{
    /**
     * @var int
     *
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    private int $id;


    /**
     * @var string
     *
     * @ORM\Column(name="titre", type="string", length=255)
     */
    private string $titre;

    /**
     * @var string
     *
     * @ORM\Column(name="contenu", type="string", length=255)
     */
    private string $content;

    /**
     * @var DateTime
     *
     * @ORM\Column(name="modificationDate", type="datetime")
     */
    private DateTime $modificationDate;



    /**
     * @ORM\ManyToOne(targetEntity="User", cascade={"all"}, fetch="EAGER")
     */
    private ?User $author;

    public function __construct()
    {
        $this->id = 0;
    }

    /**
     * Get id
     *
     * @return int
     */
    public function getId(): ?int
    {
        return $this->id;
    }



    /**
     * Set titre
     *
     * @param string $titre
     *
     * @return Article
     */
    public function setTitre(string $titre): self
    {
        $this->titre = $titre;

        return $this;
    }

    /**
     * Get titre
     *
     * @return string
     */
    public function getTitre(): ?string
    {
        return $this->titre;
    }

    /**
     * Set content
     *
     * @param string $content
     *
     * @return Article
     */
    public function setContent(string $content): self
    {
        $this->content = $content;

        return $this;
    }

    /**
     * Get content
     *
     * @return string
     */
    public function getContent(): ?string
    {
        return $this->content;
    }

    /**
     * Set dateModification
     *
     * @param DateTime $modificationDate
     *
     * @return Article
     */
    public function setModificationDate(DateTime $modificationDate): self
    {
        $this->modificationDate = $modificationDate;

        return $this;
    }

    /**
     * Get dateModification
     *
     * @return DateTime
     */
    public function getModificationDate(): DateTime
    {
        return $this->modificationDate;
    }

    /**
     * Get author
     *
     * @return User
     */
    public function getAuthor(): ?User
    {
        return $this->author;
    }

    /**
     * Set author
     *
     * @param User $author
     *
     * @return Article
     */
    public function setAuthor(User $author): self
    {
        $this->author = $author;
        return $this;
    }
}

