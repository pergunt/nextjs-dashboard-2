'use server';

import { revalidatePath } from 'next/cache';
import {deleteInvoice as mDeleteInvoice} from '../model/invoicesModel'

export async function deleteInvoice(id: string) {
  await mDeleteInvoice(id)

  revalidatePath('/dashboard/invoices');
}
