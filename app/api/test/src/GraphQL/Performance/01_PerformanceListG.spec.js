/* eslint-env jest */

// @ts-ignore
require('../../../../globals');

const { initContainer } = require('../../../../src/Container');
const { Config } = require('../../../../src/Config');
const { ConfigSchema } = require('../../../../src/ConfigSchema');
const Helper = require('../../Helper/Helper');

describe(__filename.replace(__dirname, ''), () => {
  /** @type {import('awilix').AwilixContainer} */
  let container;

  /** @type {import('../../Helper/Helper')} */
  let helper;

  beforeAll(async () => {
    const config = new Config(ConfigSchema, {});
    container = await initContainer(config);
    helper = new Helper(container);
    const seq = container.resolve('sequelize');

    const { User, Performance } = seq.models;
    await User.destroy({
      where: {},
      truncate: true,
      cascade: true,
      restartIdentity: true,
    });
    await Performance.destroy({
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

  it('graphql performance list', async () => {
    const { token } = await helper.CreateUserHeaderAndToken(
      'maryhelper',
      'maryhelper@gmail.com',
      'SA',
      [1],
    );

    const createPerformance = container.resolve('PerformanceCreateRepository');

    expect(
      await createPerformance.addPerformance({
        name: 'heyperform',
        url: 'https://jacynthe.biz/',
        description: 'i can be a description',
        interval: 6,
        options: [1],
      }),
    ).toBeTruthy();

    /** @type {import('fastify').FastifyInstance} */
    const fastify = container.resolve('Fastify').getFastify();

    const graphQLEndpoint = fastify.baseURL('/graphql/graphql');

    const data1 = await fastify.inject({
      headers: {
        cookie: `${container.resolve('Config').ASM_AUTH_COOKIE}=${token}`,
      },
      url: graphQLEndpoint,
      method: 'POST',
      payload: {
        operationName: null,
        query: `
        query(
            $lastSeen: Int,
            $limit: Int,
            $filter: JSON
          ) {
            PerformanceList(
              args: {
                filter: $filter,
                limit: $limit,
                lastSeen: $lastSeen
              }
            ) { docs { id  name interval } }
          }
        `,
        variables: {
          limit: 5,
        },
      },
    });

    const { data } = JSON.parse(data1.body);
    expect(data.PerformanceList.docs.length).toBeTruthy();

    // Not a valid token
    const data2 = await fastify.inject({
      url: graphQLEndpoint,
      method: 'POST',
      payload: {
        operationName: null,
        query: `
        query(
            $lastSeen: Int,
            $limit: Int,
            $filter: JSON
          ) {
            PerformanceList(
              args: {
                filter: $filter,
                limit: $limit,
                lastSeen: $lastSeen
              }
            ) { docs { id name interval } }
          }
        `,
        variables: {
          limit: 10,
        },
      },
    });
    const { errors } = JSON.parse(data2.body);

    expect(errors['0'].extensions.statusCode).toEqual(405);
  });
});
