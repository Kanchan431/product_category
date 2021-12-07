const { createProductService, getProductService, getProductByIDService, getProductsByCategoryService, updateProductService, deleteProductService } = require("../../services/EcommServices/ProductService");
const { requiredParams } = require("../../utility/requiredCheck");
const db = require('../../../config/connection');

class ProductController {
  static async index(req, res) {
    var res_body = { title: 'Node Tutorial' };
    res.render('index', res_body);
  }

  static async pindex(req, res) {
    fetch(`http://localhost:4444` + `/api/v1/ecomm/getProducts`, {
      method: 'post',
      headers: {
        'Accept': 'application/json'
      },
    })
      .then(res => res.json())
      .then(json => {
        console.log(json);

        res.render('products', { json });
        // res.render('index', res_body);
      })
      .catch(err => res.status(500).send(e.message));
    // var res_body = {
    //   first_name: body.first_name,
    //   last_name: body.last_name,
    //   email: body.email
    // };
  }

  static async users(req, res) {
    res.send('respond with a resource');
  }


  static async getProducts(req, res) {
    const payload = req.body;
    //console.log('getProducts payload', payload);
    const result = await getProductService(payload);
    // console.log('result', result);
    try {
      if (result) {
        return res.status(200).send({
          success: true,
          msg: (result[0].length == 0) ? 'No products' : 'Product list',
          data: result[0],
          meta: result[1] || { total: 0 }
        });
      }
    } catch (error) {
      return res.status(200).send({
        success: false,
        msg: error.message || `Something went wrong`,
        data: []
      });
    }
  }

  static async getProductByID(req, res) {
    const payload = req.body;
    const { product_id } = payload;
    //console.log('getProducts payload', payload);
    if (product_id == null || product_id == undefined) return requiredParams(res, 'product_id is required!');
    const result = await getProductByIDService(product_id);
    console.log(result);
    try {
      return res.status(200).send({
        success: true,
        msg: result == undefined ? 'Product does not exist' : 'Product by ID',
        data: result || {},
      });
    } catch (error) {
      return res.status(200).send({
        success: false,
        msg: error.message || `Something went wrong`,
        data: []
      });
    }
  }

  static async getProductsByCategory(req, res) {
    const payload = req.body;
    const { category_id } = payload;
    //console.log('getProducts payload', payload);
    if (category_id == null || category_id == undefined) return requiredParams(res, 'category_id is required!');
    const result = await getProductsByCategoryService(payload);
    try {
      if (result) {
        return res.status(200).send({
          success: true,
          msg: (result[0].length !== 0) ? 'Product by Category list' : 'No products',
          data: result[0],
          meta: result[1] || { total: 0 }
        });
      }
    } catch (error) {
      return res.status(200).send({
        success: false,
        msg: error.message || `Something went wrong`,
        data: []
      });
    }
  }

  static async createProduct(req, res) {
    const payload = req.body;
    //console.log('createProduct payload', payload);
    const { product_name, category_id } = payload;
    if (product_name == null || product_name == undefined) return requiredParams(res, 'product_name is required!');
    if (category_id == null || category_id == undefined) return requiredParams(res, 'category_id is required!');
    try {
      const result = await createProductService(payload);
      console.log('result', result);
      if (result) {
        return res.status(200).send({
          success: true,
          msg: `Product inserted!`,
          data: { product_id: result },
        });
      }
    } catch (error) {
      console.log('error', error);
      return res.status(200).send({
        success: false,
        msg: error.message || `Something went wrong`,
        data: []
      });
    }
  }

  static async updateProduct(req, res) {
    const payload = req.body;
    console.log('updateProduct payload', payload);
    const { product_id, product_name } = payload;
    if (product_id == null || product_id == undefined) return requiredParams(res, 'product_id is required!');
    if (product_name == null || product_name == undefined) return requiredParams(res, 'product_name is required!');

    try {
      const result = await updateProductService(payload);
      console.log('result', result);
      if (result) {
        return res.status(200).send({
          success: true,
          msg: `Product Updated!`,
          data: {},
        });
      }
    } catch (error) {
      console.log('error', error);

      return res.status(200).send({
        success: false,
        msg: error.message || `Something went wrong`,
        data: []
      });
    }
  }

  static async deleteProduct(req, res) {
    const payload = req.body;
    console.log('deleteProducts payload', payload);
    const { product_id } = payload;
    if (product_id == null || product_id == undefined) return requiredParams(res, 'product_id is required!');
    try {
      const [[check]] = await db.promise().query(`select product_id from products p where p.product_id = ${payload.product_id}`);
      console.log('check', check);
      if (check !== undefined) {
        const result = await deleteProductService(payload.product_id);
        console.log('result', result);
        if (result) {
          return res.status(200).send({
            success: true,
            msg: `Product deleted!`,
            data: {},
          });
        }
      } else {
        return res.status(200).send({
          success: false,
          msg: `Product does not exist!`,
          data: {},
        });
      }

    } catch (error) {
      console.log('error', error);

      return res.status(200).send({
        success: false,
        msg: error.message || `Something went wrong`,
        data: []
      });
    }
  }

}

module.exports = ProductController;