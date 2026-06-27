import { NextResponse } from "next/server";
import { listServices } from "../../../lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const services = await listServices();
    return NextResponse.json(services);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "服务项目暂时无法加载。" }, { status: 500 });
  }
}
