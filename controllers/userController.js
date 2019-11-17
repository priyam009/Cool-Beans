const db = require("../models");
const jwt = require("jsonwebtoken");

module.exports = {
  findById: function(req, res) {
    payload = jwt.verify(req.params.id, process.env.CLIENT_SECRET);

    db.User.findById(payload.id)
      .populate("ngo employee")
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

  createNGO: function(req, res) {
    const dbNGO = req.body.ngo;

    payload = jwt.verify(req.params.id, process.env.CLIENT_SECRET);

    db.Ngo.create(dbNGO)
      .then(
        dbModel => {
          return db.User.findOneAndUpdate(
            { _id: payload.id },
            { $push: { ngo: dbModel._id } }
          );
        },
        { new: true }
      )
      .then(dbUser => {
        res.json(dbUser);
      })
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

    payload = jwt.verify(req.params.id, process.env.CLIENT_SECRET);

    db.Employee.create(dbEmployee)
      .then(
        dbModel => {
          return db.User.findOneAndUpdate(
            { _id: payload.id },
            { $push: { employee: dbModel._id } }
          );
        },
        { new: true }
      )
      .then(dbUser => {
        res.json(dbUser);
      })
      .catch(err => res.status(422).json(err));
  }
};
