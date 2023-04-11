const express = require('express');
const baseRouter = express.Router()
const userRouter = require('./user');


baseRouter.use('/user',userRouter)
baseRouter.use('/locate',userRouter)


module.exports = baseRouter
