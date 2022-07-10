const express = require("express");
const {
  registerUser,
  authUser,
  updateUser,
} = require("../controllers/userControllers");
const protect = require("../middleware/authMiddleware");

const routes = express.Router();

routes.route("/").post(registerUser);
routes.route("/login").post(authUser);
routes.route("/profile").post(protect, updateUser);

module.exports = routes;
