const http = require('http');
const path = require('path');
// Require server to start it
require(path.join(__dirname, '..', 'server'));

function request(method, path, body, headers = {}) {
  return new Promise((resolve, reject) => {
    const opts = {
      hostname: 'localhost',
      port: 3000,
      path,
      method,
      headers: Object.assign({ 'Content-Type': 'application/json' }, headers),
    };
    const req = http.request(opts, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        const result = { status: res.statusCode, body: data ? (() => { try { return JSON.parse(data); } catch (e) { return data; } })() : null };
        resolve(result);
      });
    });
    req.on('error', reject);
    if (body) req.write(JSON.stringify(body));
    req.end();
  });
}

(async () => {
  try {
    console.log('Running smoke tests...');

    // 1) Create veterinarian
    const vetPayload = { nome: 'Dr Teste', email: 'vet.teste@example.com', senha: 'senha123', crm_vet: 'CRM-000' };
    const createVet = await request('POST', '/veterinarios', vetPayload);
    if (createVet.status !== 201) throw new Error('Failed to create veterinarian: ' + JSON.stringify(createVet));
    console.log('Veterinarian created');

    // 2) Login veterinarian
    const login = await request('POST', '/auth/login', { email: vetPayload.email, senha: vetPayload.senha });
    if (login.status !== 200 || !login.body || !login.body.token) throw new Error('Failed to login veterinarian: ' + JSON.stringify(login));
    const token = login.body.token;
    console.log('Veterinarian logged in');

    // 3) Create tutor (veterinarian only)
    const tutorPayload = { nome: 'Tutor Teste', email: 'tutor.teste@example.com', telefone: '99999-0000', senha: 'senha123' };
    const createTutor = await request('POST', '/tutores', tutorPayload, { Authorization: 'Bearer ' + token });
    if (createTutor.status !== 201) throw new Error('Failed to create tutor: ' + JSON.stringify(createTutor));
    const tutorId = createTutor.body.id;
    console.log('Tutor created');

    // 4) Create animal
    const animalPayload = { nome: 'BichoTest', idade: 2, sexo: 'M', especie: 'Canina', raca: 'SRD', peso: 8.5, tutor_id: tutorId };
    const createAnimal = await request('POST', '/animais', animalPayload, { Authorization: 'Bearer ' + token });
    if (createAnimal.status !== 201) throw new Error('Failed to create animal: ' + JSON.stringify(createAnimal));
    const animalId = createAnimal.body.id;
    console.log('Animal created');

    // 5) Create receita
    const receitaPayload = { data: new Date().toISOString().split('T')[0], descricao: 'Teste', medicamento: 'Med', dosagem: '1x', animal_id: animalId, veterinario_id: createVet.body.id || 1 };
    const createReceita = await request('POST', '/receitas', receitaPayload, { Authorization: 'Bearer ' + token });
    if (createReceita.status !== 201) throw new Error('Failed to create receita: ' + JSON.stringify(createReceita));
    const receitaId = createReceita.body.id;
    console.log('Receita created');

    // 6) List receitas by animal
    const listReceitas = await request('GET', `/receitas/${animalId}`, null, { Authorization: 'Bearer ' + token });
    if (listReceitas.status !== 200) throw new Error('Failed to list receitas: ' + JSON.stringify(listReceitas));
    console.log('Receitas listed');

    // 7) Delete receita
    const delReceita = await request('DELETE', `/receitas/${receitaId}`, null, { Authorization: 'Bearer ' + token });
    if (delReceita.status !== 200) throw new Error('Failed to delete receita: ' + JSON.stringify(delReceita));
    console.log('Receita deleted');

    // 8) Delete animal
    const delAnimal = await request('DELETE', `/animais/${animalId}`, null, { Authorization: 'Bearer ' + token });
    if (delAnimal.status !== 200) throw new Error('Failed to delete animal: ' + JSON.stringify(delAnimal));
    console.log('Animal deleted');

    // 9) Delete tutor
    const delTutor = await request('DELETE', `/tutores/${tutorId}`, null, { Authorization: 'Bearer ' + token });
    if (delTutor.status !== 200) throw new Error('Failed to delete tutor: ' + JSON.stringify(delTutor));
    console.log('Tutor deleted');

    // 10) Delete veterinarian
    // Need to know vet id; createVet response may not include id if service returned limited fields. Try listing token payload
    const vetId = createVet.body.id || 1;
    const delVet = await request('DELETE', `/veterinarios/${vetId}`, null, { Authorization: 'Bearer ' + token });
    if (delVet.status !== 200) throw new Error('Failed to delete veterinarian: ' + JSON.stringify(delVet));
    console.log('Veterinarian deleted');

    console.log('All tests passed');
    process.exit(0);
  } catch (err) {
    console.error('Tests failed:', err.message || err);
    process.exit(1);
  }
})();
