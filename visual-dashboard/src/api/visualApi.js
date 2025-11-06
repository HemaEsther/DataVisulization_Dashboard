import axios from "axios";

const baseURL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

const API = axios.create({
  baseURL: `${baseURL}`,
  timeout: 10000,
});

export const fetchData = async (filters = {}) => {
  const resp = await API.get("/data", { params: filters });
  return resp.data;
};

export const fetchFilterOptions = async () => {
  const resp = await API.get("/options");
  return resp.data;
};
