SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


--
-- Database: `spectateur`
--

-- --------------------------------------------------------

--
-- Table structure for table `sp_reports`
--

CREATE TABLE IF NOT EXISTS `sp_reports` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `uuid` varchar(36) NOT NULL,
  `model` text NOT NULL,
  `controller` text NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uuid` (`uuid`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 ;
