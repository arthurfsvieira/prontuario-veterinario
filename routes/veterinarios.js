const express = require('express');
const router = express.Router();
const { create } = require('../controllers/veterinarioController');

// Public: create veterinario
router.post('/', create);

// Delete veterinario - only veterinario role
const { authenticateJWT, authorizeRole } = require('../middlewares/auth');
const { remove } = require('../controllers/veterinarioController');
router.delete('/:id', authenticateJWT, authorizeRole('veterinario'), remove);

module.exports = router;
