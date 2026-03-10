import React from "react";

const Templatee2 = ({ data }) => {
  if (!data) return null;

  const styles = {
  container: {
    maxWidth: "850px",
    margin: "auto",
    padding: "32px",
    background: "#ffffff",
    borderRadius: "16px",
    boxShadow: "0 12px 30px rgba(0,0,0,0.1)",
    fontFamily: "Inter, Arial, sans-serif",
  },

  header: {
    textAlign: "center",
  },

  logo: {
    width: "70px",
    height: "70px",
    objectFit: "contain",
    marginBottom: "10px",
  },

  logoPlaceholder: {
    width: "70px",
    height: "70px",
    margin: "0 auto 10px",
    background: "#f1f5f9",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "10px",
    border: "1px dashed #cbd5e1",
    color: "#64748b",
    fontSize: "12px",
  },

  title: {
    margin: "10px 0 4px",
  },

  subTitle: {
    color: "#64748b",
    marginBottom: "20px",
  },

  meta: {
    display: "flex",
    justifyContent: "space-between",
    margin: "30px 0",
    padding: "16px",
    background: "#f8fafc",
    borderRadius: "12px",
  },

  billSection: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "24px",
  },

  table: {
    width: "100%",
    borderCollapse: "collapse",
  },

  totalBox: {
    marginTop: "20px",
    textAlign: "right",
  },

  footer: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "30px",
    paddingTop: "20px",
    borderTop: "1px solid #e5e7eb",
  },
};

  const {
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
    currencySymbol = "₹",
  } = data;

  return (
    <div style={styles.container}>
      {/* HEADER */}
      <div style={styles.header}>
        {logo ? (
          <img src={logo} alt="Logo" style={styles.logo} />
        ) : (
          <div style={styles.logoPlaceholder}>LOGO</div>
        )}

        <h1 style={styles.title}>{invoiceTitle}</h1>
        <p style={styles.subTitle}>Invoice #{invoiceNumber}</p>
      </div>

      {/* META */}
      <div style={styles.meta}>
        <div>
          <p><strong>Invoice Date:</strong> {invoiceDate}</p>
          <p><strong>Due Date:</strong> {dueDate}</p>
        </div>
        <div>
          <p><strong>Total:</strong></p>
          <h2>{currencySymbol}{grandTotal}</h2>
        </div>
      </div>

      {/* BILL INFO */}
      <div style={styles.billSection}>
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
      <table style={styles.table}>
        <thead>
          <tr>
            <th>Item</th>
            <th>Qty</th>
            <th>Rate</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, i) => (
            <tr key={i}>
              <td>{item.name || "Item"}</td>
              <td>{item.qty}</td>
              <td>{currencySymbol}{item.price}</td>
              <td>{currencySymbol}{item.qty * item.price}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* TOTALS */}
      <div style={styles.totalBox}>
        <p>Subtotal: {currencySymbol}{subtotal}</p>
        <p>Tax ({taxRate}%): {currencySymbol}{taxAmount}</p>
        <h3>Grand Total: {currencySymbol}{grandTotal}</h3>
      </div>

      {/* FOOTER */}
      <div style={styles.footer}>
        <div>
          <h4>Bank Details</h4>
          <p>{bankName || "—"}</p>
          <p>Acc: {accountNumber || "—"}</p>
          <p>IFSC: {ifsc || "—"}</p>
        </div>

        {notes && (
          <div>
            <h4>Notes</h4>
            <p>{notes}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Templatee2;