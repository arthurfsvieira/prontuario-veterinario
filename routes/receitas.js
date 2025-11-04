const express = require('express');
const router = express.Router();
const { create, listByAnimal, remove } = require('../controllers/receitaController');
const { authenticateJWT, authorizeRole, authorizeOwnership } = require('../middlewares/auth');

// Create receita - only veterinarian
router.post('/', authenticateJWT, authorizeRole('veterinario'), create);

// List receitas by animal - veterinarian or tutor owner
router.get('/:animalId', authenticateJWT, authorizeOwnership('receita'), listByAnimal);

// Delete receita by id - only veterinarian
router.delete('/:id', authenticateJWT, authorizeRole('veterinario'), remove);

module.exports = router;
