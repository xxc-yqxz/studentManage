const express = require("express");
const router = express.Router();

const unlogin_handler = require("./route_methods/unlogin");

router.post('/login', unlogin_handler.login)

module.exports = router;