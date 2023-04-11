require("dotenv").config();

// fake db
require("./services/readFile");

const express = require("express");
const router = require("./routes");
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(
    express.urlencoded({
        extended: true,
    }),
);

app.use(router);

app.use((req, res, next) => {
    const error = new Error("404 Not found");
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500).send({
        sucess: false,
        error: error.message || "Internal Server Error"
    });
});

app.listen(port, () => {
    console.log(`server is running port: ${port}`);
});
