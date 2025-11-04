const express = require('express');
const router = express.Router();
const { create, list, getById, update } = require('../controllers/animalController');
const { authenticateJWT, authorizeRole, authorizeOwnership } = require('../middlewares/auth');

// Create animal - only veterinario
router.post('/', authenticateJWT, authorizeRole('veterinario'), create);

// List animals - only veterinario
router.get('/', authenticateJWT, authorizeRole('veterinario'), list);

// Get animal by id - veterinarian or tutor owner
router.get('/:id', authenticateJWT, authorizeOwnership('animal'), getById);

// Update animal - only veterinarian
router.put('/:id', authenticateJWT, authorizeRole('veterinario'), update);

module.exports = router;
