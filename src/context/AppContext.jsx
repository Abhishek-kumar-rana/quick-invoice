import { createContext, useState } from "react";

export const AppContext = createContext();

/* ================= DEFAULT DATA ================= */
const today = new Date().toISOString().split("T")[0];
const dueAfter7Days = new Date(Date.now() + 7 * 86400000)
  .toISOString()
  .split("T")[0];

export const initialInvoiceData = {
  invoiceTitle: "New Invoice",

  logo: "",
  invoiceNumber: `INV-${Date.now().toString().slice(-6)}`,
  invoiceDate: today,
  dueDate: dueAfter7Days,

  billTo: "",
  shipTo: "",

  items: [{ name: "", qty: 1, price: 0 }],

  bankName: "",
  accountNumber: "",
  ifsc: "",

  notes: "",
  taxRate: 18,
};

const URL = import.meta.env.VITE_REACT_APP_BASE_URL || "http://localhost:8080";
const baseURL=URL+"/api";

/* ================= PROVIDER ================= */
export const AppContextProvider = ({ children }) => {
  const [invoiceData, setInvoiceData] = useState(initialInvoiceData);
  const [selectedTemplate, setSelectedTemplate] = useState("template1");

  const contextValue = {
    invoiceData,
    setInvoiceData,
    selectedTemplate,
    setSelectedTemplate,
      baseURL,
  };

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
};