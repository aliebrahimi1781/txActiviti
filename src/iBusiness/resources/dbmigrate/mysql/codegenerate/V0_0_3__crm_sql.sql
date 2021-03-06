/* ======================== 业务模块组件管理表 ====================  */
/* ========================= 客户管理表 ========================  */
DROP TABLE IF EXISTS IB_CUSTOMER_INFO;
CREATE TABLE IB_CUSTOMER_INFO (
  ID                              varchar(64) NOT NULL,
  CUSTOMERNO         varchar(64),
  CUSTOMERSTATE   varchar(16),
  CUSTOMERNAME   varchar(64),
  CUSTOMERTYPE     varchar(32),
  CUSTOMERADDRESS varchar(512),
  PHONE                     varchar(32),
  TELEPHONE            varchar(32),
  SALESMANAGER     varchar(32),
  SYSTEMSALES          varchar(32),
  INFOSOURCE               varchar(16),
  RELATIONSHIPSTATUS varchar(16),
  PROVINCE                    varchar(16),
  CITY                              varchar(16),
  CUSTOMERNATURE    varchar(16),
  SUPERVISEUNIT varchar(64),
  PLANINFO varchar(512),
  CUSTOMERDEMAND varchar(256),
  COOPERATIONINFO varchar(2),
  INVOICENAME varchar(64),
  BANK varchar(64),
  ACCOUNTNO varchar(32),
  TAXID varchar(32),
  INVOICEUSER varchar(32),
  INVOICEUSERTEL varchar(16),
  INVOICEMAILUNITNAME varchar(64),
  MAILADDRESS varchar(128),
  INVOICZIP varchar(10),
  INVOICADDRESSEE varchar(64),
  INVOICPHONETEL varchar(16),
  CUSTOMERUSER varchar(32),
  USERPOSITION varchar(32),
  USERTELEPHONE varchar(32),
  USERPHONE varchar(32),
  USEREMAIL                    varchar(32),
  USEROFFICEADDRESS varchar(64),
  USERZIP                        varchar(10),
  PRIMARY KEY (ID)
) ENGINE=INNODB;
/* ===================== 原材料供应商维护表 ========================  */
DROP TABLE IF EXISTS IB_SUPPLIER;
CREATE TABLE IB_SUPPLIER (INFORMATION VARCHAR(32), SUPPLIERNUMBER VARCHAR(32), CATEGORY VARCHAR(8), UNITNAME VARCHAR(128), USERADDRESS VARCHAR(128), UNITCHARACTER VARCHAR(16), REGISTERED VARCHAR(16), ENROLLTIME VARCHAR(16), URL VARCHAR(32), COMPANYPHONE VARCHAR(16), COMPANYFAX VARCHAR(16), PRODUCT VARCHAR(32), USERPERSON VARCHAR(16), USERPHONE VARCHAR(16), USERMOBILEPHONE VARCHAR(16), USERFAX VARCHAR(16), BUSINESSCONTACTS VARCHAR(16), CONTACTTELEPHONE VARCHAR(16), CONTACTMOBILEPHONE VARCHAR(16), CONTACTFAX VARCHAR(16), FINANCIALCONTACTS VARCHAR(16), FINANCIALCALL VARCHAR(16), FINANCIALPHONE VARCHAR(16), FINANCIALFAX VARCHAR(16), REMITTANCENAME VARCHAR(128), BENEFICIARY VARCHAR(128), TAXNO VARCHAR(32), ACCOUNTNO VARCHAR(32), YOURCOMPANY VARCHAR(128), YOURADDRESS VARCHAR(128), YOURNAME VARCHAR(32), YOURPHONE VARCHAR(16), TELEPHONE VARCHAR(16), ESTINATIONCITY VARCHAR(128), UPDATAS VARCHAR(256), ID VARCHAR(64),  PRIMARY KEY (ID)) ENGINE=INNODB;

