const { createCategoryService, updateCategoryService, getCategoryService } = require("../../services/EcommServices/CategoryService");
const { requiredParams } = require('../../utility/requiredCheck');

class CategoryController {
  static async createCategory(req, res) {
    const payload = req.body;
    const { name, description } = payload;
    //console.log('createCategory payload', payload);
    if (name == null || name == undefined) return requiredParams(res, 'name is required!');
    const [result] = await createCategoryService(payload);
    //console.log('result', result);
    try {
      if (result) {
        return res.status(200).send({
          success: true,
          msg: `${result.msg}`,
          data: { category_id: result.category_id }
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
    const { category_id, name, description } = payload;
    if (category_id == null || category_id == undefined) return requiredParams(res, 'category_id is required!');
    if (name == null || name == undefined) return requiredParams(res, 'name is required!');
    if (description === undefined) return requiredParams(res, 'description is required!');
    //console.log('updateCategory payload', payload);
    const [result] = await updateCategoryService(payload);
    //console.log('result', result);
    try {
      if (result) {
        return res.status(200).send({
          success: true,
          msg: `${result.msg}`,
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
    const [result, meta] = await getCategoryService(payload);
    //console.log('result', result);
    try {
      if (result) {
        return res.status(200).send({
          success: true,
          msg: (result.length !== 0) ? 'Category List' : 'No Category',
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

}

module.exports = CategoryController;