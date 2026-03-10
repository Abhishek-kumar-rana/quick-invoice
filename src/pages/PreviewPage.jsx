import React, { useContext, useEffect, useRef, useState } from "react";
import { templates } from "../assets/assets";
import InvoicePreview from "../components/InvoicePreview";
import { AppContext } from "../context/AppContext";
import html2pdf from "html2pdf.js";
import { useNavigate } from "react-router-dom";
import "./PreviewPage.css";
import {  deleteInvoiceService, saveInvoiceService } from "../service/InvoiceService";
import toast from "react-hot-toast";
import html2canvas from "html2canvas";
import { uploadToCloudinary } from "../service/CloudinaryService";
import { useAuth, useClerk } from "@clerk/clerk-react";

const PreviewPage = () => {
  const previewRef = useRef(null);
  const { invoiceData  , selectedTemplate, setSelectedTemplate, baseURL } =
    useContext(AppContext);
  const [loading, setLoading] = useState(false);  
  const navigate = useNavigate();
  const {getToken}=useAuth();
  const {user}=useClerk();

  const handleDownloadPDF = () => {
    if (!previewRef.current) return;

    html2pdf()
      .set({
        margin: 0,
        filename: `invoice-${invoiceData.invoiceNumber}.pdf`,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
      })
      .from(previewRef.current)
      .save();
  };

  const handleSaveAndExit = async() => {
    // Call the API to save the invoice data
    try {
      setLoading(true);
      const canvas = await html2canvas(previewRef.current, { 
        scale: 2,
         useCORS: true,
         backgroundColor: "#fff",
         scrollY: -window.scrollY,
        });
      const imgData = canvas.toDataURL("image/jpeg", 1.0);
      const thumbnailUrl = await uploadToCloudinary(imgData);
      const payload = {
        ...invoiceData,
        selectedTemplate: selectedTemplate,
        thumbnailUrl: thumbnailUrl,
        // logo:thumbnailUrl,
        clerkId: user.id,
      };
      console.log(" Payload for saving invoice:", payload);
      const token = await getToken();
        const res = await saveInvoiceService(baseURL, payload, token);
        console.log("Invoice saved successfully:", res.data);

        if(res.status === 200){
          navigate("/dashboard");
          toast.success("Invoice saved successfully!");
        }
      
    } catch (error) {
      console.error("Error saving invoice:", error);
      toast.error("Failed to save invoice.");
    } finally {
      // navigate("/generate");
      setLoading(false);
    }
  }

  const handleDeleteInvoices = async () => {
    try {
      const token = await getToken();
      const res = await deleteInvoiceService(baseURL, invoiceData.id, token);
      console.log("Invoice deleted successfully:", res);
      if(res.request.status === 204) {
        toast.success("Invoice deleted successfully!");
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Error deleting invoice:", error);
      toast.error(`Failed to delete invoice, ${error.message}`);
    }
  };

  useEffect(()=>{
    if(!invoiceData  ){
      console.log("Invoice data is empty or items are missing:", invoiceData);
      toast.error("Data are empty!")
      navigate("/dashboard")
    }
  },[invoiceData])

  return (
    <div className="preview-page">
      {/* TOP TEMPLATE TABS */}
      <header className="top-bar">
        {templates.map((t) => (
          <button
            key={t.id}
            className={`tab-btn ${
              selectedTemplate === t.id ? "active-tab" : ""
            }`}
            onClick={() => setSelectedTemplate(t.id)}
          >
            {t.label}
          </button>
        ))}
      </header>

      {/* BODY */}
      <div className="preview-body">
        {/* LEFT ACTION PANEL */}
        <aside className="actions-panel">
          {/* <h4>Actions</h4> */}

          <button className="btn primary" onClick={() => navigate("/generate")}>
            Edit Invoice
          </button>
          <button className="btn primary" onClick={handleSaveAndExit} disabled={loading}>
            {loading ? "Saving..." : "Save And Exit"}
          </button>
          <button className="btn primary">Send Email</button>
          <button className="btn primary" onClick={handleDownloadPDF}>
            Download PDF
          </button>

          <hr className="hr"/>

          <button className="btn danger" onClick={handleDeleteInvoices}>Delete Invoice</button>
          <button className="btn ghost" onClick={()=>navigate("/dashboard")}>Back to Dashboard</button>
        </aside>

        {/* PREVIEW CENTER */}
        <main className="preview-area">
          <div ref={previewRef} className="preview-card">
            <InvoicePreview
              invoiceData={invoiceData}
              template={selectedTemplate}
            />
          </div>
        </main>
      </div>
    </div>
  );
};

export default PreviewPage;