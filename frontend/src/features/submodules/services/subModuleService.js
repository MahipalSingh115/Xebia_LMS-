import api from "@/shared/services/api";

const subModuleService = {
  getAllSubModules: async (config) => {
    const response = await api.get("/submodules", config);
    return response.data.data;
  },

  getSubModulesByModuleId: async (moduleId, config) => {
    const response = await api.get(`/submodules?moduleId=${moduleId}`, config);
    return response.data.data;
  },

  createSubModule: async (subModuleData, config) => {
    const response = await api.post("/submodules", subModuleData, config);
    return response.data.data;
  },

  updateSubModule: async (id, subModuleData, config) => {
    const response = await api.put(`/submodules/${id}`, subModuleData, config);
    return response.data.data;
  },

  deleteSubModule: async (id, config) => {
    const response = await api.delete(`/submodules/${id}`, config);
    return response.data;
  },

  reorderSubModules: async (reorderList) => {
    const response = await api.put("/submodules/reorder", reorderList);
    return response.data;
  },
};

export default subModuleService;
