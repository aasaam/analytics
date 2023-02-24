const { ErrorWithProps } = require('mercurius').default;
const formatter = require('../../Utils/DateTimeFormatter');
const escaper = require('../../Utils/ClickhouseEscape');
const {
  BaseCursorPageViewCountSchema,
} = require('../../JoySchema/CursorPageViewCount');

const {
  constantsMerge: errorConstMerge,
} = require('../../Schema/ErrorMessage');

class CursorEntityPageView {
  constructor({ ClickHouse }) {
    this.ClickHouse = ClickHouse;
  }

  /**
   *
   * @param {Object} params
   * @param {String} params.publicToken
   * @param {String} params.entityModule
   * @param {string} [params.startDate]
   * @param {string} [params.endDate]
   */
  async getCursorEntityPv({ startDate, endDate, publicToken, entityModule }) {
    const schema = BaseCursorPageViewCountSchema();

    try {
      await schema.validateAsync(
        { publicToken, entityModule, startDate, endDate },
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

    const {
      startUnixTime,
      endDateUnixTime,
      startDate: startDateProcessed,
      endDate: endDateProcessed,
    } = formatter('8h', startDate, endDate);

    const result = {
      query: {
        startDate: startDateProcessed,
        endDate: endDateProcessed,
        timeRangeSeconds: endDateUnixTime - startUnixTime,
        publicToken,
        entityModule,
      },
      result: {},
    };

    /**
     * Build query
     */
    const selects = [`COUNT(*) AS Count`, `PEntityID`];
    const group = `PEntityID`;
    const whereAnd = [
      `Created BETWEEN FROM_UNIXTIME(${startUnixTime}) AND FROM_UNIXTIME(${endDateUnixTime})`,
      `PEntityModule = ${escaper(entityModule)}`,
      `PublicInstanceID = ${escaper(publicToken)}`,
      `Mode BETWEEN 0 AND 99`,
    ];

    const query = `
        SELECT
          ${selects.join(', ')}
        FROM Records
        WHERE ${whereAnd.join(' AND ')}
        GROUP BY ${group}
      `;

    const rows = await this.ClickHouse.getConnection().query(query).toPromise();

    const cleaned = {};

    rows.forEach(({ Count, PEntityID }) => {
      cleaned[`${PEntityID}`] = Count;
    });

    result.result = cleaned;

    return result;
  }
}

module.exports = CursorEntityPageView;
