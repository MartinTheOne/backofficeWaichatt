import axios from "axios";
import { ISuppliesInvoices } from "@/types//ISuppliesInvoices"
import { ICustomerInvoices } from "@/types/ICustomerInvoices";

const getIdsInvoices = async (): Promise<string[]> => {
  try {
    const response = await axios.post("https://waichatt.odoo.com/jsonrpc", {
      jsonrpc: "2.0",
      method: "call",
      params: {
        service: "object",
        method: "execute_kw",
        args: [
          "waichatt",
          2,
          "d20d62536b471088e0c593abd09f45705646cbc4",
          "account.account",
          "search",
          [[["account_type", "in", ["income", "income_other"]]]],
        ],
      },
      id: 2,
    });

    return response.data.result.map((id: number) => id.toString());
  } catch (error) {
    console.error("Error fetching invoice IDs:", error);
    return [];
  }
};


export const getIncome = async (): Promise<number> => {
  try {
    const ids = await getIdsInvoices();
    if (ids.length === 0) return 0;

    const response = await axios.post("https://waichatt.odoo.com/jsonrpc", {
      jsonrpc: "2.0",
      method: "call",
      params: {
        service: "object",
        method: "execute_kw",
        args: [
          "waichatt",
          2,
          "d20d62536b471088e0c593abd09f45705646cbc4",
          "account.move.line",
          "read_group",
          [
            [
              ["account_id", "in", ids.map(Number)], // <-- Odoo espera numbers, no strings
              ["move_id.state", "=", "posted"],
              ["date", ">=", "2024-01-01"],
            ],
          ],
          {
            fields: ["credit", "debit"],
            groupby: [],
          },
        ],
      },
      id: 5,
    });

    const result = response.data.result;
    if (Array.isArray(result) && result.length > 0) {
      return result[0].credit || 0;
    }

    return 0;
  } catch (error) {
    console.error("Error fetching income:", error);
    return 0;
  }
};


const getIdExpenses = async (): Promise<string[]> => {
  try {
    const response = await axios.post("https://waichatt.odoo.com/jsonrpc", {
    "jsonrpc": "2.0",
    "method": "call",
    "params": {
      "service": "object",
      "method": "execute_kw",
      "args": [
        "waichatt",
        2,
        "d20d62536b471088e0c593abd09f45705646cbc4",
        "account.account",
        "search",
        [[["account_type", "in", ["expense", "expense_depreciation", "expense_direct_cost"]]]]
      ]
    },
    "id": 3
  });

    return response.data.result.map((id: number) => id.toString());
  } catch (error) {
    console.error("Error fetching expense IDs:", error);
    return [];
  }
}


export const getExpenses = async (): Promise<number> => {
  try {
    const ids = await getIdExpenses();
    if (ids.length === 0) return 0;

    const response = await axios.post("https://waichatt.odoo.com/jsonrpc", {
      jsonrpc: "2.0",
      method: "call",
      params: {
        service: "object",
        method: "execute_kw",
        args: [
          "waichatt",
          2,
          "d20d62536b471088e0c593abd09f45705646cbc4",
          "account.move.line",
          "search_read",
          [
            [
              ["account_id", "in", ids.map(Number)],
              ["move_id.state", "=", "posted"],
              ["date", ">=", "2024-01-01"]
            ]
          ],
          { fields: ["credit", "debit"] }
        ]
      },
      id: 6
    });

    const result = response.data.result;
    if (!Array.isArray(result)) return 0;

    // Sumá los debits como un campeón
    const total = result.reduce((acc, item) => acc + (item.debit || 0), 0);
    return total;
  } catch (error) {
    console.error("Error fetching expenses:", error);
    return 0;
  }
};


export const getCustomerInvoices = async (): Promise<ICustomerInvoices[]> => {
  try {
    const response = await axios.post("https://waichatt.odoo.com/jsonrpc", {
      jsonrpc: "2.0",
      method: "call",
      params: {
        service: "object",
        method: "execute_kw",
        args: [
          "waichatt",
          2,
          "d20d62536b471088e0c593abd09f45705646cbc4",
          "account.move",
          "search_read",
          [
            [
              ["move_type", "=", "out_invoice"], // Facturas de cliente
              ["state", "=", "posted"]           // Solo facturas validadas
            ]
          ],
          { 
            fields: ["id", "name", "amount_total", "invoice_date", "partner_id"] 
          }
        ]
      },
      id: 7
    });

    return response.data.result;
  } catch (error) {
    console.error("Error fetching customer invoices:", error);
    return [];
  }
};


export const getSupplierInvoices = async (): Promise<ISuppliesInvoices[]> => {
  try {
    const response = await axios.post("https://waichatt.odoo.com/jsonrpc", {
      jsonrpc: "2.0",
      method: "call",
      params: {
        service: "object",
        method: "execute_kw",
        args: [
          "waichatt",
          2,
          "d20d62536b471088e0c593abd09f45705646cbc4",
          "account.move",
          "search_read",
          [
            [
              ["move_type", "=", "in_invoice"], // Facturas de proveedor
              ["state", "=", "posted"]          // Solo facturas validadas
            ]
          ],
          { 
            fields: ["id", "name", "amount_total", "invoice_date", "partner_id"] 
          }
        ]
      },
      id: 8
    });

    return response.data.result;
  } catch (error) {
    console.error("Error fetching supplier invoices:", error);
    return [];
  }
};
