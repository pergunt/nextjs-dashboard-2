import {sql} from "@/app/lib/data";

interface ICreateInvoice {
  customerId: string;
  amountInCents: number
  status: string
  date: string
}

export const createInvoice = (args: ICreateInvoice) => {
  return sql`
      INSERT INTO invoices (customer_id, amount, status, date)
      VALUES (${args.customerId}, ${args.amountInCents}, ${args.status}, ${args.date})
    `;
}
