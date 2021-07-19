<?php

namespace AppBundle\Entity;

use DateTime;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
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
     * @var ?int
     *
     * @ORM\Column(name="id", type="integer", nullable=true)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    private ?int $id ;


    /**
     * @var string
     *
     * @ORM\Column(name="title", type="string", length=255)
     */
    private string $title;

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
    private \DateTime $modificationDate;



    /**
     * @var ?Author
     *
     * @ORM\ManyToOne(targetEntity="Author", inversedBy="articles")
     */
    private ?Author $author = null;

    /**
     * @ORM\ManyToMany(targetEntity="Author", mappedBy="likedArticles")
     */
    private ?Collection  $likes;

    public function __construct()
    {   $this->likes = new  ArrayCollection();
        $this->id = 0;
    }

    /**
     * Get id
     *
     * @return int
     */
    public function getId(): int
    {
        return $this->id;
    }



    /**
     * Set titre
     *
     * @param string $title
     *
     * @return Article
     */
    public function setTitle(string $title): self
    {
        $this->title = $title;

        return $this;
    }

    /**
     * Get titre
     *
     * @return string
     */
    public function getTitle(): ?string
    {
        return $this->title;
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
     * @return  Article
     */
    public function setModificationDate(\DateTime $modificationDate): self
    {
        $this->modificationDate = $modificationDate;

        return $this;
    }

    /**
     * Get dateModification
     *
     * @return DateTime
     */
    public function getModificationDate(): \DateTime
    {
        return $this->modificationDate;
    }

    /**
     * Get author
     *
     * @return Author
     */
    public function getAuthor(): ?Author
    {
        return $this->author;
    }

    /**
     * Set author
     *
     * @param Author $author
     *
     * @return Article
     */
    public function setAuthor(Author $author): self
    {
        $this->author = $author;
        return $this;
    }

    /**
     * Get users likes
     *
     * @return Collection
     */
    public function getLikes(): Collection
    {
        return $this->likes;
    }
}

