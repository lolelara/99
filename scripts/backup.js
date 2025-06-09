const { exec } = require('child_process');
const { promisify } = require('util');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const execAsync = promisify(exec);

async function createBackup() {
  try {
    // إنشاء مجلد للنسخ الاحتياطي إذا لم يكن موجوداً
    const backupDir = path.join(__dirname, '../backups');
    if (!fs.existsSync(backupDir)) {
      fs.mkdirSync(backupDir);
    }

    // إنشاء اسم الملف بناءً على التاريخ والوقت
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `backup-${timestamp}.sql`;
    const filepath = path.join(backupDir, filename);

    // استخراج معلومات الاتصال من DATABASE_URL
    const url = new URL(process.env.DATABASE_URL);
    const host = url.hostname;
    const port = url.port;
    const database = url.pathname.slice(1);
    const username = url.username;
    const password = url.password;

    // تنفيذ أمر النسخ الاحتياطي
    console.log('🔄 جاري إنشاء نسخة احتياطية...');
    
    const command = `pg_dump -h ${host} -p ${port} -U ${username} -d ${database} -F p > "${filepath}"`;
    const env = { ...process.env, PGPASSWORD: password };
    
    await execAsync(command, { env });

    console.log(`✅ تم إنشاء النسخة الاحتياطية بنجاح في: ${filepath}`);

    // حذف النسخ الاحتياطية القديمة (الاحتفاظ بآخر 5 نسخ)
    const files = fs.readdirSync(backupDir)
      .filter(file => file.startsWith('backup-'))
      .sort()
      .reverse();

    if (files.length > 5) {
      files.slice(5).forEach(file => {
        fs.unlinkSync(path.join(backupDir, file));
        console.log(`🗑️ تم حذف النسخة القديمة: ${file}`);
      });
    }

  } catch (err) {
    console.error('❌ فشل إنشاء النسخة الاحتياطية:', err.message);
    process.exit(1);
  }
}

// تشغيل النسخ الاحتياطي
createBackup(); 