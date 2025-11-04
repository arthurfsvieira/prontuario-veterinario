const { createTutor, listTutores, getTutorById, deleteTutor } = require('../services/tutorService');

function create(req, res) {
  try {
    const tutor = createTutor(req.body);
    return res.status(201).json(tutor);
  } catch (err) {
    return res.status(err.status || 500).json({ message: err.message || 'Erro interno' });
  }
}

function list(req, res) {
  try {
    const list = listTutores();
    return res.status(200).json(list);
  } catch (err) {
    return res.status(err.status || 500).json({ message: err.message || 'Erro interno' });
  }
}

function getById(req, res) {
  try {
    const tutor = getTutorById(req.params.id);
    return res.status(200).json(tutor);
  } catch (err) {
    return res.status(err.status || 500).json({ message: err.message || 'Erro interno' });
  }
}


function remove(req, res) {
  try {
    const result = deleteTutor(req.params.id);
    return res.status(200).json(result);
  } catch (err) {
    return res.status(err.status || 500).json({ message: err.message || 'Erro interno' });
  }
}

module.exports = { create, list, getById, remove };

