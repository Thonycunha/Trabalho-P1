# Trabalho-P1

### Instalação do projeto

Clonar o Projeto
```
git clone: git@github.com:Thonycunha/Trabalho-P1.git
cd Trabalho-P1
```
Crie o Arquivo .env
```
cp .env.dist .env
```

Instalar depêndencias
Front-End
```
cd public
npm install
```
Back-End
```
cd ..
cd server
npm install
npx prisma migrate dev primeiraMigrate
cd src
sudo docker compose up
```
Iniciando Back-End - Django
```
cd ..
npm start
```
Iniciando Fron-End - Em outro Projeto
```
cd public
npm start
```
Iniciando Back-End Postgres
``` 
cd server
npm run dev
```

**OBS: Não consegui buildar o Docker para fazer tudo isso - ainda estou tentando fazer caso consiga vou jogar aqui. Pode desconsiderar o ponto do docker mas use-o para facilitar.**

### Perguntas

**Explique a importância e as vantagens de usar Docker no desenvolvimento de aplicações.**
- **R:** É uma ferramenta fundamental no desenvolvimento de aplicações modernas devido à sua capacidade de fornecer isolamento, portabilidade, eficiência e reprodutibilidade, além de simplificar o ciclo de vida de desenvolvimento, implantação e gerenciamento de aplicativos.

**Descreva como o JWT funciona e quais são suas vantagens para autenticação.**
- **R:** O JWT (JSON Web Token) é um formato de token de autenticação que é amplamente utilizado na autenticação e autorização em aplicações web e serviços. Ele é uma maneira de transmitir informações entre partes de forma segura como um objeto JSON. É altamente interoperável, oferecem a capacidade de controlar o tempo de vida dos tokens, como os tokens são autossuficientes, eles podem ser facilmente distribuídos e verificados em ambientes distribuídos e escaláveis, como sistemas de microsserviços. com suporte em várias linguagens de programação e frameworks. Um dos principais benefícios do JWT é sua segurança. Os tokens podem ser assinados digitalmente, o que garante que eles não tenham sido alterados desde sua criação.

**Diferencie bancos de dados relacional e não relacional, dando exemplos de quando usar cada tipo em uma aplicação como a proposta.**
- **R:** Banco de Dados Relacional: É apropriado para aplicações que requerem consistência rígida, como sistemas de login, onde a integridade dos dados é fundamental. 
- Banco de Dados não relacional: Use quando a estrutura dos dados é flexível ou pode evoluir ao longo do tempo. É adequado para aplicações que exigem escalabilidade.
