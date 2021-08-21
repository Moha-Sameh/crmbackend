// Imports
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const EmployeeRoute = require("./router/Client.Router");
const AuthRoute = require("./router/Auth.Router");

// Database connection
mongoose.connect("mongodb://localhost:27017/crmDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});
const db = mongoose.connection;
db.on("error", (err) => {
  console.error(err);
});
db.once("open", () => {
  console.log("Database connection established!");
});

// Middleware
const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.use("/api/", AuthRoute);
app.use("/api/client", EmployeeRoute);
