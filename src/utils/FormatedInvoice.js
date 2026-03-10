export const formatInvoiceData = (invoiceData = {}) => {
  const {
    invoiceTitle = "",
    logo = "",
    invoiceNumber = "",
    invoiceDate = "",
    dueDate = "",
    billTo = "",
    shipTo = "",
    items = [],
    bankName = "",
    accountNumber = "",
    ifsc = "",
    notes = "",
    taxRate = 0,
  } = invoiceData;

  const currencySymbol = "₹";

  const subtotal = items.reduce((acc, item) => {
    const qty = Number(item.qty) || 0;
    const price = Number(item.price) || 0;
    return acc + qty * price;
  }, 0);

  const taxAmount = (subtotal * taxRate) / 100;
  const grandTotal = subtotal + taxAmount;

  return {
    invoiceTitle,
    logo,
    invoiceNumber,
    invoiceDate,
    dueDate,
    billTo,
    shipTo,
    items,

    bankName,
    accountNumber,
    ifsc,

    notes,
    taxRate,
    subtotal,
    taxAmount,
    grandTotal,
    currencySymbol,
  };
};


export const formateDate = (dateStr) => { 
  if (!dateStr) return "";
  const date = new Date(dateStr);
  date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};
