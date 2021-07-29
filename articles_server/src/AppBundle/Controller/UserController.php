<?php

namespace AppBundle\Controller;


use AppBundle\Entity\Author;
use Psr\Log\LoggerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;
use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Component\Serializer\Encoder\XmlEncoder;
use Symfony\Component\Serializer\Normalizer\AbstractNormalizer;
use Symfony\Component\Serializer\Normalizer\AbstractObjectNormalizer;
use Symfony\Component\Serializer\Normalizer\GetSetMethodNormalizer;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
use Symfony\Component\Serializer\Serializer;
use Symfony\Component\Validator\Constraints\Email as EmailConstraint;
class UserController extends Controller
{

    private UserPasswordEncoderInterface $passwordEncoder;
    private Serializer $serializer;
    public function __construct(UserPasswordEncoderInterface $passwordEncoder)
    {
        $this->passwordEncoder = $passwordEncoder;
        $encoders = [new XmlEncoder(), new JsonEncoder()];
        $normalizers = [new GetSetMethodNormalizer()];
        $this->serializer = new Serializer($normalizers, $encoders);


    }


    /**
     * @Route("/users/login", name="user_login", methods={"POST"})
     */
    public function login(Request $request,UserPasswordEncoderInterface $encoder, LoggerInterface $logger)
    {
        //$logger->error('login');
        $data = json_decode($request->getContent(), true);
        $user = $this->getDoctrine()->getRepository('AppBundle:Author')->findOneBy(array('email' => $data['email']));
        if(!$user){
            return new JsonResponse(['message' => 'Invalid email'],Response::HTTP_UNAUTHORIZED);
        }
        elseif (! $encoder->isPasswordValid($user,$data['password'])){
            return new JsonResponse(['message' => 'Invalid password'],Response::HTTP_UNAUTHORIZED);

        }

        return new JsonResponse(['user'=>$this->serializer->serialize($user, 'json',[AbstractNormalizer::ATTRIBUTES => ['id','email','firstName','lastName','dateCreation']])],Response::HTTP_OK);
    }
    /**
     * @Route("/users/register", name="user_register", methods={"POST"})
     */
    public function register(Request $request, UserPasswordEncoderInterface $encoder): Response
    {
        try {
            // get  parameters
            $data = json_decode($request->getContent(), true);

            $user = $this->getDoctrine()->getRepository('AppBundle:Author')->findOneBy(array('email' => $data['email']));
            if($user){
                return new JsonResponse(['message' => 'Account already exist'],Response::HTTP_UNAUTHORIZED);
            }

            // create empty user
            $user = new Author();
            $encoded = $encoder->encodePassword($user, $data["password"]);
            // set fields values
            $user->setEmail($data["email"]);
            $user->setFirstName($data["firstName"]);
            $user->setLastName($data["lastName"]);
            $user->setDateCreation((new \DateTime())->format('Y-m-d H:i:s'));
            $user->setPassword($encoded);
            $user->setToken("0");
            //$user->setPassword($this->passwordEncoder->encodePassword($user, $data["password"]));

            // persist
            $em = $this->getDoctrine()->getManager();
            $em->persist($user);
            $em->flush();

            return new JsonResponse(['user'=>$this->serializer->serialize($user, 'json',[AbstractNormalizer::ATTRIBUTES => ['id','email','firstName','lastName','dateCreation']])],Response::HTTP_CREATED);


        } catch (\Exception $exception ){
            return new Response( $exception, Response::HTTP_INTERNAL_SERVER_ERROR);
        }


    }
}
