const Product = require('../models/product.model');
const { validateProduct } = require('../validators/product.validator');

const productController = {
    // Get all products
    async getAllProducts(req, res, next) {
        try {
            const products = await Product.find();
            res.json(products);
        } catch (error) {
            next(error);
        }
    },

    // Create new product
    async createProduct(req, res, next) {
        try {
            const { error } = validateProduct(req.body);
            if (error) {
                return res.status(400).json({
                    code: 'VALIDATION_ERROR',
                    message: error.details.map(detail => detail.message).join(', ')
                });
            }

            const product = new Product(req.body);
            const savedProduct = await product.save();
            res.status(201).json(savedProduct);
        } catch (error) {
            next(error);
        }
    },

    // Get product by ID
    async getProductById(req, res, next) {
        try {
            const product = await Product.findById(req.params.id);
            if (!product) {
                return res.status(404).json({
                    code: 'NOT_FOUND',
                    message: 'Product not found'
                });
            }
            res.json(product);
        } catch (error) {
            next(error);
        }
    },

    // Update product
    async updateProduct(req, res, next) {
        try {
            const { error } = validateProduct(req.body);
            if (error) {
                return res.status(400).json({
                    code: 'VALIDATION_ERROR',
                    message: error.details.map(detail => detail.message).join(', ')
                });
            }

            const product = await Product.findByIdAndUpdate(
                req.params.id,
                req.body,
                { new: true, runValidators: true }
            );

            if (!product) {
                return res.status(404).json({
                    code: 'NOT_FOUND',
                    message: 'Product not found'
                });
            }

            res.json(product);
        } catch (error) {
            next(error);
        }
    },

    // Delete product
    async deleteProduct(req, res, next) {
        try {
            const product = await Product.findByIdAndDelete(req.params.id);
            if (!product) {
                return res.status(404).json({
                    code: 'NOT_FOUND',
                    message: 'Product not found'
                });
            }
            res.status(204).send();
        } catch (error) {
            next(error);
        }
    }
};

module.exports = productController;
