const db = require('../db/connection');

const readCategories = () => {
    return db.query(`SELECT slug, description FROM categories;`).then((result) => result.rows);
}

module.exports = {
    readCategories
}