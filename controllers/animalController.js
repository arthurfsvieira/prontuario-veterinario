const { createAnimal, listAnimais, getAnimalById, updateAnimal } = require('../services/animalService');

function create(req, res) {
  try {
    const animal = createAnimal(req.body);
    return res.status(201).json(animal);
  } catch (err) {
    return res.status(err.status || 500).json({ message: err.message || 'Erro interno' });
  }
}

function list(req, res) {
  try {
    const list = listAnimais();
    return res.status(200).json(list);
  } catch (err) {
    return res.status(err.status || 500).json({ message: err.message || 'Erro interno' });
  }
}

function getById(req, res) {
  try {
    const animal = getAnimalById(req.params.id);
    return res.status(200).json(animal);
  } catch (err) {
    return res.status(err.status || 500).json({ message: err.message || 'Erro interno' });
  }
}

function update(req, res) {
  try {
    const animal = updateAnimal(req.params.id, req.body);
    return res.status(200).json(animal);
  } catch (err) {
    return res.status(err.status || 500).json({ message: err.message || 'Erro interno' });
  }
}

module.exports = { create, list, getById, update };
