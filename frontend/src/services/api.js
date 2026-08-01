import axios from "axios";

const api = axios.create({

  baseURL: "https://sdm-dashboard-pe46.onrender.com/api"

});

export default api;