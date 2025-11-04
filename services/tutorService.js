const bcrypt = require('bcryptjs');
const { tutores, animais, receitas } = require('../models/data');

function createTutor({ nome, email, telefone, senha }) {
  if (!nome || !email || !telefone || !senha) throw { status: 400, message: 'Campos obrigatórios ausentes' };
  const exists = tutores.find(t => t.email === email);
  if (exists) throw { status: 400, message: 'Email já cadastrado' };
  const id = tutores.length + 1;
  const hashed = bcrypt.hashSync(senha, 8);
  const tutor = { id, nome, email, telefone, senha: hashed };
  tutores.push(tutor);
  return { id: tutor.id, nome: tutor.nome, email: tutor.email, telefone: tutor.telefone };
}

function listTutores() {
  return tutores.map(({ senha, ...rest }) => rest);
}

function getTutorById(id) {
  const tutor = tutores.find(t => String(t.id) === String(id));
  if (!tutor) throw { status: 404, message: 'Tutor não encontrado' };
  const { senha, ...rest } = tutor;
  return rest;
}

function deleteTutor(id) {
  const index = tutores.findIndex(t => String(t.id) === String(id));
  if (index === -1) throw { status: 404, message: 'Tutor não encontrado' };
  // remove animais of this tutor and associated receitas
  for (let i = animais.length - 1; i >= 0; i--) {
    if (String(animais[i].tutor_id) === String(id)) {
      const animalId = animais[i].id;
      // remove receitas for this animal
      for (let j = receitas.length - 1; j >= 0; j--) {
        if (String(receitas[j].animal_id) === String(animalId)) receitas.splice(j, 1);
      }
      animais.splice(i, 1);
    }
  }
  tutores.splice(index, 1);
  return { message: 'Tutor removido' };
}

module.exports = { createTutor, listTutores, getTutorById, deleteTutor };

