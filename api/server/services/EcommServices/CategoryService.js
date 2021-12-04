
const db = require('../../../config/connection');

const createCategoryService = async (payload) => {
    try {
        const procedure = `CALL spCreateCategory(?)`;
        const [[row]] = await db.promise().query(procedure, JSON.stringify(payload));
        if (row) {
            return row;
        } else {
            return null;
        }
    } catch (error) {
        throw new Error(error);
    }
}

const updateCategoryService = async (payload) => {
    try {
        const procedure = `CALL spUpdateCategory(?)`;
        const [[row]] = await db.promise().query(procedure, JSON.stringify(payload));
        if (row) {
            return row;
        } else {
            return null;
        }
    } catch (error) {
        throw new Error(error);
    }
}

const getCategoryService = async (keyword) => {
    try {
        const procedure = `call spGetCategory(?)`;
        const [row] = await db.promise().query(procedure, JSON.stringify(keyword));
        if (row) {
            return row;
        } else {
            return null;
        }
    } catch (error) {
        throw new Error(error);
    }
}

module.exports = { createCategoryService, updateCategoryService, getCategoryService }