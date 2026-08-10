import api from "@/shared/services/api";

const eventService = {
  getEventsPaginated: async (page = 0, size = 10, config) => {
    const response = await api.get(`/events?page=${page}&size=${size}`, config);
    return response.data; // Return the whole ApiResponse wrapping Page object
  },

  getEventById: async (id, config) => {
    const response = await api.get(`/events/${id}`, config);
    return response.data.data;
  },

  createEvent: async (eventData, config) => {
    const response = await api.post("/events", eventData, config);
    return response.data.data;
  },

  updateEvent: async (id, eventData, config) => {
    const response = await api.put(`/events/${id}`, eventData, config);
    return response.data.data;
  },

  deleteEvent: async (id, config) => {
    const response = await api.delete(`/events/${id}`, config);
    return response.data.data;
  },

  registerForEvent: async (eventId, studentId, config) => {
    const response = await api.post(`/events/${eventId}/register`, { studentId }, config);
    return response.data.data;
  },

  getRegistrations: async (eventId, config) => {
    const response = await api.get(`/events/${eventId}/registrations`, config);
    return response.data.data;
  },

  uploadImage: async (file, config) => {
    const formData = new FormData();
    formData.append("file", file);
    const response = await api.post("/events/upload-image", formData, {
      ...config,
      headers: {
        "Content-Type": "multipart/form-data",
        ...(config?.headers || {})
      }
    });
    return response.data.data; // Return the inner data object containing the url
  }
};

export default eventService;
