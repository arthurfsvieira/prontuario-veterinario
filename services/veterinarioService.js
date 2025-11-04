const bcrypt = require('bcryptjs');
const { veterinarios, receitas } = require('../models/data');

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

function deleteVeterinario(id) {
  const index = veterinarios.findIndex(v => String(v.id) === String(id));
  if (index === -1) throw { status: 404, message: 'Veterinário não encontrado' };
  // remove receitas authored by this veterinarian
  for (let i = receitas.length - 1; i >= 0; i--) {
    if (String(receitas[i].veterinario_id) === String(id)) receitas.splice(i, 1);
  }
  veterinarios.splice(index, 1);
  return { message: 'Veterinário removido' };
}

module.exports = { createVeterinario, deleteVeterinario };

