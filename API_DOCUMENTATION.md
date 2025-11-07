# 📚 Documentação Formal da API REST — Prontuário Veterinário

## Sumário
- [Requisitos Funcionais](#requisitos-funcionais)
- [Requisitos Não Funcionais](#requisitos-não-funcionais)
- [Épicos e User Stories](#épicos-e-user-stories)
- [Critérios de Aceite](#critérios-de-aceite)
- [Definition of Ready (DoR)](#definition-of-ready-dor)
- [Plano e Estratégia de Testes](#plano-e-estratégia-de-testes)
- [Relatório de Sessão](#relatório-de-sessão)
- [Definition of Done (DoD)](#definition-of-done-dod)
- [Swagger](#swagger)
- [Web](#web)
- [Histórico de Bugs](#histórico-de-bugs)
- [Métricas de Qualidade](#métricas-de-qualidade)

---

## Requisitos Funcionais
| ID  | Requisito Funcional                        | Descrição                                                                 | Prioridade |
|-----|--------------------------------------------|---------------------------------------------------------------------------|------------|
| RF1 | Cadastro de Veterinário                   | Permitir o cadastro de veterinários com dados obrigatórios                | Alta       |
| RF2 | Login                                     | Permitir login de veterinário e tutor via JWT                              | Alta       |
| RF3 | Cadastro de Tutor                         | Permitir que veterinário cadastre tutores                                  | Alta       |
| RF4 | Cadastro de Animal                        | Permitir que veterinário cadastre animais vinculados a tutores             | Alta       |
| RF5 | Cadastro de Receita                       | Permitir que veterinário cadastre receitas para animais                    | Alta       |
| RF6 | Listagem de Tutores                       | Permitir que veterinário liste todos os tutores                            | Média      |
| RF7 | Listagem de Animais                       | Permitir que veterinário liste todos os animais                            | Média      |
| RF8 | Listagem de Receitas                      | Permitir que veterinário/tutor liste receitas de um animal                 | Média      |
| RF9 | Visualização de Tutor/Animal              | Permitir que veterinário/tutor visualize tutor/animal específico           | Média      |
| RF10| Atualização de Animal                     | Permitir que veterinário atualize dados de animal                          | Média      |
| RF11| Exclusão de Veterinário/Tutor/Animal/Receita| Permitir que veterinário exclua entidades                                  | Média      |

## Requisitos Não Funcionais
| ID  | Categoria     | Requisito Não Funcional         | Descrição                                                    | Prioridade |
|-----|---------------|---------------------------------|--------------------------------------------------------------|------------|
| RNF1| Segurança     | Autenticação JWT                | Todas as rotas protegidas exigem token JWT                   | Alta       |
| RNF2| Usabilidade   | Documentação Swagger            | API documentada via Swagger em /docs                        | Alta       |
| RNF3| Performance   | Resposta rápida                 | Operações devem responder em menos de 2 segundos             | Média      |
| RNF4| Manutenibilidade | Código modular                 | Separação em camadas (routes, controllers, services, etc)    | Alta       |
| RNF5| Testabilidade | Testes automatizados            | Scripts de teste automatizados para endpoints principais      | Média      |


## Épicos e User Stories
| ID   | Como (Quem?)         | Quero (O quê?)                                 | Para (Por quê?)                                 | Prioridade |
|------|----------------------|------------------------------------------------|--------------------------------------------------|------------|
| EP1  | Veterinário          | Gerenciar tutores                              | Organizar informações dos responsáveis           | Alta       |
| EP2  | Veterinário          | Gerenciar animais                              | Controlar prontuário dos pacientes               | Alta       |
| EP3  | Veterinário          | Gerenciar receitas                             | Prescrever e acompanhar tratamentos              | Alta       |
| EP4  | Veterinário          | Gerenciar usuários (veterinários/tutores)      | Manter controle de acesso                        | Alta       |
| EP5  | Tutor                | Visualizar meus animais                        | Acompanhar saúde dos meus pets                   | Alta       |
| EP6  | Tutor                | Visualizar receitas dos meus animais           | Seguir corretamente as prescrições               | Alta       |

### User Stories
| ID   | Como (Quem?)         | Quero (O quê?)                                 | Para (Por quê?)                                 | Prioridade |
|------|----------------------|------------------------------------------------|--------------------------------------------------|------------|
| US1  | Veterinário          | Cadastrar tutores                              | Associar animais a responsáveis                  | Alta       |
| US2  | Veterinário          | Cadastrar animais                              | Registrar pacientes                              | Alta       |
| US3  | Veterinário          | Cadastrar receitas                             | Prescrever tratamentos                           | Alta       |
| US4  | Veterinário          | Editar/excluir animais, tutores e receitas     | Manter dados atualizados                         | Média      |
| US5  | Tutor                | Visualizar meus próprios animais e receitas    | Acompanhar saúde e tratamentos                   | Alta       |
| US6  | Usuário (ambos)      | Autenticar e acessar rotas conforme perfil     | Garantir segurança e personalização              | Alta       |

## Critérios de Aceite
| Critério | Descrição |
|----------|-----------|
| CA1 | Dado que sou veterinário autenticado, quando acesso POST /tutores, então consigo cadastrar um tutor |
| CA2 | Dado que sou tutor autenticado, quando acesso GET /animais/:id de outro tutor, então recebo 403 |
| CA3 | Dado que sou veterinário, quando acesso DELETE /animais/:id, então o animal é removido |
| CA4 | Dado que sou tutor, quando acesso GET /receitas/:animalId do meu animal, então vejo as receitas |
| CA5 | Dado que não envio token, quando acesso rota protegida, então recebo 401 |

## Definition of Ready (DoR)
A história de usuário é considerada pronta para desenvolvimento e testes quando:
- Possui critérios de aceite claros e objetivos
- Possui dependências identificadas
- Possui estimativa de esforço
- Possui dados de teste definidos
- Está priorizada no backlog

## Plano e Estratégia de Testes

### 1. Épicos e Estimativa Geral de Esforço em Testes
| Épico | Descrição | Esforço |
|-------|-----------|---------|
| EP1   | Gerenciar tutores (criação, listagem, visualização, exclusão) | Alto    |
| EP2   | Gerenciar animais (criação, listagem, visualização, edição, exclusão) | Alto    |
| EP3   | Gerenciar receitas (criação, listagem, exclusão) | Médio   |
| EP4   | Gerenciar usuários (autenticação, controle de acesso) | Médio   |
| EP5   | Visualizar animais (tutor) | Baixo   |
| EP6   | Visualizar receitas (tutor) | Baixo   |


### 2. User Stories e Estimativa de Esforço em Testes (Formato Gherkin)

**US1: Cadastro de tutores**
Como veterinário
Quero cadastrar tutores
Para associar animais a responsáveis
Esforço: Médio

**US2: Cadastro de animais**
Como veterinário
Quero cadastrar animais
Para registrar pacientes
Esforço: Médio

**US3: Cadastro de receitas**
Como veterinário
Quero cadastrar receitas
Para prescrever tratamentos
Esforço: Baixo

**US4: Edição/Exclusão de entidades**
Como veterinário
Quero editar e excluir animais, tutores e receitas
Para manter dados atualizados
Esforço: Médio

**US5: Visualização de animais e receitas (tutor)**
Como tutor
Quero visualizar meus próprios animais e receitas
Para acompanhar saúde e tratamentos
Esforço: Baixo

**US6: Autenticação e controle de acesso**
Como usuário (veterinário ou tutor)
Quero autenticar e acessar rotas conforme meu perfil
Para garantir segurança e personalização
Esforço: Baixo

### 3. Condições de Teste e Camadas
| ID   | User Story Relacionada | Condição | Resultado Esperado | Camada |
|------|-----------------------|----------|-------------------|--------|
| CT1  | US1                   | POST /tutores com token válido | 201 | API |
| CT2  | US5                   | GET /animais/:id por tutor não dono | 403 | API |
| CT3  | US4                   | DELETE /receitas/:id por veterinário | 200 | API |
| CT4  | US5                   | GET /receitas/:animalId por tutor dono | 200 | API |
| CT5  | US6                   | GET /tutores sem token | 401 | API |

### 4. Missões de Teste Exploratório

**Test Charter 1**

Explore a API de cadastro de tutores
Com a heurística VADER - Verbs
Descobrir se métodos HTTP não permitidos retornam erros apropriados.

**Test Charter 2**

Explore endpoints protegidos da API
Com a heurística VADER - Authorization/Authentication
Descobrir se tokens inválidos ou ausentes são tratados corretamente.

**Test Charter 3**

Explore a API de cadastro de usuários
Com a heurística VADER - Data
Descobrir como a API lida com diferentes tipos e formatos de dados.

**Test Charter 4**

Explore cenários de falha na API
Com a heurística VADER - Errors
Descobrir se erros de negócio e validação são tratados corretamente.

**Test Charter 5**

Explore a performance da API
Com a heurística VADER - Responsiveness
Descobrir se os tempos de resposta estão dentro do esperado.

### 5. Testes Não-Funcionais
| Tipo        | Teste                                                                 | Resultado Esperado |
|-------------|-----------------------------------------------------------------------|-------------------|
| Segurança   | Acesso a endpoints protegidos sem token                               | Deve retornar 401 Unauthorized, sem expor dados sensíveis |
| Segurança   | Tentativa de acesso com token inválido ou expirado                    | Deve retornar 401 Unauthorized, mensagem clara de erro |
| Performance | Carga de 100 requisições simultâneas em POST /animais                 | 95% das respostas em até 2 segundos, sem queda do serviço |
| Performance | Listagem de 1000 animais em GET /animais                              | Resposta em até 2 segundos, sem degradação perceptível |
| Usabilidade | Documentação Swagger acessível e compreensível                        | /docs responde 200, exemplos claros, schemas completos |
| Usabilidade | Mensagens de erro padronizadas e amigáveis                            | Mensagens de erro em JSON, campo "message" descritivo, sem stacktrace |

### 6. Automação de Testes

#### Testes Funcionais (Mocha, Chai, Supertest)
Os testes automatizados estão em `test/api.test.js` e cobrem as 6 user stories principais:
- US1: Cadastro de tutores
- US2: Cadastro de animais
- US3: Cadastro de receitas
- US4: Edição/Exclusão de entidades
- US5: Visualização de animais e receitas (tutor)
- US6: Autenticação e controle de acesso

**Como rodar:**
1. Instale as dependências de teste:
  ```bash
  npm install --save-dev mocha chai supertest
  ```
2. Execute os testes:
  ```bash
  npx mocha test/api.test.js
  ```

#### Testes de Performance (k6)
O teste de performance está em `test/performance.k6.js` e cobre GET /animais com múltiplos usuários virtuais.

**Como rodar:**
1. Instale o k6 (https://k6.io/docs/getting-started/installation/)
2. Gere um token JWT válido e substitua em `performance.k6.js` no campo `Authorization: 'Bearer TOKEN_AQUI'`
3. Execute:
  ```bash
  k6 run test/performance.k6.js
  ```

### 7. Mapeamento dos Dados de Teste
- Testes Manuais e Automatizados do tipo API Rest/Swagger
- Responsável: Arthur Vieira
- Status: Em andamento

### 8. Defeitos conhecidos
- Mensagem: Defeitos conhecidos podem ser consultados em Issues no Github/Jira.

## Relatório de Sessão

_(Em branco)_

## Definition of Done (DoD)
Uma história de usuário é considerada concluída quando:
- Todos os critérios de aceite foram atendidos
- Código revisado e aprovado
- Testes automatizados e manuais executados
- Documentação atualizada
- Deploy realizado (se aplicável)

## Swagger
- A documentação da API está disponível em `/docs` após rodar o projeto.
- Para rodar a API:
  1. Instale dependências: `npm install`
  2. Inicie: `npm start`
- Endpoints disponíveis:
  - POST /auth/login
  - POST /veterinarios
  - DELETE /veterinarios/{id}
  - POST /tutores
  - GET /tutores
  - GET /tutores/{id}
  - DELETE /tutores/{id}
  - POST /animais
  - GET /animais
  - GET /animais/{id}
  - PUT /animais/{id}
  - DELETE /animais/{id}
  - POST /receitas
  - GET /receitas/{animalId}
  - DELETE /receitas/{id}
- Dica: Use o Swagger UI para testar e visualizar exemplos de payloads e respostas.

## Web
_(Em branco, implementação em breve)_

## Histórico de Bugs
_(Em branco, implementação em breve)_

## Métricas de Qualidade
_(Em branco, implementação em breve)_
