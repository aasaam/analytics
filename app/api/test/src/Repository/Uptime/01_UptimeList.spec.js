/* eslint-env jest */

// @ts-ignore
require('../../../../globals');

const { initContainer } = require('../../../../src/Container');
const { Config } = require('../../../../src/Config');
const { ConfigSchema } = require('../../../../src/ConfigSchema');

describe(__filename.replace(__dirname, ''), () => {
  /** @type {import('awilix').AwilixContainer} */
  let container;

  beforeAll(async () => {
    const config = new Config(ConfigSchema, {});
    container = await initContainer(config);
    const seq = container.resolve('sequelize');

    const { Uptime } = seq.models;
    await Uptime.destroy({
      where: {},
      truncate: true,
      cascade: true,
      restartIdentity: true,
    });
  });

  afterAll(async () => {
    await new Promise((resolve) => {
      setTimeout(resolve, 100);
    });
    await container.dispose();
  });

  it('fetch uptime list', async () => {
    const createUptime = container.resolve('UptimeCreateRepository');
    const upList = container.resolve('UptimeListRepository');

    expect(
      await createUptime.addUptime({
        name: 'heyuptime',
        url: 'https://jacynthe.biz',
        description: 'i can be a description',
        ping: false,
        interval: 6,
        options: [1],
      }),
    ).toBeTruthy();

    const b = await upList.fetchUptimeList({
      limit: 20,
      lastSeen: undefined,
      filter: {
        arrIn_options: [1],
        like_url: 'jacynthe.biz',
        dte_createdAt: new Date(),
      },
    });

    expect(b).toBeTruthy();

    expect(b).toBeTruthy();
  });
});
