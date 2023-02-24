const Joi = require('joi');
const { constantsMerge: errorConstMerge } = require('../Schema/ErrorMessage');

// Custom validation
const isValidName = (value, helpers) => {
  if (/^[a-zA-Z0-9_]{1,31}$/.test(value)) {
    return true;
  }
  return helpers.error('string.custom');
};

/**
 * BASE Event Category Count schema
 */

const base = Joi.object().keys({
  publicToken: Joi.string().required().messages({
    'any.required': errorConstMerge.ISREQUIRE_FIELD,
  }),

  category: Joi.string().required().custom(isValidName).messages({
    'any.required': errorConstMerge.ISREQUIRE_FIELD,
    'string.custom': errorConstMerge.INVALID_CATEGORY_NAME,
  }),

  action: Joi.string().required().custom(isValidName).messages({
    'any.required': errorConstMerge.ISREQUIRE_FIELD,
    'string.custom': errorConstMerge.INVALID_ACTION_NAME,
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

const EVCategoryActionIDCountSchema = () => base;

module.exports = {
  EVCategoryActionIDCountSchema,
};
