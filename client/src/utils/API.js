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
  },

  updateEmployee: function(employee, id) {
    return axios.put("/api/employee/update/" + id, {employee: employee})
  },

  updateNGO: function(ngo, id) {
    return axios.put("/api/ngo/update/" + id, {total: ngo})
  },

  deleteEmployee: function(id) {
    return axios.delete("/api/employee/delete/" + id);
  },

  deleteNGO: function(id) {
    return axios.delete("/api/ngo/delete/" + id);
  },

  getColors: function(num) {
    return axios.get("/api/ngo/color/" + num);
  }
};
