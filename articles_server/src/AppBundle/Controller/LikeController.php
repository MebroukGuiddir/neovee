<?php

namespace AppBundle\Controller;

use AppBundle\Entity\Article;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class LikeController extends Controller
{

    /**
     * @Route("/likes", name="article_like")
     * @Method({"UPDATE"})
     */
    public function likeAction(Request $request)
    {
        $data = json_decode($request->getContent(), true);
        $article = $this->getDoctrine()->getRepository('AppBundle:Article')->find($data['articleId']);
        $author = $this->getDoctrine()->getRepository('AppBundle:Author')->find($data['userId']);
        if( $author == $article->getAuthor()){
            return  new JsonResponse(['error' => 'The author is not allowed to like his own post'],Response::HTTP_BAD_REQUEST);
        }
        // $article ->getLikes()->add($author);

        return new Response('{UPDATED}', Response::HTTP_CREATED);

    }
}
