const fs = require("fs");
const path = require("path");
const shortid = require("shortid");

class ReadFile {
    constructor() {
        try {
            const data = fs.readFileSync(path.join("src", "db", "db.json"));
            const databases = JSON.parse(data);
            console.log(`Database connect`);
        } catch (error) {
            throw new Error('Please enter an Array emty to path "/src/db/db.json" ');
        }
    }

    getAll() {
        try {
            const data = fs.readFileSync(path.join("src", "db", "db.json"));
            const databases = JSON.parse(data);
            return databases;
        } catch (error) {
            throw new Error(error);
        }
    }

    /**
     *
     * @param { object } query
     * @param { string } query.name
     * @param { string } query.id
     * @returns Promise<object>
     */
    async getOne(query) {
        try {
            const data = await fs.readFileSync(path.join("src", "db", "db.json"));
            const databases = await JSON.parse(data);
            let result = {};
            for (let i = 0; i < databases.length; i++) {
                if (query.id) {
                    if (databases[i].id === query.id) {
                        result = {
                            ...databases[i],
                        };
                    }
                }

                if (query.name) {
                    if (databases[i].lastname === query.name || databases[i].firstname === query.name) {
                        result = {
                            ...databases[i],
                        };
                    }
                }
            }
            return result;
        } catch (error) {
            throw new Error(error);
        }
    }

    async add(data) {
        try {
            data = {
                ...data,
                id: shortid.generate(),
            };
            let allData = await this.getAll();

            if (typeof allData !== "object") {
                allData = [];
            }
            allData.push(data);
            const dataConvert = JSON.stringify(allData, null, 4);
            await fs.writeFileSync(path.join("src", "db", "db.json"), dataConvert, "utf8");
            return data;
            //   console.log(`File is written successfully!`);
        } catch (err) {
            console.log(`Error writing file: ${err}`);
        }
    }

    /**
     *
     * @param { object } query
     * @param { string } query.data
     * @param { string } query.id
     * @returns Promise<object>
     */
    async edit(query) {
        try {
            let allData = await this.getAll();
            let result = null;
            if (typeof allData !== "object" || allData.length === 0) {
                return null;
            }
            for (let i = 0; i < allData.length; i++) {
                if (allData[i].id === query.id) {
                    allData[i] = {
                        ...allData[i],
                        ...query.data,
                    };
                    console.log(allData[i], query.data);

                    result = allData[i];
                }
            }
            const dataConvert = JSON.stringify(allData, null, 4);
            await fs.writeFileSync(path.join("src", "db", "db.json"), dataConvert, "utf8");
            return result;
        } catch (err) {
            console.log(`Error writing file: ${err}`);
        }
    }

    /**
     *
     * @param { object } query
     * @param { string } query.id
     * @returns Promise<object>
     */
    async delete(query) {
        try {
            let allData = await this.getAll();
            let result = null;
            if (typeof allData !== "object" || allData.length === 0) {
                return null;
            }
            for (let i = 0; i < allData.length; i++) {
                if (allData[i].id === query.id) {
                    allData = allData.filter((item) => {
                        if (item.id !== query.id) {
                            return true;
                        } else {
                            result = item;
                        }
                    });
                }
            }
            const dataConvert = JSON.stringify(allData, null, 4);
            await fs.writeFileSync(path.join("src", "db", "db.json"), dataConvert, "utf8");
            return result;
        } catch (err) {
            console.log(`Error writing file: ${err}`);
        }
    }
}

module.exports = new ReadFile();
