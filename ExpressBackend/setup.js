const mysql = require('mysql2/promise');

async function setupDatabase() {
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    });

    try {
        await connection.execute(`
            CREATE TABLE IF NOT EXISTS patient_report (
                id INT PRIMARY KEY AUTO_INCREMENT,
                patient_name VARCHAR(50) NOT NULL,
                date DATE,
                summary TEXT,
                INDEX idx_patient_name (patient_name)
            )
        `);

        const dummyData = [
            ['John Smith', '2025-01-15', 'Regular checkup - all clear'],
            ['Mary Johnson', '2025-01-16', 'Prescribed medication for arrhythmia'],
            ['Robert Brown', '2025-01-17', 'Follow-up appointment scheduled'],
            ['Patricia Davis', '2025-02-18', 'Lab results reviewed - normal'],
            ['Michael Wilson', '2025-02-19', 'Annual physical completed'],
            ['Linda Anderson', '2025-02-20', 'Vaccination updated'],
            ['William Taylor', '2025-01-21', 'Referred to specialist'],
            ['Elizabeth Thomas', '2025-03-22', 'Tachycardia treatment plan updated'],
            ['James Martinez', '2025-03-23', 'Recovery progressing well'],
            ['Jennifer Robinson', '2025-04-24', 'New prescription issued']
        ];

        const insertQuery = `
            INSERT INTO patient_report (patient_name, date, summary)
            VALUES ?
        `;

        const clearTableQuery = `
            TRUNCATE TABLE patient_report;
        `;

        await connection.query(clearTableQuery);
        await connection.query(insertQuery, [dummyData]);

        const [rows] = await connection.execute('SELECT COUNT(*) as count FROM patient_report');
        console.log(`${rows[0].count} records successfully created.`);

    } catch (error) {
        console.error('Error:', error);
    } finally {
        await connection.end();
    }
}

setupDatabase();