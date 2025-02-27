const db = require('../db');

let cachedPatientReports = null;
let cacheExpiration = null;
const CACHE_DURATION = 60 * 1000; // 1 minute in milliseconds

const getAllPatientReports = async (req, res) => {
    try {
        let query = 'SELECT * FROM patient_report';
        let searchParameter = req.query.search;
        const queryParams = [];

        if (searchParameter) {
            searchParameter = searchParameter.trim();
            if (searchParameter.length > 50) {
                return res.status(400).json({ message: 'Search parameter may not exceed 50 characters in length' });
            }

            query += ' WHERE patient_name LIKE ?';
            queryParams.push(`%${searchParameter}%`);
        }

        const now = Date.now();
        if (!searchParameter && cachedPatientReports && cacheExpiration && now < cacheExpiration) {
            console.log("Serving from cache"); // log for demo purposes
            return res.json(cachedPatientReports);
        }

        query += ' ORDER BY date';
        const [rows] = await db.query(query, queryParams);

        if (!searchParameter) {
            // Only cache unfiltered results set
            cachedPatientReports = rows;
        }

        cacheExpiration = now + CACHE_DURATION;
        return res.json(rows);
    } catch (error) {
        res.status(500).json({ message: error });
    }
};

module.exports = { getAllPatientReports };
