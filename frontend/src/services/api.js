import axios from "axios";

const api = axios.create({

    baseURL: "http://https://sdm-dashboard-pe46.onrender.com:5000/api"

});

export default api;