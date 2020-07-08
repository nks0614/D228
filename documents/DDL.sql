
CREATE TABLE membership
(
	member_seq		INT				NOT NULL	AUTO_INCREMENT	COMMENT '회원 번호',
	member_id		VARCHAR(20)					COMMENT '회원 아이디',
	seq				DECIMAL(6)					COMMENT '회원 일련번호',
	name			VARCHAR(100)	NOT NULL	COMMENT '성명',
	birthday		DATE						COMMENT '생년월일',
	register_date	DATE						COMMENT '가입일',
	zipcode			VARCHAR(10)					COMMENT '우편번호',
	address			VARCHAR(255)				COMMENT '주소',
	phone_home		VARCHAR(30)					COMMENT '집전화번호',
	phone_mobile	VARCHAR(30)					COMMENT '휴대전화번호',
	job				VARCHAR(255)				COMMENT '소속(직업)',
	introducer_seq	INT							COMMENT '추천인',
	note			VARCHAR(1000)				COMMENT '비고',
	gender			CHAR(1)						COMMENT '성별 M/F',
	school			VARCHAR(100)				COMMENT '학교',
	grade			VARCHAR(30)					COMMENT '학년',
	class1			VARCHAR(30)					COMMENT '학반',
	member_type		CHAR(1)			NOT NULL	COMMENT '회원 구분  C - 일반회원  S - 학생회원  F - 가족회원 G - 단체회원 ',
	PRIMARY KEY (member_seq)
);

ALTER TABLE membership ADD CONSTRAINT fk_membership_introducer_seq
	FOREIGN KEY (introducer_seq) REFERENCES membership(member_seq);


CREATE TABLE membership_fee
(
	fee_seq			INT				NOT NULL	AUTO_INCREMENT	COMMENT '납부 번호',
	member_seq		INT							COMMENT '회원 번호',
	pay_date		DATE			NOT NULL	COMMENT '납부일',
	amount			DECIMAL(10)		NOT NULL	COMMENT '납부금액',
	year			DECIMAL(4)		NOT NULL	COMMENT '연도',
	type			VARCHAR(255)				COMMENT '회비 종류',
	note			VARCHAR(1000)				COMMENT '비고',
	PRIMARY KEY (fee_seq)
);

ALTER TABLE membership_fee ADD CONSTRAINT fk_membership_fee_member_seq
	FOREIGN KEY (member_seq) REFERENCES membership(member_seq);



