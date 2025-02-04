const express = require('express');
const cors = require('cors');
require('./setup');
// keeping these here for discussion
// require('dotenv').config(); // set env variable
// const db = require('./db');

const app = express();

app.use(cors());
app.use(express.json());

const patientRoutes = require('./routes/patientRoutes');
app.use('/api/patients', patientRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
