const db = require("../models");
const jwt = require("jsonwebtoken");

module.exports = {
  findById: function(req, res) {
    payload = jwt.verify(req.params.id, process.env.CLIENT_SECRET);

    db.User.findById(payload.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

  createNGO: function(req, res) {
    const dbNGO = req.body.ngo;
    db.Ngo.create(dbNGO)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

  getAllNGO: function(req, res) {
    db.Ngo.find({})
      .then(dbModel => {
        res.json(dbModel);
      })
      .catch(err => res.status(422).json(err));
  },

  createEmployee: function(req, res) {
    const dbEmployee = req.body.employee;
    // console.log("dbEmployee", dbEmployee)
    db.Employee.create(dbEmployee)
    .then(dbModel => res.json(dbModel))
    .catch(err => res.status(422).json(err));
  }
};
