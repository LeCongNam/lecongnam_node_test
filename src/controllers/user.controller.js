const db = require("../services/readFile");

class UserController {
    async getUser(req, res, next) {
        try {
            const { id } = req.query;
            if (!id) {
                return res.status(422).json({
                    success: false,
                    error: "missing Query data!",
                    data: {},
                });
            }
            const data = await db.getOne({ id });

            return res.json({
                success: true,
                error: null,
                data,
            });
        } catch (error) {
            next(error)
        }
    }

    async addUser(req, res, next) {
        try {
            const { firstname, lastname, age, coordinate } = req.body;

            if (!firstname || !lastname || !age || !coordinate) {
                return res.status(422).json({
                    success: false,
                    error: "missing field!",
                    data: null,
                });
            }

            if (typeof firstname !== "string") {
                return res.status(422).json({
                    success: false,
                    data: null,
                    error: "firstname must be a String",
                });
            }

            if (typeof lastname !== "string") {
                return res.status(422).json({
                    success: false,
                    data: null,
                    error: "lastname must be a String",
                });
            }

            // validate age
            if (typeof age !== "number" && isNaN(age)) {
                return res.status(422).json({
                    success: false,
                    data: null,
                    error: "age must be a Number",
                });
            } else {
                const ageValid = age >= 0 && age <= 100;
                if (!ageValid) {
                    return res.status(422).json({
                        success: false,
                        data: null,
                        error: "The age must be a number between 1 and 100",
                    });
                }
            }

            var re = /([0-9]{3,3}):([0-9]{3,3})/;
            var myRe = new RegExp(re, "g");
            const matched = myRe.exec(coordinate);

            if (!matched) {
                return res.status(422).json({
                    success: false,
                    data: null,
                    error: "coordinate must be a format '123:456' ",
                });
            }
            const coordinateArr = coordinate.split(":");
            const [x, y] = coordinateArr;
            if (x.length !== 3 || y.length !== 3) {
                return res.status(422).json({
                    success: false,
                    data: null,
                    error: "Please check length item match format '123:456'",
                });
            }
            const newUser = await db.add({
                firstname,
                lastname,
                age,
                coordinate, // because
            });

            return res.json({
                success: true,
                data: newUser,
                error: null,
            });
        } catch (error) {
            next(error)
        }
    }

    async searchUser(req, res, next) {
        try {
            const { name } = req.query;
            if (!name) {
                return res.status(422).json({
                    success: false,
                    error: "missing Query data",
                });
            }
            const data = await db.getOne({ name });

            return res.json({
                success: false,
                error: null,
                data,
            });
        } catch (error) {
            next(error)
        }
    }

    async editInfo(req, res, next) {
        try {
            const { id } = req.params;

            if (!id) {
                return res.status(422).json({
                    success: false,
                    error: "missing Query data",
                });
            }

            const { firstname, lastname, age, coordinate } = req.body;

            if (!firstname || !lastname || !age || !coordinate) {
                return res.status(422).json({
                    success: false,
                    error: "missing field!",
                    data: null,
                });
            }

            if (typeof firstname !== "string") {
                return res.status(422).json({
                    success: false,
                    data: null,
                    error: "firstname must be a String",
                });
            }

            if (typeof lastname !== "string") {
                return res.status(422).json({
                    success: false,
                    data: null,
                    error: "lastname must be a String",
                });
            }

            // validate age
            if (typeof age !== "number" && isNaN(age)) {
                return res.status(422).json({
                    success: false,
                    data: null,
                    error: "age must be a Number",
                });
            } else {
                const ageValid = age >= 0 && age <= 100;
                if (!ageValid) {
                    return res.status(422).json({
                        success: false,
                        data: null,
                        error: "The age must be a number between 1 and 100",
                    });
                }
            }

            const re = /([0-9]{3,3}):([0-9]{3,3})/;
            const myRe = new RegExp(re, "g");
            const matched = myRe.exec(coordinate);

            if (!matched) {
                return res.status(422).json({
                    success: false,
                    data: null,
                    error: "coordinate must be a format '123:456' ",
                });
            }
            const coordinateArr = coordinate.split(":");
            const [x, y] = coordinateArr;
            if (x.length !== 3 || y.length !== 3) {
                return res.status(422).json({
                    success: false,
                    data: null,
                    error: "Please check length item match format '123:456'",
                });
            }

            const user = await db.getOne({ id });

            if (!user) {
                return res.status(404).json({
                    success: false,
                    data: null,
                    error: "User not found!",
                });
            }

            const newData = await db.edit({ id, data: req.body });

            return res.json({
                success: false,
                error: null,
                data: newData,
            });
        } catch (error) {
            next(error)
        }
    }

    async deleteUser(req, res, next) {
        try {
            const { id } = req.params;
            if (!id) {
                return res.status(422).json({
                    success: false,
                    error: "missing Query data",
                });
            }
            const user = await db.getOne({ id });
            if (!user || Object.keys(user).length === 0) {
                return res.status(404).json({
                    success: false,
                    data: null,
                    error: "User not found!",
                });
            }
            const result = await db.delete({ id })

            return res.json({
                success: true,
                data: result,
                error: null,
            });
        } catch (error) {
            console.log(error);
            next(error)
        }
    }
}

module.exports = new UserController();
