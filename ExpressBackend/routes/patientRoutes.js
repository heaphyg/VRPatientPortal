const express = require('express');

const router = express.Router();
const { getAllPatientReports } = require('../controllers/patientController');
router.get('/reports', getAllPatientReports);

module.exports = router;
