const { ErrorWithProps } = require('mercurius').default;
const formatter = require('../../../Utils/DateTimeFormatter');
const minMaxNumber = require('../../../Utils/MinMaxNumber');
const escaper = require('../../../Utils/ClickhouseEscape');
const {
  EVCategoryActionIDCountSchema,
} = require('../../../JoySchema/EVCategoryActionIDCount');

const {
  constantsMerge: errorConstMerge,
} = require('../../../Schema/ErrorMessage');

class ActionCount {
  constructor({ ClickHouse }) {
    this.ClickHouse = ClickHouse;
  }

  /**
   *
   * @param {object} params
   * @param {string} params.category
   * @param {string} params.action
   * @param {string} params.publicToken
   * @param {string} [params.startDate]
   * @param {string} [params.endDate]
   * @param {Number} [params.limit]
   */
  async getCategoryActionIDCount({
    publicToken,
    category,
    action,
    startDate,
    endDate,
    limit,
  }) {
    const schema = EVCategoryActionIDCountSchema();

    try {
      await schema.validateAsync(
        { publicToken, startDate, endDate, category, action, limit },
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
    } = formatter('1d', startDate, endDate);

    const maxLimit = minMaxNumber(limit, 1, 500);

    const result = {
      query: {
        category: cat,
        action: act,
        limit: maxLimit,
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
    const selects = [`count(*) as Count`, `EIdent as id`];
    const whereAnd = [
      `Created BETWEEN FROM_UNIXTIME(${startUnixTime}) AND FROM_UNIXTIME(${endDateUnixTime})`,
      `PublicInstanceID = ${escaper(publicToken)}`,
      `Mode BETWEEN 100 AND 199`,
      `ECategory = ${escaper(cat)}`,
      `EAction = ${escaper(act)}`,
    ];

    const query = `
      SELECT
        ${selects.join(', ')}
      FROM Records
      WHERE ${whereAnd.join(' AND ')}
      GROUP BY ${group}
      ORDER By Count DESC
      LIMIT ${maxLimit}
      `;

    // console.log(query);
    const queryResult = await this.ClickHouse.getConnection()
      .query(query)
      .toPromise();

    const res = queryResult.data;
    const resultMap = {};
    res.forEach((element) => {
      resultMap[element.id] = element.Count;
    });

    result.result = resultMap;
    return result;
  }
}

module.exports = ActionCount;
