
const db = require('../../../config/connection');

const createCategoryService = async (payload) => {
    try {
        const sql = `INSERT INTO category SET ?`;
        const [row] = await db.promise().query(sql, payload);
        // const procedure = `CALL spCreateCategory(?)`;
        // const [[row]] = await db.promise().query(procedure, JSON.stringify(payload));
        if (row) {
            return row.insertId;
        } else {
            return null;
        }
    } catch (error) {
        throw new Error(error);
    }
}

const updateCategoryService = async (payload) => {
    const { category_name, category_description, category_id } = payload;
    try {
        const sql = `update category c SET c.category_name = ${JSON.stringify(category_name)}, c.category_description = ${JSON.stringify(category_description == undefined ? null : category_description)} where c.category_id = ${category_id}`;
        const [row] = await db.promise().query(sql);
        // const procedure = `CALL spUpdateCategory(?)`;
        // const [[row]] = await db.promise().query(procedure, JSON.stringify(payload));
        if (row) {
            return row;
        } else {
            return null;
        }
    } catch (error) {
        throw new Error(error);
    }
}

const getCategoryService = async (payload) => {
    const { page, size } = payload;
    try {
        let v_size = size == undefined ? 10 : size;
        let v_page = page == undefined ? 0 : page * size;

        const sql = `select c.* from category c
        ORDER BY 
        c.created_at desc
        LIMIT ${v_page}, ${v_size}`;
        console.log(sql);
        const [row] = await db.promise().query(sql);

        const totalSql = `select count(*) as total from category`;
        console.log(sql);
        const [count] = await db.promise().query(totalSql);
        // const procedure = `call spGetCategory(?)`;
        // const [row] = await db.promise().query(procedure, JSON.stringify(keyword));
        if (row) {
            return [row, count];
        } else {
            return null;
        }
    } catch (error) {
        throw new Error(error);
    }
}

const getCategoryByIDService = async (payload) => {
    try {
      const sql = `select c.* from category c
      where
      c.category_id = ${payload}`;
      const [[row]] = await db.promise().query(sql);
      return row;
    } catch (error) {
      throw new Error(error);
    }
  }
  
const deleteCategoryService = async (payload) => {
    try {
        const sql = `DELETE FROM category WHERE category_id = ${payload}`;
        console.log(sql);
        const [row] = await db.promise().query(sql);
  
        // const procedure = `call spGetCategory(?)`;
        // const [row] = await db.promise().query(procedure, JSON.stringify(keyword));
        if (row) {
            return row;
        } else {
            return null;
        }
    } catch (error) {
        throw new Error(error);
    }
  }

module.exports = { createCategoryService, updateCategoryService, getCategoryService,getCategoryByIDService, deleteCategoryService }