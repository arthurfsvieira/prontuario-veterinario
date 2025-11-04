const { receitas, animais } = require('../models/data');

function createReceita({ data, descricao, medicamento, dosagem, animal_id, veterinario_id }) {
  if (!data || !descricao || !medicamento || !dosagem || !animal_id || !veterinario_id) {
    throw { status: 400, message: 'Campos obrigatórios ausentes' };
  }
  const animal = animais.find(a => String(a.id) === String(animal_id));
  if (!animal) throw { status: 404, message: 'Animal não encontrado' };
  const id = receitas.length + 1;
  const receita = { id, data, descricao, medicamento, dosagem, animal_id, veterinario_id };
  receitas.push(receita);
  return receita;
}

function listReceitasByAnimal(animalId) {
  return receitas.filter(r => String(r.animal_id) === String(animalId));
}

module.exports = { createReceita, listReceitasByAnimal };
