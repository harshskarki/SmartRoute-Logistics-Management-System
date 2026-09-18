import axios from "axios";

const API_URL =
  "http://localhost:5000/api/deliveries";

export const getDeliveries = async () => {
  const response = await axios.get(
    `${API_URL}/all`
  );

  return response.data;
};