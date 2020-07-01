
CREATE TABLE membership
(
	member_id		VARCHAR(20)		NOT NULL	COMMENT '회원 아이디',
	seq				DECIMAL(6)		NOT NULL	COMMENT '회원 일련번호',
	name			VARCHAR(100)	NOT NULL	COMMENT '성명',
	birthday		DATE						COMMENT '생년월일',
	register_date	DATE			NOT NULL	COMMENT '가입일',
	zipcode			VARCHAR(10)					COMMENT '우편번호',
	address			VARCHAR(255)				COMMENT '주소',
	phone_home		VARCHAR(30)					COMMENT '집전화번호',
	phone_mobile	VARCHAR(30)					COMMENT '휴대전화번호',
	introducer_id	VARCHAR(20)					COMMENT '추천인',
	note			VARCHAR(1000)				COMMENT '비고',
	type			CHAR(1)			NOT NULL	COMMENT '회원 구분',
	PRIMARY KEY (member_id)
);

ALTER TABLE membership ADD CONSTRAINT fk_membership_introducer_id
	FOREIGN KEY (introducer_id) REFERENCES membership(member_id);


CREATE TABLE membership_fee
(
	fee_id			DECIMAL(8)		NOT NULL	COMMENT '납부 아이디',
	member_id		VARCHAR(20)		NOT NULL	COMMENT '회원 아이디',
	pay_date		DATE			NOT NULL	COMMENT '납부일',
	amount			DECIMAL(10)		NOT NULL	COMMENT '납부금액',
	year			DECIMAL(4)		NOT NULL	COMMENT '연도',
	type			VARCHAR(255)				COMMENT '회비 종류',
	note			VARCHAR(1000)				COMMENT '비고',
	PRIMARY KEY (fee_id)
);

ALTER TABLE membership_fee ADD CONSTRAINT fk_membership_fee_member_id
	FOREIGN KEY (member_id) REFERENCES membership(member_id);



