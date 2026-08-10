// Assignment Service wrapping API calls
import api from "@/shared/services/api";

const assignmentService = {
  getCourses: async (config) => {
    const response = await api.get("/courses", config);
    return response.data.data;
  },

  getBatches: async (config) => {
    const response = await api.get("/batches?all=true", config);
    return response.data.data;
  },

  getBatchesPaginated: async (params, config) => {
    const response = await api.get("/batches", { ...config, params });
    return response.data;
  },

  createBatch: async (batchData, config) => {
    const response = await api.post("/batches", batchData, config);
    return response.data.data;
  },

  getAssignments: async (studentId, config) => {
    const url = studentId ? `/assignments?studentId=${studentId}` : "/assignments";
    const response = await api.get(url, config);
    return response.data.data;
  },

  getAssignmentById: async (id, config) => {
    const response = await api.get(`/assignments/${id}`, config);
    return response.data.data;
  },

  createAssignment: async (assignment, config) => {
    const response = await api.post("/assignments", assignment, config);
    return response.data.data;
  },

  updateAssignment: async (id, assignment, config) => {
    const response = await api.put(`/assignments/${id}`, assignment, config);
    return response.data.data;
  },

  deleteAssignment: async (id, config) => {
    const response = await api.delete(`/assignments/${id}`, config);
    return response.data.data;
  },

  getSubmissions: async (config) => {
    const response = await api.get("/submissions", config);
    return response.data.data;
  },

  getSubmissionById: async (id, config) => {
    const response = await api.get(`/submissions/${id}`, config);
    return response.data.data;
  },

  getStudentSubmissions: async (studentId, config) => {
    const response = await api.get(`/student/${studentId}/submissions`, config);
    return response.data.data;
  },

  gradeSubmission: async (id, gradeData, config) => {
    const response = await api.post(`/submissions/${id}/grade`, gradeData, config);
    return response.data.data;
  },

  rejectSubmission: async (id, gradeData, config) => {
    const response = await api.post(`/submissions/${id}/reject`, gradeData, config);
    return response.data.data;
  },

  submitAssignment: async (studentId, submissionData, config) => {
    const response = await api.post(`/student/${studentId}/submit`, submissionData, config);
    return response.data.data;
  },

  getStudents: async (batch, config) => {
    const url = batch ? `/students?batch=${batch}&all=true` : "/students?all=true";
    const response = await api.get(url, config);
    return response.data.data;
  },

  getStudentsPaginated: async (params, config) => {
    const response = await api.get("/students", { ...config, params });
    return response.data;
  },

  createStudent: async (studentData, config) => {
    const response = await api.post("/students", studentData, config);
    return response.data.data;
  },

  getStudentAssignmentStats: async (studentId, config) => {
    const response = await api.get(`/assignments/student/${studentId}/stats`, config);
    return response.data.data;
  },

  getGradebookStats: async (config) => {
    const response = await api.get("/submissions/stats", config);
    return response.data.data;
  },

  getStudentsStats: async (config) => {
    const response = await api.get("/students/stats", config);
    return response.data;
  },

  getBatchesStats: async (config) => {
    const response = await api.get("/batches/stats", config);
    return response.data;
  }
};

export default assignmentService;
