const express = require('express');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const path = require('path');

const authRoutes = require('./routes/auth');
const vetRoutes = require('./routes/veterinarios');
const tutorRoutes = require('./routes/tutores');
const animalRoutes = require('./routes/animais');
const receitaRoutes = require('./routes/receitas');

const swaggerDocument = YAML.load(path.join(__dirname, 'resources', 'swagger.yaml'));

const app = express();
app.use(bodyParser.json());

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/auth', authRoutes);
app.use('/veterinarios', vetRoutes);
app.use('/tutores', tutorRoutes);
app.use('/animais', animalRoutes);
app.use('/receitas', receitaRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Swagger docs: http://localhost:${PORT}/docs`);
});

module.exports = app;
