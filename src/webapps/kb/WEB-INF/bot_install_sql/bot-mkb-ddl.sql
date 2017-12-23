-- MySQL dump 10.13  Distrib 5.7.17, for Win64 (x86_64)
--
-- Host: 10.3.13.4    Database: mkb
-- ------------------------------------------------------
-- Server version	5.7.19

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `u_domainproduct`
--

DROP TABLE IF EXISTS `u_domainproduct`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `u_domainproduct` (
  `id` varchar(45) NOT NULL,
  `parentid` varchar(45) DEFAULT NULL,
  `name` varchar(45) DEFAULT NULL,
  `u_domainproductcol` varchar(45) DEFAULT NULL,
  `code` varchar(45) DEFAULT NULL,
  `description` varchar(45) DEFAULT NULL,
  `createTime` varchar(45) DEFAULT NULL,
  `updateTime` varchar(45) DEFAULT NULL,
  `createBy` varchar(45) DEFAULT NULL,
  `updateBy` varchar(45) DEFAULT NULL,
  `namesynonyms` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `u_synonyms`
--

DROP TABLE IF EXISTS `u_synonyms`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `u_synonyms` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `keyword` varchar(200) DEFAULT NULL,
  `synonym` varchar(1000) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `u_tenant`
--

DROP TABLE IF EXISTS `u_tenant`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `u_tenant` (
  `id` varchar(45) NOT NULL,
  `tid` varchar(45) DEFAULT NULL,
  `tname` varchar(45) DEFAULT NULL,
  `apiKey` varchar(45) DEFAULT NULL,
  `tdescript` varchar(45) DEFAULT NULL,
  `tusername` varchar(45) DEFAULT NULL,
  `tpassword` varchar(45) DEFAULT NULL,
  `tkbcore` varchar(45) DEFAULT NULL,
  `tqakbcore` varchar(45) DEFAULT NULL,
  `dbip` varchar(45) DEFAULT NULL,
  `dbport` varchar(45) DEFAULT NULL,
  `dbname` varchar(45) DEFAULT NULL,
  `dbusername` varchar(45) DEFAULT NULL,
  `dbpassword` varchar(45) DEFAULT NULL,
  `botKey` varchar(45) DEFAULT NULL,
  `botname` varchar(45) DEFAULT NULL,
  `createTime` varchar(45) DEFAULT NULL,
  `updateTime` varchar(45) DEFAULT NULL,
  `simscore` float DEFAULT '0.618',
  `recommended` tinyint(4) DEFAULT '1',
  `solr_qf` varchar(500) DEFAULT NULL,
  `solr_sort` varchar(500) DEFAULT NULL,
  `useSynonym` tinyint(4) DEFAULT '0',
  `solr_useFilterQueries` tinyint(4) DEFAULT '0',
  `botSkillConfig` varchar(10000) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-12-14 15:12:54
