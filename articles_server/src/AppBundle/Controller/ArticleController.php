<?php

namespace AppBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use AppBundle\Entity\Article;


class ArticleController extends Controller
{
    /**
     * @Route("/articles", name="article_create")
     * @Method({"POST"})
     */
    public function createAction(Request $request): Response
    {
        $data = $request->getContent();
        $author = $this->getDoctrine()->getRepository('AppBundle:User')->findOneById($data->get('userId'));
        $article = new Article();
        $article ->setTitre($data->get('title'))
            ->setContent($data->get('content'))
            ->setAuthor($author)
            ->setModificationDate(new \DateTime());
        $article->getArticles()->add($article);

        return new Response('{}', Response::HTTP_CREATED);
    }
    /**
     * @Route("/articles", name="article_search")
     * @Method({"GET"})
     */
    public function searchAction(Request $request): Response
    {
        $data = $request->getContent();
        return new Response('', Response::HTTP_CREATED);
    }
    /**
     * @Route("/articles", name="article_delete")
     * @Method({"DELETE"})
     */
    public function deleteAction(Request $request)
    {

    }
    /**
     * @Route("/articles", name="article_update")
     * @Method({"DELETE"})
     */
    public function updateAction(Request $request)
    {

    }
}
