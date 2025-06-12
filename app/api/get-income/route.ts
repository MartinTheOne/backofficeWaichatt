import { NextResponse } from "next/server";
import { getIncome } from "@/lib/database/accounts";

export async function GET() {
  const income = await getIncome();
  return NextResponse.json({ income });
}
