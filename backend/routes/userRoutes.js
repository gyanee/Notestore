const express = require("express");
const { registerUser, authUser } = require("../controllers/userControllers");

const routes = express.Router();

routes.route("/").post(registerUser);
routes.route("/login").post(authUser);

module.exports = routes;
