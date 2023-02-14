CREATE TABLE IF NOT EXISTS `detail` (
  `detail_id` int(11) NOT NULL,
  `solution_id` int(11) DEFAULT NULL,
  `contents` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`detail_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='솔루션 설명';

INSERT IGNORE INTO `detail` (`detail_id`, `solution_id`, `contents`) VALUES
	(0, 1, 'MES표준의 생산관리 기능(100여개의 프로세스)을 포함'),
	(2, 1, '영업/구매/생상 통합 운영관리 시스템'),
	(3, 1, '실시간 데이터로 공장활동을 지시하고, 대응하고, 보고하는 역할을 수행'),
	(4, 1, 'MES표준의 생산관리 기능(100여개의 프로세스)을 포함'),
	(5, 2, '프로젝트 수주에서 출하까지 통합 생산운영 관리체계 구축'),
	(6, 2, '프로젝트 단위 수주 건별 표준원가 관점의 수익성 관리체계 구축'),
	(7, 2, '외주(사급) 공정, 현장 설치, A/S 작업 등 제작 외 프로세스 현황 가시성 확보'),
	(8, 3, '방사 제직 통합 데이터 수집 솔루션 시스템 '),
	(10, 3, '방사/제직공정 설비에서 발생되는 데이터 축척 및 관리의 편의성 증대'),
	(11, 3, '각 공정별 데이터 연계 및 생성(PLC 활용) 데이터의 체계적인 관리 강화'),
	(12, 1, '영업(수주/발주)관리/POP현장실적수집/설비PLC연동 등의 추가적인 모듈을 연계'),
	(13, 1, '생산업무 효율성 증대와 분석/예측을 위한 데이터 기반 체계을 갖출수 있음'),
	(14, 3, '자동 장력 테스트 시스템 데이터 확보 기반 제품 생산성 및 신뢰성 향상'),
	(15, 3, '축적된 데이터 관리 및 각 공정별 모니터링 시스템');

CREATE TABLE IF NOT EXISTS `license` (
  `license_id` int(11) NOT NULL,
  `basic` varchar(50) DEFAULT NULL,
  `premium` varchar(50) DEFAULT NULL,
  `custom` varchar(50) DEFAULT NULL,
  `solution_id` int(11) DEFAULT NULL,
  `type` varchar(50) NOT NULL,
  PRIMARY KEY (`license_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='라이선스';

INSERT IGNORE INTO `license` (`license_id`, `basic`, `premium`, `custom`, `solution_id`, `type`) VALUES
	(1, '11$', '15$', '별도문의', 1, '연간 구독형'),
	(2, '110$', '150$', '별도문의', 1, '영구 라이선스'),
	(3, '11$', '15$', '별도문의', 2, '연간 구독형'),
	(4, '113$', '150$', '별도문의', 2, '영구 라이선스'),
	(5, '11$', '15$', '별도문의', 3, '연간 구독형'),
	(6, '110$', '152$', '별도문의', 3, '영구 라이선스');

CREATE TABLE IF NOT EXISTS `license_question` (
  `license_question_id` int(11) NOT NULL AUTO_INCREMENT,
  `solution_id` int(11) NOT NULL,
  `user_id` varchar(20) DEFAULT NULL,
  `title` varchar(50) NOT NULL DEFAULT '',
  `contents` varchar(50) NOT NULL DEFAULT '',
  `create_dtm` datetime NOT NULL,
  `res_yn` varchar(10) NOT NULL DEFAULT 'NEW',
  `license_type` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`license_question_id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COMMENT='라이선스 문의글';

INSERT IGNORE INTO `license_question` (`license_question_id`, `solution_id`, `user_id`, `title`, `contents`, `create_dtm`, `res_yn`, `license_type`) VALUES
	(8, 1, 'admin', 'test', 'test', '2022-12-22 15:17:27', 'NEW', 'trial'),
	(9, 1, 'test', 'test', 'test', '2022-12-22 15:18:39', 'SUCCESS', 'trial'),
	(10, 1, 'test', 'dd', 'd', '2022-12-22 15:46:44', 'SUCCESS', 'trial'),
	(11, 1, 'admin', 'asd', 'ads', '2023-01-03 14:00:03', 'NEW', 'trial');

CREATE TABLE IF NOT EXISTS `my_license` (
  `my_license_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` varchar(20) NOT NULL,
  `solution_id` int(11) NOT NULL,
  `site_id` varchar(20) NOT NULL,
  `site_pass` varchar(50) NOT NULL,
  `site_url` varchar(50) NOT NULL,
  `start_date` datetime NOT NULL,
  `end_date` datetime NOT NULL,
  PRIMARY KEY (`my_license_id`)
) ENGINE=InnoDB AUTO_INCREMENT=50 DEFAULT CHARSET=utf8mb4 COMMENT='내 구독';

INSERT IGNORE INTO `my_license` (`my_license_id`, `user_id`, `solution_id`, `site_id`, `site_pass`, `site_url`, `start_date`, `end_date`) VALUES
	(46, 'test', 3, 'test1234', '1234', '/test1234', '2022-12-16 16:19:17', '2022-12-31 16:19:17'),
	(48, 'test', 1, 'test', '1234', '1111', '2022-12-22 15:19:01', '2023-01-06 15:19:01'),
	(49, 'test', 1, 'd', 'd', 'd', '2022-12-22 15:47:00', '2023-01-06 15:47:00');

CREATE TABLE IF NOT EXISTS `question` (
  `question_id` int(11) NOT NULL AUTO_INCREMENT,
  `solution_id` int(11) NOT NULL,
  `belong` varchar(50) NOT NULL DEFAULT '',
  `name` varchar(50) NOT NULL DEFAULT '',
  `position` varchar(50) NOT NULL DEFAULT '',
  `tel` varchar(50) NOT NULL DEFAULT '',
  `email` varchar(50) NOT NULL DEFAULT '',
  `title` varchar(50) NOT NULL DEFAULT '',
  `contents` varchar(50) NOT NULL DEFAULT '',
  `create_dtm` datetime NOT NULL,
  `res_yn` varchar(10) NOT NULL DEFAULT 'NEW',
  PRIMARY KEY (`question_id`)
) ENGINE=InnoDB AUTO_INCREMENT=59 DEFAULT CHARSET=utf8mb4 COMMENT='문의글';

INSERT IGNORE INTO `question` (`question_id`, `solution_id`, `belong`, `name`, `position`, `tel`, `email`, `title`, `contents`, `create_dtm`, `res_yn`) VALUES
	(55, 1, '에이테크', '관리자', '관리자', '+82 010 1111 2222', 'atech@atech1221.com', 'test', 'test', '2022-12-22 15:21:24', 'NEW'),
	(56, 1, '에이테크', '테스트', '테스터', '+82 010 1111 3333', 'ggo0415@naver.com', 'rwr', 'wr', '2022-12-22 15:22:36', 'SUCCESS'),
	(57, 1, '에이테크', '관리자', '관리자', '+82 010 1111 2222', 'atech@atech1221.com', 't', 't', '2022-12-22 15:40:41', 'NEW'),
	(58, 1, '에이테크', '테스트', '테스터', '+82 010 1111 3333', 'ggo0415@naver.com', 'd', 'dd', '2022-12-22 15:43:40', 'SUCCESS');

CREATE TABLE IF NOT EXISTS `role` (
  `role_id` int(11) NOT NULL COMMENT '룰번호',
  `role_name` varchar(50) NOT NULL DEFAULT '' COMMENT '룰이름',
  PRIMARY KEY (`role_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='권한';

INSERT IGNORE INTO `role` (`role_id`, `role_name`) VALUES
	(1, 'ROLE_ADMIN'),
	(2, 'ROLE_USER');

CREATE TABLE IF NOT EXISTS `solution` (
  `solution_id` int(11) NOT NULL,
  `solution_name` varchar(50) NOT NULL DEFAULT '',
  `img_pass` varchar(200) DEFAULT '',
  PRIMARY KEY (`solution_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='솔루션 정보';

INSERT IGNORE INTO `solution` (`solution_id`, `solution_name`, `img_pass`) VALUES
	(1, '선재하이테크', ''),
	(2, '코리아피앤시', ''),
	(3, '한국섬유개발원', ''),
	(99, '기타', '');

CREATE TABLE IF NOT EXISTS `user` (
  `user_id` varchar(20) NOT NULL COMMENT '유저아이디',
  `user_pass` varchar(300) NOT NULL COMMENT '비밀번호',
  `belong` varchar(50) NOT NULL,
  `name` varchar(50) NOT NULL,
  `position` varchar(50) NOT NULL,
  `tel` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `create_dtm` datetime NOT NULL COMMENT '생성일',
  `role_id` int(11) NOT NULL DEFAULT 2 COMMENT '룰번호',
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='유저정보';

INSERT IGNORE INTO `user` (`user_id`, `user_pass`, `belong`, `name`, `position`, `tel`, `email`, `create_dtm`, `role_id`) VALUES
	('admin', '1000:d521a1f633e7000d7a5fc571f3af6acfec759cfe1dd9978e:1ce62858571b12cd909d94fed843eac152ce2cb8eb34c537', '에이테크', '관리자', '관리자', '+82 010 1111 2222', 'atech@atech1221.com', '2022-12-01 15:49:12', 1),
	('test', '1000:3071b56eab10e5f688c7a549e29fc6b2832c2bff19f5a081:5d83fc5bfd56310b2663737cc09e3c545010406598c4a621', '에이테크', '테스트', '테스터', '+82 010 1111 3333', 'ggo0415@naver.com', '2022-12-01 15:49:12', 2);

