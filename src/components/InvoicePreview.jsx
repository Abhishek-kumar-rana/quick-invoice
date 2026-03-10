import React, { forwardRef } from 'react'
import { formatInvoiceData } from '../utils/FormatedInvoice'
import { templateComponents } from '../utils/InvoiceTemplate';

const InvoicePreview = forwardRef(({invoiceData, template}, ref) => {

  const data= formatInvoiceData(invoiceData);
  const Temp= templateComponents[template] || templateComponents["template1"]; // Default to Templatee1 if template not found
  return (
    <div ref={ref}>
      <div>
        <Temp data={data}/>
      </div>
    </div>
  )
})

export default InvoicePreview