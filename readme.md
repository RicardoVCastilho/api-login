# 🌟 API de Autenticação e CRUD de Usuários

Bem-vindo à **API de Autenticação e CRUD de Usuários**! Esta API permite que você registre usuários, faça login, e realize operações de CRUD (Criar, Ler, Atualizar, Deletar) em usuários com segurança usando **JWT** para autenticação.

## 📜 Funcionalidades

- **Cadastro de Usuários**
- **Login de Usuários**
- **Visualizar todos os usuários**
- **Obter dados de um usuário**
- **Atualizar dados de um usuário**
- **Deletar um usuário**

## 🛠 Tecnologias Utilizadas

- **Node.js**: Ambiente de execução JavaScript.
- **Express.js**: Framework para criação de APIs.
- **MongoDB**: Banco de dados NoSQL.
- **Mongoose**: ODM (Object Data Modeling) para MongoDB.
- **JWT (JSON Web Token)**: Autenticação e segurança.
- **Bcrypt.js**: Criptografia de senhas.

---

## ⚙️ Como Rodar o Projeto

### 🚀 Passos para Inicializar

1. **Clone o repositório**:

   ```bash
   git clone https://github.com/SEU_USUARIO/SEU_REPOSITORIO.git

2. **Navegue até a pasta do projeto**
   ```bash
    cd api-login
3. **Instale as dependências**
   ```bash
    npm install
4. **Crie um arquivo .env na raiz do projeto com as seguintes variáveis**
   ```bash
    DB_USER=seu_usuario_do_mongodb
    DB_PASS=sua_senha_do_mongodb
    JWT_SECRET=sua_chave_secreta_jwt
5. **Inicie o servidor**
   ```bash
    npm start
A API estará disponível em http://localhost:3000.

## 🧪 **Testando a API com Postman e com o Render**
Para testar os endpoints que requerem autenticação com JWT, use o Postman. Certifique-se de adicionar o token JWT no cabeçalho da requisição.

- Link da documentação completa: 
[Postman](https://documenter.getpostman.com/view/39919123/2sAYBd7Tg5)

- Cabeçalho para autenticação:
Authorization: Bearer {seu_token_jwt_aqui}

- Para o teste das rotas GET, utilize o deploy da API:
[Render](https://api-login-z19r.onrender.com/)


## 📄 **Licença**
Este projeto é licenciado sob a MIT License. Veja o arquivo LICENSE para mais detalhes.

## 📝 **Notas**
- A API está preparada para escalar e adicionar novos recursos facilmente.
- Todos os dados sensíveis (como senha e token) são criptografados com segurança.

## **Autor**
Api desenvolvida por [Ricardo Vitor Castilho](https://github.com/RicardoVCastilho)



