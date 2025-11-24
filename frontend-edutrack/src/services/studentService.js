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
