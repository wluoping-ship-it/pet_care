import { NextResponse } from "next/server";
import { all, initializeDatabase } from "../../../lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await initializeDatabase();
    const reviews = await all("SELECT * FROM reviews ORDER BY created_at DESC, id DESC LIMIT 12");
    return NextResponse.json(reviews);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "用户评价暂时无法加载。" }, { status: 500 });
  }
}
