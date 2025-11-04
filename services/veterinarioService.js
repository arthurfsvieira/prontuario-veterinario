const bcrypt = require('bcryptjs');
const { veterinarios } = require('../models/data');

function createVeterinario({ nome, email, senha, crm_vet }) {
  if (!nome || !email || !senha || !crm_vet) throw { status: 400, message: 'Campos obrigatórios ausentes' };
  const exists = veterinarios.find(v => v.email === email);
  if (exists) throw { status: 400, message: 'Email já cadastrado' };
  const id = veterinarios.length + 1;
  const hashed = bcrypt.hashSync(senha, 8);
  const vet = { id, nome, email, senha: hashed, crm_vet };
  veterinarios.push(vet);
  return { id: vet.id, nome: vet.nome, email: vet.email, crm_vet: vet.crm_vet };
}

module.exports = { createVeterinario };
