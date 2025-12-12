import { create } from "zustand";
import {
  reportsApi,
  Report,
  ReportRequest,
  ReportStats,
} from "@/api/reports.api";

interface ReportsState {
  reports: Report[];
  currentReport: Report | null;
  latestReport: Report | null;
  stats: ReportStats | null;
  isLoading: boolean;
  error: string | null;

  // Actions
  createReport: (data: ReportRequest) => Promise<void>;
  fetchReportById: (id: number) => Promise<void>;
  deleteReport: (id: number) => Promise<void>;
  fetchReportsByCustomer: (customerId: number) => Promise<void>;
  fetchCustomerStats: (customerId: number) => Promise<void>;
  fetchLatestReportByCustomer: (customerId: number) => Promise<void>;
  clearError: () => void;
}

export const useReportsStore = create<ReportsState>((set) => ({
  reports: [],
  currentReport: null,
  latestReport: null,
  stats: null,
  isLoading: false,
  error: null,

  createReport: async (data) => {
    set({ isLoading: true, error: null });
    try {
      const report = await reportsApi.create(data);
      if (report) {
        set((state) => ({
          reports: [...state.reports, report],
          currentReport: report,
          isLoading: false,
        }));
      } else {
        set({ error: "Failed to create report", isLoading: false });
      }
    } catch (error) {
      set({ error: "Error creating report", isLoading: false });
    }
  },

  fetchReportById: async (id) => {
    set({ isLoading: true, error: null });
    try {
      const report = await reportsApi.getById(id);
      if (report) {
        set({ currentReport: report, isLoading: false });
      } else {
        set({ error: "Report not found", isLoading: false });
      }
    } catch (error) {
      set({ error: "Error fetching report", isLoading: false });
    }
  },

  deleteReport: async (id) => {
    set({ isLoading: true, error: null });
    try {
      const success = await reportsApi.delete(id);
      if (success) {
        set((state) => ({
          reports: state.reports.filter((r) => r.id !== id),
          currentReport:
            state.currentReport?.id === id ? null : state.currentReport,
          isLoading: false,
        }));
      } else {
        set({ error: "Failed to delete report", isLoading: false });
      }
    } catch (error) {
      set({ error: "Error deleting report", isLoading: false });
    }
  },

  fetchReportsByCustomer: async (customerId) => {
    set({ isLoading: true, error: null });
    try {
      const reports = await reportsApi.getByCustomer(customerId);
      if (reports) {
        set({ reports, isLoading: false });
      } else {
        set({ error: "Failed to fetch customer reports", isLoading: false });
      }
    } catch (error) {
      set({ error: "Error fetching customer reports", isLoading: false });
    }
  },

  fetchCustomerStats: async (customerId) => {
    set({ isLoading: true, error: null });
    try {
      const stats = await reportsApi.getCustomerStats(customerId);
      if (stats) {
        set({ stats, isLoading: false });
      } else {
        set({ error: "Failed to fetch customer stats", isLoading: false });
      }
    } catch (error) {
      set({ error: "Error fetching customer stats", isLoading: false });
    }
  },

  fetchLatestReportByCustomer: async (customerId) => {
    set({ isLoading: true, error: null });
    try {
      const latestReport = await reportsApi.getLatestByCustomer(customerId);
      if (latestReport) {
        set({ latestReport, isLoading: false });
      } else {
        set({ error: "Failed to fetch latest report", isLoading: false });
      }
    } catch (error) {
      set({ error: "Error fetching latest report", isLoading: false });
    }
  },

  clearError: () => set({ error: null }),
}));
