const Client = require("../model/Client.Model");

// List of Client
const index = (_, res, next) => {
  Client.find()
    .then((response) => {
      res.json(response);
    })
    .catch((error) => {
      res.json({
        message: "Faild to fetch data list",
      });
    });
};

// Add new Client
const store = (req, res, next) => {
  let client = new Client({
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
  });
  client
    .save()
    .then((response) => {
      res.json({
        client,
      });
    })
    .catch((error) => {
      res.json({
        message: "Faild to create client",
      });
    });
};

// update Client by ID
const update = (req, res, next) => {
  let clientId = req.body.clientId;

  let updatedData = {
    name: req.body.name,
    designation: req.body.designation,
    email: req.body.email,
    phone: req.body.phone,
    age: req.body.age,
  };

  Client.findByIdAndUpdate(clientId, { $set: updatedData })
    .then(() => {
      res.json({
        message: "Client updated successfully",
      });
    })
    .catch((error) => {
      res.json({
        message: "Faild to update something went wrong",
      });
    });
};

// Delete an Client
const destroy = (req, res, next) => {
  let clientId = req.body.clientId;
  Client.findByIdAndRemove(clientId)
    .then(() => {
      res.json({
        message: "Client removed successfully",
      });
    })
    .catch((error) => {
      res.json({
        message: "An error occured",
      });
    });
};

module.exports = {
  index,
  store,
  update,
  destroy,
};
