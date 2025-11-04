const jwt = require('jsonwebtoken');
const { animais } = require('../models/data');

const JWT_SECRET = 'supersecretkey';

function authenticateJWT(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: 'Token ausente' });
  const parts = authHeader.split(' ');
  if (parts.length !== 2) return res.status(401).json({ message: 'Token inválido' });
  const token = parts[1];
  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(401).json({ message: 'Token inválido' });
    req.user = user;
    next();
  });
}

function authorizeRole(role) {
  return (req, res, next) => {
    if (!req.user) return res.status(401).json({ message: 'Não autenticado' });
    if (req.user.role !== role) return res.status(403).json({ message: 'Acesso proibido' });
    next();
  };
}

function authorizeOwnership(resourceType) {
  // resourceType: 'tutor' | 'animal' | 'receita'
  return (req, res, next) => {
    if (!req.user) return res.status(401).json({ message: 'Não autenticado' });
    if (req.user.role === 'veterinario') return next();

    // tutor can only access their own resources
    const userId = req.user.id;
    if (resourceType === 'tutor') {
      const targetId = req.params.id;
      if (targetId && String(userId) === String(targetId)) return next();
      return res.status(403).json({ message: 'Acesso proibido' });
    }

    if (resourceType === 'animal') {
      const animalId = req.params.id || req.params.animalId;
      const animal = animais.find(a => String(a.id) === String(animalId));
      if (!animal) return res.status(404).json({ message: 'Animal não encontrado' });
      if (String(animal.tutor_id) === String(userId)) return next();
      return res.status(403).json({ message: 'Acesso proibido' });
    }

    if (resourceType === 'receita') {
      const animalId = req.params.animalId;
      const animal = animais.find(a => String(a.id) === String(animalId));
      if (!animal) return res.status(404).json({ message: 'Animal não encontrado' });
      if (String(animal.tutor_id) === String(userId)) return next();
      return res.status(403).json({ message: 'Acesso proibido' });
    }

    return res.status(403).json({ message: 'Acesso proibido' });
  };
}

module.exports = {
  authenticateJWT,
  authorizeRole,
  authorizeOwnership,
  JWT_SECRET,
};
