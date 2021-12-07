const db = require('../../../config/connection');

const getProductService = async (payload) => {
  const { page, size, keyword } = payload;

  let v_size = 10, v_page = 0;
  if (keyword != undefined && keyword.length > 0) {
    const [[res]] = await db.promise().query(`select count(*) as count from products p`);
    console.log("res", res);
    v_size = res.count;
    v_page = 0;
  } else {
    v_size = size == undefined ? 10 : size;
    v_page = page == undefined ? 0 : page * size;
    console.log("v_size", v_size);
  }

  try {
    // const procedure = `CALL spGetProducts(?)`;
    const sql = `select p.*,c.category_name,c.category_description from products p
                 left join category c on c.category_id = p.category_id
                 where
                 p.product_name like concat('%',${JSON.stringify(keyword == undefined ? '' : keyword)},'%')
                 ORDER BY 
                 p.created_at desc
                 LIMIT ${v_page}, ${v_size}`;
    console.log(sql);
    const [row] = await db.promise().query(sql);

    const totalSql = `select count(*) as total from products`;
    console.log(sql);
    const [count] = await db.promise().query(totalSql);
    // const [row] = await db.promise().query(procedure, JSON.stringify(payload));
    console.log("row", row);
    if (row) {
      return [row, count];
    } else {
      return null;
    }
  } catch (error) {
    console.log("err", error);
    throw new Error(error);
  }
}

const getProductByIDService = async (payload) => {
  try {
    // const procedure = `CALL spGetProductByID(?)`;
    // const [[row, second]] = await db.promise().query(procedure, JSON.stringify(payload));
    const sql = `select p.*,c.category_name,c.category_description from products p
    left join category c on c.category_id = p.category_id
    where
    p.product_id = ${payload}`;
    const [[row]] = await db.promise().query(sql);
    return row;
  } catch (error) {
    throw new Error(error);
  }
}

const getProductsByCategoryService = async (payload) => {
  const { page, size, keyword, category_id } = payload;

  let v_size, v_page;
  if (keyword != undefined && keyword.length > 0) {
    const [[res]] = await db.promise().query(`select count(*) as count from products p`);
    console.log("res", res);
    v_size = res.count;
    v_page = 0;
  } else {
    v_size = size == undefined ? 10 : size;
    v_page = page == undefined ? 0 : page * size;
  }
  console.log("payload", payload);
  try {
    // const procedure = `CALL spGetProductsByCategory(?)`;
    // const [row] = await db.promise().query(procedure, JSON.stringify(payload));
    const sql = `select p.*,c.category_name,c.category_description from products p 
    left join category c on c.category_id = p.category_id
    where p.category_id = ${category_id} and p.product_name like concat('%',${JSON.stringify(keyword == undefined ? '' : keyword)},'%')
   order by p.created_at desc
   limit ${v_page},${v_size}`;
    const [row] = await db.promise().query(sql);
    console.log(row);
    if (row) {
      return [row, row.length];
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
}

const createProductService = async (payload) => {
  try {
    const sql = `INSERT INTO products SET ?`;
    const [row] = await db.promise().query(sql, payload);
    console.log('row in service', row);
    // const procedure = `CALL spCreateProduct(?)`;
    // const [[row]] = await db.promise().query(procedure, JSON.stringify(payload));
    if (row) {
      return row.insertId;
    } else {
      return null;
    }
  } catch (error) {
    console.log('error', error);
    throw new Error(error);
  }
}

const updateProductService = async (payload) => {
  const { product_id, product_name, product_description, stock, price } = payload;
  try {
    const sql = `update products p SET p.product_name = ${JSON.stringify(product_name)}, p.product_description = ${JSON.stringify(product_description == undefined ? null : product_description)},p.stock = ${stock},p.price = ${price} where p.product_id = ${product_id}`;
    const [row] = await db.promise().query(sql);
    // const procedure = `CALL spUpdateProduct(?)`;
    // const [[row]] = await db.promise().query(procedure, JSON.stringify(payload));
    if (row) {
      return row;
    } else {
      return null;
    }
  } catch (error) {
    console.log('error', error);
    throw new Error(error);
  }
}

const deleteProductService = async (payload) => {
  try {
    const sql = `DELETE FROM products WHERE product_id = ${payload}`;
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

module.exports = { getProductService, getProductByIDService, getProductsByCategoryService, createProductService, updateProductService, deleteProductService };
