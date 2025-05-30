import axios from "axios";

const productApi = axios.create({
  baseURL: "http://localhost:5001",
});

export { productApi };
