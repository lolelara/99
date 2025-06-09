const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function testConnection() {
  try {
    const client = await pool.connect();
    console.log('✅ تم الاتصال بقاعدة البيانات بنجاح');
    
    // اختبار الاستعلام
    const result = await client.query('SELECT NOW()');
    console.log('⏰ وقت قاعدة البيانات:', result.rows[0].now);
    
    // التحقق من الجداول
    const tables = await client.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
    `);
    
    console.log('\n📋 الجداول الموجودة:');
    tables.rows.forEach(table => {
      console.log(`- ${table.table_name}`);
    });
    
    client.release();
  } catch (err) {
    console.error('❌ فشل الاتصال بقاعدة البيانات:', err.message);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

testConnection(); 