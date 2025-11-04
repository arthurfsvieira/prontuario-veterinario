const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { veterinarios, tutores } = require('../models/data');
const { JWT_SECRET } = require('../middlewares/auth');

function generateToken(user) {
  const payload = { id: user.id, role: user.crm_vet ? 'veterinario' : 'tutor' };
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '8h' });
}

async function authenticate(email, senha) {
  const vet = veterinarios.find(v => v.email === email);
  if (vet && bcrypt.compareSync(senha, vet.senha)) return { user: vet, role: 'veterinario' };
  const tutor = tutores.find(t => t.email === email);
  if (tutor && bcrypt.compareSync(senha, tutor.senha)) return { user: tutor, role: 'tutor' };
  return null;
}

module.exports = {
  generateToken,
  authenticate,
};
