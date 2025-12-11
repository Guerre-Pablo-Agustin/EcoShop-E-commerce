import { API_BASE_URL } from "./config";


export interface AllSale {
   totalSales: number;
   currency: string;
}

export const salesApi ={

    //sales/total
    getAllTotal: async (): Promise<AllSale[] | null> => {
        try {
            const res = await fetch(`${API_BASE_URL}/api/sales/total`, {
                method: "GET",
            });
            if (!res.ok)
                throw new Error(`Network response was not ok: ${res.status}`);
            return res.json();
        } catch (error) {
            console.error("paymentApi.getAll error:", error);
            return null;
        }
    },

    //sales/total
    getPaymentsTotal: async (): Promise<AllSale[] | null> => {
        try {
            const res = await fetch(`${API_BASE_URL}/api/sales/total-payments`, {
                method: "GET",
            });
            if (!res.ok)
                throw new Error(`Network response was not ok: ${res.status}`);
            return res.json();
        } catch (error) {
            console.error("paymentApi.getAll error:", error);
            return null;
        }
    },

    //sales/total-payments
    getAllTotalPayments: async (): Promise<AllSale[] | null> => {
        try {
            const res = await fetch(`${API_BASE_URL}/api/sales/total-payments`, {
                method: "GET",
            });
            if (!res.ok)
                throw new Error(`Network response was not ok: ${res.status}`);
            return res.json();
        } catch (error) {
            console.error("paymentApi.getAll error:", error);
            return null;
        }
    },


    //sales/total-by-date-range
    getAllTotalByDateRange: async (): Promise<AllSale[] | null> => {
        try {
            const res = await fetch(`${API_BASE_URL}/api/sales/total-by-date-range`, {
                method: "GET",
            });
            if (!res.ok)
                throw new Error(`Network response was not ok: ${res.status}`);
            return res.json();
        } catch (error) {
            console.error("paymentApi.getAll error:", error);
            return null;
        }
    },


    //sales/stadistics
    getAllStadistics: async (): Promise<AllSale[] | null> => {
        try {
            const res = await fetch(`${API_BASE_URL}/api/sales/stadistics`, {
                method: "GET",
            });
            if (!res.ok)
                throw new Error(`Network response was not ok: ${res.status}`);
            return res.json();
        } catch (error) {
            console.error("paymentApi.getAll error:", error);
            return null;
        }
    },


    //api/customer/{customerid}
    getByCustomerId: async (customerid: number): Promise<AllSale[] | null> => {
        try {
            const res = await fetch(`${API_BASE_URL}/api/sales/customer/${customerid}`, {
                method: "GET",
            });
            if (!res.ok)
                throw new Error(`Network response was not ok: ${res.status}`);
            return res.json();
        } catch (error) {
            console.error("paymentApi.getAll error:", error);
            return null;
        }
    },

    //sales/by-customer
    getAllByCustomers: async (): Promise<AllSale[] | null> => {
        try {
            const res = await fetch(`${API_BASE_URL}/api/sales/by-customer`, {
                method: "GET",
            });
            if (!res.ok)
                throw new Error(`Network response was not ok: ${res.status}`);
            return res.json();
        } catch (error) {
            console.error("paymentApi.getAll error:", error);
            return null;
        }
    },
 

}