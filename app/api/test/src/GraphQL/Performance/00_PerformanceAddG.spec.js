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

  it('graphql add performance', async () => {
    const { token } = await helper.CreateUserHeaderAndToken(
      'maryhelper',
      'maryhelper@gmail.com',
      'SA',
      [1],
    );

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
          mutation(
            $name: String!
            $url: String!
            $interval: Int!
            $description: String
            $options: [Int]!
          ) {
            PerformanceCreate(
              data: {
                name: $name
                url: $url
                interval: $interval
                description: $description
                options: $options
              }
            )
          }
        `,
        variables: {
          name: 'testname',
          url: 'http://test.com',
          interval: 5,
          description: 'test description',
          options: [1],
        },
      },
    });

    expect(data1.statusCode).toBe(200);
  });
});
