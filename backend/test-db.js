const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });
const { Pool } = require('pg');
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

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
