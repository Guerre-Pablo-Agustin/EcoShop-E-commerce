import { API_BASE_URL } from "./config";

export interface ReportRequest {
  customerId: number;
  startDate: string;
  endDate: string;
}

export interface Report {
  id: number;
  customerId: number;
  startDate: string;
  endDate: string;
  generatedDate: string;
  // Add other fields that might be in the response based on common patterns or assume basic structure until known
  totalImpact?: number;
  details?: any;
  totalOrders?: number;
}

export interface ReportStats {
  // Define stats structure based on likely response, e.g.
  totalReports: number;
  averageImpact: number;
  customerId: number,
totalCO2Saved: number,
totalEcoPoints: number
}

export const reportsApi = {
  // Create/Generate Report
  create: async (data: ReportRequest): Promise<Report | null> => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/reports`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!response.ok)
        throw new Error(`Error generating report: ${response.status}`);
      return response.json();
    } catch (error) {
      console.error("reportsApi.create error:", error);
      return null;
    }
  },

  // Get Report by ID
  getById: async (reportId: number): Promise<Report | null> => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/reports/${reportId}`, {
        method: "GET",
      });
      if (!response.ok)
        throw new Error(`Error fetching report: ${response.status}`);
      return response.json();
    } catch (error) {
      console.error("reportsApi.getById error:", error);
      return null;
    }
  },

  // Delete Report
  delete: async (reportId: number): Promise<boolean> => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/reports/${reportId}`, {
        method: "DELETE",
      });
      return response.ok;
    } catch (error) {
      console.error("reportsApi.delete error:", error);
      return false;
    }
  },

  // Get All Reports for a Customer
  getByCustomer: async (customerId: number): Promise<Report[] | null> => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/reports/customer/${customerId}`,
        {
          method: "GET",
        }
      );
      if (!response.ok)
        throw new Error(`Error fetching customer reports: ${response.status}`);
      return response.json();
    } catch (error) {
      console.error("reportsApi.getByCustomer error:", error);
      return null;
    }
  },

  // Get Aggregated Stats for a Customer
  getCustomerStats: async (customerId: number): Promise<ReportStats | null> => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/reports/customer/${customerId}/stats`,
        {
          method: "GET",
        }
      );
      if (!response.ok)
        throw new Error(`Error fetching customer stats: ${response.status}`);
      return response.json();
    } catch (error) {
      console.error("reportsApi.getCustomerStats error:", error);
      return null;
    }
  },

  // Get Latest Report for a Customer
  getLatestByCustomer: async (customerId: number): Promise<Report | null> => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/reports/customer/${customerId}/latest`,
        {
          method: "GET",
        }
      );
      if (!response.ok)
        throw new Error(`Error fetching latest report: ${response.status}`);
      return response.json();
    } catch (error) {
      console.error("reportsApi.getLatestByCustomer error:", error);
      return null;
    }
  },
};
