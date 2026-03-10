import  { useContext } from "react";
import toast from "react-hot-toast";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import "./InvoiceForm.css";
import { useNavigate } from "react-router-dom";
import { uploadLogoToCloudinary } from "../service/CloudinaryService";

const InvoiceForm = () => {
  const { invoiceData, setInvoiceData } = useContext(AppContext);
  const navigate = useNavigate();

  /* ---------------- HANDLERS ---------------- */

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInvoiceData((prev) => ({ ...prev, [name]: value }));
  };

  const handleItemChange = (index, field, value) => {
    const items = [...invoiceData.items];
    items[index][field] =
      field === "qty" || field === "price" ? Number(value) : value;
    setInvoiceData((prev) => ({ ...prev, items }));
  };

  const addItem = () => {
    setInvoiceData((prev) => ({
      ...prev,
      items: [...prev.items, { name: "", qty: 1, price: 0 }],
    }));
  };

  const removeItem = (index) => {
    setInvoiceData((prev) => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index),
    }));
  };

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please upload a valid image file");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = async () => {
      // setInvoiceData((prev) => ({ ...prev, logo: reader.result }));
      const logoUrl= await uploadLogoToCloudinary(file);
      console.log("Logo URL from Cloudinary:", logoUrl);
      setInvoiceData((prev) => ({ ...prev, logo: logoUrl }));
    };
    reader.readAsDataURL(file);
  };

  /* ---------------- CALCULATIONS ---------------- */

  const subtotal = invoiceData.items.reduce(
    (sum, i) => sum + (i.qty || 0) * (i.price || 0),
    0
  );
  const taxAmount = (subtotal * (invoiceData.taxRate || 0)) / 100;
  const grandTotal = subtotal + taxAmount;

  /* ---------------- VALIDATION + SUBMIT ---------------- */

  const handlesubmit = () => {
    if (!invoiceData.billTo.trim()) {
      toast.error("Bill To is required");
      return;
    }

    if (!invoiceData.bankName.trim()) {
      toast.error("Bank Name is required");
      return;
    }

    if (!invoiceData.accountNumber.trim()) {
      toast.error("Account Number is required");
      return;
    }

    if (!invoiceData.ifsc.trim()) {
      toast.error("IFSC Code is required");
      return;
    }

    const invalidItem = invoiceData.items.some(
      (item) => !item.name || item.qty <= 0 || item.price <= 0
    );

    if (invalidItem) {
      toast.error("Each item must have name, qty & price");
      return;
    }

    if (subtotal <= 0) {
      toast.error("Invoice total must be greater than zero");
      return;
    }

    toast.success("Invoice generated successfully 🚀");
    // console.log("Invoice Data:", invoiceData);
    navigate("/preview");
  };

  /* ---------------- UI ---------------- */

  return (
    <div className="invoice-wrapper">
      {/* HEADER */}
      <div className="invoice-header">
        <div className="logo-upload">
          <img
            src={invoiceData.logo || assets.upload_area}
            alt="Logo"
          />
          <input type="file" onChange={handleLogoUpload} />
        </div>

        <div className="invoice-dates">
          <input value={invoiceData.invoiceNumber} disabled />
          <input type="date" name="invoiceDate" value={invoiceData.invoiceDate} onChange={handleChange} />
          <input type="date" name="dueDate" value={invoiceData.dueDate} onChange={handleChange} />
        </div>
      </div>

      {/* BILLING */}
      <div className="grid-2">
        <div className="input-group">
          <textarea name="billTo" placeholder=" " value={invoiceData.billTo} onChange={handleChange} maxLength={230}/>
          <label>Bill to</label>
        </div>

        <div className="input-group">
          <textarea name="shipTo" placeholder=" " value={invoiceData.shipTo} onChange={handleChange} maxLength={230} />
          <label>Ship to</label>
        </div>
      </div>

      {/* ITEMS */}
      <div className="items-box">
        <div className="items-head">
          <span>Item</span><span>Qty</span><span>Price</span><span>Total</span>
        </div>

        {invoiceData.items.map((item, i) => (
          <div className="items-row" key={i}>
            <input value={item.name} placeholder="Item" onChange={(e) => handleItemChange(i, "name", e.target.value)} />
            <input type="number" value={item.qty} onChange={(e) => handleItemChange(i, "qty", e.target.value)} />
            <input type="number" value={item.price} onChange={(e) => handleItemChange(i, "price", e.target.value)} />
            <input disabled value={`₹ ${(item.qty * item.price || 0).toFixed(2)}`} />
            {invoiceData.items.length > 1 && (
              <button onClick={() => removeItem(i)}>✕</button>
            )}
          </div>
        ))}

        <button className="add-btn" onClick={addItem}>+ Add Item</button>
      </div>

      {/* BANK + SUMMARY */}
      <div className="grid-2">
        <div className="bank-details">
          {["bankName", "accountNumber", "ifsc"].map((field, i) => (
            <div className="input-group" key={i}>
              <input
                type="text"
                name={field}
                value={invoiceData[field]}
                onChange={handleChange}
                placeholder=" "
                required
              />
              <label>{field === "ifsc" ? "IFSC Code" : field.replace(/([A-Z])/g, " $1")}</label>
            </div>
          ))}
        </div>

        <div className="summary">
          <p>Subtotal: ₹ {subtotal.toFixed(2)}</p>
          <div className="tax">
            Tax %
            <input type="number" name="taxRate" value={invoiceData.taxRate} onChange={handleChange} />
          </div>
          <p>Tax: ₹ {taxAmount.toFixed(2)}</p>
          <h3>Total: ₹ {grandTotal.toFixed(2)}</h3>
        </div>
      </div>

      <textarea name="notes" placeholder="Notes" value={invoiceData.notes} onChange={handleChange} maxLength={230}/>

      <button className="submit-btn" onClick={handlesubmit}>
        Generate Invoice
      </button>
    </div>
  );
};

export default InvoiceForm;