/** @type {import('json-schema').JSONSchema4} */
const schema = {
  $id: 'CategoryActionIDCount',
  title: 'CategoryAction ID Count',
  description: 'Get Category Action ID Count',
  type: 'object',
  properties: {
    category: {
      type: 'string',
      require: true,
    },
    action: {
      type: 'string',
      require: true,
    },
    limit: {
      type: 'number',
      require: false,
    },
    startDate: {
      type: 'string',
      require: false,
    },
    endDate: {
      type: 'string',
      require: false,
    },
  },
};

module.exports = {
  schema,
};
