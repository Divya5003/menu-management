const Category = require('../models/category');
const SubCategory = require('../models/subcategory');

exports.addSubCategory = async (req, res) => {
    try {
        const { categoryId, name, image, description, taxApplicability, tax } = req.body;

        const category = await Category.findById(categoryId);
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }

        const subCategory = new SubCategory({
            name,
            image,
            description,
            categoryId: category._id,
            taxApplicability: taxApplicability ?? category.taxApplicability,
            tax: taxApplicability ? tax ?? category.tax : 0,
        });
        await subCategory.save();

        category.subCategories.push(subCategory._id);
        await category.save();

        res.status(201).json(subCategory);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getAllSubCategories = async (req, res) => {
    try {
        const subCategories = await SubCategory.find();
        res.status(200).json(subCategories);
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
};

exports.editSubCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, image, taxApplicability, tax } = req.body;

        let subCategory = await SubCategory.findById(id);
        if (!subCategory) {
            return res.status(404).json({ message: 'SubCategory not found' });
        }

        if (name !== undefined) subCategory.name = name;
        if (description !== undefined) subCategory.description = description;
        if (image !== undefined) subCategory.image = image;
        if (taxApplicability !== undefined) subCategory.taxApplicability = taxApplicability;
        if (tax !== undefined) subCategory.tax = tax;

        await subCategory.save();

        res.status(200).json(subCategory);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.searchSubCategory = async (req, res) => {
    try {
        const subCategories = await SubCategory.find({
            name: { $regex: req.query.name, $options: 'i' }
        });
        res.status(200).json(subCategories);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};