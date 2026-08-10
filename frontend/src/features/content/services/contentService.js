import api from "@/shared/services/api";

const contentService = {
  getAllContents: async (config) => {
    const response = await api.get("/contents", config);
    return response.data.data;
  },

  getContentsBySubModuleId: async (subModuleId, config) => {
    const response = await api.get(`/contents?subModuleId=${subModuleId}`, config);
    return response.data.data;
  },

  createContent: async (contentData, config) => {
    const response = await api.post("/contents", contentData, config);
    return response.data.data;
  },

  updateContent: async (id, contentData, config) => {
    const response = await api.put(`/contents/${id}`, contentData, config);
    return response.data.data;
  },

  deleteContent: async (id, config) => {
    const response = await api.delete(`/contents/${id}`, config);
    return response.data;
  },

  uploadFile: async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    const response = await api.post("/files/upload", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  },
};

export default contentService;
