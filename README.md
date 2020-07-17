## Etapa de configuração

### `Start`

Para inicialização do projeto, basta executar o comando:
```bash
yarn
```

Após a instalação dos pacotes, execute:
```bash
yarn start
```

Se não possui o yarn configurado na máquina ou após os comandos a cima ainda não foi possível executar o projeto, será necessário a fazer a instalação com node utilizando `npm install`.

```bash
npm i
```
depois:
```bash
npm run start
```

### `Mock`

Para servir os dados mockados é necessário a instalação global do json-server na sua máquina. Execute o seguinte comando:<br />
```bash
npm install -g json-server
```

Após isso, dentro do diretório do projeto basta executar o comando:

```bash
json-server --watch db.json --port 3001
```
Os dados estaram servidos em [http://localhost:3001/list](http://localhost:3001/list)
