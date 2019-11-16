import axios from "axios";

export default {
  getURL: function() {
    return axios.get("/api/google/signin");
  },

  getToken: function(code) {
    return axios.post("/api/google/token", { code: code });
  },

  getUser: function(id) {
    return axios.get("/api/user/" + id);
  },

  createNGO: function(ngo, id) {
    return axios.post("/api/ngo/new/" + id, { ngo: ngo })
  },

  getAllNGO: function() {
    return axios.get("/api/ngo");
  },

  createEmployee: function(employee, id) {
    return axios.post("/api/employee/new/" + id, {employee: employee})
  }
};
