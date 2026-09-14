import axios from "axios";

const API_URL = "http://localhost:5000/api/vehicles";

export const getVehicles = async () => {
  const response = await axios.get(`${API_URL}/all`);
  return response.data;
};