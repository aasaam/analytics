class CaptchaREST {
  constructor({ CaptchaRepository, Fastify, redisClient }) {
    /** @type {import('fastify').FastifyInstance} */
    this.fastify = Fastify.getFastify();

    /** @type {import('../Core/Fastify/GenericResponse').GenericResponse} */

    const e404 = Fastify.getGenericError(404);

    this.fastify.route({
      url: this.fastify.openAPIBaseURL('/captcha'),
      method: 'GET',
      schema: {
        description: 'Get captcha image',
        operationId: 'Captcha',
        tags: ['Captcha'],
        response: {
          200: {
            $ref: 'Captcha#',
          },
          404: e404.getSchema(),
        },
      },
      handler: async (req, reply) => {
        const tryNumber = await redisClient.get(
          `ipclean:${req.headers['x-client-ip']}`,
        );

        if (tryNumber <= 3) {
          return {
            id: '',
            image: '',
          };
        }
        // @ts-ignore
        const { lang } = req.query;
        try {
          return await CaptchaRepository.generateCaptcha(lang);
        } catch (e) {
          return reply
            .status(
              e.extensions && e.extensions.statusCode
                ? e.extensions.statusCode
                : 500,
            )
            .send(e.message);
        }
      },
    });
  }
}

module.exports = CaptchaREST;
