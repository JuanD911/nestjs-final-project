import apiClient from "./apiClient";

const API_URL = "/professor";

export const createProfessor = async (data) => {
  try {
    const response = await apiClient.post(`${API_URL}/createProfessor`, data);
    return response.data;
  } catch (error) {
    console.error("Error creating Professor:", error.response?.data || error);
    throw error;
  }
};

export const getAllProfessors = async () => {
  try {
    const response = await apiClient.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error getting Professors", error.response?.data || error);
    throw error;
  }
};

export const getProfessorById = async (id) => {
  try {
    const response = await apiClient.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error getting Professor with id ${id}`, error.response?.data || error);
    throw error;
  }
};

export const updateProfessor = async (id, data) => {
  try {
    const response = await apiClient.patch(`${API_URL}/${id}`, data);
    return response.data;
  } catch (error) {
    console.error(`Error updating Professor with id ${id}`, error.response?.data || error);
    throw error;
  }
};

export const deleteProfessor = async (id) => {
  try {
    const response = await apiClient.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting Professor with id ${id}`, error.response?.data || error);
    throw error;
  }
};