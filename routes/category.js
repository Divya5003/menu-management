const express = require('express');
const router = express.Router();
const CategoryController = require('../controllers/categoryController');

router.post('/', CategoryController.createCategory);
router.get('/', CategoryController.getAllCategories);
router.put('/:id', CategoryController.editCategory);
router.get('/search', CategoryController.searchCategory);

module.exports = router;
