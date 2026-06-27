import fs from "fs";
import path from "path";
import sqlite3Package from "sqlite3";
import { getDatabase } from "@netlify/database";

const ROOT_DIR = process.cwd();
const DATA_DIR = path.join(ROOT_DIR, "data");
const DB_PATH = path.join(DATA_DIR, "pet_care.db");
const isNetlify =
  process.env.NETLIFY === "true" ||
  Boolean(process.env.AWS_LAMBDA_FUNCTION_NAME) ||
  Boolean(process.env.NETLIFY_DATABASE_URL);
const sqlite3 = sqlite3Package.verbose();

if (!isNetlify) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

let sqliteDb;
let initialized;

function getSqliteDb() {
  if (!sqliteDb) {
    sqliteDb = new sqlite3.Database(DB_PATH);
  }
  return sqliteDb;
}

function sqliteRun(sql, params = []) {
  return new Promise((resolve, reject) => {
    getSqliteDb().run(sql, params, function onRun(error) {
      if (error) {
        reject(error);
        return;
      }
      resolve({ id: this.lastID, changes: this.changes });
    });
  });
}

function sqliteAll(sql, params = []) {
  return new Promise((resolve, reject) => {
    getSqliteDb().all(sql, params, (error, rows) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(rows);
    });
  });
}

function sqliteGet(sql, params = []) {
  return new Promise((resolve, reject) => {
    getSqliteDb().get(sql, params, (error, row) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(row);
    });
  });
}

const defaultServices = [
  ["basic", "基础洗香香", "轻护理", "shower-head", 88, "适合日常清洁、短毛宠物和洗护习惯稳定的小朋友。", "基础沐浴与吹干｜耳道清洁与指甲修剪｜脚底毛和肛门腺护理"],
  ["care", "全套焕毛护理", "热门选择", "wind", 168, "适合换季掉毛、长毛蓬松、需要深层梳理的猫狗。", "基础洗护全部项目｜去浮毛与毛结梳理｜护毛素与皮肤观察记录"],
  ["style", "美容修剪", "造型升级", "scissors", 238, "适合需要脸型、身体线条、脚型尾型精修的宠物。", "全套洗护与吹造｜局部或全身造型修剪｜完成后照片反馈"],
  ["health", "健康记录", "护理反馈", "shield-check", 128, "护理结束反馈皮肤、耳道、牙龈、指甲和毛结情况，方便持续观察。", "皮肤与耳道观察｜指甲和牙龈提醒｜下次护理建议"]
];

const defaultReviews = [
  ["奶油的主人", "奶油", 5, "之前洗澡特别抗拒，这次美容师会慢慢安抚，还把耳朵问题拍照提醒了，真的细心。"],
  ["豆包的主人", "豆包", 5, "长毛猫吹干很费劲，接回时底层毛也是干爽蓬松的，家里少飞好多毛。"],
  ["可乐的主人", "可乐", 5, "修剪前会反复确认样子，不会一剪刀变陌生狗。圆脸剪得很自然。"]
];

export async function initializeDatabase() {
  if (isNetlify) {
    return;
  }

  if (!initialized) {
    initialized = (async () => {
      await sqliteRun(`
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

      await sqliteRun(`
        CREATE TABLE IF NOT EXISTS bookings (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          owner_name TEXT NOT NULL,
          phone TEXT NOT NULL,
          pet_type TEXT NOT NULL,
          pet_size TEXT NOT NULL,
          service_id INTEGER NOT NULL,
          visit_date TEXT NOT NULL,
          visit_time TEXT,
          note TEXT,
          estimated_price INTEGER NOT NULL,
          created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (service_id) REFERENCES services(id)
        )
      `);

      const bookingColumns = await sqliteAll("PRAGMA table_info(bookings)");
      if (!bookingColumns.some((column) => column.name === "visit_time")) {
        await sqliteRun("ALTER TABLE bookings ADD COLUMN visit_time TEXT");
      }

      await sqliteRun(`
        CREATE TABLE IF NOT EXISTS reviews (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          customer_name TEXT NOT NULL,
          pet_name TEXT,
          rating INTEGER NOT NULL DEFAULT 5,
          content TEXT NOT NULL,
          created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
        )
      `);

      const serviceCount = await sqliteGet("SELECT COUNT(*) AS count FROM services");
      if (serviceCount.count === 0) {
        for (const service of defaultServices) {
          await sqliteRun(
            `INSERT INTO services (slug, title, badge, icon, price, summary, details)
             VALUES (?, ?, ?, ?, ?, ?, ?)`,
            service
          );
        }
      }

      const reviewCount = await sqliteGet("SELECT COUNT(*) AS count FROM reviews");
      if (reviewCount.count === 0) {
        for (const review of defaultReviews) {
          await sqliteRun(
            `INSERT INTO reviews (customer_name, pet_name, rating, content)
             VALUES (?, ?, ?, ?)`,
            review
          );
        }
      }
    })();
  }

  return initialized;
}

export async function listServices() {
  if (isNetlify) {
    return getDatabase().sql`SELECT * FROM services ORDER BY price ASC`;
  }
  await initializeDatabase();
  return sqliteAll("SELECT * FROM services ORDER BY price ASC");
}

export async function listReviews() {
  if (isNetlify) {
    return getDatabase().sql`SELECT * FROM reviews ORDER BY created_at DESC, id DESC LIMIT 12`;
  }
  await initializeDatabase();
  return sqliteAll("SELECT * FROM reviews ORDER BY created_at DESC, id DESC LIMIT 12");
}

export async function getServiceById(id) {
  if (isNetlify) {
    const [service] = await getDatabase().sql`SELECT id, price FROM services WHERE id = ${Number(id)}`;
    return service;
  }
  await initializeDatabase();
  return sqliteGet("SELECT id, price FROM services WHERE id = ?", [Number(id)]);
}

export async function createBooking({ owner, phone, pet, size, serviceId, date, visitTime, note, estimatedPrice }) {
  if (isNetlify) {
    const [booking] = await getDatabase().sql`
      INSERT INTO bookings
        (owner_name, phone, pet_type, pet_size, service_id, visit_date, visit_time, note, estimated_price)
      VALUES
        (${owner.trim()}, ${phone.trim()}, ${pet}, ${size}, ${serviceId}, ${date}, ${visitTime || null}, ${(note || "").trim()}, ${estimatedPrice})
      RETURNING id
    `;
    return booking;
  }

  await initializeDatabase();
  return sqliteRun(
    `INSERT INTO bookings
      (owner_name, phone, pet_type, pet_size, service_id, visit_date, visit_time, note, estimated_price)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [owner.trim(), phone.trim(), pet, size, serviceId, date, visitTime || null, (note || "").trim(), estimatedPrice]
  );
}

export function estimatePrice(servicePrice, petType, petSize) {
  const sizeAdds = { small: 0, medium: 50, large: 110 };
  const catAdd = petType === "cat" ? 30 : 0;
  return Number(servicePrice) + (sizeAdds[petSize] ?? 0) + catAdd;
}

export { DB_PATH };
