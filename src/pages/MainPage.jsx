import  { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import { FaPencil } from "react-icons/fa6";
import InvoiceForm from "../components/InvoiceForm";
import TemplateGrid from "../components/TemplateGrid";
import "./MainPage.css";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const MainPage = () => {
  const { invoiceData, setInvoiceData, setSelectedTemplate } = useContext(AppContext);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const navigate = useNavigate();
  

  const handleTemplateClick = (template) => {
    const isInvalidTemplate = invoiceData.items.some((item) => !item.name || item.qty <= 0 || item.price <= 0);
    if (isInvalidTemplate) {
      toast.error("Please fill in all item details before changing the template.");
      return;
    }
    setSelectedTemplate(template);
    console.log("Selected template:", template);
    navigate("/preview");
    

  }

  const setInvoiceTitle = (title) => {
    setInvoiceData((prev) => ({
      ...prev,
      invoiceTitle: title,
    }));
  };

  return (
    <div className="main-page">
      <div className="main-container">

        {/* HEADER */}
        <div className="page-header">
          <div className="invoice-title">
            {isEditingTitle ? (
              <div className="title-edit">
                <input
                  type="text"
                  autoFocus
                  value={invoiceData.invoiceTitle}
                  onChange={(e) => setInvoiceTitle(e.target.value)}
                  onBlur={() => setIsEditingTitle(false)}
                />
                {/* <button
                  className="save-btn"
                  onMouseDown={() => setIsEditingTitle(false)}
                >
                  
                </button> */}
              </div>
            ) : (
              <>
                <h4>{invoiceData.invoiceTitle}</h4>
                <button
                  className="icon-btn"
                  onClick={() => setIsEditingTitle(true)}
                  title="Edit title"
                >
                  <FaPencil />
                </button>
              </>
            )}
          </div>
        </div>

        {/* CONTENT */}
        <div className="main-layout">

          {/* LEFT */}
          <div className="left-panel">
            <InvoiceForm />
          </div>

          {/* RIGHT */}
          <div className="right-panel">
            <h5>Invoice Preview</h5>
            <TemplateGrid onTemplateClick={handleTemplateClick} />
          </div>

        </div>
      </div>
    </div>
  );
};

export default MainPage;