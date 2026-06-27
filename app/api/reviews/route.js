import { NextResponse } from "next/server";
import { listReviews } from "../../../lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const reviews = await listReviews();
    return NextResponse.json(reviews);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "用户评价暂时无法加载。" }, { status: 500 });
  }
}
