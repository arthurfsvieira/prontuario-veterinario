const { animais } = require('../models/data');

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

module.exports = { createAnimal, listAnimais, getAnimalById, updateAnimal };
