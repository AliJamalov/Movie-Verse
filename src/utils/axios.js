import axios from "axios";

const API_KEY = import.meta.env.VITE_API_KEY;

const axiosTmdbApi = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: {
    api_key: API_KEY,
  },
});

export default axiosTmdbApi;

export const axiosInstance = axios.create({
  baseURL:
    window.location.hostname === "localhost"
      ? "http://localhost:5000/api"
      : "https://movieverse-server.onrender.com/api",
  withCredentials: true,
});
