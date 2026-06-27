CREATE TABLE IF NOT EXISTS services (
  id BIGSERIAL PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  badge TEXT NOT NULL,
  icon TEXT NOT NULL,
  price INTEGER NOT NULL,
  summary TEXT NOT NULL,
  details TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS bookings (
  id BIGSERIAL PRIMARY KEY,
  owner_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  pet_type TEXT NOT NULL,
  pet_size TEXT NOT NULL,
  service_id BIGINT NOT NULL REFERENCES services(id),
  visit_date DATE NOT NULL,
  visit_time TIME,
  note TEXT,
  estimated_price INTEGER NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS reviews (
  id BIGSERIAL PRIMARY KEY,
  customer_name TEXT NOT NULL,
  pet_name TEXT,
  rating INTEGER NOT NULL DEFAULT 5,
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

INSERT INTO services (slug, title, badge, icon, price, summary, details)
VALUES
  ('basic', '基础洗香香', '轻护理', 'shower-head', 88, '适合日常清洁、短毛宠物和洗护习惯稳定的小朋友。', '基础沐浴与吹干｜耳道清洁与指甲修剪｜脚底毛和肛门腺护理'),
  ('care', '全套焕毛护理', '热门选择', 'wind', 168, '适合换季掉毛、长毛蓬松、需要深层梳理的猫狗。', '基础洗护全部项目｜去浮毛与毛结梳理｜护毛素与皮肤观察记录'),
  ('style', '美容修剪', '造型升级', 'scissors', 238, '适合需要脸型、身体线条、脚型尾型精修的宠物。', '全套洗护与吹造｜局部或全身造型修剪｜完成后照片反馈'),
  ('health', '健康记录', '护理反馈', 'shield-check', 128, '护理结束反馈皮肤、耳道、牙龈、指甲和毛结情况，方便持续观察。', '皮肤与耳道观察｜指甲和牙龈提醒｜下次护理建议')
ON CONFLICT (slug) DO NOTHING;

INSERT INTO reviews (customer_name, pet_name, rating, content)
SELECT seed.customer_name, seed.pet_name, seed.rating, seed.content
FROM (
  VALUES
    ('奶油的主人', '奶油', 5, '之前洗澡特别抗拒，这次美容师会慢慢安抚，还把耳朵问题拍照提醒了，真的细心。'),
    ('豆包的主人', '豆包', 5, '长毛猫吹干很费劲，接回时底层毛也是干爽蓬松的，家里少飞好多毛。'),
    ('可乐的主人', '可乐', 5, '修剪前会反复确认样子，不会一剪刀变陌生狗。圆脸剪得很自然。')
) AS seed(customer_name, pet_name, rating, content)
WHERE NOT EXISTS (SELECT 1 FROM reviews);
