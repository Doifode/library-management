-- MySQL dump 10.13  Distrib 8.0.38, for Win64 (x86_64)
--
-- Host: localhost    Database: lbrms
-- ------------------------------------------------------
-- Server version	8.0.39

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `books`
--

DROP TABLE IF EXISTS `books`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `books` (
  `bookId` int NOT NULL AUTO_INCREMENT,
  `bookName` varchar(250) NOT NULL,
  `author` varchar(150) NOT NULL,
  `quantity` int NOT NULL DEFAULT '1',
  `image` longtext NOT NULL,
  PRIMARY KEY (`bookId`),
  UNIQUE KEY `bookName_UNIQUE` (`bookName`),
  UNIQUE KEY `bookId_UNIQUE` (`bookId`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `books`
--

LOCK TABLES `books` WRITE;
/*!40000 ALTER TABLE `books` DISABLE KEYS */;
INSERT INTO `books` VALUES (9,'Shamachi aai1','yash',4,'https://www.bookganga.com/Preview/previewimage.aspx?ImagePath=PW6ald4CNvsDR%2fNg1ssPXO35bGUc1BLI6gGrdht9X4EnVfOBR%2bUmYde9S4i1Llr4'),(10,'Chhava','Yash',1,'https://m.media-amazon.com/images/I/91mykyV8zSL._SL1500_.jpg');
/*!40000 ALTER TABLE `books` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `studentbookmap`
--

DROP TABLE IF EXISTS `studentbookmap`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `studentbookmap` (
  `studentBookMapId` int NOT NULL AUTO_INCREMENT,
  `bookId` int NOT NULL,
  `studentId` int NOT NULL,
  `isReturned` smallint NOT NULL DEFAULT '0',
  `assignedDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `returnedDate` datetime DEFAULT NULL,
  `expectedReturnDate` datetime NOT NULL,
  PRIMARY KEY (`studentBookMapId`),
  UNIQUE KEY `studentBookMapId_UNIQUE` (`studentBookMapId`),
  KEY `book_fk_id_idx` (`bookId`),
  KEY `student_fk_id_idx` (`studentId`),
  CONSTRAINT `book_fk_id` FOREIGN KEY (`bookId`) REFERENCES `books` (`bookId`),
  CONSTRAINT `student_fk_id` FOREIGN KEY (`studentId`) REFERENCES `students` (`studentId`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `studentbookmap`
--

LOCK TABLES `studentbookmap` WRITE;
/*!40000 ALTER TABLE `studentbookmap` DISABLE KEYS */;
INSERT INTO `studentbookmap` VALUES (2,9,3,1,'2024-11-05 11:33:16',NULL,'2024-11-19 11:33:16'),(3,10,4,1,'2024-11-05 12:48:33','2024-11-05 14:26:36','2024-11-19 12:48:33'),(4,10,3,1,'2024-11-05 14:16:08','2024-11-05 14:28:08','2024-11-19 14:16:08'),(5,10,4,1,'2024-11-05 14:27:08','2024-11-05 14:27:23','2024-11-19 14:27:08'),(6,10,3,1,'2024-11-05 14:28:20','2024-11-05 14:34:15','2024-11-19 14:28:20'),(7,10,4,1,'2024-11-05 14:28:50','2024-11-05 14:34:19','2024-11-19 14:28:50'),(8,9,4,0,'2024-11-05 14:39:29',NULL,'2024-11-19 14:39:29');
/*!40000 ALTER TABLE `studentbookmap` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `students`
--

DROP TABLE IF EXISTS `students`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `students` (
  `studentId` int NOT NULL AUTO_INCREMENT,
  `firstName` varchar(45) NOT NULL,
  `lastName` varchar(45) NOT NULL,
  `prn` varchar(100) NOT NULL,
  `email` varchar(45) NOT NULL,
  `mobile` varchar(45) NOT NULL,
  `password` varchar(250) NOT NULL,
  `username` varchar(45) NOT NULL,
  PRIMARY KEY (`studentId`),
  UNIQUE KEY `mobile_UNIQUE` (`mobile`),
  UNIQUE KEY `email_UNIQUE` (`email`),
  UNIQUE KEY `prn_UNIQUE` (`prn`),
  UNIQUE KEY `studentId_UNIQUE` (`studentId`),
  UNIQUE KEY `username_UNIQUE` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `students`
--

LOCK TABLES `students` WRITE;
/*!40000 ALTER TABLE `students` DISABLE KEYS */;
INSERT INTO `students` VALUES (3,'Sanket1','Kurane','4524156333','Sanket@gmail.com','8080494027','$2a$10$mPv7Y8vbbphaguC4IN8aIOx2lYGD0o2rVtHbJZ0ea3DmbRVgLUEWS','sanket2304'),(4,'Akash','Sid','9875987987','akash@gmail.com','9876549877','$2a$10$IZaNF8DoIrK4jBjKzVUUGedoMKg6yoz//9W.oxsRkPBHlfV6HMmES','akash');
/*!40000 ALTER TABLE `students` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `userId` int NOT NULL AUTO_INCREMENT,
  `username` varchar(45) NOT NULL,
  `password` varchar(255) NOT NULL,
  `mobile` char(10) NOT NULL,
  `email` varchar(100) NOT NULL,
  PRIMARY KEY (`userId`),
  UNIQUE KEY `userId_UNIQUE` (`userId`),
  UNIQUE KEY `username_UNIQUE` (`username`),
  UNIQUE KEY `mobile_UNIQUE` (`mobile`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'yash','$2a$10$LyUjnpUYC7OGUgNcPaCfhuNnrK.MqNs/nzDF1ofV99Oz5VqDG1Kiq','8080494027','yashdoifode@gmail.com'),(2,'admin','$2a$10$AtzDtsueIwCBoSJrxxnNXOfp5nA99kiZPXBqrBS8aXEg5uy0HsSr.','9876543214','admin@gmail.com');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'lbrms'
--
/*!50003 DROP PROCEDURE IF EXISTS `ASSIGN_BOOK_TO_STUDENT` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `ASSIGN_BOOK_TO_STUDENT`(
     IN BOOK_ID INT,
     IN STUDENT_ID INT
)
BEGIN
    DECLARE CUSTOM_MESSAGE VARCHAR(500) DEFAULT '';

    -- Check if the book exists
    IF NOT EXISTS (SELECT * FROM BOOKS WHERE bookId = BOOK_ID) THEN
        SET CUSTOM_MESSAGE = 'Book not found.';
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = CUSTOM_MESSAGE;
    END IF;

    -- Check if the book is available in stock
    IF NOT EXISTS (SELECT * FROM BOOKS WHERE bookId = BOOK_ID AND quantity > 0) THEN
        SET CUSTOM_MESSAGE = 'Book not available.';
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = CUSTOM_MESSAGE;
    END IF;

    -- Check if the student exists
    IF NOT EXISTS (SELECT * FROM STUDENTS WHERE studentId = STUDENT_ID) THEN
        SET CUSTOM_MESSAGE = 'Student not found.';
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = CUSTOM_MESSAGE;
    END IF;

    -- Check if the book is already assigned to the student
    IF EXISTS (SELECT * FROM studentbookmap WHERE bookId = BOOK_ID AND studentId = STUDENT_ID AND isReturned = 0) THEN
        SET CUSTOM_MESSAGE = 'This book is already assigned to the student.';
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = CUSTOM_MESSAGE;
    END IF;

    -- Insert the new record into the studentbookmap table with assignedDate and expectedReturnDate
    INSERT INTO studentbookmap (bookId, studentId, isReturned, assignedDate, expectedReturnDate)
    VALUES (BOOK_ID, STUDENT_ID, 0, NOW(), DATE_ADD(NOW(), INTERVAL 14 DAY));

    -- Decrement the book quantity in the BOOKS table
    UPDATE BOOKS
    SET quantity = quantity - 1
    WHERE bookId = BOOK_ID;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `DELETE_BOOK` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `DELETE_BOOK`(
     IN BOOK_ID INT
)
BEGIN
    DECLARE CUSTOM_MESSAGE VARCHAR(500) DEFAULT '';

    -- Check if the book with the given ID exists
    IF NOT EXISTS (SELECT * FROM BOOKS WHERE bookId = BOOK_ID) THEN
        SET CUSTOM_MESSAGE = 'Book not found.';
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = CUSTOM_MESSAGE;
    END IF;

    -- Delete the book from the BOOKS table
    DELETE FROM BOOKS WHERE bookId = BOOK_ID;
    
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `DELETE_STUDENT` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `DELETE_STUDENT`(
     IN STUDENT_ID INT
)
BEGIN
    DECLARE CUSTOM_MESSAGE VARCHAR(500) DEFAULT '';

    -- Check if the book with the given ID exists
    IF NOT EXISTS (SELECT * FROM STUDENTS WHERE STUDENTID = STUDENT_ID) THEN
        SET CUSTOM_MESSAGE = 'Book not found.';
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = CUSTOM_MESSAGE;
    END IF;

    -- Delete the book from the BOOKS table
    DELETE FROM STUDENTS WHERE STUDENTID = STUDENT_ID;
    
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `GET_ALL_ASSIGNED_BOOK` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `GET_ALL_ASSIGNED_BOOK`()
BEGIN

SELECT  * FROM STUDENTBOOKMAP STM JOIN BOOKS ON STM.BOOKID = BOOKS.BOOKID JOIN STUDENTS ON STM.STUDENTID = STUDENTS.STUDENTID ;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `IS_AUTHENTICATED` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `IS_AUTHENTICATED`(
    IN USER_ID INT
 )
BEGIN

     IF (SELECT COUNT(*) FROM USER WHERE USERID = USER_ID) = 0 THEN
      SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT=   "User not found.";
     END IF;
     
      IF (SELECT COUNT(*) FROM USER WHERE USERID = USER_ID ) = 0 THEN
      SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT=   "You are not active user in this shop please contact shop owner.";
     END IF;
     
     SELECT * FROM USER WHERE USERID = USER_ID;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `MARK_BOOK_AS_RETURNED` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `MARK_BOOK_AS_RETURNED`(
     IN STUDENT_BOOK_MAP_ID INT
)
BEGIN
    DECLARE CUSTOM_MESSAGE VARCHAR(500) DEFAULT '';

    -- Check if the record exists in the studentbookmap table
    IF NOT EXISTS (SELECT * FROM studentbookmap WHERE studentBookMapId = STUDENT_BOOK_MAP_ID) THEN
        SET CUSTOM_MESSAGE = 'Record not found for the provided studentBookMapId.';
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = CUSTOM_MESSAGE;
    END IF;

    -- Update the isReturned status to 1
    
    UPDATE books
    SET quantity = quantity+ 1
    WHERE bookid = (select bookid from studentBookMap  where studentBookMapId = STUDENT_BOOK_MAP_ID  );
    
    UPDATE studentbookmap
    SET isReturned = 1,returnedDate = current_timestamp() 
    WHERE studentBookMapId = STUDENT_BOOK_MAP_ID;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `REGISTER_BOOK` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `REGISTER_BOOK`(
     IN BOOK_NAME VARCHAR(250),
    IN AUTHOR_NAME VARCHAR(100),
    IN QUANTITY INT  ,
    IN IMAGE_VAL TEXT
)
BEGIN 
    DECLARE CUSTOME_MESSAGE VARCHAR(500) DEFAULT '';

    -- Check for existing username in the same shop
    IF exists (SELECT * FROM BOOKS WHERE BOOKNAME = BOOK_NAME )   THEN
        SET CUSTOME_MESSAGE = 'Book Name already exists.';
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = CUSTOME_MESSAGE;
    END IF;

    -- Set the exit handler for any other SQL exceptions
    BEGIN 
        DECLARE EXIT HANDLER FOR SQLEXCEPTION 

        IF CUSTOME_MESSAGE IS NULL OR CUSTOME_MESSAGE = '' THEN
            SET CUSTOME_MESSAGE = 'Error while registering user.';
        END IF;
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = CUSTOME_MESSAGE;
    END;

    -- Insert the new user into the USER table
    INSERT INTO books (  bookName, author, quantity,image)
    VALUES ( BOOK_NAME, AUTHOR_NAME, QUANTITY,IMAGE_VAL);

    -- Set success message if needed
    SET CUSTOME_MESSAGE = 'Book added successfully!';
    SELECT * FROM BOOKS WHERE bookId = LAST_INSERT_ID();
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `REGISTER_STUDENT` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `REGISTER_STUDENT`(
     IN FIRST_NAME VARCHAR(45),
     IN LAST_NAME VARCHAR(45),
     IN PRN_val VARCHAR(100),
     IN EMAIL_VAL VARCHAR(45),
     IN MOBILE_VAL VARCHAR(45),
	IN USER_NAME VARCHAR(45),
    IN PASSWORD_VAL VARCHAR(250)
)
BEGIN
    DECLARE CUSTOM_MESSAGE VARCHAR(500) DEFAULT '';

    -- Check if PRN already exists
    IF EXISTS (SELECT * FROM students WHERE prn = PRN_val) THEN
        SET CUSTOM_MESSAGE = 'PRN already exists.';
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = CUSTOM_MESSAGE;
    END IF;

    -- Check if Email already exists
    IF EXISTS (SELECT * FROM students WHERE email = EMAIL_VAL) THEN
        SET CUSTOM_MESSAGE = 'Email already exists.';
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = CUSTOM_MESSAGE;
    END IF;

    -- Check if Mobile number already exists
    IF EXISTS (SELECT * FROM students WHERE mobile = MOBILE_VAL) THEN
        SET CUSTOM_MESSAGE = 'Mobile number already exists.';
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = CUSTOM_MESSAGE;
    END IF;
    
     -- Check if user name already exists
    IF EXISTS (SELECT * FROM students WHERE username = USER_NAME) THEN
        SET CUSTOM_MESSAGE = 'Username already exists.';
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = CUSTOM_MESSAGE;
    END IF;

    -- Insert the new student into the students table
    INSERT INTO students (firstName, lastName, prn, email, mobile,username,password)
    VALUES (FIRST_NAME, LAST_NAME, PRN_val, EMAIL_VAL, MOBILE_VAL,USER_NAME,PASSWORD_VAL);

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `REGISTER_USER` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `REGISTER_USER`(
     IN MOBILE_NO BIGINT,
    IN EMAIL_ID VARCHAR(100),
    IN USER_NAME VARCHAR(45),
    IN PASSWORD_VAL VARCHAR(255)  
    
)
BEGIN 
    DECLARE CUSTOME_MESSAGE VARCHAR(500) DEFAULT '';

    -- Check for existing username in the same shop
    IF exists (SELECT * FROM USER WHERE username = USER_NAME )   THEN
        SET CUSTOME_MESSAGE = 'Username already taken.';
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = CUSTOME_MESSAGE;
    END IF;

    -- Check for existing email in the same shop
    IF exists (SELECT * FROM USER WHERE email = EMAIL_ID )   THEN
        SET CUSTOME_MESSAGE = 'Email already taken .';
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = CUSTOME_MESSAGE;
    END IF;
    


    -- Check for existing mobile number in the same shop
    IF (SELECT COUNT(*) FROM USER WHERE mobile = MOBILE_NO ) > 0 THEN
        SET CUSTOME_MESSAGE = 'Mobile No. already taken.';
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = CUSTOME_MESSAGE;
    END IF;

    -- Set the exit handler for any other SQL exceptions
    BEGIN 
        DECLARE EXIT HANDLER FOR SQLEXCEPTION 

        IF CUSTOME_MESSAGE IS NULL OR CUSTOME_MESSAGE = '' THEN
            SET CUSTOME_MESSAGE = 'Error while registering user.';
        END IF;
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = CUSTOME_MESSAGE;
    END;

    -- Insert the new user into the USER table
    INSERT INTO USER (  email, mobile, userName,password)
    VALUES ( EMAIL_ID, MOBILE_NO, USER_NAME,PASSWORD_VAL);

    -- Set success message if needed
    SET CUSTOME_MESSAGE = 'User added successfully!';
    SELECT * FROM user WHERE userId = LAST_INSERT_ID();
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `UPDATE_ASSIGNMENT` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `UPDATE_ASSIGNMENT`(
    IN ASSIGNMENT_ID INT,        -- ID of the record in studentbookmap
    IN BOOK_ID INT,              -- ID of the book (optional to change the book)
    IN STUDENT_ID INT          -- ID of the student (optional to change the student)
    
)
BEGIN
    DECLARE CUSTOM_MESSAGE VARCHAR(500) DEFAULT '';

    -- Check if the assignment exists
    IF NOT EXISTS (SELECT * FROM studentbookmap WHERE studentBookMapId = ASSIGNMENT_ID) THEN
        SET CUSTOM_MESSAGE = 'Assignment record not found.';
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = CUSTOM_MESSAGE;
    END IF;

    -- Update the book assignment record
    UPDATE studentbookmap
    SET 
        bookId = IFNULL(BOOK_ID, bookId),  -- Update only if a new BOOK_ID is provided
        studentId = IFNULL(STUDENT_ID, studentId) -- Update only if a new STUDENT_ID is provided
        WHERE studentBookMapId = ASSIGNMENT_ID;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `UPDATE_BOOK` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `UPDATE_BOOK`(
     IN BOOK_ID INT,
     IN BOOK_NAME VARCHAR(250),
     IN AUTHOR_NAME VARCHAR(100),
     IN QUANTITY INT   
)
BEGIN 
    DECLARE CUSTOM_MESSAGE VARCHAR(500) DEFAULT '';

    -- Check if the book with the given ID exists
    IF NOT EXISTS (SELECT * FROM BOOKS WHERE bookId = BOOK_ID) THEN
        SET CUSTOM_MESSAGE = 'Book not found.';
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = CUSTOM_MESSAGE;
    END IF;

  

    -- Update the book information in the BOOKS table
    UPDATE BOOKS
    SET bookName = BOOK_NAME, author = AUTHOR_NAME, quantity = QUANTITY
    WHERE bookId = BOOK_ID;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `UPDATE_BOOK_ASSIGNMENT` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `UPDATE_BOOK_ASSIGNMENT`(
     IN BOOK_ID INT,
     IN CURRENT_STUDENT_ID INT,
     IN NEW_STUDENT_ID INT
)
BEGIN
    DECLARE CUSTOM_MESSAGE VARCHAR(500) DEFAULT '';

    -- Check if the book exists
    IF NOT EXISTS (SELECT * FROM books WHERE bookId = BOOK_ID) THEN
        SET CUSTOM_MESSAGE = 'Book not found.';
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = CUSTOM_MESSAGE;
    END IF;

    -- Check if the current student exists
    IF NOT EXISTS (SELECT * FROM students WHERE studentId = CURRENT_STUDENT_ID) THEN
        SET CUSTOM_MESSAGE = 'Current student not found.';
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = CUSTOM_MESSAGE;
    END IF;

    -- Check if the new student exists
    IF NOT EXISTS (SELECT * FROM students WHERE studentId = NEW_STUDENT_ID) THEN
        SET CUSTOM_MESSAGE = 'New student not found.';
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = CUSTOM_MESSAGE;
    END IF;

    -- Check if the book is currently assigned to the current student
    IF NOT EXISTS (SELECT * FROM studentbookmap WHERE bookId = BOOK_ID AND studentId = CURRENT_STUDENT_ID) THEN
        SET CUSTOM_MESSAGE = 'This book is not currently assigned to the specified current student.';
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = CUSTOM_MESSAGE;
    END IF;

    -- Check if the book is already assigned to the new student
    IF EXISTS (SELECT * FROM studentbookmap WHERE bookId = BOOK_ID AND studentId = NEW_STUDENT_ID) THEN
        SET CUSTOM_MESSAGE = 'This book is already assigned to the new student.';
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = CUSTOM_MESSAGE;
    END IF;

    -- Update the assignment to the new student
    UPDATE studentbookmap
    SET studentId = NEW_STUDENT_ID
    WHERE bookId = BOOK_ID AND studentId = CURRENT_STUDENT_ID;

    -- Set success message
    SET CUSTOM_MESSAGE = 'Book assignment successfully updated to the new student.';
    SELECT CUSTOM_MESSAGE AS Result;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `UPDATE_STUDENT` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `UPDATE_STUDENT`(
     IN STUDENT_ID INT,
     IN FIRST_NAME VARCHAR(45),
     IN LAST_NAME VARCHAR(45),
     IN PRN_VAL VARCHAR(100),
     IN EMAIL_VAL VARCHAR(45),
     IN MOBILE_VAL VARCHAR(45)
)
BEGIN
    DECLARE CUSTOM_MESSAGE VARCHAR(500) DEFAULT '';

    -- Check if PRN already exists for another student
    IF EXISTS (SELECT * FROM students WHERE prn = PRN_VAL AND studentId != STUDENT_ID) THEN
        SET CUSTOM_MESSAGE = 'PRN already exists for another student.';
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = CUSTOM_MESSAGE;
    END IF;

    -- Check if Email already exists for another student
    IF EXISTS (SELECT * FROM students WHERE email = EMAIL_VAL AND studentId != STUDENT_ID) THEN
        SET CUSTOM_MESSAGE = 'Email already exists for another student.';
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = CUSTOM_MESSAGE;
    END IF;

    -- Check if Mobile number already exists for another student
    IF EXISTS (SELECT * FROM students WHERE mobile = MOBILE_VAL AND studentId != STUDENT_ID) THEN
        SET CUSTOM_MESSAGE = 'Mobile number already exists for another student.';
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = CUSTOM_MESSAGE;
    END IF;

    -- Update the student details in the students table
    UPDATE students
    SET firstName = FIRST_NAME,
        lastName = LAST_NAME,
        prn = PRN_VAL,
        email = EMAIL_VAL,
        mobile = MOBILE_VAL
    WHERE studentId = STUDENT_ID;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `VERIFY_USER` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `VERIFY_USER`(
    IN IDENTIFIER VARCHAR(250)
)
BEGIN
    DECLARE MESSAGE VARCHAR(500) DEFAULT "";
    DECLARE USER_COUNT INT DEFAULT 0;
  
    -- Handle any SQL exception and set the appropriate error message
    DECLARE EXIT HANDLER FOR SQLEXCEPTION 
    BEGIN
        IF MESSAGE IS NULL OR MESSAGE = "" THEN 
            SET MESSAGE = "An error occurred during user verification.";
        END IF;
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = MESSAGE;
    END;

    -- Check if the user exists (by username or email)
    SELECT COUNT(*) INTO USER_COUNT
    FROM USER
    WHERE username = IDENTIFIER OR email = IDENTIFIER;

    -- Validate user existence
    IF USER_COUNT = 0 THEN
        SET MESSAGE = "Username or email is not correct.";
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = MESSAGE;
    END IF;   

    -- Retrieve the role and other details if the user and shop are active
    SELECT *
    FROM  user
    WHERE (username = IDENTIFIER OR email = IDENTIFIER);

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-11-05 14:57:29
