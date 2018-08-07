<?php

namespace App\Controller;

use App\Entity\Timer;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
use Symfony\Component\Serializer\Serializer;

class TimerController extends Controller
{
    /**
    * @var EntityManagerInterface
    */
    private $entityManager;
    /**
    * @var \Doctrine\Common\Persistence\ObjectRepository
    */
    private $timerRepository;

    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
        $this->timerRepository = $entityManager->getRepository('App:Timer');
    }

    /**
    * @Route("/create", name="Createtimer")
    */
    public function createTimer(Request $request)
    {
        $content = json_decode($request->getContent(), true);
        $stringTime = $content['timer']['time'];
        $tempTime = \DateTime::createFromFormat('H:i:s', $stringTime);
        $timer = new Timer();
        $timer->setDescription($content['timer']['description']);
        $timer->setTime($tempTime);
        $this->updateDatabase($timer);
        $jsonContent = $this->serializeObject($timer);
        $response = new Response();
        $response->headers->set('Content-Type', '`application/json');
        $response->setContent($jsonContent);
        return $response;
    }

    /**
     * @Route("/fetch-all", name="timer")
     */
    public function showAll()
    {
        $timers = $this->timerRepository->findBy([], ['id' => 'DESC']);
        $jsonContent = $this->serializeObject($timers);
        $response = new Response();
        $response->headers->set('Content-Type', '`application/json');
        $response->setContent($jsonContent);
        return $response;
    }

    /**
     * @Route("/", name="index")
     */
    public function index()
    {
        $file = "../public/index.html";
        if (file_exists($file)) {
            return new Response(file_get_contents($file));
        } else {
            throw new NotFoundHttpException("Guide {$filename} Not Found.");
        }
    }

    public function serializeObject($object)
    {
        $encoders = new JsonEncoder();
        $normalizers = new ObjectNormalizer();
        $normalizers->setCircularReferenceHandler(function ($obj) {
            return $obj->getId();
        });
        $serializer = new Serializer(array($normalizers), array($encoders));
        $jsonContent = $serializer->serialize($object, 'json');
        return $jsonContent;
    }

    public function updateDatabase($object)
    {
        $this->entityManager->persist($object);
        $this->entityManager->flush();
    }
}
