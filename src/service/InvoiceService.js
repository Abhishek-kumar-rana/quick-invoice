import axios from "axios"


export const saveInvoiceService = (baseURL, payload, token) => {
    return axios.post(`${baseURL}/invoices/insert`, payload, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

export const helloService = (baseURL, token) => {
    const url = `${baseURL}/invoices/hello`;
    console.log("getInvoicesService URL:", url);
    return axios.get(`${baseURL}/invoices/hello`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

export const getInvoicesService = async (baseURL, token) => {
    console.log("hello response:", await helloService(baseURL, token));
    const url = `${baseURL}/invoices/fetch`;
    console.log("getInvoicesService URL:", url);
    const res = await axios.get(`${baseURL}/invoices/fetch`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    // console.log("getInvoicesService response:", res);
    return res;
}

export const deleteInvoiceService = (baseURL, id, token) => {
    console.log("deleteInvoiceService URL:", `${baseURL}/invoices/${id}`);
    console.log("deleteInvoiceService token:", token);
    return axios.delete(`${baseURL}/invoices/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}