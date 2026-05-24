const fs = require("fs");
const path = require("path");
const sqlite3 = require("sqlite3").verbose();

const ROOT_DIR = process.cwd();
const DATA_DIR = path.join(ROOT_DIR, "data");
const DB_PATH = path.join(DATA_DIR, "pet_care.db");

fs.mkdirSync(DATA_DIR, { recursive: true });

let db;
let initialized;

function getDb() {
  if (!db) {
    db = new sqlite3.Database(DB_PATH);
  }
  return db;
}

function run(sql, params = []) {
  return new Promise((resolve, reject) => {
    getDb().run(sql, params, function onRun(error) {
      if (error) {
        reject(error);
        return;
      }
      resolve({ id: this.lastID, changes: this.changes });
    });
  });
}

function all(sql, params = []) {
  return new Promise((resolve, reject) => {
    getDb().all(sql, params, (error, rows) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(rows);
    });
  });
}

function get(sql, params = []) {
  return new Promise((resolve, reject) => {
    getDb().get(sql, params, (error, row) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(row);
    });
  });
}

const defaultServices = [
  {
    slug: "basic",
    title: "基础洗香香",
    badge: "轻护理",
    icon: "shower-head",
    price: 88,
    summary: "适合日常清洁、短毛宠物和洗护习惯稳定的小朋友。",
    details: "基础沐浴与吹干｜耳道清洁与指甲修剪｜脚底毛和肛门腺护理"
  },
  {
    slug: "care",
    title: "全套焕毛护理",
    badge: "热门选择",
    icon: "wind",
    price: 168,
    summary: "适合换季掉毛、长毛蓬松、需要深层梳理的猫狗。",
    details: "基础洗护全部项目｜去浮毛与毛结梳理｜护毛素与皮肤观察记录"
  },
  {
    slug: "style",
    title: "美容修剪",
    badge: "造型升级",
    icon: "scissors",
    price: 238,
    summary: "适合需要脸型、身体线条、脚型尾型精修的宠物。",
    details: "全套洗护与吹造｜局部或全身造型修剪｜完成后照片反馈"
  },
  {
    slug: "health",
    title: "健康记录",
    badge: "护理反馈",
    icon: "shield-check",
    price: 128,
    summary: "护理结束反馈皮肤、耳道、牙龈、指甲和毛结情况，方便持续观察。",
    details: "皮肤与耳道观察｜指甲和牙龈提醒｜下次护理建议"
  }
];

const defaultReviews = [
  {
    customer_name: "奶油的主人",
    pet_name: "奶油",
    rating: 5,
    content: "之前洗澡特别抗拒，这次美容师会慢慢安抚，还把耳朵问题拍照提醒了，真的细心。"
  },
  {
    customer_name: "豆包的主人",
    pet_name: "豆包",
    rating: 5,
    content: "长毛猫吹干很费劲，接回时底层毛也是干爽蓬松的，家里少飞好多毛。"
  },
  {
    customer_name: "可乐的主人",
    pet_name: "可乐",
    rating: 5,
    content: "修剪前会反复确认样子，不会一剪刀变陌生狗。圆脸剪得很自然。"
  }
];

async function initializeDatabase() {
  if (!initialized) {
    initialized = (async () => {
      await run(`
        CREATE TABLE IF NOT EXISTS services (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          slug TEXT NOT NULL UNIQUE,
          title TEXT NOT NULL,
          badge TEXT NOT NULL,
          icon TEXT NOT NULL,
          price INTEGER NOT NULL,
          summary TEXT NOT NULL,
          details TEXT NOT NULL,
          created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
        )
      `);

      await run(`
        CREATE TABLE IF NOT EXISTS bookings (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          owner_name TEXT NOT NULL,
          phone TEXT NOT NULL,
          pet_type TEXT NOT NULL,
          pet_size TEXT NOT NULL,
          service_id INTEGER NOT NULL,
          visit_date TEXT NOT NULL,
          note TEXT,
          estimated_price INTEGER NOT NULL,
          created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (service_id) REFERENCES services(id)
        )
      `);

      await run(`
        CREATE TABLE IF NOT EXISTS reviews (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          customer_name TEXT NOT NULL,
          pet_name TEXT,
          rating INTEGER NOT NULL DEFAULT 5,
          content TEXT NOT NULL,
          created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
        )
      `);

      const serviceCount = await get("SELECT COUNT(*) AS count FROM services");
      if (serviceCount.count === 0) {
        for (const service of defaultServices) {
          await run(
            `INSERT INTO services (slug, title, badge, icon, price, summary, details)
             VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [service.slug, service.title, service.badge, service.icon, service.price, service.summary, service.details]
          );
        }
      }

      const reviewCount = await get("SELECT COUNT(*) AS count FROM reviews");
      if (reviewCount.count === 0) {
        for (const review of defaultReviews) {
          await run(
            `INSERT INTO reviews (customer_name, pet_name, rating, content)
             VALUES (?, ?, ?, ?)`,
            [review.customer_name, review.pet_name, review.rating, review.content]
          );
        }
      }
    })();
  }

  return initialized;
}

function estimatePrice(servicePrice, petType, petSize) {
  const sizeAdds = {
    small: 0,
    medium: 50,
    large: 110
  };
  const catAdd = petType === "cat" ? 30 : 0;
  return servicePrice + (sizeAdds[petSize] ?? 0) + catAdd;
}

module.exports = {
  all,
  DB_PATH,
  estimatePrice,
  get,
  initializeDatabase,
  run
};
