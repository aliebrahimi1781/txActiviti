/*===============  IB_COMPANY 公司表  =============================*/
INSERT INTO IB_COMPANY(ID,NAME,STATUS,SCOPE_ID) VALUES(1,'天翔软件有限公司',1,'1');
/*===============  IB_DEPARTMENT 部门表  =============================*/
INSERT INTO IB_DEPARTMENT(ID,NAME,COMPANYID,STATUS,SCOPE_ID) VALUES(1,'市场部',1,1,'1');
INSERT INTO IB_DEPARTMENT(ID,NAME,COMPANYID,STATUS,SCOPE_ID) VALUES(2,'财务部',1,1,'1');
INSERT INTO IB_DEPARTMENT(ID,NAME,COMPANYID,STATUS,SCOPE_ID) VALUES(3,'人事部',1,1,'1');
INSERT INTO IB_DEPARTMENT(ID,NAME,COMPANYID,STATUS,SCOPE_ID) VALUES(4,'研发部',1,1,'1');
/*===============  IB_GROUP 小组表  =============================*/
INSERT INTO IB_GROUP(ID,NAME,COMPANYID,DEPTID,STATUS,SCOPE_ID) VALUES(1,'平台组',1,1,1,'1');
INSERT INTO IB_GROUP(ID,NAME,COMPANYID,DEPTID,STATUS,SCOPE_ID) VALUES(2,'OA组',1,2,1,'1');
/*===============  IB_JOB_TYPE 职务类型表  =============================*/
INSERT INTO IB_JOB_TYPE(ID,NAME,SCOPE_ID) VALUES(1,'决策管理类','1');
INSERT INTO IB_JOB_TYPE(ID,NAME,SCOPE_ID) VALUES(2,'技术类','2');
/*===============  IB_JOB_TITLE 职位名称管理表  =============================*/
INSERT INTO IB_JOB_TITLE(ID,NAME,SCOPE_ID) VALUES(1,'总经理','1');
INSERT INTO IB_JOB_TITLE(ID,NAME,SCOPE_ID) VALUES(2,'部门经理','1');
/*===============  IB_JOB_INFO  职务管理表  =============================*/
INSERT INTO IB_JOB_INFO(ID,TYPE_ID,TITLE_ID,SCOPE_ID) VALUES(1,1,1,'1');
INSERT INTO IB_JOB_INFO(ID,TYPE_ID,TITLE_ID,SCOPE_ID) VALUES(2,2,2,'1');

/*===============  IB_MENU 菜单管理表  =============================*/
INSERT INTO IB_MENU(ID,MENUNAME,MENULEVEL,MENUURL,MENUIFRAME,MENUORDER,PARENTID) VALUES('0','根','0','#','URL','0','0');
INSERT INTO IB_MENU(ID,MENUNAME,MENULEVEL,MENUURL,MENUIFRAME,MENUORDER,PARENTID) VALUES('1','首页','1','/portal/portal.do','URL','1','0');
INSERT INTO IB_MENU(ID,MENUNAME,MENULEVEL,MENUURL,MENUIFRAME,MENUORDER,PARENTID) VALUES('2','系统管理','1','#','URL','2','0');
INSERT INTO IB_MENU(ID,MENUNAME,MENULEVEL,MENUURL,MENUIFRAME,MENUORDER,PARENTID) VALUES('3','后台管理','1','#','URL','3','0');

INSERT INTO IB_MENU(ID,MENUNAME,MENULEVEL,MENUURL,MENUIFRAME,MENUORDER,PARENTID) VALUES('21','组织管理','2','#','URL','21','2');
INSERT INTO IB_MENU(ID,MENUNAME,MENULEVEL,MENUURL,MENUIFRAME,MENUORDER,PARENTID) VALUES('22','职务管理','2','#','URL','22','2');
INSERT INTO IB_MENU(ID,MENUNAME,MENULEVEL,MENUURL,MENUIFRAME,MENUORDER,PARENTID) VALUES('23','权限角色','2','#','URL','23','2');
INSERT INTO IB_MENU(ID,MENUNAME,MENULEVEL,MENUURL,MENUIFRAME,MENUORDER,PARENTID) VALUES('24','用户管理','2','/user/user-base-list.do','URL','24','2');
INSERT INTO IB_MENU(ID,MENUNAME,MENULEVEL,MENUURL,MENUIFRAME,MENUORDER,PARENTID) VALUES('25','菜单管理','2','/menu/menu-levelone-list.do','URL','25','2');

INSERT INTO IB_MENU(ID,MENUNAME,MENULEVEL,MENUURL,MENUIFRAME,MENUORDER,PARENTID) VALUES('211','公司管理','3','/group/org-company-list.do','URL','211','21');
INSERT INTO IB_MENU(ID,MENUNAME,MENULEVEL,MENUURL,MENUIFRAME,MENUORDER,PARENTID) VALUES('212','部门管理','3','/group/org-department-list.do','URL','212','21');
INSERT INTO IB_MENU(ID,MENUNAME,MENULEVEL,MENUURL,MENUIFRAME,MENUORDER,PARENTID) VALUES('213','小组管理','3','/group/org-group-list.do','URL','213','21');
INSERT INTO IB_MENU(ID,MENUNAME,MENULEVEL,MENUURL,MENUIFRAME,MENUORDER,PARENTID) VALUES('221','职务类型管理','3','/group/job-type-list.do','URL','221','22');
INSERT INTO IB_MENU(ID,MENUNAME,MENULEVEL,MENUURL,MENUIFRAME,MENUORDER,PARENTID) VALUES('222','职务名称管理','3','/group/job-title-list.do','URL','222','22');
INSERT INTO IB_MENU(ID,MENUNAME,MENULEVEL,MENUURL,MENUIFRAME,MENUORDER,PARENTID) VALUES('223','职务管理','3','/group/job-info-list.do','URL','223','22');
INSERT INTO IB_MENU(ID,MENUNAME,MENULEVEL,MENUURL,MENUIFRAME,MENUORDER,PARENTID) VALUES('231','标签授权分类','3','/auth/perm-type-list.do','URL','231','23');
INSERT INTO IB_MENU(ID,MENUNAME,MENULEVEL,MENUURL,MENUIFRAME,MENUORDER,PARENTID) VALUES('232','标签授权管理','3','/auth/perm-list.do','URL','232','23');
INSERT INTO IB_MENU(ID,MENUNAME,MENULEVEL,MENUURL,MENUIFRAME,MENUORDER,PARENTID) VALUES('233','菜单权限管理','3','/auth/access-list.do','URL','233','23');
INSERT INTO IB_MENU(ID,MENUNAME,MENULEVEL,MENUURL,MENUIFRAME,MENUORDER,PARENTID) VALUES('234','角色模板','3','/auth/role-def-list.do','URL','234','23');


