const { createVeterinario } = require('../services/veterinarioService');

function create(req, res) {
  try {
    const vet = createVeterinario(req.body);
    return res.status(201).json(vet);
  } catch (err) {
    return res.status(err.status || 500).json({ message: err.message || 'Erro interno' });
  }
}

module.exports = { create };
