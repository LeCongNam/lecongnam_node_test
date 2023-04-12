const db = require("./readFile");

class HomeService {
    async findLocate({ id, n }) {
        try {
            const data = await db.getAll();
            console.log(data);
            return data;
        } catch (error) {
            throw new Error(error);
        }
    }
}

module.exports = new HomeService();
