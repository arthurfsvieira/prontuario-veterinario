const bcrypt = require('bcryptjs');
const { tutores } = require('../models/data');

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

module.exports = { createTutor, listTutores, getTutorById };
