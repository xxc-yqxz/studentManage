### 说明

1.项目的请求路径为localhost

2.以/unlogin开头的请求路径，不需要访问权限

3.以/logining开头的请求路径，需要在请求头中携带Authorization身份认证字段，才能正常访问成功



### 登录

#### 1.登录

请求URL：

- /unlogin/login

请求方式：

- POST

请求体：

| 参数名   | 必选 | 类型   | 说明 |
| -------- | ---- | ------ | ---- |
| stuId    | 是   | string | 学号 |
| password | 是   | string | 密码 |

返回实例：

```html
{
"status":0,
"message":"登录成功!"
"token":"Bear ejrpoangeanfaoiOIHJKJKHjopnaonhefoqpwjfl..."
}
```

返回参数说明：

| 参数名  | 类型   | 说明                           |
| ------- | ------ | ------------------------------ |
| status  | int    | 请求是否成功，0：成功，1：失败 |
| message | string | 请求结果的描述信息             |
| token   | string | 用于有权限接口的身份认证       |



### 用户操作

#### 获取登录用户的基本信息

请求URL：

- logining/stuinfo

请求方式：

- GET

Header:

```html
Authorization:Bearer
ejrpoangeanfaoiOIHJKJKHjopnaonhefoqpwjfl...
```

参数：

- 无

返回实例：

```html
{
"status":0,
"message":"获取用户基本信息成功"，
"data":{
”id“:1,
"username":"薛昕铖",
"roles":"管理员",
"stuId":"1808190146",
"birthday":"2020-09-17",
"sex":"男"，
"native":"福建省福州市平潭县",
"major":"专业",
"class":"班级",
"address":"福建省福州市平潭县盛东庄136号",
"phone":"18559980000"
}
}
```

返回参数说明：

| 参数名    | 类型   | 说明                           |
| --------- | ------ | ------------------------------ |
| status    | int    | 请求是否失败，0：成功，1：失败 |
| message   | string | 请求结果的描述信息             |
| +id       | int    | 用户的id                       |
| +username | string | 用户的姓名                     |
| +roles    | string | 用户的角色(老师、学生、管理员) |
| +stuId    | string | 学生的学号                     |
| +birthday | string | 学生的出生日期                 |
| +sex      | string | 学生的性别                     |
| +native   | string | 学生的籍贯                     |
| +major    | string | 学生的专业                     |
| +class    | string | 学生的班级                     |
| +address  | string | 学生的家庭地址                 |
| +phone    | string | 学生的电话                     |

#### 修改学生的基本信息

请求URL：

/logining/modifyStuIfo

请求方式：

- POST

Header:

```html
Authorization:Bearer
ejrpoangeanfaoiOIHJKJKHjopnaonhefoqpwjfl...
```

参数：

| 参数名   | 必选 | 类型   | 说明           |
| -------- | ---- | ------ | -------------- |
| id       | 是   | number | 用户id         |
| username | 是   | string | 用户的姓名     |
| stuId    | 是   | string | 学生的学号     |
| roles    | 是   | string | 用户的角色     |
| birthday | 是   | string | 学生的出生日期 |
| sex      | 是   | string | 学生的性别     |
| native   | 是   | string | 学生的籍贯     |
| major    | 是   | string | 学生的专业     |
| class    | 是   | string | 学生的班级     |
| address  | 是   | string | 学生的家庭地址 |
| phone    | 是   | string | 学生的电话     |

返回实例

```html
{
"status":0,
"message":"修改用户信息成功！"
}
```

返回参数说明

| 参数名  | 类型   | 说明                           |
| ------- | ------ | ------------------------------ |
| status  | int    | 请求是否成功，0：成功；1：失败 |
| message | string | 请求结果的描述信息             |



#### 删除用户的基本信息

请求URL:

/logining/delStuInfo/:id

请求方式：

- GET

Header:

```html
Authorization:Bearer
ejrpoangeanfaoiOIHJKJKHjopnaonhefoqpwjfl...
```

URL参数：

| 参数名 | 必选 | 类型   | 说明                                   |
| ------ | ---- | ------ | -------------------------------------- |
| id     | 是   | string | 要删除的用户的id,可以通过req.param获取 |

返回实例：

```html
{
"status":0,
"message":"删除成功!"
}
```

返回参数说明

| 参数名  | 类型   | 说明                           |
| ------- | ------ | ------------------------------ |
| status  | int    | 请求是否成功，0：成功；1：失败 |
| message | string | 请求结果的描述信息             |





#### 增加用户的基本信息

请求URL：

/logining/addUserInfo

请求方式：

- POST

Header:

```html
Authorization:Bearer
ejrpoangeanfaoiOIHJKJKHjopnaonhefoqpwjfl...
```

URL参数：

| 参数名   | 必选 | 类型   | 说明       |
| -------- | ---- | ------ | ---------- |
| id       | 是   | number | 用户id     |
| username | 是   | string | 用户的姓名 |
| stuId    | 是   | string | 学生的学号 |
| roles    | 是   | string | 用户的角色 |

#### 修改密码

请求URL：

/logining/modifyPwd

请求方式：

POST

Header:

```html
Authorization:Bearer
ejrpoangeanfaoiOIHJKJKHjopnaonhefoqpwjfl...
```

URL参数：

| 参数名 | 必选 | 类型   | 说明   |
| ------ | ---- | ------ | ------ |
| oldPwd | 是   | string | 旧密码 |
| newPwd | 是   | string | 新密码 |

返回实例：

```html
{
"status":0,
"message":"修改成功!"
}
```

返回参数说明

| 参数名  | 类型   | 说明                           |
| ------- | ------ | ------------------------------ |
| status  | int    | 请求是否成功，0：成功；1：失败 |
| message | string | 请求结果的描述信息             |





### 成绩操作

#### 显示所有成绩

请求URL

logining/getScore

请求方式：

GET

Header:

```html	
Authorization:Bearer
ejrpoangeanfaoiOIHJKJKHjopnaonhefoqpwjfl...
```

URL参数：

无

返回示例：

```html
{
"status":0,
"message":"获取成绩信息成功！"。
"data":[
{
"id":1,
"stuId":"1808190146",
"className":"高等数学",
"score":97
}
{
"id":2,
"stuId":"1808190146",
"className":"离散数学",
"score":95
}
{
"id":3,
"stuId":"1808190145",
"className":"java",
"score":0
}
]
}
```

返回参数说明：



| 参数名     | 类型   | 说明                           |
| ---------- | ------ | ------------------------------ |
| status     | int    | 请求是否成功，0：成功；1：失败 |
| message    | string | 请求结果的描述信息             |
| data       | array  | 成绩的数组                     |
| +id        | int    | 成绩id                         |
| +stuId     | string | 学生的id                       |
| +className | string | 学科的名字                     |
|            | int    | 成绩                           |





#### 根据学号查询单个学生成绩信息

请求URL：

logining/getScoreByStuId/:stuId

请求方式：

GET

Header:

```html
Authorization:Bearer
ejrpoangeanfaoiOIHJKJKHjopnaonhefoqpwjfl...
```

URL参数：

| 参数名 | 必选 | 类型   | 说明       |
| ------ | ---- | ------ | ---------- |
| stuId  | 是   | string | 学生的学号 |

返回示例：

```html
{
"status":0,
"message":"获取成绩信息成功！"。
"data":[
{
"id":1,
"stuId":"1808190146",
"className":"高等数学",
"score":97
}
{
"id":2,
"stuId":"1808190146",
"className":"离散数学",
"score":95
}
]
}
```

返回参数说明：



| 参数名     | 类型   | 说明                           |
| ---------- | ------ | ------------------------------ |
| status     | int    | 请求是否成功，0：成功；1：失败 |
| message    | string | 请求结果的描述信息             |
| data       | array  | 成绩的数组                     |
| +id        | int    | 成绩id                         |
| +stuId     | string | 学生的id                       |
| +className | string | 学科的名字                     |
| +score     | int    | 成绩                           |







#### 根据学科名查询单科的所有成绩

请求URL：

logining/getScoreByClassName/:className

请求方式：

GET

Header:

```html
Authorization:Bearer
ejrpoangeanfaoiOIHJKJKHjopnaonhefoqpwjfl...
```

URL参数：

| 参数名    | 必选 | 类型   | 说明     |
| --------- | ---- | ------ | -------- |
| className | 是   | string | 学科名称 |

返回示例：

```html
{
"status":0,
"message":"获取成绩信息成功！"。
"data":[
{
"id":1,
"stuId":"1808190146",
"className":"高等数学",
"score":97
}
{
"id":4,
"stuId":"1808190145",
"className":"高等数学",
"score":95
}
]
}
```

返回参数说明：



| 参数名     | 类型   | 说明                           |
| ---------- | ------ | ------------------------------ |
| status     | int    | 请求是否成功，0：成功；1：失败 |
| message    | string | 请求结果的描述信息             |
| data       | array  | 成绩的数组                     |
| +id        | int    | 成绩id                         |
| +stuId     | string | 学生的id                       |
| +className | string | 学科的名字                     |
| +score     | int    | 成绩                           |





#### 增加学科名

请求URL:

logining/addClassName

请求方式：

POST

Header:

```html
Authorization:Bearer
ejrpoangeanfaoiOIHJKJKHjopnaonhefoqpwjfl...
```

URL参数：

| 参数名    | 必选 | 类型   | 说明     |
| --------- | ---- | ------ | -------- |
| className | 是   | string | 学科名称 |

返回实例：

```html
{
"status":0,
"message":"增加成功!"
}
```

返回参数说明

| 参数名  | 类型   | 说明                           |
| ------- | ------ | ------------------------------ |
| status  | int    | 请求是否成功，0：成功；1：失败 |
| message | string | 请求结果的描述信息             |



#### 增加成绩

请求URL：

logining/addScore

请求方式：

POST

Header:

```html
Authorization:Bearer
ejrpoangeanfaoiOIHJKJKHjopnaonhefoqpwjfl...
```

URL参数：

| 参数名    | 必选 | 类型   | 说明     |
| --------- | ---- | ------ | -------- |
| stuId     | 是   | string | 学生id   |
| ClassName | 是   | string | 学科名称 |
| score     | 是   | string | 成绩分数 |

返回实例：

```html
{
"status":0,
"message":"增加成功!"
}
```

返回参数说明

| 参数名  | 类型   | 说明                           |
| ------- | ------ | ------------------------------ |
| status  | int    | 请求是否成功，0：成功；1：失败 |
| message | string | 请求结果的描述信息             |



#### 修改成绩

请求URL：

logining/modifyScore

请求方式：

POST

Header:

```html
Authorization:Bearer
ejrpoangeanfaoiOIHJKJKHjopnaonhefoqpwjfl...
```

URL参数：

| 参数名    | 必选 | 类型   | 说明     |
| --------- | ---- | ------ | -------- |
| id        | 是   | int    | 成绩id   |
| stuId     | 是   | string | 学生id   |
| ClassName | 是   | string | 学科名称 |
| score     | 是   | string | 成绩分数 |

返回实例：

```html
{
"status":0,
"message":"修改成功!"
}
```

返回参数说明

| 参数名  | 类型   | 说明                           |
| ------- | ------ | ------------------------------ |
| status  | int    | 请求是否成功，0：成功；1：失败 |
| message | string | 请求结果的描述信息             |



#### 删除成绩

请求URL：

logining/delScore:id

请求方式：

GET

Header:

```html
Authorization:Bearer
ejrpoangeanfaoiOIHJKJKHjopnaonhefoqpwjfl...
```

URL参数：

| 参数名 | 必选 | 类型 | 说明   |
| ------ | ---- | ---- | ------ |
| id     | 是   | int  | 成绩id |

返回实例：

```html
{
"status":0,
"message":"删除成功!"
}
```

返回参数说明

| 参数名  | 类型   | 说明                           |
| ------- | ------ | ------------------------------ |
| status  | int    | 请求是否成功，0：成功；1：失败 |
| message | string | 请求结果的描述信息             |

