


UPDATE PARTY_TYPE SET TYPE=0;
UPDATE PARTY_TYPE SET TYPE=1 where ID=1;
UPDATE PARTY_TYPE SET REF='user' where ID=1;
UPDATE PARTY_TYPE SET REF='company' where ID=2;
UPDATE PARTY_TYPE SET REF='department' where ID=3;
UPDATE PARTY_TYPE SET REF='group' where ID=4;



UPDATE PARTY_STRUCT SET STRUCT_TYPE_ID=1;
UPDATE PARTY_STRUCT SET PART_TIME=0,LINK=0,ADMIN=0,PRIORITY=0;
INSERT INTO PARTY_STRUCT(ID,STRUCT_TYPE_ID,PARENT_ENTITY_ID,CHILD_ENTITY_ID,SCOPE_ID) VALUES(20,1,NULL,1,'1');
DELETE FROM PARTY_STRUCT WHERE PARENT_ENTITY_ID=10;
DELETE FROM PARTY_STRUCT WHERE PARENT_ENTITY_ID=11;
DELETE FROM PARTY_STRUCT WHERE PARENT_ENTITY_ID=12;
UPDATE PARTY_STRUCT SET ADMIN=1 where CHILD_ENTITY_ID=10;
UPDATE PARTY_STRUCT SET ADMIN=1 where CHILD_ENTITY_ID=11;
UPDATE PARTY_STRUCT SET ADMIN=1 where CHILD_ENTITY_ID=12;



UPDATE PARTY_STRUCT_TYPE SET NAME='行政组织' WHERE ID=1;
DELETE FROM PARTY_STRUCT_TYPE WHERE ID=2;
DELETE FROM PARTY_STRUCT_TYPE WHERE ID=3;
UPDATE PARTY_STRUCT_TYPE SET PRIORITY=0;


DELETE FROM PARTY_STRUCT_RULE;
INSERT INTO PARTY_STRUCT_RULE(ID,PARENT_TYPE_ID,CHILD_TYPE_ID,STRUCT_TYPE_ID,SCOPE_ID) VALUES(1,2,2,1,'1');
INSERT INTO PARTY_STRUCT_RULE(ID,PARENT_TYPE_ID,CHILD_TYPE_ID,STRUCT_TYPE_ID,SCOPE_ID) VALUES(2,2,3,1,'1');
INSERT INTO PARTY_STRUCT_RULE(ID,PARENT_TYPE_ID,CHILD_TYPE_ID,STRUCT_TYPE_ID,SCOPE_ID) VALUES(3,2,4,1,'1');
INSERT INTO PARTY_STRUCT_RULE(ID,PARENT_TYPE_ID,CHILD_TYPE_ID,STRUCT_TYPE_ID,SCOPE_ID) VALUES(4,2,1,1,'1');
INSERT INTO PARTY_STRUCT_RULE(ID,PARENT_TYPE_ID,CHILD_TYPE_ID,STRUCT_TYPE_ID,SCOPE_ID) VALUES(5,3,3,1,'1');
INSERT INTO PARTY_STRUCT_RULE(ID,PARENT_TYPE_ID,CHILD_TYPE_ID,STRUCT_TYPE_ID,SCOPE_ID) VALUES(6,3,4,1,'1');
INSERT INTO PARTY_STRUCT_RULE(ID,PARENT_TYPE_ID,CHILD_TYPE_ID,STRUCT_TYPE_ID,SCOPE_ID) VALUES(7,3,1,1,'1');
INSERT INTO PARTY_STRUCT_RULE(ID,PARENT_TYPE_ID,CHILD_TYPE_ID,STRUCT_TYPE_ID,SCOPE_ID) VALUES(8,4,4,1,'1');
INSERT INTO PARTY_STRUCT_RULE(ID,PARENT_TYPE_ID,CHILD_TYPE_ID,STRUCT_TYPE_ID,SCOPE_ID) VALUES(9,4,1,1,'1');



UPDATE PARTY_ENTITY SET REF=1 where id=2;
UPDATE PARTY_ENTITY SET REF=2 where id=3;
UPDATE PARTY_ENTITY SET REF=3 where id=4;
UPDATE PARTY_ENTITY SET REF=4 where id=5;


