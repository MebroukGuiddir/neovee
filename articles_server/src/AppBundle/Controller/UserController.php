<?php

namespace AppBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Component\HttpFoundation\Request;

class UserController extends Controller
{
    /**
     * @Route("/", name="homepage")
     */
    public function indexAction(Request $request)
    {
        // replace this example code with whatever you need
        return $this->render('default/index.html.twig', [
            'base_dir' => realpath($this->getParameter('kernel.project_dir')).DIRECTORY_SEPARATOR,
        ]);
    }
    /**
     * @Route("/login", name="user_login")
     */
    public function login(Request $request)
    {
        // replace this example code with whatever you need
        return $this->render('default/index.html.twig', [
            'base_dir' => realpath($this->getParameter('kernel.project_dir')).DIRECTORY_SEPARATOR,
        ]);
    }
    /**
     * @Route("/signin", name="user_signin")
     */
    public function signin(Request $request)
    {
        $data = $request->getContent();
        $author = $this->get('serializer')->deserialize($data, 'AppBundle\Entity\Author', 'json');

        $em = $this->getDoctrine()->getManager();
        $em->persist($author);
        $em->flush();

        return new Response('', Response::HTTP_CREATED);
    }
}
