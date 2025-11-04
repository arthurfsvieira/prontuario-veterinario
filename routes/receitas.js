const express = require('express');
const router = express.Router();
const { create, listByAnimal } = require('../controllers/receitaController');
const { authenticateJWT, authorizeRole, authorizeOwnership } = require('../middlewares/auth');

// Create receita - only veterinarian
router.post('/', authenticateJWT, authorizeRole('veterinario'), create);

// List receitas by animal - veterinarian or tutor owner
router.get('/:animalId', authenticateJWT, authorizeOwnership('receita'), listByAnimal);

module.exports = router;
