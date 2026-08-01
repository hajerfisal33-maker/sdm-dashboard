import axios from "axios";

const api = axios.create({

  baseURL: "sdm-dashboard-pe46.onrender.com/api"

});

export default api;