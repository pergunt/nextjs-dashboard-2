import {sql} from "@/app/lib/data";

interface ICreateInvoice {
  customerId: string;
  amountInCents: number
  status: string
  id: string
}

export const updateInvoice = (args: ICreateInvoice) => {
  return sql`
    UPDATE invoices
        SET customer_id = ${args.customerId}, amount = ${args.amountInCents}, status = ${args.status}
    WHERE id = ${args.id}
  `;
}
