import api from "@/shared/services/api";

const dashboardService = {
  async getDashboardStats() {
    const response = await api.get("/dashboard/stats");
    return response.data.data;
  },

  async getRecentCourses() {
    const response = await api.get("/dashboard/recent-courses");

    return response.data.data;
  },

  async getEnrollmentAnalytics(period) {
    const response = await api.get(
      `/dashboard/analytics/enrollments`,
      {
        params: { period },
      }
    );

    return response.data.data;
  },
};

export default dashboardService;