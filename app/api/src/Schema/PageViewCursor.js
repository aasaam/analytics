/** @type {import('json-schema').JSONSchema4} */
const schema = {
  $id: 'PageViewCursor',
  title: 'PageView Cursor',
  description: 'Get Specific Entity Page View By Date',
  type: 'object',
  properties: {
    startDate: {
      type: 'string',
      require: false,
    },
    endDate: {
      type: 'string',
      require: false,
    },
    entityModule: {
      type: 'string',
      require: true,
    },
  },
};

module.exports = {
  schema,
};
