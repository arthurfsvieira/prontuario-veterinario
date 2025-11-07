# Relatório de Bugs/Issues — API Prontuário Veterinário

## 2025-11-07

### 1. Testes Automatizados (Mocha)
- **Status:** Todos os testes passaram com sucesso.
- **Comando:** `npx mocha test/api.test.js`
- **Resultado:**
  - 7 testes executados
  - 7 testes aprovados
  - Nenhum erro ou falha encontrada

### 2. Teste de Performance (k6)
- **Status:** Falha de autorização (token JWT inválido ou incompleto)
- **Comando:** `k6 run test/performance.k6.js`
- **Descrição:**
  - Todas as requisições para `http://localhost:3000/animais` retornaram erro (provavelmente 401 ou 403).
  - O token JWT utilizado no script está incompleto, expirado ou inválido.
  - O script de performance precisa de um token JWT completo e válido.
- **Solução sugerida:**
  - Gere um token JWT válido executando o fluxo de login da API e copie o token completo para o script de performance.
  - Certifique-se de copiar o token inteiro, sem cortes.

---

Se novos bugs forem encontrados, adicionar abaixo seguindo o mesmo padrão.
