const { ErrorWithProps } = require('mercurius').default;
const formatter = require('../../../Utils/DateTimeFormatter');
const escaper = require('../../../Utils/ClickhouseEscape');
const { EVIdentCountSchema } = require('../../../JoySchema/EVIdentCount');

const {
  constantsMerge: errorConstMerge,
} = require('../../../Schema/ErrorMessage');

class IdentCount {
  constructor({ ClickHouse }) {
    this.ClickHouse = ClickHouse;
  }

  /**
   *
   * @param {object} params
   * @param {string} params.id
   * @param {string} params.action
   * @param {string} params.category
   * @param {string} params.publicToken
   * @param {string} [params.startDate]
   * @param {string} [params.endDate]
   */
  async getEIdentCount({
    publicToken,
    id,
    action,
    category,
    startDate,
    endDate,
  }) {
    const schema = EVIdentCountSchema();

    try {
      await schema.validateAsync(
        { publicToken, startDate, endDate, id, action, category },
        { abortEarly: false },
      );
    } catch (e) {
      const validationErrors = [];
      e.details.forEach((element) => {
        validationErrors.push({
          message: element.message,
          field: element.context.label,
        });
      });

      throw new ErrorWithProps(
        errorConstMerge.UNPROCESSABLE_ENTITY,
        {
          validation: validationErrors,
          statusCode: 422,
        },
        422,
      );
    }

    const cat = category.toLowerCase();
    const act = action.toLowerCase();

    const {
      startUnixTime,
      endDateUnixTime,
      startDate: startDateProcessed,
      endDate: endDateProcessed,
    } = formatter('192d', startDate, endDate);

    const result = {
      query: {
        id,
        action: act,
        category: cat,
        startDate: startDateProcessed,
        endDate: endDateProcessed,
        publicToken,
      },
      result: undefined,
    };

    /**
     * Build query
     */
    const group = 'EIdent';
    const selects = [`count(*) as Count`];
    const whereAnd = [
      `Created BETWEEN FROM_UNIXTIME(${startUnixTime}) AND FROM_UNIXTIME(${endDateUnixTime})`,
      `PublicInstanceID = ${escaper(publicToken)}`,
      `Mode BETWEEN 100 AND 199`,
      `ECategory = ${escaper(cat)}`,
      `EAction = ${escaper(act)}`,
      `EIdent = ${escaper(id)}`,
    ];

    const query = `
      SELECT
        ${selects.join(', ')}
      FROM Records
      WHERE ${whereAnd.join(' AND ')}
      GROUP BY ${group}
    `;

    const queryResult = await this.ClickHouse.getConnection()
      .query(query)
      .toPromise();

    [result.result] = queryResult;
    return result;
  }
}

module.exports = IdentCount;
