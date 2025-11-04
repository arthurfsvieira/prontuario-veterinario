const express = require('express');
const router = express.Router();
const { create, list, getById } = require('../controllers/tutorController');
const { authenticateJWT, authorizeRole, authorizeOwnership } = require('../middlewares/auth');

// Create tutor - only veterinario
router.post('/', authenticateJWT, authorizeRole('veterinario'), create);

// List tutors - only veterinario
router.get('/', authenticateJWT, authorizeRole('veterinario'), list);

// Get tutor by id - veterinario or tutor owner
router.get('/:id', authenticateJWT, authorizeOwnership('tutor'), getById);

module.exports = router;
