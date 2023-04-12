const express = require("express");
const baseRouter = express.Router();
const userRouter = require("./user");
const homeRouter = require("./home");

baseRouter.use("/user", userRouter);
baseRouter.use("/locate", homeRouter);

module.exports = baseRouter;
