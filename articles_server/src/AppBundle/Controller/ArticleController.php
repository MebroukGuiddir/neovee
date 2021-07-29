<?php

namespace AppBundle\Controller;




use AppBundle\Service\Base64FileExtractor;
use AppBundle\Service\UploadedBase64File;
use Doctrine\Common\Annotations\AnnotationReader;
use mysql_xdevapi\Exception;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use AppBundle\Entity\Article;
use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Component\Serializer\Encoder\XmlEncoder;
use Symfony\Component\Serializer\Mapping\Factory\ClassMetadataFactory;
use Symfony\Component\Serializer\Mapping\Loader\AnnotationLoader;
use Symfony\Component\Serializer\Normalizer\AbstractNormalizer;
use Symfony\Component\Serializer\Normalizer\GetSetMethodNormalizer;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
use Symfony\Component\Serializer\Serializer;
use Psr\Log\LoggerInterface;

class ArticleController extends Controller
{

    private Serializer $serializer;

    public function __construct( )
    {

        $encoders = [new XmlEncoder(), new JsonEncoder()];
        $normalizers = [new GetSetMethodNormalizer()];
        $this->serializer = new Serializer($normalizers, $encoders);

    }
    /**
     * @Route("/articles", name="article_create" ,methods={"POST"})
     * @Method({"POST"})
     */
    public function createAction(Request $request, Base64FileExtractor $base64FileExtractor): Response
    {
        try {
            $data = json_decode($request->getContent(), true);
            $author = $this->getDoctrine()->getRepository('AppBundle:Author')->find($data['userId']);

            //save image in file
            $base64Image = $base64FileExtractor->extractBase64String($data['image']);
            $imageFile = new UploadedBase64File($base64Image, $author->getId()."_".random_bytes(10));

            $article = new Article();
            $article ->setTitle($data['title'])
                ->setDescription($data['description'])
                ->setContent($data['content'])
                ->setAuthor($author)
                ->setImage($data['image'])
                ->setModificationDate((new \DateTime("now"))->format('Y-m-d H:i:s'));
            $em = $this->getDoctrine()->getManager();
            $em->persist($article);
            $em->flush();
            return new JsonResponse(['message' => 'Added Successfully','article'=>$this->serializer->serialize($article, 'json',[AbstractNormalizer::ATTRIBUTES => ['title']])],Response::HTTP_CREATED);
        }catch (\Exception $e){
            return  new JsonResponse(['error' => 'Something want Wrong','message'=> $e->getMessage()],Response::HTTP_INTERNAL_SERVER_ERROR);
        }



    }
    /**
     * @Route("/articles", name="article_search",methods={"GET"})
     */
    public function searchAction(Request $request, LoggerInterface $logger): Response
    {

        $size = $request->query->get('size');
        $page = $request->query->get('page');
        $title =  $request->query->get('title');
        $articles = $this->getDoctrine()
            ->getRepository(Article::class)
            ->findByTitleOrderedByDate($title, $size, $page);
        $serializedEntity = $this->serializer->serialize($articles, 'json',  ['enable_max_depth' => true]);

        return new Response($serializedEntity,Response::HTTP_OK);

    }
    /**
     * @Route("/articles/{id}", name="article_getByID",methods={"GET"})
     */
    public function getArticleByIdAction(Request $request, LoggerInterface $logger): Response
    {
        $classMetadataFactory = new ClassMetadataFactory(new AnnotationLoader(new AnnotationReader()));
        $normalizer = new ObjectNormalizer($classMetadataFactory);
        $serializer = new Serializer(array($normalizer));
        $id =  $request->attributes->get('id');
        $article = $this->getDoctrine()
            ->getRepository(Article::class)
            ->findOneBy(array('id' => $id));
        $serializedEntity = $this->serializer->serialize($article, 'json', [AbstractNormalizer::ATTRIBUTES => ['id','title','description','content','image','modificationDate','author' => ['firstName','lastName']]] );

        return new Response($serializedEntity,Response::HTTP_OK);



    }
    /**
     * @Route("/articles", name="article_delete", methods={"DELETE"})
     */
    public function deleteAction(Request $request): Response
    {  try {
        $data = json_decode($request->getContent(), true);
        if( empty($data['articleId']) or empty($data['userId']) ){
            return  new JsonResponse(['error' => 'Messing arguments'],Response::HTTP_METHOD_NOT_ALLOWED);
        }
        $article = $this->getDoctrine()->getRepository('AppBundle:Article')->find($data['articleId']);
        $author = $this->getDoctrine()->getRepository('AppBundle:Author')->find($data['userId']);
        if (!$author){
            return  new JsonResponse(['error' => 'User not funded'],Response::HTTP_METHOD_NOT_ALLOWED);
        }
        if (!$article){
            return  new JsonResponse(['error' => 'Article not funded'],Response::HTTP_METHOD_NOT_ALLOWED);
        }
        if($author !== $article->getAuthor()){
            return  new JsonResponse(['error' => 'Action not allowed'],Response::HTTP_METHOD_NOT_ALLOWED);
        }
        $em = $this->getDoctrine()->getManager();
        $em->remove($article);
        $em->flush();
        return new JsonResponse(['message' => 'deleted Successfully'],Response::HTTP_OK);
    }catch (\Exception $e){
        return  new JsonResponse(['error' => 'Something want Wrong','message'=> $e->getMessage()],Response::HTTP_INTERNAL_SERVER_ERROR);
    }
    }
    /**
     * @Route("/articles", name="article_update", methods={"PUT"})
     */
    public function updateAction(Request $request)
    {
        try {
            $data = json_decode($request->getContent(), true);
            if( empty($data['articleId']) or empty($data['userId']) ){
                return  new JsonResponse(['error' => 'Messing arguments'],Response::HTTP_METHOD_NOT_ALLOWED);
            }
            $article = $this->getDoctrine()->getRepository('AppBundle:Article')->find($data['articleId']);
            $author = $this->getDoctrine()->getRepository('AppBundle:Author')->find($data['userId']);
            if (!$author){
                return  new JsonResponse(['error' => 'User not funded'],Response::HTTP_METHOD_NOT_ALLOWED);
            }
            if (!$article){
                return  new JsonResponse(['error' => 'Article not funded'],Response::HTTP_METHOD_NOT_ALLOWED);
            }
            if($author !== $article->getAuthor()){
                return  new JsonResponse(['error' => 'Action not allowed'],Response::HTTP_METHOD_NOT_ALLOWED);
            }
            $article ->setTitre($data['title'])
                ->setContent($data['content'])
                ->setModificationDate(new \DateTime("now"));
            $em = $this->getDoctrine()->getManager();
            $em->flush();
            return new JsonResponse(['message' => 'article updated Successfully'],Response::HTTP_OK);
        }catch (\Exception $e){
            return  new JsonResponse(['error' => 'Something want Wrong','message'=> $e->getMessage()],Response::HTTP_INTERNAL_SERVER_ERROR);
        }

    }
}
