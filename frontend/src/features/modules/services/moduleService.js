import api from "@/shared/services/api";

const moduleService = {
  getAllModules: async (config) => {
    const response = await api.get("/modules", config);
    return response.data.data;
  },

  getModulesByCourseId: async (courseId, config) => {
    const response = await api.get(`/modules?courseId=${courseId}`, config);
    return response.data.data;
  },

  createModule: async (moduleData, config) => {
    const response = await api.post("/modules", moduleData, config);
    return response.data.data;
  },

  updateModule: async (id, moduleData, config) => {
    const response = await api.put(`/modules/${id}`, moduleData, config);
    return response.data.data;
  },

  deleteModule: async (id, config) => {
    const response = await api.delete(`/modules/${id}`, config);
    return response.data;
  },

  reorderModules: async (reorderList) => {
    const response = await api.put("/modules/reorder", reorderList);
    return response.data;
  },
};

export default moduleService;
