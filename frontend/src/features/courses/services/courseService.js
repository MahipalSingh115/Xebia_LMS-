import api from "@/shared/services/api";

const courseService = {
  getAllCourses: async (config) => {
    const response = await api.get("/courses", config);
    return response.data.data;
  },

  getCourseById: async (id, config) => {
    const response = await api.get(`/courses/${id}`, config);
    return response.data.data;
  },

  createCourse: async (courseData, config) => {
    const response = await api.post("/courses", courseData, config);
    return response.data.data;
  },

  updateCourse: async (id, courseData, config) => {
    const response = await api.put(`/courses/${id}`, courseData, config);
    return response.data.data;
  },

  deleteCourse: async (id, config) => {
    const response = await api.delete(`/courses/${id}`, config);
    return response.data;
  },
};

export default courseService;
