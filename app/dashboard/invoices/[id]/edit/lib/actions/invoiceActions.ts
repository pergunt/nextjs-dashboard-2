'use server';

import * as invoiceModel from '../model/invoiceModel'
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import {InvoiceSchema} from '../../../../lib'

const UpdateInvoice = InvoiceSchema.omit({ id: true, date: true });


export interface ActionState {
  errors?: {
    customerId?: string[];
    amount?: string[];
    status?: string[];
  };
  message?: string | null;
}

export async function updateInvoice(id: string, prevState: ActionState, formData: FormData) {
  const validatedFields = UpdateInvoice.safeParse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update Invoice.',
    };
  }

  const { customerId, amount, status } = validatedFields.data

  const amountInCents = amount * 100;

  try {
    await invoiceModel.updateInvoice({
      customerId,
      amountInCents,
      status,
      id
    })

    revalidatePath('/dashboard/invoices');
  } catch (error) {
    // We'll also log the error to the console for now
    console.error(error);
    return { message: 'Database Error: Failed to Update Invoice.' };
  }

  redirect('/dashboard/invoices');
}
