CREATE TABLE kbindexinfo (
id  varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL ,
keywords  text CHARACTER SET utf8 COLLATE utf8_general_ci NULL ,
title  text CHARACTER SET utf8 COLLATE utf8_general_ci NULL ,
descript  text CHARACTER SET utf8 COLLATE utf8_general_ci NULL ,
descriptImg  mediumtext CHARACTER SET utf8 COLLATE utf8_general_ci NULL ,
text  text CHARACTER SET utf8 COLLATE utf8_general_ci NULL ,
url  mediumtext CHARACTER SET utf8 COLLATE utf8_general_ci NULL ,
author  text CHARACTER SET utf8 COLLATE utf8_general_ci NULL ,
createTime  timestamp NULL DEFAULT NULL ,
updateTime  timestamp NULL DEFAULT NULL ,
weight  int(11) NULL DEFAULT NULL ,
tag  mediumtext CHARACTER SET utf8 COLLATE utf8_general_ci NULL ,
content  mediumtext CHARACTER SET utf8 COLLATE utf8_general_ci NULL ,
category  mediumtext CHARACTER SET utf8 COLLATE utf8_general_ci NULL ,
grade  mediumtext CHARACTER SET utf8 COLLATE utf8_general_ci NULL ,
domain  mediumtext CHARACTER SET utf8 COLLATE utf8_general_ci NULL ,
product  varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL ,
subproduct  varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL ,
subproductcategory  varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL ,
s_top  int(11) NULL DEFAULT 0 ,
s_kbsrc  int(11) NULL DEFAULT 0 ,
s_kbcategory  int(11) NULL DEFAULT 0 ,
s_hot  int(11) NULL DEFAULT 0 ,
ext_scope  varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL ,
extend0  varchar(500) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL ,
extend1  varchar(500) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL ,
extend2  varchar(500) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL ,
extend3  varchar(500) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL ,
extend4  varchar(500) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL ,
extend5  varchar(500) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL ,
extend6  varchar(500) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL ,
extend7  varchar(500) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL ,
extend8  varchar(500) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL ,
extend9  varchar(500) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL ,
extend10  varchar(500) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL ,
extend11  varchar(500) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL ,
extend12  varchar(500) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL ,
extend13  varchar(500) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL ,
extend14  varchar(500) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL ,
extend15  varchar(500) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL ,
extend16  varchar(500) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL ,
extend17  varchar(500) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL ,
extend18  varchar(500) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL ,
extend19  varchar(500) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL ,
PRIMARY KEY (id)
);


CREATE TABLE kb (
id  varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL ,
name  varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL ,
descript  varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL ,
createTime  timestamp NULL DEFAULT NULL ,
updateTime  timestamp NULL DEFAULT NULL ,
createBy  varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL ,
updateBy  varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL ,
PRIMARY KEY (id)
);


CREATE TABLE qa (
id  varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL ,
libraryPk  varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL ,
question  text CHARACTER SET utf8 COLLATE utf8_general_ci NULL ,
answer  text CHARACTER SET utf8 COLLATE utf8_general_ci NULL ,
qtype  varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL ,
createTime  timestamp NULL DEFAULT NULL ,
updateTime  timestamp NULL DEFAULT NULL ,
createBy  varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL ,
updateBy  varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL ,
istop  varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT '0' ,
settoptime  timestamp NULL DEFAULT NULL ,
kbid  varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL ,
url  text CHARACTER SET utf8 COLLATE utf8_general_ci NULL ,
ext_scope  varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL ,
domain  mediumtext CHARACTER SET utf8 COLLATE utf8_general_ci NULL ,
product  varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL ,
subproduct  varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL ,
subproductcategory  varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL ,
ktype  varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT 'qa' ,
extend0  varchar(500) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL ,
extend1  varchar(500) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL ,
extend2  varchar(500) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL ,
extend3  varchar(500) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL ,
extend4  varchar(500) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL ,
extend5  varchar(500) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL ,
extend6  varchar(500) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL ,
extend7  varchar(500) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL ,
extend8  varchar(500) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL ,
extend9  varchar(500) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL ,
extend10  varchar(500) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL ,
extend11  varchar(500) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL ,
extend12  varchar(500) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL ,
extend13  varchar(500) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL ,
extend14  varchar(500) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL ,
extend15  varchar(500) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL ,
extend16  varchar(500) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL ,
extend17  varchar(500) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL ,
extend18  varchar(500) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL ,
extend19  varchar(500) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL ,
PRIMARY KEY (id)
);


CREATE TABLE qa_collection (
id  varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL ,
tenantid  varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL ,
userid  varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL ,
kbindexid  varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL ,
title  text CHARACTER SET utf8 COLLATE utf8_general_ci NULL ,
descript  text CHARACTER SET utf8 COLLATE utf8_general_ci NULL ,
url  varchar(500) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL ,
qid  varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL ,
qsid  varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL ,
question  text CHARACTER SET utf8 COLLATE utf8_general_ci NULL ,
answer  text CHARACTER SET utf8 COLLATE utf8_general_ci NULL ,
createTime  timestamp NULL DEFAULT NULL ,
updateTime  timestamp NULL DEFAULT NULL ,
createBy  varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL ,
updateBy  varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL ,
PRIMARY KEY (id)
);

CREATE TABLE qa_similar (
id  varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL ,
question  text CHARACTER SET utf8 COLLATE utf8_general_ci NULL ,
qid  varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL ,
createTime  timestamp NULL DEFAULT NULL ,
updateTime  timestamp NULL DEFAULT NULL ,
createBy  varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL ,
updateBy  varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL ,
PRIMARY KEY (id)
);


CREATE TABLE qa_tj (
id  varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL ,
qid  varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL ,
question  text CHARACTER SET utf8 COLLATE utf8_general_ci NULL ,
answer  text CHARACTER SET utf8 COLLATE utf8_general_ci NULL ,
score  int(11) NULL DEFAULT NULL ,
tid  varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL ,
userid  varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL ,
createTime  timestamp NULL DEFAULT NULL ,
updateTime  timestamp NULL DEFAULT NULL ,
createBy  varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL ,
updateBy  varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL ,
PRIMARY KEY (id)
);

CREATE TABLE tablefield_definition (
id  varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL ,
table_name  varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL ,
field_name  varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL ,
out_field_name varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL ,
field_desc  varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL ,
createTime  timestamp NULL DEFAULT NULL ,
updateTime  timestamp NULL DEFAULT NULL ,
createBy  varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL ,
updateBy  varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL ,
PRIMARY KEY (id)
);


