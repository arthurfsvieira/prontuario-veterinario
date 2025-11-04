const express = require('express');
const router = express.Router();
const { create } = require('../controllers/veterinarioController');

// Public: create veterinario
router.post('/', create);

module.exports = router;
