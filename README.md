# Prontuário Veterinário (API REST - em memória)

API simples escrita em Node.js + Express para gerenciar veterinários, tutores, animais e receitas em memória (arrays JS). Inclui autenticação JWT e documentação Swagger em `/docs`.

Instalação

1. Instale dependências:

```bash
npm install
```

2. Inicie a API:

```bash
npm start
```

A API ficará disponível em http://localhost:3000 e a documentação Swagger em http://localhost:3000/docs

Endpoints principais

- POST /auth/login — login (veterinário ou tutor) — público
- POST /veterinarios — criar veterinário — público
- POST /tutores — criar tutor — veterinário
- GET /tutores — listar tutores — veterinário
- GET /tutores/:id — visualizar tutor — veterinário ou tutor dono
- POST /animais — cadastrar animal — veterinário
- GET /animais — listar animais — veterinário
- GET /animais/:id — visualizar animal — veterinário ou tutor dono
- PUT /animais/:id — atualizar animal — veterinário
- POST /receitas — criar receita — veterinário
- GET /receitas/:animalId — listar receitas de um animal — veterinário ou tutor dono

Autenticação

Use o endpoint `POST /auth/login` com um JSON { "email": "...", "senha": "..." }. Você receberá um token JWT. Envie o header `Authorization: Bearer <token>` nas requisições protegidas.

Exemplos de payloads

- Criar veterinário (POST /veterinarios)

```json
{
  "nome": "Dr. Fulano",
  "email": "vet@exemplo.com",
  "senha": "senha123",
  "crm_vet": "CRM12345"
}
```

- Criar tutor (POST /tutores)

```json
{
  "nome": "João",
  "email": "joao@ex.com",
  "telefone": "99999-9999",
  "senha": "senha123"
}
```

- Criar animal (POST /animais)

```json
{
  "nome": "Rex",
  "idade": 5,
  "sexo": "M",
  "especie": "Canina",
  "raca": "Vira-Lata",
  "peso": 12.5,
  "tutor_id": 1
}
```

- Atualizar animal (PUT /animais/:id)

```json
{
  "peso": 13.0
}
```

- Criar receita (POST /receitas)

```json
{
  "data": "2025-11-04",
  "descricao": "Tratamento para parasitas",
  "medicamento": "Antiparasitario",
  "dosagem": "1 comprimido",
  "animal_id": 1,
  "veterinario_id": 1
}
```

Exemplos curl

- Login

```bash
curl -X POST http://localhost:3000/auth/login -H "Content-Type: application/json" -d '{"email":"vet@exemplo.com","senha":"senha123"}'
```

- Criar veterinário

```bash
curl -X POST http://localhost:3000/veterinarios -H "Content-Type: application/json" -d '{"nome":"Dr. Fulano","email":"vet@exemplo.com","senha":"senha123","crm_vet":"CRM12345"}'
```

- Criar tutor (usar token de veterinário)

```bash
curl -X POST http://localhost:3000/tutores -H "Authorization: Bearer <TOKEN>" -H "Content-Type: application/json" -d '{"nome":"João","email":"joao@ex.com","telefone":"99999-9999","senha":"senha123"}'
```

- Criar animal (usar token de veterinário)

```bash
curl -X POST http://localhost:3000/animais -H "Authorization: Bearer <TOKEN>" -H "Content-Type: application/json" -d '{"nome":"Rex","idade":5,"sexo":"M","especie":"Canina","raca":"Vira-Lata","peso":12.5,"tutor_id":1}'
```

- Deletar veterinário (usar token de veterinário)

```bash
curl -X DELETE http://localhost:3000/veterinarios/1 -H "Authorization: Bearer <TOKEN>"
```

- Deletar tutor (usar token de veterinário)

```bash
curl -X DELETE http://localhost:3000/tutores/1 -H "Authorization: Bearer <TOKEN>"
```

- Deletar animal (usar token de veterinário)

```bash
curl -X DELETE http://localhost:3000/animais/1 -H "Authorization: Bearer <TOKEN>"
```

- Deletar receita (usar token de veterinário)

```bash
curl -X DELETE http://localhost:3000/receitas/1 -H "Authorization: Bearer <TOKEN>"
```

Swagger

Abra `/docs` para visualizar a documentação e exemplos de request/response.
