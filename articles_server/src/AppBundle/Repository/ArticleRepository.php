<?php

namespace AppBundle\Repository;

/**
 * ArticleRepository
 *
 * This class was generated by the Doctrine ORM. Add your own custom
 * repository methods below.
 */
class ArticleRepository extends \Doctrine\ORM\EntityRepository
{

    public function findByTitleOrderedByDate($title,$limit,$page)
    {
        return  $this->getEntityManager()->getRepository('AppBundle:Article')->createQueryBuilder('a')
            ->select( array('a.id', 'a.title','a.description', 'a.content','a.modificationDate','a.image'))
            ->where('a.title LIKE :word')
            ->setParameter('word', '%'.$title.'%')
            ->orderBy('a.modificationDate', 'DESC')
            ->setFirstResult(($page-1)*$limit)
            ->setMaxResults($limit)
            ->getQuery()->getResult();

    }

}
