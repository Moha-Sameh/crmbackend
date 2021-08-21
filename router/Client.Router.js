const express = require("express");
const router = express.Router();
const ClientController = require("../controller/Client.Controller");
const authenticated = require("../middleware/Auth.Middleware");

router.get("/", authenticated, ClientController.index);
router.post("/store", authenticated, ClientController.store);
router.put("/update", authenticated, ClientController.update);
router.delete("/delete", authenticated, ClientController.destroy);

module.exports = router;
