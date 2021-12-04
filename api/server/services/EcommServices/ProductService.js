const db = require('../../../config/connection');

const getProductService = async (payload) => {
  try {
    const procedure = `CALL spGetProducts(?)`;
    const [row] = await db.promise().query(procedure, JSON.stringify(payload));
    if (row) {
      return row;
    } else {
      return null;
    }
  } catch (error) {
    throw new Error(error);
  }
}

const getProductByIDService = async (payload) => {
  try {
    const procedure = `CALL spGetProductByID(?)`;
    const [[row, second]] = await db.promise().query(procedure, JSON.stringify(payload));
    return second[0].total > 0 ? row[0] : {};
  } catch (error) {
    throw new Error(error);
  }
}

const getProductsByCategoryService = async (payload) => {
  try {
    const procedure = `CALL spGetProductsByCategory(?)`;
    const [row] = await db.promise().query(procedure, JSON.stringify(payload));
    if (row) {
      return row;
    } else {
      return null;
    }
  } catch (error) {
    throw new Error(error);
  }
}

const createProductService = async (payload) => {
  try {
    const procedure = `CALL spCreateProduct(?)`;
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

const updateProductService = async (payload) => {
  try {
    const procedure = `CALL spUpdateProduct(?)`;
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

module.exports = { getProductService, getProductByIDService, getProductsByCategoryService, createProductService, updateProductService };
