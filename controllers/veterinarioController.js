const { createVeterinario } = require('../services/veterinarioService');
const { deleteVeterinario } = require('../services/veterinarioService');

function create(req, res) {
  try {
    const vet = createVeterinario(req.body);
    return res.status(201).json(vet);
  } catch (err) {
    return res.status(err.status || 500).json({ message: err.message || 'Erro interno' });
  }
}


function remove(req, res) {
  try {
    const result = deleteVeterinario(req.params.id);
    return res.status(200).json(result);
  } catch (err) {
    return res.status(err.status || 500).json({ message: err.message || 'Erro interno' });
  }
}

module.exports = { create, remove };

