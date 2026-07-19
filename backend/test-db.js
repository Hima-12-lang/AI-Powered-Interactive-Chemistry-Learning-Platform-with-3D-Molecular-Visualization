const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });
const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DATABASE_URL && !process.env.DATABASE_URL.includes("localhost") && !process.env.DATABASE_URL.includes("127.0.0.1")
    ? { rejectUnauthorized: false }
    : false
});

(async () => {
  try {
    const res = await pool.query('SELECT tablename FROM pg_tables WHERE schemaname = $1', ['public']);
    console.log('TABLES:', res.rows.map((r) => r.tablename));
  } catch (error) {
    console.error('DB ERROR:', error);
  } finally {
    await pool.end();
  }
})();
