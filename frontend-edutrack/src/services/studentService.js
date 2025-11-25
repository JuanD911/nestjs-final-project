import axios from "axios";

const API_URL = "http://localhost:3000/student";

export const createStudent = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/createStudent`, data);
    return response.data;
  } catch (error) {
    console.error("Error creating student:", error.response?.data || error);
    throw error;
  }
};

export const getAllStudents = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error getting students", error.response?.data || error);
    throw error;
  }
};

export const getStudentById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error getting student with id ${id}`, error.response?.data || error);
    throw error;
  }
};

export const updateStudent = async (id, data) => {
  try {
    const response = await axios.patch(`${API_URL}/${id}`, data);
    return response.data;
  } catch (error) {
    console.error(`Error updating student with id ${id}`, error.response?.data || error);
    throw error;
  }
};

export const deleteStudent = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting student with id ${id}`, error.response?.data || error);
    throw error;
  }
};