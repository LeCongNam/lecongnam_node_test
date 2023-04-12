const homeService = require("../services/home.service");

class HomeController {
    async findLocate(req, res, next) {
        try {
            const { id, n } = req.query;
            if (!id || !n) {
                return res.status(422).json({
                    success: false,
                    error: "missing field!",
                    data: null,
                });
            }
            const data = await homeService.findLocate({ id, n });

            return res.json({
                success: true,
                data,
                error: null,
            });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new HomeController();
