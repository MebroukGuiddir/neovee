<?php

namespace AppBundle\Controller;

use AppBundle\Entity\User;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;
use Symfony\Component\Validator\Constraints\Email as EmailConstraint;
class UserController extends Controller
{

    private UserPasswordEncoderInterface $passwordEncoder;

    public function __construct(UserPasswordEncoderInterface $passwordEncoder)
    {
        $this->passwordEncoder = $passwordEncoder;
    }


    /**
     * @Route("/login", name="user_login")
     * @Method({"POST"})
     */
    public function login(Request $request)
    {
        $a = json_decode($request->getContent(), true);

        return $this->json($a);
    }
    /**
     * @Route("/signin", name="user_signin")
     * @Method({"POST"})
     */
    public function signin(Request $request): Response
    {
        try {
            // get post parameters
            $data = json_decode($request->getContent(), true);


           /*
            // email validation
            $emailConstraint = new EmailConstraint();
            $emailConstraint->message = 'Invalid Email';
            $email = $data["email"];

            $errors = $this->get('validator')->validateValue(
                $email,
                $emailConstraint
            );
            if($errors) return new Response($errors , Response::HTTP_BAD_REQUEST);


            // password validation
            if( $data["password"] !== $data["passwordConfirm"]){
                return new Response("Your password and confirmation password do not match." , Response::HTTP_BAD_REQUEST);
            }
            */
            // create empty user
            $user = new User();

            // set fields values
            $user->setEmail($data["email"]);
            $user->setFirstName($data["firstName"]);
            $user->setLastName($data["lastName"]);
            $user->setDateCreation(new \DateTime());
            $user->setPassword($data["password"]);
            $user->setToken("0");
            //$user->setPassword($this->passwordEncoder->encodePassword($user, $data["password"]));

            // persist
            $em = $this->getDoctrine()->getManager();
            $em->persist($user);
            $em->flush();
             return new Response('$user->getId()', Response::HTTP_CREATED);


        } catch (\Exception $exception ){
            return new Response( $exception, Response::HTTP_INTERNAL_SERVER_ERROR);
        }


    }
}
