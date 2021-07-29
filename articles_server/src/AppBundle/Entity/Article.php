<?php

namespace AppBundle\Entity;

use DateTime;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Symfony\Component\Serializer\Annotation\MaxDepth;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Component\Serializer\Annotation\Groups;
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
     * @Groups({"simple"})
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
     * @ORM\Column(name="descrption", type="text")
     */
    private string $description;

    /**
     * @var string
     *
     * @ORM\Column(name="contenu", type="text")
     */
    private string $content;

    /**
     * @var string
     *
     * @ORM\Column(name="modificationDate", type="string")
     */
    private string $modificationDate;

    /**
     * @var string
     *
     * @ORM\Column(name="image", type="text")
     */
    private string $image;


    /**
     * @var ?Author
     * @MaxDepth(1)
     * @ORM\ManyToOne(targetEntity="Author", inversedBy="articles")
     */
    private ?Author $author = null;

    /**
     * @MaxDepth(1)
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
     * Set description
     *
     * @param string $description
     *
     * @return Article
     */
    public function setDescription(string $description): self
    {
        $this->description = $description;

        return $this;
    }

    /**
     * Get description
     *
     * @return string
     */
    public function getDescription(): ?string
    {
        return $this->description;
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
     * @param string $modificationDate
     *
     * @return  Article
     */
    public function setModificationDate(string $modificationDate): self
    {
        $this->modificationDate = $modificationDate;

        return $this;
    }

    /**
     * Get dateModification
     *
     * @return string
     */
    public function getModificationDate(): string
    {
        return $this->modificationDate;
    }

    /**
     * Set image
     *
     * @param string $image
     *
     * @return  Article
     */
    public function setImage(string $image): self
    {
        $this->image = $image;

        return $this;
    }

    /**
     * Get image
     *
     * @return string
     */
    public function getImage(): string
    {
        return $this->image;
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

