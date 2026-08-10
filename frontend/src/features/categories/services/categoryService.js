import api from "@/shared/services/api";

const categoryService = {
  getAllCategories: async () => {
    const response = await api.get("/categories");
    return response.data.data;
  },

  createCategory: async (formData) => {
    const response = await api.post("/categories", formData, {
      headers: { "Content-Type": undefined },
    });
    return response.data.data;
  },

  updateCategory: async (id, formData) => {
    const response = await api.put(`/categories/${id}`, formData, {
      headers: { "Content-Type": undefined },
    });
    return response.data.data;
  },

  deleteCategory: async (id) => {
    const response = await api.delete(`/categories/${id}`);
    return response.data;
  },
};

export default categoryService;
