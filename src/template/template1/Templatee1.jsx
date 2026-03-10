import React from "react";
import "./Templatee1.css";

const Templatee1 = ({ data }) => {
  if (!data) return null;

  const {
    invoiceTitle,
    invoiceNumber,
    invoiceDate,
    dueDate,
    billTo,
    shipTo,
    logo,
    items,
    bankName,
    accountNumber,
    ifsc,
    notes,
    taxRate,
    subtotal,
    taxAmount,
    grandTotal,
    currencySymbol = "₹",
  } = data;

  return (
    <div className="invoice-container">
      {/* HEADER */}
      <div className="invoice-header">
        <div className="invoice-brand">
          {logo ? (
            <img src={logo} alt="Logo" className="invoice-logo" />
          ) : (
            <div className="logo-placeholder">LOGO</div>
          )}
          <h1>{invoiceTitle}</h1>
        </div>

        <div className="invoice-meta">
          <p><strong>Invoice No:</strong> {invoiceNumber}</p>
          <p><strong>Date:</strong> {invoiceDate}</p>
          <p><strong>Due Date:</strong> {dueDate}</p>
        </div>
      </div>

      <hr />

      {/* BILLING */}
      <div className="invoice-address">
        <div>
          <h4>Bill To</h4>
          <p>{billTo || "—"}</p>
        </div>

        <div>
          <h4>Ship To</h4>
          <p>{shipTo || "—"}</p>
        </div>
      </div>

      {/* ITEMS */}
      <div className="table-wrapper">
        <table className="invoice-table">
          <thead>
            <tr>
              <th>Item</th>
              <th>Qty</th>
              <th>Price</th>
              <th>Total</th>
            </tr>
          </thead>

          <tbody>
            {items.map((item, index) => (
              <tr key={index}>
                <td>{item.name || "Item"}</td>
                <td>{item.qty}</td>
                <td>{currencySymbol}{item.price}</td>
                <td>{currencySymbol}{item.qty * item.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* TOTALS */}
      <div className="invoice-totals">
        <p>Subtotal: {currencySymbol}{subtotal}</p>
        <p>Tax ({taxRate}%): {currencySymbol}{taxAmount}</p>
        <h3>Grand Total: {currencySymbol}{grandTotal}</h3>
      </div>

      <hr />

      {/* BANK DETAILS */}
      <div className="invoice-section">
        <h4>Bank Details</h4>
        <p><strong>Bank:</strong> {bankName || "—"}</p>
        <p><strong>Account No:</strong> {accountNumber || "—"}</p>
        <p><strong>IFSC:</strong> {ifsc || "—"}</p>
      </div>

      {/* NOTES */}
      {notes && (
        <div className="invoice-section">
          <h4>Notes</h4>
          <p>{notes}</p>
        </div>
      )}
    </div>
  );
};

export default Templatee1;