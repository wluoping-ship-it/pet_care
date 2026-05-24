import { NextResponse } from "next/server";
import { all, initializeDatabase } from "../../../lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await initializeDatabase();
    const services = await all("SELECT * FROM services ORDER BY price ASC");
    return NextResponse.json(services);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "服务项目暂时无法加载。" }, { status: 500 });
  }
}
