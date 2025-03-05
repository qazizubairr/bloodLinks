const sql = require("mssql");

const dbConfig = {
    server: "DESKTOP-QB4O65F\\SQLEXPRESS",
    database: "bloodlinks",
    user: "sa",
    password: "canoneos12ds",
    options: {
        encrypt: false, // Change to true if using Azure SQL
        trustedConnection: true, // Set to true if using Windows Authentication
        trustServerCertificate: true,
    },
    pool: {
        max: 10, // Maximum concurrent connections
        min: 0,
        idleTimeoutMillis: 30000
    }
};

// Create a connection pool and export it
const poolPromise = new sql.ConnectionPool(dbConfig)
    .connect()
    .then(pool => {
        console.log("✅ Connected to SQL Server");
        return pool;
    })
    .catch(err => console.error("❌ Database Connection Failed:", err));

module.exports = { sql, poolPromise };
