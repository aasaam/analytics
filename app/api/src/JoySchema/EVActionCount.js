const Joi = require('joi');
const { constantsMerge: errorConstMerge } = require('../Schema/ErrorMessage');

// Custom validation
const isValidCategoryName = (value, helpers) => {
  if (/^[a-zA-Z0-9_]{1,31}$/.test(value)) {
    return true;
  }
  return helpers.error('string.custom');
};

/**
 * BASE Event Action Count schema
 */

const base = Joi.object().keys({
  publicToken: Joi.string().required().messages({
    'any.required': errorConstMerge.ISREQUIRE_FIELD,
  }),

  category: Joi.string().required().custom(isValidCategoryName).messages({
    'any.required': errorConstMerge.ISREQUIRE_FIELD,
    'string.custom': errorConstMerge.INVALID_CATEGORY_NAME,
  }),

  startDate: Joi.string().optional().messages({
    'any.only': errorConstMerge.INVALID_DATE,
  }),

  endDate: Joi.string().optional().messages({
    'any.only': errorConstMerge.INVALID_DATE,
  }),

  limit: Joi.number().optional().messages({
    'any.only': errorConstMerge.INVALID_NUMBER,
  }),
});

const EVActionCountSchema = () => base;

module.exports = {
  EVActionCountSchema,
};
