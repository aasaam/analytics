const Joi = require('joi');
const { constantsMerge: errorConstMerge } = require('../Schema/ErrorMessage');
/**
 * BASE Cursor PageView Count schema
 */

const base = Joi.object().keys({
  publicToken: Joi.string().required().messages({
    'any.required': errorConstMerge.ISREQUIRE_FIELD,
  }),
  entityModule: Joi.string().required().messages({
    'any.required': errorConstMerge.ISREQUIRE_FIELD,
  }),
  startDate: Joi.string().optional().messages({
    'any.only': errorConstMerge.INVALID_DATE,
  }),

  endDate: Joi.string().optional().messages({
    'any.only': errorConstMerge.INVALID_DATE,
  }),
});

const BaseCursorPageViewCountSchema = () => base;

module.exports = {
  BaseCursorPageViewCountSchema,
};
