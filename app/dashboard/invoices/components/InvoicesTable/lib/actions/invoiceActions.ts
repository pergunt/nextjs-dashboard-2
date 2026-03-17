'use server';

import { revalidatePath } from 'next/cache';
import * as invoiceModel from '../model/invoicesModel'

export async function deleteInvoice(id: string) {
  await invoiceModel.deleteInvoice(id)

  revalidatePath('/dashboard/invoices');
}
