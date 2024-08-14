const express = require('express');
const router = express.Router();
const ItemController = require('../controllers/itemController');

router.post('/', ItemController.addItem);
router.get('/', ItemController.getAllItems);
router.put('/:id', ItemController.editItem);
router.get('/search', ItemController.searchItem);

module.exports = router;
