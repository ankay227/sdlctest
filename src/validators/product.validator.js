const Joi = require('joi');

const productSchema = Joi.object({
    name: Joi.string().required().trim(),
    price: Joi.number().min(0).required(),
    description: Joi.string().trim().allow('', null)
});

module.exports = {
    validateProduct: (data) => productSchema.validate(data, { abortEarly: false })
};
