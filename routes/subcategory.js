const express = require('express');
const router = express.Router();
const SubCategoryController = require('../controllers/subcategoryController');

router.post('/', SubCategoryController.addSubCategory);
router.get('/', SubCategoryController.getAllSubCategories);
router.put('/:id', SubCategoryController.editSubCategory);
router.get('/search', SubCategoryController.searchSubCategory);

module.exports = router;
