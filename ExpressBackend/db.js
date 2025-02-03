const mysql = require('mysql2');

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

pool.getConnection((err, connection) => { 
    if (err) {
        console.error('Database connection failed:', err);
    } else {
        console.log('Connected to MySQL');
        connection.release(); // test connection?
    }
});

module.exports = pool.promise(); // does anything need to await this promise // I don't need to put this in brackets when I import it in another file
