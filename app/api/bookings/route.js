import { NextResponse } from "next/server";
import { estimatePrice, get, initializeDatabase, run } from "../../../lib/db";

export const dynamic = "force-dynamic";

export async function POST(request) {
  try {
    await initializeDatabase();
    const { owner, phone, pet, size, serviceId, date, note } = await request.json();

    if (!owner || !phone || !pet || !size || !serviceId || !date) {
      return NextResponse.json({ message: "请填写完整的预约信息。" }, { status: 400 });
    }

    const service = await get("SELECT id, price FROM services WHERE id = ?", [Number(serviceId)]);
    if (!service) {
      return NextResponse.json({ message: "请选择有效的护理套餐。" }, { status: 400 });
    }

    const estimatedPrice = estimatePrice(service.price, pet, size);
    const result = await run(
      `INSERT INTO bookings
        (owner_name, phone, pet_type, pet_size, service_id, visit_date, note, estimated_price)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [owner.trim(), phone.trim(), pet, size, service.id, date, (note || "").trim(), estimatedPrice]
    );

    return NextResponse.json(
      {
        id: result.id,
        estimatedPrice,
        message: "预约信息已记录，门店会尽快联系确认。"
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "服务器暂时开小差了，请稍后再试。" }, { status: 500 });
  }
}
