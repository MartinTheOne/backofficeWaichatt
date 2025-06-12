import { NextResponse } from "next/server";
import { getCustomerInvoices } from "@/lib/database/accounts";

export async function GET() {
  const customer = await getCustomerInvoices();
  return NextResponse.json({ customer });
}
