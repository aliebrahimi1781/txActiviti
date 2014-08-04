

-------------------------------------------------------------------------------
--  user base
-------------------------------------------------------------------------------
CREATE TABLE USER_BASE(
        ID BIGINT auto_increment,
        USERNAME VARCHAR(50),
		DISPLAY_NAME VARCHAR(50),
        PASSWORD VARCHAR(50),
        STATUS INTEGER,
		REF varchar(64),
		USER_REPO_ID BIGINT,
		SCOPE_ID VARCHAR(50),
		email varchar(100),
		mobile varchar(50),
        CONSTRAINT PK_USER_BASE PRIMARY KEY(ID),
        CONSTRAINT FK_USER_BASE_REPO FOREIGN KEY(USER_REPO_ID) REFERENCES USER_REPO(ID)
) engine=innodb;

