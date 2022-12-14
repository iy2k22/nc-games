const db = require('../db/connection');

const readCategories = () => {
    return db.query(`SELECT * FROM categories;`).then((result) => result.rows);
}

module.exports = {
    readCategories
}