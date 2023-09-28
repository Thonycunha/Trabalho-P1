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

<b>OBS: Não consegui buildar o Docker para fazer tudo isso - ainda estou tentando fazer caso consiga vou jogar aqui. Pode desconsiderar o ponto do docker mas use-o para facilitar<b> 
