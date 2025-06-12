export interface ICustomerInvoices {
  id: number;
  name: string;
  amount_total: number;
  invoice_date: string;
    partner_id: [
        id: number,
        name: string
    ];
    type: 'Ingreso' | 'Egreso';
}