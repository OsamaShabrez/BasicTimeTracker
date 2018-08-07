<?php
// src/DataFixtures/DataFixtures.php
namespace App\DataFixtures;

use App\Entity\Timer;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\Persistence\ObjectManager;

class DataFixtures extends Fixture
{
    public function load(ObjectManager $manager)
    {
        // create 100 timer records! Bam!
        for ($i = 0; $i < 100; $i++) {
          $tempTime = \DateTime::createFromFormat('H:i', mt_rand(0,23).":".str_pad(mt_rand(0,59), 2, "0", STR_PAD_LEFT));
          $timer = new Timer();
          $timer->setDescription($this->generateRandomString(250));
          $timer->setTime($tempTime);
          $manager->persist($timer);
        }

        $manager->flush();
    }

    function generateRandomString($length = 50) {
      $characters = '0123456789 abcdefghijklmnopqrstuvwxyz ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      $charactersLength = strlen($characters);
      $randomString = '';
      for ($i = 0; $i < $length; $i++) {
          $randomString .= $characters[rand(0, $charactersLength - 1)];
      }
      return $randomString;
    }
}
