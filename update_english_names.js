const mysql = require('mysql2/promise');

const updates = [
  { id: 8, name: "Clagrel Tab." },
  { id: 9, name: "Antigra Tab." },
  { id: 10, name: "Antigra ER Tab." },
  { id: 11, name: "Newmapro Tab." },
  { id: 12, name: "Newspirin Enteric-coated Tab." },
  { id: 13, name: "Aronopin Tab." },
  { id: 14, name: "Twinmax Tab." },
  { id: 15, name: "Disforge Tab." },
  { id: 16, name: "Sevetension Tab." },
  { id: 17, name: "Neurozartan Tab." },
  { id: 18, name: "Pretension Tab." },
  { id: 19, name: "Pretension Plus Tab." },
  { id: 20, name: "Olmertan Plus Tab." },
  { id: 21, name: "Neurozartan Plus Tab." },
  { id: 22, name: "Cardilon Tab." },
  { id: 23, name: "Creswoo Tab." },
  { id: 24, name: "Ridustar Tab." },
  { id: 25, name: "Vytozet Tab." },
  { id: 26, name: "Socotozet Tab." },
  { id: 27, name: "Januglip Tab." },
  { id: 28, name: "Janumet Tab." },
  { id: 29, name: "Janudapa Tab." },
  { id: 30, name: "Actostar Tab." },
  { id: 31, name: "Glimepiride Tab." },
  { id: 32, name: "Thioctacid HR Tab." },
  { id: 33, name: "Pracas Tab." },
  { id: 34, name: "Erdos Cap." },
  { id: 35, name: "Alestin Tab." },
  { id: 36, name: "Mucostein Tab." },
  { id: 37, name: "Pelaum Tab." },
  { id: 38, name: "Levodrop Tab." },
  { id: 39, name: "Cetirizine Tab." },
  { id: 40, name: "Allezin Tab." },
  { id: 41, name: "Diestil Tab." },
  { id: 42, name: "Nexiazen Tab." },
  { id: 43, name: "Nexia MD Tab." },
  { id: 44, name: "Parabe Tab." },
  { id: 45, name: "Mosapri Tab." },
  { id: 46, name: "Rebasoron Tab." },
  { id: 47, name: "Famotidine Tab." },
  { id: 48, name: "Almagel Tab." },
  { id: 49, name: "Tamsulosin ER Tab." },
  { id: 50, name: "Terazosin Tab." },
  { id: 51, name: "Olmenesin Tab." },
  { id: 52, name: "Proberin Tab." },
  { id: 53, name: "Mirabegron ER Tab." },
  { id: 54, name: "Dutasteride Cap." },
  { id: 55, name: "Gliarin Soft Cap." },
  { id: 56, name: "Dimendone Tab." },
  { id: 57, name: "Memantine Tab." },
  { id: 58, name: "Dimencoline Tab." },
  { id: 59, name: "Serocetin Cap." },
  { id: 60, name: "Quetiapine Tab." },
  { id: 61, name: "Gabatipon Cap." },
  { id: 62, name: "Pregaba Cap." },
  { id: 63, name: "Esclor Cap." },
  { id: 64, name: "Pixima Cap." },
  { id: 65, name: "Clarithromycin Tab." },
  { id: 66, name: "Hirevo Tab." },
  { id: 67, name: "Aciver Tab." },
  { id: 68, name: "Lamisil Tab." },
  { id: 69, name: "Diflucan Cap." },
  { id: 70, name: "Layla Tab." },
  { id: 71, name: "Seclope Tab." },
  { id: 72, name: "Meloxicam Cap." },
  { id: 73, name: "Loxodrin Tab." },
  { id: 74, name: "Dexibuprofen Tab." },
  { id: 75, name: "Goodtracet Tab." },
  { id: 76, name: "Goodtracet Semi Tab." },
  { id: 77, name: "Celecox Cap." }
];

async function run() {
  const pool = mysql.createPool({ host: 'localhost', user: 'root', password: 'ektks0518!', database: 'dasan_homepage' });
  
  for (const item of updates) {
    await pool.query('UPDATE products SET english_name = ?, updated_by = ? WHERE id = ?', [item.name, 'AI Assistant', item.id]);
    console.log(`Updated ID ${item.id} -> ${item.name}`);
  }
  
  console.log('All 70 products updated successfully.');
  pool.end();
}

run().catch(console.error);
