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
| ID   | User Story                                                                 | Prioridade |
|------|----------------------------------------------------------------------------|------------|
| EP1  | Como veterinário, quero gerenciar tutores, animais e receitas              | Alta       |
| EP2  | Como tutor, quero visualizar meus animais e receitas                       | Alta       |
| US1  | Como veterinário, quero cadastrar tutores para associar animais            | Alta       |
| US2  | Como veterinário, quero cadastrar animais para tutores                     | Alta       |
| US3  | Como veterinário, quero cadastrar receitas para animais                    | Alta       |
| US4  | Como veterinário, quero editar e excluir animais, tutores e receitas       | Média      |
| US5  | Como tutor, quero visualizar meus próprios animais e receitas              | Alta       |
| US6  | Como usuário, quero autenticar e acessar rotas conforme meu perfil         | Alta       |

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
| Épico | Esforço |
|-------|---------|
| EP1   | 8       |
| EP2   | 5       |

### 2. User Stories e Estimativa de Esforço em Testes
| Código | Descrição | Esforço |
|--------|-----------|---------|
| US1    | Cadastro de tutor | 3 |
| US2    | Cadastro de animal | 3 |
| US3    | Cadastro de receita | 2 |
| US4    | Edição/Exclusão | 2 |
| US5    | Visualização tutor | 2 |
| US6    | Autenticação | 2 |

### 3. Condições de Teste e Camadas
| ID | Condição | Resultado Esperado | Camada |
|----|----------|-------------------|--------|
| CT1 | POST /tutores com token válido | 201 | API |
| CT2 | GET /animais/:id por tutor não dono | 403 | API |
| CT3 | DELETE /receitas/:id por veterinário | 200 | API |
| CT4 | GET /receitas/:animalId por tutor dono | 200 | API |
| CT5 | GET /tutores sem token | 401 | API |

### 4. Missões de Teste Exploratório
- Test Charter 1: Explore o cadastro de tutores com diferentes dados para descobrir falhas de validação
- Test Charter 2: Explore a exclusão de entidades e observe efeitos colaterais
- Test Charter 3: Explore o fluxo de autenticação e manipulação de tokens

### 5. Testes Não-Funcionais
| Tipo | Teste | Resultado Esperado |
|------|-------|-------------------|
| Segurança | Acesso sem token | 401 |
| Performance | Resposta em até 2s | <=2s |
| Usabilidade | Swagger acessível | /docs responde 200 |

### 6. Automação de Testes
| ID | Condição | Resultado Esperado | Camada |
|----|----------|-------------------|--------|
| AT1 | Criação e deleção de entidades | 201/200 | API |
| AT2 | Login e uso de token | 200 | API |
| AT3 | Fluxo completo CRUD | 200/201/204 | API |

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
