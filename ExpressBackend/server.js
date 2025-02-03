require('dotenv').config(); // set env variable
const express = require('express');
const cors = require('cors'); // what does this do - it's a security measure 
const db = require('./db');

const app = express();

// red black tree? a kind of binary search tree
app.use(cors()); // allows any origin
app.use(express.json());

const patientRoutes = require('./routes/patientRoutes');
app.use('/api/patients', patientRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
