// src/services/db.js
import dotenv from "dotenv";
import sql from "mssql";
dotenv.config();
console.log("SQL_SERVER:", process.env.SQL_SERVER);
console.log("SQL_USER:", process.env.SQL_USER);
console.log("SQL_DATABASE:", process.env.SQL_DATABASE);
const config = {
  server: process.env.SQL_SERVER,
  user: process.env.SQL_USER,
  password: process.env.SQL_PASSWORD,
  database: process.env.SQL_DATABASE,
  options: {
    encrypt: true,
    trustServerCertificate: false
  }
};

let poolPromise = null;

export async function getPool() {
  if (!poolPromise) {
    poolPromise = sql.connect(config);
  }
  return poolPromise;
}
