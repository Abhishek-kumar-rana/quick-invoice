import axios from "axios";

export const uploadToCloudinary = async (file) => {
    
const formData = new FormData();

formData.append('file', file);

formData.append('folder', 'sample/invoices');
formData.append('upload_preset', 'invoiceUpload');
formData.append('cloud_name', 'dj8zs58zk'); 

const res=await axios.post('https://api.cloudinary.com/v1_1/dj8zs58zk/image/upload', formData);
console.log("Cloudinary upload response:", res);
return res.data.secure_url;

}

export const uploadLogoToCloudinary = async (file) => {
    
const formData = new FormData();

formData.append('file', file);

formData.append('folder', 'sample/InvoiceLogo');
formData.append('upload_preset', 'invoiceUpload');
formData.append('cloud_name', 'dj8zs58zk'); 

const res=await axios.post('https://api.cloudinary.com/v1_1/dj8zs58zk/image/upload', formData);
console.log("Cloudinary upload response:", res);
return res.data.secure_url;

}