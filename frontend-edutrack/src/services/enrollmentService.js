import apiClient from "./apiClient";

const API_URL = "/enrollments";

export const createEnrollment = async (data) => {
  try {
    const response = await apiClient.post(`${API_URL}/createEnrollment`, data);
    return response.data;
  } catch (error) {
    console.error("Error creating Enrollment:", error.response?.data || error);
    throw error;
  }
};

export const getAllEnrollments = async () => {
  try {
    const response = await apiClient.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error getting Enrollments", error.response?.data || error);
    throw error;
  }
};

export const getEnrollmentById = async (id) => {
  try {
    const response = await apiClient.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error getting Enrollment with id ${id}`, error.response?.data || error);
    throw error;
  }
};

export const updateEnrollment = async (id, data) => {
  try {
    const response = await apiClient.patch(`${API_URL}/${id}`, data);
    return response.data;
  } catch (error) {
    console.error(`Error updating Enrollment with id ${id}`, error.response?.data || error);
    throw error;
  }
};

export const deleteEnrollment = async (id) => {
  try {
    const response = await apiClient.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting Enrollment with id ${id}`, error.response?.data || error);
    throw error;
  }
};