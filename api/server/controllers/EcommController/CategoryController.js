const { createCategoryService, updateCategoryService, getCategoryService, deleteCategoryService, getCategoryByIDService } = require("../../services/EcommServices/CategoryService");
const { requiredParams } = require('../../utility/requiredCheck');
const db = require('../../../config/connection');

class CategoryController {
  static async createCategory(req, res) {
    const payload = req.body;
    const { category_name } = payload;
    //console.log('createCategory payload', payload);
    if (category_name == null || category_name == undefined) return requiredParams(res, 'category_name is required!');
    const result = await createCategoryService(payload);
    //console.log('result', result);
    try {
      if (result) {
        return res.status(200).send({
          success: true,
          msg: `Category Inserted!`,
          data: { category_id: result }
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

  static async updateCategory(req, res) {
    const payload = req.body;
    const { category_id, category_name } = payload;
    if (category_id == null || category_id == undefined) return requiredParams(res, 'category_id is required!');
    if (category_name == null || category_name == undefined) return requiredParams(res, 'category_name is required!');
    //console.log('updateCategory payload', payload);
    const result = await updateCategoryService(payload);
    // console.log('result', result);
    try {
      if (result) {
        return res.status(200).send({
          success: true,
          msg: `Category updated!`,
          data: []
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

  static async getCategory(req, res) {
    const payload = req.body;
    //console.log('createAddress payload', payload);
    const result = await getCategoryService(payload);
    //console.log('result', result);
    try {
      if (result) {
        return res.status(200).send({
          success: true,
          msg: (result[0].length !== 0) ? 'Category List' : 'No Category',
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

  static async getCategoryByID(req, res) {
    const payload = req.body;
    const { category_id } = payload;
    if (category_id == null || category_id == undefined) return requiredParams(res, 'category_id is required!');
    const result = await getCategoryByIDService(category_id);
    console.log(result);
    try {
      return res.status(200).send({
        success: true,
        msg: result == undefined ? 'Category does not exist' : 'Category by ID',
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


  static async deleteCategory(req, res) {
    const payload = req.body;
    const { category_id } = payload;
    if (category_id == null || category_id == undefined) return requiredParams(res, 'category_id is required!');
    try {
      const [[check]] = await db.promise().query(`select c.category_id,p.product_id from category c left join products p on p.category_id = c.category_id where c.category_id = ${category_id} limit 1`);
      console.log('check', check);
      if (check !== undefined) {
        if (check.product_id == null) {
          const result = await deleteCategoryService(payload.category_id);
          console.log('result', result);
          if (result) {
            return res.status(200).send({
              success: true,
              msg: `Category deleted!`,
              data: {},
            });
          }
        } else {
          return res.status(200).send({
            success: false,
            msg: `Product exist for this Category!`,
            data: {},
          });
        }
      } else {
        return res.status(200).send({
          success: false,
          msg: `Category does not exist!`,
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

module.exports = CategoryController;