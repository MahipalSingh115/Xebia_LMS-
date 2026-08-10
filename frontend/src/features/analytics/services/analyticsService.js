import api from "@/shared/services/api";
import {
  COVERAGE_MOCK,
  CERTIFICATIONS_MOCK,
  CHAMPIONS_MOCK,
  FLAGSHIP_MOCK,
  TRENDS_MOCK,
  EXECUTIVE_MOCK,
  TRAINING_FEEDBACK_DATA,
  PROJECT_BUDGET_DATA,
  FRESHER_FUNNEL_DATA,
  FRESHER_ROWS,
  SKILL_GAP_DATA,
  PREDICTIVE_FORECAST_DATA,
  LEARNING_HOURS_DATA,
  LEARNING_CATEGORIES_DATA,
  AI_TRANSFORMATION_DATA
} from "../mocks/mockData";

const analyticsService = {
  async getCoverageDashboard(filters, page = 0, size = 5) {
    try {
      const response = await api.get("/analytics/coverage/dashboard", {
        params: { ...filters, page, size }
      });
      return response.data.data;
    } catch (err) {
      console.warn("Backend Coverage API failed, falling back to mock data:", err.message);
      return COVERAGE_MOCK;
    }
  },

  async getCertificationsDashboard(filters, page = 0, size = 5) {
    try {
      const response = await api.get("/analytics/certifications/dashboard", {
        params: { ...filters, page, size }
      });
      return response.data.data;
    } catch (err) {
      console.warn("Backend Certifications API failed, falling back to mock data:", err.message);
      return CERTIFICATIONS_MOCK;
    }
  },

  async getChampionsDashboard(filters, page = 0, size = 5) {
    try {
      const response = await api.get("/analytics/champions/dashboard", {
        params: { ...filters, page, size }
      });
      return response.data.data;
    } catch (err) {
      console.warn("Backend Champions API failed, falling back to mock data:", err.message);
      return CHAMPIONS_MOCK;
    }
  },

  async getFlagshipDashboard(filters, page = 0, size = 5) {
    try {
      const response = await api.get("/analytics/flagship/dashboard", {
        params: { ...filters, page, size }
      });
      return response.data.data;
    } catch (err) {
      console.warn("Backend Flagship API failed, falling back to mock data:", err.message);
      return FLAGSHIP_MOCK;
    }
  },

  async getTrendsDashboard(filters, page = 0, size = 5) {
    try {
      const response = await api.get("/analytics/trends/dashboard", {
        params: { ...filters, page, size }
      });
      return response.data.data;
    } catch (err) {
      console.warn("Backend Trends API failed, falling back to mock data:", err.message);
      return TRENDS_MOCK;
    }
  },

  async getExecutiveSummaryDashboard(filters) {
    try {
      const response = await api.get("/analytics/executive/dashboard", {
        params: filters
      });
      return response.data.data;
    } catch (err) {
      console.warn("Backend Executive API failed, falling back to mock data:", err.message);
      return EXECUTIVE_MOCK;
    }
  },

  async getAITransformationDashboard(filters) {
    try {
      const response = await api.get("/analytics/ai-transformation/dashboard", { params: filters });
      return response.data.data;
    } catch (err) {
      console.warn("Backend AI Transformation API failed, falling back to mock data:", err.message);
      return {
        kpis: {
          readyWorkforce: 180,
          copilotAdoption: "73%",
          readinessIndex: "85 / 100"
        },
        charts: {
          transformationJourney: AI_TRANSFORMATION_DATA
        }
      };
    }
  },

  async getFresherJourneyDashboard(filters) {
    try {
      const response = await api.get("/analytics/fresher/dashboard", { params: filters });
      return response.data.data;
    } catch (err) {
      console.warn("Backend Fresher Journey API failed, falling back to mock data:", err.message);
      return {
        kpis: {
          totalFreshers: 486,
          onboardingProgress: 78.5,
          timeToCompetency: "42 Days",
          retentionRate: 94.2
        },
        charts: {
          journeyFunnel: FRESHER_FUNNEL_DATA
        },
        tables: {
          content: FRESHER_ROWS
        }
      };
    }
  },

  async getLearningCategoriesDashboard(filters) {
    try {
      const response = await api.get("/analytics/learning/categories/dashboard", { params: filters });
      return response.data.data;
    } catch (err) {
      console.warn("Backend Learning Categories API failed, falling back to mock data:", err.message);
      return {
        kpis: {
          totalCategories: 14,
          activeCourses: 180,
          catalogCoverage: 92.5
        },
        charts: {
          categoriesData: LEARNING_CATEGORIES_DATA
        }
      };
    }
  },

  async getLearningHoursDashboard(filters) {
    try {
      const response = await api.get("/analytics/learning/hours/dashboard", { params: filters });
      return response.data.data;
    } catch (err) {
      console.warn("Backend Learning Hours API failed, falling back to mock data:", err.message);
      return {
        kpis: {
          totalStudyHours: 19300,
          selfGuidedHours: 12700,
          classroomWorkshops: 6600
        },
        charts: {
          hoursData: LEARNING_HOURS_DATA
        }
      };
    }
  },

  async getPredictiveAnalyticsDashboard(filters) {
    try {
      const response = await api.get("/analytics/predictive/dashboard", { params: filters });
      return response.data.data;
    } catch (err) {
      console.warn("Backend Predictive Analytics API failed, falling back to mock data:", err.message);
      return {
        kpis: {
          predictiveAccuracy: 91.4,
          forecastDemand: 210,
          calculatedLift: 14.6
        },
        charts: {
          forecastData: PREDICTIVE_FORECAST_DATA
        }
      };
    }
  },

  async getProjectLearningInvestmentDashboard(filters) {
    try {
      const response = await api.get("/analytics/project-investment/dashboard", { params: filters });
      return response.data.data;
    } catch (err) {
      console.warn("Backend Project Learning Investment API failed, falling back to mock data:", err.message);
      return {
        kpis: {
          allocatedBudget: 150000,
          spentBudget: 124500,
          estimatedRoi: 28.4
        },
        charts: {
          budgetData: PROJECT_BUDGET_DATA
        }
      };
    }
  },

  async getSkillGapDashboard(filters) {
    try {
      const response = await api.get("/analytics/skill-gap/dashboard", { params: filters });
      return response.data.data;
    } catch (err) {
      console.warn("Backend Skill Gap API failed, falling back to mock data:", err.message);
      return {
        kpis: {
          requiredScore: 85.0,
          currentIndex: 81.2,
          gapDeficit: 3.8
        },
        charts: {
          gapData: SKILL_GAP_DATA
        }
      };
    }
  },

  async getTrainingEffectivenessDashboard(filters) {
    try {
      const response = await api.get("/analytics/training-effectiveness/dashboard", { params: filters });
      return response.data.data;
    } catch (err) {
      console.warn("Backend Training Effectiveness API failed, falling back to mock data:", err.message);
      return {
        kpis: {
          completionRate: 92.4,
          avgAssessmentScore: 84.6,
          satisfactionScore: 4.7
        },
        charts: {
          feedbackData: TRAINING_FEEDBACK_DATA
        }
      };
    }
  }
};

export default analyticsService;
