# Next Level Week #2

NLW#2 da Rocketseat

PROFFY - Agregador de professores para aulas particulares


## Rodar o projeto

Entrar no diretório

    $> cd backend

Instalar depedencias

    $> yarn install

Executar o migrate das tabelas do banco de dados

    $> yarn knex:migrate

Executar o script start

    $> yarn start
    ou 
    $> yarn run start


## Funcionalidades

### Conexões

- Rota para listar o total de conexões realizadas (Landing Page);
- Rota para criar uma nova conexão;

### Aulas 

- Rota para criar uma aula (Formulario);
- Rota para listar aulas (TeacherList);
    - Filtrar por matérias, dia da semana e horários;
