/* =============================  IB_CONF_COMPONENT 业务模块组件管理表 ---   设置测试数据  =============================  */
INSERT INTO IB_CONF_COMPONENT(ID,PACKAGENAME,MODULENAME,PARENTID,TYPEID) VALUES('10001','test','测试模块','0','sModule');
INSERT INTO IB_CONF_COMPONENT(ID,PACKAGENAME,MODULENAME,PARENTID,TYPEID) VALUES('10002','test','表存储设计器','10001','Table');
INSERT INTO IB_CONF_COMPONENT(ID,PACKAGENAME,MODULENAME,PARENTID,TYPEID) VALUES('10003','test','表单设计器','10001','Form');
INSERT INTO IB_CONF_COMPONENT(ID,PACKAGENAME,MODULENAME,PARENTID,TYPEID) VALUES('10004','test','流程表设计器','10001','BpmTable');
INSERT INTO IB_CONF_COMPONENT(ID,PACKAGENAME,MODULENAME,PARENTID,TYPEID) VALUES('10005','test','流程表单设计器','10001','BpmForm');
INSERT INTO IB_CONF_COMPONENT(ID,PACKAGENAME,MODULENAME,PARENTID,TYPEID) VALUES('10006','test','流程设计器','10001','Bpm');

/* ============================= 业务表管理表 =============================   */
INSERT INTO IB_CONF_TABLE(ID,PACKAGENAME,TABLENAME,TABLENAMECOMMENT,TABLETYPE,ISBPMTABLE) VALUES('10001','test','IB_TEST','测试练习表','1',2);
INSERT INTO IB_CONF_TABLE(ID,PACKAGENAME,TABLENAME,TABLENAMECOMMENT,TABLETYPE,ISBPMTABLE) VALUES('10002','test','IB_PERMISSION','审批权限流程表','1',1);
INSERT INTO IB_CONF_TABLE(ID,PACKAGENAME,TABLENAME,TABLENAMECOMMENT,TABLETYPE,ISBPMTABLE) VALUES('100021','test','IB_PERMISSION_S','审批权限流程子表','2',1);

/* ======================== 业务模块组件管理表 ====================  */
/* ====== 测试练习表 =====  */
CREATE TABLE IB_TEST ( ID  VARCHAR(64), NAME VARCHAR(64), REMARK VARCHAR(1024), CONSTRAINT PK_IB_TEST PRIMARY KEY(ID)) ENGINE=INNODB;
/* ====== 审批权限流程表 =====  */
CREATE TABLE  IB_PERMISSION(ID VARCHAR(64) NOT NULL, EXECUTIONID VARCHAR(64), CREATEDATEBPM DATE, NODENAME VARCHAR(128), ASSIGNEEUSER VARCHAR(128), TASKTITLE VARCHAR(256), REMARK VARCHAR(512), DONEFLAG INT DEFAULT 0, PRIMARY KEY (ID)) ENGINE=INNODB;
/* ====== 审批权限流程子表 =====  */
CREATE TABLE IB_PERMISSION_S ( ID  VARCHAR(64), PARENTID VARCHAR(64),REMARK VARCHAR(1024), CONSTRAINT PK_IB_PERMISSION_S PRIMARY KEY(ID)) ENGINE=INNODB;

/* ============================= 表列字段管理表  ============================= */
INSERT INTO ib_conf_table_columns(tablename,columnvalue,columnname,columntype,columnsize,isnull,columnno) VALUES('IB_TEST','ID','UUID主键','VARCHAR','64','否',1);
INSERT INTO ib_conf_table_columns(tablename,columnvalue,columnname,columntype,columnsize,isnull,columnno) VALUES('IB_TEST','NAME','姓名','VARCHAR','64','是',2);
INSERT INTO ib_conf_table_columns(tablename,columnvalue,columnname,columntype,columnsize,isnull,columnno) VALUES('IB_TEST','REMARK','备注','VARCHAR','1024','是',8);
/* ====== 审批权限流程表 =====  */
INSERT INTO ib_conf_table_columns(tablename,columnvalue,columnname,columntype,columnsize,isnull,columnno) VALUES('IB_PERMISSION','ID','UUID主键','VARCHAR','64','否',1);
INSERT INTO ib_conf_table_columns(tablename,columnvalue,columnname,columntype,columnsize,isnull,columnno) VALUES('IB_PERMISSION','EXECUTIONID','流程执行实例ID','VARCHAR','64','是',2);
INSERT INTO ib_conf_table_columns(tablename,columnvalue,columnname,columntype,columnsize,isnull,columnno) VALUES('IB_PERMISSION','CREATEDATEBPM','流程创建时间','DATE','','是',3);
INSERT INTO ib_conf_table_columns(tablename,columnvalue,columnname,columntype,columnsize,isnull,columnno) VALUES('IB_PERMISSION','ASSIGNEEUSER','负责人','VARCHAR','64','是',4);
INSERT INTO ib_conf_table_columns(tablename,columnvalue,columnname,columntype,columnsize,isnull,columnno) VALUES('IB_PERMISSION','NODENAME','流程节点名','VARCHAR','64','是',5);
INSERT INTO ib_conf_table_columns(tablename,columnvalue,columnname,columntype,columnsize,isnull,columnno) VALUES('IB_PERMISSION','TASKTITLE','流程实例标题','VARCHAR','256','是',6);
INSERT INTO ib_conf_table_columns(tablename,columnvalue,columnname,columntype,columnsize,isnull,columnno) VALUES('IB_PERMISSION','REMARK','备注','VARCHAR','512','是',7);
INSERT INTO ib_conf_table_columns(tablename,columnvalue,columnname,columntype,columnsize,isnull,columnno) VALUES('IB_PERMISSION','DONEFLAG','流程结束标记','INT','4','是',8);
/* ====== 审批权限流程子表 =====  */
INSERT INTO ib_conf_table_columns(tablename,columnvalue,columnname,columntype,columnsize,isnull,columnno) VALUES('IB_PERMISSION_S','ID','UUID主键','VARCHAR','64','否',1);
INSERT INTO ib_conf_table_columns(tablename,columnvalue,columnname,columntype,columnsize,isnull,columnno) VALUES('IB_PERMISSION_S','PARENTID','主表UUID','VARCHAR','64','是',2);
INSERT INTO ib_conf_table_columns(tablename,columnvalue,columnname,columntype,columnsize,isnull,columnno) VALUES('IB_PERMISSION_S','REMARK','备注','VARCHAR','1024','是',9);

/* ============================= 表单管理表 =============================  */
INSERT INTO ib_conf_form(ID,PACKAGENAME,FORMNAME,FORMTITLE,ISEDIT,ISADD,ISDELETE,ISQUERY,ISBPMFORM) VALUES('10001','test','testForm','测试练习表单',1,1,1,1,2);
INSERT INTO ib_conf_form(ID,PACKAGENAME,FORMNAME,FORMTITLE,ISEDIT,ISADD,ISDELETE,ISQUERY,ISBPMFORM) VALUES('permission01','test','permissionForm','审批流程表单',1,1,1,2,1);

/* ============================= 表单对应数据表管理表 =============================  */
INSERT INTO ib_conf_form_table(PACKAGENAME,FORMNAME,TABLENAME,TABLETYPE) VALUES('test','testForm','IB_TEST','main');
INSERT INTO ib_conf_form_table(PACKAGENAME,FORMNAME,TABLENAME,TABLETYPE) VALUES('test','permissionForm','IB_PERMISSION','main');
INSERT INTO ib_conf_form_table(PACKAGENAME,FORMNAME,TABLENAME,TABLETYPE) VALUES('test','permissionForm','IB_PERMISSION_S','sub');

/* ============================= 表单对应字段管理表 =============================  */
INSERT INTO ib_conf_form_table_colums(PACKAGENAME,FORMNAME,FORMCOLUMN,FORMCOLUMNTITLE,TABLECOLUMN,TABLENAME,FCTYPE,FCWIDTH,FCHEIGHT,FCDISPLAY,FCEDIT,FCQUERY,FCDEFAULT) VALUES('test','testForm','IB_TEST.ID','UUID主键','ID','IB_TEST','','','','1','1','2','');
INSERT INTO ib_conf_form_table_colums(PACKAGENAME,FORMNAME,FORMCOLUMN,FORMCOLUMNTITLE,TABLECOLUMN,TABLENAME,FCTYPE,FCWIDTH,FCHEIGHT,FCDISPLAY,FCEDIT,FCQUERY,FCDEFAULT) VALUES('test','testForm','IB_TEST.NAME','姓名','NAME','IB_TEST','','','','1','1','1','');
INSERT INTO ib_conf_form_table_colums(PACKAGENAME,FORMNAME,FORMCOLUMN,FORMCOLUMNTITLE,TABLECOLUMN,TABLENAME,FCTYPE,FCWIDTH,FCHEIGHT,FCDISPLAY,FCEDIT,FCQUERY,FCDEFAULT) VALUES('test','testForm','IB_TEST.REMARK','备注','REMARK','IB_TEST','','','','1','1','2','');
/* ====== 审批权限流程表 =====  */
INSERT INTO ib_conf_form_table_colums(PACKAGENAME,FORMNAME,FORMCOLUMN,FORMCOLUMNTITLE,TABLECOLUMN,TABLENAME,FCTYPE,FCWIDTH,FCHEIGHT,FCDISPLAY,FCEDIT,FCQUERY,FCDEFAULT) VALUES('test','permissionForm','IB_PERMISSION.ID','审批权限流程表.UUID主键','ID','IB_PERMISSION','','','','1','1','2','');
INSERT INTO ib_conf_form_table_colums(PACKAGENAME,FORMNAME,FORMCOLUMN,FORMCOLUMNTITLE,TABLECOLUMN,TABLENAME,FCTYPE,FCWIDTH,FCHEIGHT,FCDISPLAY,FCEDIT,FCQUERY,FCDEFAULT) VALUES('test','permissionForm','IB_PERMISSION.EXECUTIONID','审批权限流程表.流程执行实例ID','EXECUTIONID','IB_PERMISSION','','','','1','1','2','');
INSERT INTO ib_conf_form_table_colums(PACKAGENAME,FORMNAME,FORMCOLUMN,FORMCOLUMNTITLE,TABLECOLUMN,TABLENAME,FCTYPE,FCWIDTH,FCHEIGHT,FCDISPLAY,FCEDIT,FCQUERY,FCDEFAULT) VALUES('test','permissionForm','IB_PERMISSION.CREATEDATEBPM','审批权限流程表.流程创建时间','CREATEDATEBPM','IB_PERMISSION','','','','1','1','2','');
INSERT INTO ib_conf_form_table_colums(PACKAGENAME,FORMNAME,FORMCOLUMN,FORMCOLUMNTITLE,TABLECOLUMN,TABLENAME,FCTYPE,FCWIDTH,FCHEIGHT,FCDISPLAY,FCEDIT,FCQUERY,FCDEFAULT) VALUES('test','permissionForm','IB_PERMISSION.ASSIGNEEUSER','审批权限流程表.负责人','ASSIGNEEUSER','IB_PERMISSION','','','','1','1','2','');
INSERT INTO ib_conf_form_table_colums(PACKAGENAME,FORMNAME,FORMCOLUMN,FORMCOLUMNTITLE,TABLECOLUMN,TABLENAME,FCTYPE,FCWIDTH,FCHEIGHT,FCDISPLAY,FCEDIT,FCQUERY,FCDEFAULT) VALUES('test','permissionForm','IB_PERMISSION.NODENAME','审批权限流程表.流程节点名','NODENAME','IB_PERMISSION','','','','1','1','2','');
INSERT INTO ib_conf_form_table_colums(PACKAGENAME,FORMNAME,FORMCOLUMN,FORMCOLUMNTITLE,TABLECOLUMN,TABLENAME,FCTYPE,FCWIDTH,FCHEIGHT,FCDISPLAY,FCEDIT,FCQUERY,FCDEFAULT) VALUES('test','permissionForm','IB_PERMISSION.TASKTITLE','审批权限流程表.流程实例标题','TASKTITLE','IB_PERMISSION','','','','1','1','2','');
INSERT INTO ib_conf_form_table_colums(PACKAGENAME,FORMNAME,FORMCOLUMN,FORMCOLUMNTITLE,TABLECOLUMN,TABLENAME,FCTYPE,FCWIDTH,FCHEIGHT,FCDISPLAY,FCEDIT,FCQUERY,FCDEFAULT) VALUES('test','permissionForm','IB_PERMISSION.REMARK','备注','REMARK','IB_PERMISSION','','','','1','1','2','');
INSERT INTO ib_conf_form_table_colums(PACKAGENAME,FORMNAME,FORMCOLUMN,FORMCOLUMNTITLE,TABLECOLUMN,TABLENAME,FCTYPE,FCWIDTH,FCHEIGHT,FCDISPLAY,FCEDIT,FCQUERY,FCDEFAULT) VALUES('test','permissionForm','IB_PERMISSION.DONEFLAG','审批权限流程表.流程结束标记','DONEFLAG','IB_PERMISSION','','','','1','1','2','');
/* ====== 审批权限流程子表 =====  */
INSERT INTO ib_conf_form_table_colums(PACKAGENAME,FORMNAME,FORMCOLUMN,FORMCOLUMNTITLE,TABLECOLUMN,TABLENAME,FCTYPE,FCWIDTH,FCHEIGHT,FCDISPLAY,FCEDIT,FCQUERY,FCDEFAULT) VALUES('test','permissionForm','IB_PERMISSION_S.ID','审批权限流程子表.UUID主键','ID','IB_PERMISSION_S','','','','1','1','2','');
INSERT INTO ib_conf_form_table_colums(PACKAGENAME,FORMNAME,FORMCOLUMN,FORMCOLUMNTITLE,TABLECOLUMN,TABLENAME,FCTYPE,FCWIDTH,FCHEIGHT,FCDISPLAY,FCEDIT,FCQUERY,FCDEFAULT) VALUES('test','permissionForm','IB_PERMISSION_S.PARENTID','审批权限流程子表.主表UUID','PARENTID','IB_PERMISSION_S','','','','1','1','2','');
