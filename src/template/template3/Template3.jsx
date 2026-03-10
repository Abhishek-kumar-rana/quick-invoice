import React from "react";

const Template3 = ({ data }) => {
  if (!data) return null;

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

  const styles = {
  wrapper: {
    display: "flex",
    background: "#ffffff",
    borderRadius: "14px",
    overflow: "hidden",
    boxShadow: "0 12px 30px rgba(0,0,0,0.08)",
  },

  accent: {
    width: "10px",
    background: "linear-gradient(180deg, #2563eb, #1e40af)",
  },

  container: {
    flex: 1,
    padding: "28px",
    fontFamily: "Inter, Arial, sans-serif",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  title: {
    margin: 0,
  },

  muted: {
    color: "#64748b",
  },

  logo: {
    width: "70px",
    height: "70px",
    objectFit: "contain",
  },

  logoPlaceholder: {
    width: "70px",
    height: "70px",
    background: "#f1f5f9",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "10px",
    border: "1px dashed #cbd5e1",
    color: "#64748b",
    fontSize: "12px",
  },

  meta: {
    display: "flex",
    gap: "30px",
    margin: "20px 0",
    color: "#475569",
  },

  billing: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "24px",
  },

  table: {
    width: "100%",
    borderCollapse: "collapse",
  },

  totals: {
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

  return (
    <div style={styles.wrapper}>
      {/* LEFT ACCENT BAR */}
      <div style={styles.accent} />

      {/* CONTENT */}
      <div style={styles.container}>
        {/* HEADER */}
        <div style={styles.header}>
          <div>
            <h1 style={styles.title}>{invoiceTitle}</h1>
            <p style={styles.muted}>Invoice #{invoiceNumber}</p>
          </div>

          {logo ? (
            <img src={logo} alt="Logo" style={styles.logo} />
          ) : (
            <div style={styles.logoPlaceholder}>LOGO</div>
          )}
        </div>

        {/* META */}
        <div style={styles.meta}>
          <p><strong>Date:</strong> {invoiceDate}</p>
          <p><strong>Due:</strong> {dueDate}</p>
        </div>

        {/* BILLING */}
        <div style={styles.billing}>
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
              <th align="left">Item</th>
              <th>Qty</th>
              <th>Rate</th>
              <th align="right">Amount</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, i) => (
              <tr key={i}>
                <td>{item.name || "Item"}</td>
                <td align="center">{item.qty}</td>
                <td align="center">
                  {currencySymbol}{item.price}
                </td>
                <td align="right">
                  {currencySymbol}{item.qty * item.price}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* TOTALS */}
        <div style={styles.totals}>
          <p>Subtotal: {currencySymbol}{subtotal}</p>
          <p>Tax ({taxRate}%): {currencySymbol}{taxAmount}</p>
          <h2>Total: {currencySymbol}{grandTotal}</h2>
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
    </div>
  );
};

export default Template3;