const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });
const { Pool } = require('pg');
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

(async () => {
  try {
    const current = await pool.query('SELECT current_user, session_user');
    console.log('CURRENT USER', current.rows);
    const tables = await pool.query("SELECT tablename FROM pg_tables WHERE schemaname='public'");
    console.log('TABLES', tables.rows.map((r) => r.tablename));
    const priv = await pool.query(
      `SELECT nspname, has_schema_privilege(current_user, nspname, 'CREATE') AS can_create,
              has_schema_privilege(current_user, nspname, 'USAGE') AS can_usage
       FROM pg_namespace
       WHERE nspname = 'public'`
    );
    console.log('PUBLIC SCHEMA PRIVILEGES', priv.rows);
  } catch (error) {
    console.error('PROBE ERROR', error);
    process.exit(1);
  } finally {
    await pool.end();
  }
})();
