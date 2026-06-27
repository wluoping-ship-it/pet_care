import { NextResponse } from "next/server";
import { createBooking, estimatePrice, getServiceById } from "../../../lib/db";

export const dynamic = "force-dynamic";

export async function POST(request) {
  try {
    const { owner, phone, pet, size, serviceId, date, visitTime, note } = await request.json();

    if (!owner || !phone || !pet || !size || !serviceId || !date) {
      return NextResponse.json({ message: "请填写完整的预约信息。" }, { status: 400 });
    }

    const service = await getServiceById(serviceId);
    if (!service) {
      return NextResponse.json({ message: "请选择有效的护理套餐。" }, { status: 400 });
    }

    const estimatedPrice = estimatePrice(service.price, pet, size);
    const result = await createBooking({
      owner,
      phone,
      pet,
      size,
      serviceId: service.id,
      date,
      visitTime,
      note,
      estimatedPrice
    });

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
