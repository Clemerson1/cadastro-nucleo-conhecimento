# SOCC-UFG - Sistema de Organização de Núcleos de Conhecimento

Este projeto é uma aplicação Java baseada em **Spring Boot** para gerenciamento de Núcleos de Conhecimento.  
Utiliza **PostgreSQL** como banco de dados e foi configurado para execução via terminal com Maven.

---

## ✅ Pré-requisitos

Antes de rodar o projeto, verifique se os seguintes requisitos estão instalados na sua máquina:

- [Java 17+](https://adoptium.net/)
- [Maven 3.8+](https://maven.apache.org/)
- [PostgreSQL](https://www.postgresql.org/)
- [Git (opcional)](https://git-scm.com/)

---

## ⚙️ Configuração do Banco de Dados

### Setup docker postgres localmente
1. Faça pull da imagem docker

```docker pull postgres```

2. Inicie um container

```docker run -p 5432:5432 -e POSTGRES_PASSWORD=3620 postgres```

# sql
1. Crie um banco no PostgreSQL com o nome nucleos_conhecimento

```CREATE DATABASE nucleos_conhecimento;```

2. Conecte ao servidor postgres via docker exec
```docker exec -it local-postgres psql -U pgsql -d postgres```
   - Para listar bancos, digite ```\l```
   - Para conectar no banco, digite ```\c nucleos_conhecimento```
---

No arquivo ```src/main/resources/application.properties```, ajuste as configurações conforme seu ambiente:

```
spring.application.name=socc-ufg
spring.datasource.url=jdbc:postgresql://localhost:5432/nucleos_conhecimento
spring.datasource.username=pgsql
spring.datasource.password=3620

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true

server.port=8081
```

# Como executar o projeto

## 1. Compilar e instalar dependências
mvn clean install

## 2. Rodar o projeto Spring Boot
###### _Rodar a aplicação sem teste_

`mvn spring-boot:run -DskipTests`

# Endpoints disponíveis
A API REST oferece os seguintes endpoints:
  
  POST /nucleos – Criar um novo núcleo
  
  PUT /nucleos/{id} – Editar um núcleo existente
  
Os dados são trocados em formato JSON.


