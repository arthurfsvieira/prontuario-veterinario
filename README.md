# Prontuário Veterinário (API REST)

# 🐾 Prontuário Veterinário — API REST (Node.js + Express)
API para gestão de veterinários, tutores, animais e receitas, com autenticação JWT, documentação Swagger e testes automatizados/performance.

---

## 🚀 Instalação e Execução

1. Instale as dependências:
   ```bash
   npm install
   ```
2. Inicie a API:
   ```bash
   npm start
   ```
   - API: http://localhost:3000
   - Swagger: http://localhost:3000/docs

---

## 🔑 Autenticação

- Faça login em `/auth/login` com `{ "email": "...", "senha": "..." }` para receber um token JWT.
- Use o header: `Authorization: Bearer <token>` nas rotas protegidas.

---

## 📚 Endpoints Principais

| Método | Rota                        | Acesso         | Descrição                  |
|--------|-----------------------------|----------------|----------------------------|
| POST   | /auth/login                 | Público        | Login (veterinário/tutor)  |
| POST   | /veterinarios               | Público        | Criar veterinário          |
| POST   | /tutores                    | Veterinário    | Criar tutor                |
| GET    | /tutores                    | Veterinário    | Listar tutores             |
| GET    | /tutores/:id                | Vet/Tutor dono | Visualizar tutor           |
| POST   | /animais                    | Veterinário    | Cadastrar animal           |
| GET    | /animais                    | Veterinário    | Listar animais             |
| GET    | /animais/:id                | Vet/Tutor dono | Visualizar animal          |
| PUT    | /animais/:id                | Veterinário    | Atualizar animal           |
| DELETE | /animais/:id                | Veterinário    | Deletar animal             |
| POST   | /receitas                   | Veterinário    | Criar receita              |
| GET    | /receitas/:animalId         | Vet/Tutor dono | Listar receitas do animal  |
| DELETE | /receitas/:id               | Veterinário    | Deletar receita            |

---

## 📝 Exemplo de Uso (curl)

```bash
# Login (veterinário)
curl -X POST http://localhost:3000/auth/login -H "Content-Type: application/json" -d '{"email":"vet@teste.com","senha":"123456"}'
```

---

## 🧪 Testes Automatizados

- Execute todos os testes:
  ```bash
  npx mocha test/api.test.js
  ```
- Todos os requisitos e fluxos principais são validados.

## ⚡ Teste de Performance

- Script: `test/performance.k6.js`
- Antes de rodar, gere um token JWT válido e insira no script.
  ```bash
  k6 run test/performance.k6.js
  ```
- O relatório de bugs/ajustes de performance está em `BUG_REPORT.md`.

---

## 🐞 Relatório de Bugs

- Veja `BUG_REPORT.md` para histórico de execuções, falhas e sugestões de correção.

---

## 📖 Documentação Completa

- Acesse `/docs` para Swagger/OpenAPI com exemplos de request/response.

---

## 👨‍💻 Observações

- O armazenamento é em memória (arrays JS). Dados são perdidos ao reiniciar.
- Para performance, sempre use um token JWT válido.
- O projeto inclui exemplos de payloads e comandos no Swagger.
