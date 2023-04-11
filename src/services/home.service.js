const db = require("./readFile");

class HomeService {
    async createUser(userInf) {
        try {
            const data = db.add(userInf);
            return data;
        } catch (error) {
            throw new Error(error);
        }
    }

    async getOneUser(id) {
        try {
            const data = await db.getOne({ id });
            return data;
        } catch (error) {
            throw new Error(error);
        }
    }

    compare(a, b) {
        a = a.firstname.toLowerCase();
        b = b.firstname.toLowerCase();

        if (a < b) {
            return 1;
        }
        if (a > b) {
            return -1;
        }
        return 0;
    }

    async searchUser({ name }) {
        try {
            const data = await db.getOne({ name });
            let result;
            if (data.length > 0) {
                result = data.sort(this.compare);
            }
            return result ? result : data;
        } catch (error) {
            throw new Error(error);
        }
    }

    async editUser(id, data) {
        try {
            const newData = await db.edit({ id, data });
            return newData;
        } catch (error) {
            console.log(error);
            throw new Error(error);
        }
    }

    async findOne(id) {
        try {
            const newData = await db.getOne({ id });
            return newData;
        } catch (error) {
            console.log(error);
            throw new Error(error);
        }
    }
}

module.exports = new HomeService();
