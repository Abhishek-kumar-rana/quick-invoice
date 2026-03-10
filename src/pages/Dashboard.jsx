import  { useContext, useEffect, useState } from "react";
import { getInvoicesService } from "../service/InvoiceService";
import toast from "react-hot-toast";
import { AppContext, initialInvoiceData } from "../context/AppContext";
import "./Dashboard.css";
import { useNavigate } from "react-router-dom";
import { FiPlus } from "react-icons/fi";
import { useAuth } from "@clerk/clerk-react";
const Dashboard = () => {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const { baseURL, setInvoiceData, setSelectedTemplate } = useContext(AppContext);
  const navigate = useNavigate();
  const { getToken } = useAuth();


  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const token = await getToken();
        const response = await getInvoicesService(baseURL, token);
        setInvoices(response.data || []);
      } catch (error) {
        toast.error(error.message || "Failed to fetch invoices");
      } finally {
        setLoading(false);
      }
    };

    fetchInvoices();
  }, [baseURL]);

  const handleInvoiceClick = (invoice) => {
    setInvoiceData(invoice);
    setSelectedTemplate(invoice.selectedTemplate);
    navigate("/preview");
  };

  const handleCreateNewInvoice = () => {
    setInvoiceData(initialInvoiceData);
    setSelectedTemplate("template1");
    navigate("/generate");
  }

  return (
    <div className="dashboard">
      {/* HEADER */}
      <div className="dashboard-header">
        <h2>📊 Dashboard</h2>
        <p>Your previously generated invoices</p>
      </div>

      {/* CONTENT */}
      {loading ? (
        <div className="loader">Loading invoices...</div>
      ) : invoices.length === 0 ? (
        <div className="empty-state">
          <div className="invoice-grid">
             <div className=" " onClick={handleCreateNewInvoice}>
              <div className="new-invoice">
                <FiPlus className="plus-icon" />
                <div className="">New Invoice</div>
              </div>
            </div>
          </div>
          <div className="noInv">
            <p>No invoices found or empty invoice dashboard, create your first invoice.</p>
          </div>
        </div>
      ) : (
        <>
          <div className="invoice-grid">
            <div className=" " onClick={handleCreateNewInvoice}>
              <div className="new-invoice">
                <FiPlus className="plus-icon" />
                <div className="">New Invoice</div>
              </div>
            </div>
            {invoices.map((invoice) => (
              <div
                className="invoice-card"
                key={invoice.invoiceNumber}
                onClick={() => handleInvoiceClick(invoice)}
              >
                {/* HEADER */}
                <div className="invoice-card-header">
                  <span className="invoice-number">
                    {invoice.invoiceNumber}
                  </span>
                  <span className="template-pill">
                    {invoice.selectedTemplate}
                  </span>
                </div>

                {/* PREVIEW */}
                <div className="invoice-preview">
                  {invoice.thumbnailUrl ? (
                    <img
                      src={invoice.thumbnailUrl}
                      alt="Invoice Preview"
                    />
                  ) : (
                    <div className="no-preview">No Preview</div>
                  )}
                </div>

                {/* FOOTER */}
                <div className="invoice-card-footer">
                  <div className="invoice-title">
                    {invoice.invoiceTitle}
                  </div>
                  <div className="invoice-date">
                    {invoice.invoiceDate}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;