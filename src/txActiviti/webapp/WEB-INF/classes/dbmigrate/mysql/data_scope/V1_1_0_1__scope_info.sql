INSERT INTO SCOPE_INFO(ID,NAME,CODE,REF,SHARED,USER_REPO_REF) VALUES(1,'默认','default','1',0,'1');

UPDATE SCOPE_INFO SET TYPE=0 WHERE ID=1;

INSERT INTO SCOPE_INFO(ID,NAME,CODE,REF,SHARED,USER_REPO_REF,TYPE) VALUES(2,'cms','cms','2',0,'1',1);
