const { animais, receitas } = require('../models/data');

function createAnimal({ nome, idade, sexo, especie, raca, peso, tutor_id }) {
  if (!nome || idade === undefined || !sexo || !especie || !raca || peso === undefined || !tutor_id) {
    throw { status: 400, message: 'Campos obrigatórios ausentes' };
  }
  const id = animais.length + 1;
  const animal = { id, nome, idade, sexo, especie, raca, peso, tutor_id };
  animais.push(animal);
  return animal;
}

function listAnimais() {
  return animais;
}

function getAnimalById(id) {
  const animal = animais.find(a => String(a.id) === String(id));
  if (!animal) throw { status: 404, message: 'Animal não encontrado' };
  return animal;
}

function updateAnimal(id, data) {
  const animal = animais.find(a => String(a.id) === String(id));
  if (!animal) throw { status: 404, message: 'Animal não encontrado' };
  const allowed = ['nome','idade','sexo','especie','raca','peso','tutor_id'];
  allowed.forEach(key => {
    if (data[key] !== undefined) animal[key] = data[key];
  });
  return animal;
}

function deleteAnimal(id) {
  const index = animais.findIndex(a => String(a.id) === String(id));
  if (index === -1) throw { status: 404, message: 'Animal não encontrado' };
  // remove receitas for this animal
  for (let i = receitas.length - 1; i >= 0; i--) {
    if (String(receitas[i].animal_id) === String(id)) receitas.splice(i, 1);
  }
  animais.splice(index, 1);
  return { message: 'Animal removido' };
}

module.exports = { createAnimal, listAnimais, getAnimalById, updateAnimal, deleteAnimal };

