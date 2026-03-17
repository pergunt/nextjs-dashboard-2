'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import * as invoiceModel from '../model/invoiceModel'
import {InvoiceSchema} from '../../../lib'

const CreateInvoice = InvoiceSchema.omit({ id: true, date: true });

export interface ActionState {
  errors?: {
    customerId?: string[];
    amount?: string[];
    status?: string[];
  };
  message?: string | null;
}

export async function createInvoice(prevState: ActionState, formData: FormData) {
  const validatedFields = CreateInvoice.safeParse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Invoice.',
    };
  }

  const { customerId, amount, status } = validatedFields.data

  const amountInCents = amount * 100;
  const date = new Date().toISOString().split('T')[0];

  try {
    await invoiceModel.createInvoice({
      customerId,
      amountInCents,
      status,
      date
    })

    revalidatePath('/dashboard/invoices')
  } catch(error) {
    // We'll also log the error to the console for now
    console.error(error);
    return {
      message: 'Database Error: Failed to Create Invoice.',
    };
  }

  redirect('/dashboard/invoices');
}
