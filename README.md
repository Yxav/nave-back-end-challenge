# Desafio de Back-end - NAVE

Solução do desafio proposto pela Nave, para a vaga de desenvolvedor Back-end NodeJS.
API construída com Node.JS, PostgreSQL, Express e Knex.

## Conteúdo





# Antes de começar
## Instalação

1.Instale o Node, na versão LTS;
2.Instale o banco de dados PostgreSQL;
3.Instale as dependências usando o yarn ou npm:  `npm install` ou ` yarn`;


## Antes de rodar:
1. Será necessário criar um banco de dados, com os comandos abaixo:
- CREATE USER admin WITH PASSWORD admin
- CREATE DATABASE navedex
- GRANT ALL PRIVILEGES ON DATABASE navedex to admin

2. Execute o código de migrações: `npm run migrate_db`
3. Execute o código para rodar o projeto: `npm start`


## Insomnia
[![Run in Insomnia}](https://insomnia.rest/images/run.svg)](https://insomnia.rest/run/?label=back-end-challenge-nave&uri=olinkvaiaqui)

# Funcionalidades

## Usuário/Administrador

### Signup

* **URL**
   /api/register

* **Method**
POST

* **Data**

```json
{
"email":"teste@email.com",
"password":"123teste",
"confirm_password":"123teste"
}
```


#### Success Response

```json
{
  "message": "Successful register"
}
```
 #### Failed Response
Se existir um usuário registrado:

```json
{
  "message": "This email is already registered"
}
```

Se o email informado for inválido:

```json 
[
  {
    "message": "This value must be a valid email"
  }
]
```

### Login

* **URL**
   /api/login

* **Method**
POST

* **Data**

```json
{
"email":"teste@email.com",
"password":"123teste",
}
```

#### Success Response

```json
{
  "token": token
}
```
 #### Failed Response
Se o usuário não existir:

```json
{
  "message": "User doesn't exists"
}
```

Se a senha informada estiver incorreta:

```json
  {
  "message": "Invalid password"
  }
  ```

## Navers

### Create

**Necessário token**

* **URL**
   /api/admin/naver/register

* **Method**
POST

* **Data**

```json
{
	"name": "Fulano",
	"birth_date": "2000-05-10",
	"admission_date": "2020-08-20",
	"job_role": "Developer",
	"projects": [1]
}
```


#### Success Response

```json
{
    "name": "Fulano",
	"birth_date": "2000-05-10",
	"admission_date": "2020-08-20",
	"job_role": "Developer",
	"projects": [1]
}
```
 #### Failed Response
Se os dados informados são inválidos:

```json
[
  {
    "message": "This value must be a string"
  },
  {
    "message": "This value must be a valid date"
  }
]
```


### Index
**Necessário token**

* **URL**
   /api/admin/naver

* **Method**
GET



#### Success Response

```json
[
    {
	"name": "Fulano",
	"birth_date": "2000-05-10",
	"admission_date": "2020-08-20",
	"job_role": "Developer",
	"projects": [1]
    }
]
```
 #### Failed Response
Se o token for inválido:

```json
{
  "message": "Invalid token"
}
```

### Show
**Necessário token**

* **URL**
   /api/admin/naver:id

* **Query search**
?name
?admission_date
?job_role

* **Method**
GET


#### Success Response

```json
{
	"name": "Fulano",
	"birth_date": "2000-05-10",
	"admission_date": "2020-08-20",
	"job_role": "Developer",
	"projects": [1]
}
```
 #### Failed Response

```json
{
  "message": "Internal error",
  "error": {}
}
```

### Update
**Necessário token**

* **URL**
   /api/admin/naver:id


* **Method**
POST


#### Success Response

```json
{
  "name": "Fulano",
	"birth_date": "2000-05-10",
	"admission_date": "2020-08-20",
	"job_role": "Developer",
	"projects": [
    {
      "id": 1,
      "name": "Projeto Legal"
    }
  ]
}
```
 #### Failed Response

Se os dados informados são inválidos:

```json
[
  {
    "message": "This value must be a string"
  },
  {
    "message": "This value must be a valid date"
  }
]
```

### Delete
**Necessário token**

* **URL**
   /api/admin/naver:id


* **Method**
POST


#### Success Response

```json
{
  "message": "Deleted"
}
```
 #### Failed Response

```json
{
  "message": "Internal error",
  "error": {}
}
```







## Projects

### Create

**Necessário token**

* **URL**
   /api/admin/projects/register

* **Method**
POST

* **Data**

```json
{
	"name":"Projeto Legal",
	"navers": [1]
}
```


#### Success Response

```json
{
	"name":"Projeto Legal",
	"navers": [1]
}
```
 #### Failed Response
Se os dados informados são inválidos:

```json
[
  {
    "message": "This value must be a string"
  },
]
```


### Index
**Necessário token**

* **URL**
   /api/admin/projects

* **Method**
GET


#### Success Response

```json
[
    {
    "id": 10,
	"name":"Projeto Legal",
    }
]
```
 #### Failed Response
Se o token for inválido:

```json
{
  "message": "Invalid token"
}
```

### Show
**Necessário token**

* **URL**
  /api/admin/projects:id

* **Query search**
?name

* **Method**
GET


#### Success Response

```json
{
  "id": 1,
  "name": "Projeto Legal",
  "navers": [
        {
	"name": "Fulano",
	"birth_date": "2000-05-10",
	"admission_date": "2020-08-20",
	"job_role": "Developer",
        }
  ]
}
```
 #### Failed Response

```json
{
  "message": "Internal error",
  "error": {}
}
```

### Update
**Necessário token**

* **URL**
  /api/admin/projects:id


* **Method**
POST

 * **Data**
```json
{
	"name":"Projeto Legal",
	"navers": [2]
}
```

#### Success Response

```json
{
	"name":"Projeto Legal",
	"navers": [2]
}
```
 #### Failed Response

Se os dados informados são inválidos:

```json
[
  {
    "message": "This value must be a string"
  }
]
```

### Delete
**Necessário token**

* **URL**
    /api/admin/projects/:id


* **Method**
POST


#### Success Response

```json
{
  "message": "Deleted"
}
```
 #### Failed Response

```json
{
  "message": "Internal error",
  "error": {}
}
```