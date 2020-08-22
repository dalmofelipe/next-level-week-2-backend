# next level week #2

## Iniciando o projeto
    $> yarn init

## Criar arquivo ponto de entrada do app

    $> touch src/server.ts

## Configurando TypeScript

instalar typescript para dev

    $> yarn add typescript -D

criar arquivo de configuração, tsconfig.json

    $> yarn tsc --init

modificar o target do tsconfig.json, para es2017

    {
        ...
        "target": "es2017"
        ...
    }

adicionar a dependencia ts-node-dev, é uma especie de ''nodemon'' para ts

    $> yarn add ts-node-dev -D

## configurar script **start** no package.json

    {
        ...
        "scripts": {
            "start": "tsnd --transpile-only --ignore-watch node_modules --respawn src/server.ts"
        }
        ...
    }

--transpile-only - somente converte o codigo typescript para js, sem verificar erros

--ignore-watch node_modules - não converter codigo terceiros

--respawn - modo watch

## instalar o express e @types/express

    $> yarn add express 

    $> yarn add @types/express -D


## Funcionalidades

### Conexões

- Rota para listar o total de conexões realizadas [Landing Page];
- Rota para criar uma nova conexão;

### Aulas 

- Rota para criar uma aula [Formulario];
- Rota para listar aulas [TeacherList];
    - Filtrar por matérias, dia da semana e horários;

