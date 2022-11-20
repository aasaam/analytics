const { uniq } = require('lodash');
const { ErrorWithProps } = require('mercurius').default;
const {
  constantsMerge: errorConstMerge,
} = require('../../Schema/ErrorMessage');

const {
  UpdatePerformanceSchema: performanceJoiSchema,
} = require('../../JoySchema/Performance');
const SequelizeErrorHandler = require('../../Utils/SequelizeErrorHandler');
const {
  constants: performanceOption,
} = require('../../Schema/PerformanceOption');

class PerformanceUpdate {
  constructor({ sequelize }) {
    this.sequelize = sequelize;
  }

  /**
   *
   * @param {*} id
   * @param {*} data
   * @returns
   */
  async updatePerformance(id, data) {
    const schema = performanceJoiSchema();
    const { name, url, description, interval, options } = data;

    if (!id) {
      throw new ErrorWithProps(errorConstMerge.ISREQUIRE_ID, {
        statusCode: 400,
      });
    }

    try {
      await schema.validateAsync(data, { abortEarly: false });
    } catch (e) {
      const validationErrors = [];
      e.details.forEach((element) => {
        validationErrors.push({
          message: element.message,
          field: element.context.label,
        });
      });

      throw new ErrorWithProps(errorConstMerge.UNPROCESSABLE_ENTITY, {
        validation: validationErrors,
        statusCode: 422,
      });
    }

    const initialValues = {
      name,
      url,
      description,
      interval,
      options,
    };

    if (options) {
      const newOption = await this.retrievePerformanceOptions(id, options);
      initialValues.options = newOption;
    }
    const urlObject = new URL(url);
    initialValues.url = urlObject.origin;

    /**
     ***
     *** UPDATE ***
     ***
     */
    const { Performance } = this.sequelize.models;
    let performance;
    try {
      performance = await Performance.update(initialValues, {
        where: {
          id,
        },
      });
    } catch (e) {
      SequelizeErrorHandler(e);
    }

    return { affectedRow: performance, performanceId: id };
  }

  /**
   *
   * @param {Number} id
   * @param {Object.<string, boolean>} props
   */
  async patchPerformanceOptions(id, props) {
    if (!id) {
      throw new ErrorWithProps(errorConstMerge.ISREQUIRE_ID, {
        statusCode: 400,
      });
    }

    const { Performance } = this.sequelize.models;
    const performance = await Performance.findOne({
      attributes: ['options'],
      where: {
        id,
      },
    });

    let newOption = performance.dataValues.options;

    Object.keys(props).forEach((name) => {
      const booleanStatus = props[`${name}`];
      const value = performanceOption[`${name}`];
      if (booleanStatus) {
        newOption.push(value);
      } else {
        newOption = newOption.filter((v) => v !== value);
      }
    });

    newOption = uniq(newOption);

    const initialValues = {
      options: newOption,
    };

    /**
     ***
     *** UPDATE ***
     ***
     */

    const affectedRow = await Performance.update(initialValues, {
      where: {
        id,
      },
    });

    return { affectedRow, performanceId: id };
  }

  /**
   *
   * @param {Number} id
   * @param {Object.<string, boolean>} props
   */
  async retrievePerformanceOptions(id, props) {
    if (!id) {
      throw new ErrorWithProps(errorConstMerge.ISREQUIRE_ID, {
        statusCode: 400,
      });
    }

    const { Performance } = this.sequelize.models;
    const performance = await Performance.findOne({
      attributes: ['options'],
      where: {
        id,
      },
    });

    let newOption = performance.dataValues.options;

    // eslint-disable-next-line sonarjs/no-identical-functions
    Object.keys(props).forEach((name) => {
      const booleanStatus = props[`${name}`];
      const value = performanceOption[`${name}`];
      if (booleanStatus) {
        newOption.push(value);
      } else {
        newOption = newOption.filter((v) => v !== value);
      }
    });

    newOption = uniq(newOption);

    return newOption;
  }
}

module.exports = PerformanceUpdate;
