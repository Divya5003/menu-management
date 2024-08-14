const Category = require('../models/category');
const SubCategory = require('../models/subcategory');
const Item = require('../models/item');

exports.addItem = async (req, res) => {
    try {
        const { categoryId, subcategoryId, name, image, description, taxApplicability, tax, baseAmount, discount } = req.body;

        let category = null;
        let subcategory = null;
        if (categoryId !== undefined) {
            category = await Category.findById(categoryId);
            if (!category) {
                return res.status(404).json({ message: 'Category not found' });
            }
        }
        else if (subcategoryId !== undefined) {
            subcategory = await SubCategory.findById(subcategoryId);
            if (!subcategory) {
                return res.status(404).json({ message: 'SubCategory not found' });
            }
        }
        else {
            return res.status(400).json({ message: 'Please provide CategoryId or SubCategoryId' })
        }

        const item = new Item({
            name,
            description,
            image,
            taxApplicability,
            tax: taxApplicability ? tax : 0,
            baseAmount,
            discount,
            totalAmount: baseAmount - discount,
            categoryId: category?._id,
            subcategoryId: subcategory?._id
        });

        const savedItem = await item.save();

        if (category) {
            category.items.push(savedItem._id);
            await category.save();
        }

        if (subcategory) {
            subcategory.items.push(savedItem._id);
            await subcategory.save();
        }

        res.status(201).json(item);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getAllItems = async (req, res) => {
    try {
        const items = await Item.find();
        res.status(200).json(items);
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
};

exports.editItem = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, image, description, taxApplicability, tax, baseAmount, discount } = req.body;

        let item = await Item.findById(id);
        if (!item) {
            return res.status(404).json({ message: 'Item not found' });
        }

        if (name !== undefined) item.name = name;
        if (image !== undefined) item.image = image;
        if (description !== undefined) item.description = description;
        if (taxApplicability !== undefined) item.taxApplicability = taxApplicability;
        if (tax !== undefined) item.tax = tax;
        if (baseAmount !== undefined) {
            item.baseAmount = baseAmount;
            item.totalAmount = baseAmount - item.discount;
        }
        if (discount !== undefined) {
            item.discount = discount;
            item.totalAmount = item.baseAmount - discount;
        }

        await item.save();

        res.status(200).json(item);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.searchItem = async (req, res) => {
    try {
        const items = await Item.find({
            name: { $regex: req.query.name, $options: 'i' }
        });
        res.status(200).json(items);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}