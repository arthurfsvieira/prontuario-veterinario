const { createReceita, listReceitasByAnimal } = require('../services/receitaService');

function create(req, res) {
  try {
    const receita = createReceita(req.body);
    return res.status(201).json(receita);
  } catch (err) {
    return res.status(err.status || 500).json({ message: err.message || 'Erro interno' });
  }
}

function listByAnimal(req, res) {
  try {
    const receitas = listReceitasByAnimal(req.params.animalId);
    return res.status(200).json(receitas);
  } catch (err) {
    return res.status(err.status || 500).json({ message: err.message || 'Erro interno' });
  }
}

module.exports = { create, listByAnimal };
