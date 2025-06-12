import { NextResponse } from "next/server";
import { getSupplierInvoices } from "@/lib/database/accounts";

export async function GET() {
  const supplier = await getSupplierInvoices();
  return NextResponse.json({ supplier });
}
