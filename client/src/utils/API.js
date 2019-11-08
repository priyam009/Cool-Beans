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
  }
};
