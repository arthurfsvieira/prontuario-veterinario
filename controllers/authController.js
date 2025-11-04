const { authenticate, generateToken } = require('../services/authService');

async function login(req, res) {
  const { email, senha } = req.body;
  if (!email || !senha) return res.status(400).json({ message: 'email e senha são obrigatórios' });
  const auth = await authenticate(email, senha);
  if (!auth) return res.status(401).json({ message: 'Credenciais inválidas' });
  const token = generateToken(auth.user);
  res.status(200).json({ token });
}

module.exports = { login };
