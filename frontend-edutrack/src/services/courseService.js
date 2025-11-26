import apiClient from "./apiClient";

const API_URL = "/courses";

export const createCourse = async (data) => {
  try {
    const response = await apiClient.post(`${API_URL}/createCourse`, data);
    return response.data;
  } catch (error) {
    console.error("Error creating Course:", error.response?.data || error);
    throw error;
  }
};

export const getAllCourses = async () => {
  try {
    const response = await apiClient.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error getting Courses", error.response?.data || error);
    throw error;
  }
};

export const getCourseById = async (id) => {
  try {
    const response = await apiClient.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error getting Course with id ${id}`, error.response?.data || error);
    throw error;
  }
};

export const updateCourse = async (id, data) => {
  try {
    const response = await apiClient.patch(`${API_URL}/${id}`, data);
    return response.data;
  } catch (error) {
    console.error(`Error updating Course with id ${id}`, error.response?.data || error);
    throw error;
  }
};

export const deleteCourse = async (id) => {
  try {
    const response = await apiClient.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting Course with id ${id}`, error.response?.data || error);
    throw error;
  }
};