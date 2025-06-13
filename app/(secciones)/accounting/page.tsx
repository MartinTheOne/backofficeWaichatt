import { ICustomerInvoices } from "@/types/ICustomerInvoices";
import ContabilidadComponent from "./accounting";
import { getIncome } from "@/lib/database/accounts";
import { getExpenses } from "@/lib/database/accounts";
import { getCustomerInvoices } from "@/lib/database/accounts";
import { getSupplierInvoices } from "@/lib/database/accounts";

export default async function AccountingPage() {
  let income: number = 0;
  let expenses: number = 0;
  let transactionsCustomer: ICustomerInvoices[] = [];
  try {
    //income
    const responseIncome = await getIncome();
    income = responseIncome;

    console.log('Income:', income);

    //expenses
    const responseExpense = await getExpenses();
    expenses =responseExpense

    //transactions Customer
    const responseCustomer = await getCustomerInvoices();
    const dataCustomer = responseCustomer;
    const normalizedCustomer = dataCustomer.map((item: any) => ({
      ...item,
      type: 'Ingreso',
      origin: 'customer',
    }));

    const responseSupplier = await getSupplierInvoices();
    const dataSupplier = responseSupplier;
    const normalizedSupplier = dataSupplier.map((item: any) => ({
      ...item,
      type: 'Egreso',
      origin: 'supplier',
    }));
    //setTransactionsCustomer(prev => [...prev, ...normalized]);
    transactionsCustomer = [...normalizedCustomer, ...normalizedSupplier];


  } catch (error) {
    console.error('Error fetching income:', error);
  }



  return (
    <ContabilidadComponent expenses={expenses} income={income} transactionsCustomer={transactionsCustomer} />

  )
}