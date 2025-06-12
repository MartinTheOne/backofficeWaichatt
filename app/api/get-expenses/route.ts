import { NextResponse } from "next/server";
import { getExpenses } from "@/lib/database/accounts";

export async function GET() {
  const expenses = await getExpenses();
  return NextResponse.json({ expenses });
}
