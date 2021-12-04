const { createProductService, getProductService, getProductByIDService, getProductsByCategoryService, updateProductService } = require("../../services/EcommServices/ProductService");
const { requiredParams } = require("../../utility/requiredCheck");

class ProductController {
  static async getProducts(req, res) {
    const payload = req.body;
    // payload check here
    //console.log('getProducts payload', payload);
    const [result, meta] = await getProductService(payload);
    // console.log('result', result);
    try {
      if (result) {
        return res.status(200).send({
          success: true,
          msg: (result.length !== 0) ? 'Product list' : 'No products',
          data: result,
          meta: meta[0] || { total: 0 }
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
    //console.log('getProducts payload', payload);
    const result = await getProductByIDService(payload);
    try {
      if (result) {
        return res.status(200).send({
          success: true,
          msg: 'Product by ID',
          data: result,
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

  static async getProductsByCategory(req, res) {
    const payload = req.body;
    //console.log('getProducts payload', payload);
    const [result, meta] = await getProductsByCategoryService(payload);
    try {
      if (result) {
        return res.status(200).send({
          success: true,
          msg: (result.length !== 0) ? 'Product by Category list' : 'No products',
          data: result,
          meta: meta[0] || { total: 0 }
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
    const { name } = payload;
    if (name == null || name == undefined) return requiredParams(res, 'Name is required!');
    try {
      const [result] = await createProductService(payload);
      //console.log('result', result);
      if (result) {
        return res.status(200).send({
          success: true,
          msg: `${result.msg}`,
          data: {},
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

  static async updateProduct(req, res) {
    const payload = req.body;
    //console.log('updateProduct payload', payload);
    const { product_id, name } = payload;
    if (product_id == null || product_id == undefined) return requiredParams(res, 'product_id is required!');
    if (name == null || name == undefined) return requiredParams(res, 'Name is required!');
    try {
      const [result] = await updateProductService(payload);
      //console.log('result', result);
      if (result) {
        return res.status(200).send({
          success: true,
          msg: `${result.msg}`,
          data: {},
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

}

module.exports = ProductController;