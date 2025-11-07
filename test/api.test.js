
const { request, authHeader } = require('./helpers');
const fixtures = require('./fixtures');
const app = require('../server');


const chai = require('chai');
const expect = chai.expect;

let vetToken, tutorToken, animalId, tutorId, receitaId;

describe('API Prontuário Veterinário', function() {
  this.timeout(10000);

  it('US6: Deve autenticar veterinário e retornar token', async () => {
    // Cria veterinário
    await request(app)
      .post('/veterinarios')
      .send({ nome: 'Vet Test', email: 'vet@teste.com', senha: '123456', crm_vet: 'CRM-TEST' });
    // Login
    const res = await request(app)
      .post('/auth/login')
      .send({ email: 'vet@teste.com', senha: '123456' });
    expect(res).to.have.status(200);
    expect(res.body).to.have.property('token');
    vetToken = res.body.token;
  });

  it('US1: Deve cadastrar tutor', async () => {
    const res = await chai.request(app)
      .post('/tutores')
      .set('Authorization', 'Bearer ' + vetToken)
      .send({ nome: 'Tutor Test', email: 'tutor@teste.com', telefone: '99999-0000', senha: '123456' });
    expect(res).to.have.status(201);
    expect(res.body).to.have.property('id');
    tutorId = res.body.id;
  });

  it('US2: Deve cadastrar animal', async () => {
    const res = await chai.request(app)
      .post('/animais')
      .set('Authorization', 'Bearer ' + vetToken)
      .send({ nome: 'Rex', idade: 2, sexo: 'M', especie: 'Canina', raca: 'SRD', peso: 10, tutor_id: tutorId });
    expect(res).to.have.status(201);
    expect(res.body).to.have.property('id');
    animalId = res.body.id;
  });

  it('US3: Deve cadastrar receita', async () => {
    const res = await chai.request(app)
      .post('/receitas')
      .set('Authorization', 'Bearer ' + vetToken)
      .send({ data: '2025-11-07', descricao: 'Tratamento', medicamento: 'Remédio', dosagem: '1x', animal_id: animalId, veterinario_id: 1 });
    expect(res).to.have.status(201);
    expect(res.body).to.have.property('id');
    receitaId = res.body.id;
  });

  it('US5: Deve autenticar tutor e visualizar seus animais e receitas', async () => {
    // Login tutor
    const login = await chai.request(app)
      .post('/auth/login')
      .send({ email: 'tutor@teste.com', senha: '123456' });
    expect(login).to.have.status(200);
    expect(login.body).to.have.property('token');
    tutorToken = login.body.token;
    // Visualizar animal
    const animal = await request(app)
      .get('/animais/' + animalId)
      .set('Authorization', 'Bearer ' + tutorToken);
    expect(animal).to.have.status(200);
    // Visualizar receitas
    const receitas = await chai.request(app)
      .get('/receitas/' + animalId)
      .set('Authorization', 'Bearer ' + tutorToken);
    expect(receitas).to.have.status(200);
    expect(receitas.body).to.be.an('array');
  });

  it('US4: Deve editar e excluir animal, tutor e receita', async () => {
    // Editar animal
    const edit = await chai.request(app)
      .put('/animais/' + animalId)
      .set('Authorization', 'Bearer ' + vetToken)
      .send({ peso: 12 });
    expect(edit).to.have.status(200);
    expect(edit.body.peso).to.equal(12);
    // Excluir receita
    const delRec = await chai.request(app)
      .delete('/receitas/' + receitaId)
      .set('Authorization', 'Bearer ' + vetToken);
    expect(delRec).to.have.status(200);
    // Excluir animal
    const delAni = await chai.request(app)
      .delete('/animais/' + animalId)
      .set('Authorization', 'Bearer ' + vetToken);
    expect(delAni).to.have.status(200);
    // Excluir tutor
    const delTut = await chai.request(app)
      .delete('/tutores/' + tutorId)
      .set('Authorization', 'Bearer ' + vetToken);
    expect(delTut).to.have.status(200);
  });

  it('US6: Não deve acessar rota protegida sem token', async () => {
    const res = await chai.request(app)
      .get('/tutores');
    expect(res).to.have.status(401);
  });
});
