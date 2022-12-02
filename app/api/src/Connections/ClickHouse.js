const { ClickHouse } = require('clickhouse');

class ClickH {
  constructor({ Config, ClickRootCa, ClickClientFullChain, ClickClientKey }) {
    this.servers = Config.ASM_CLICKHOUSE_SERVERS;
    /**
     * @type {import('clickhouse').ClickHouse}
     * @private
     */
    this.connection = null;

    this.ClickRootCa = ClickRootCa;
    this.ClickClientFullChain = ClickClientFullChain;
    this.ClickClientKey = ClickClientKey;

    this.intervalChecker();
    setInterval(() => {
      this.intervalChecker();
    }, 5000);
  }

  getConnection() {
    return this.connection;
  }

  async intervalChecker() {
    for (let i = 0; i < this.servers.length; i += 1) {
      const server = this.servers[`${i}`];
      const uri = new URL(server);
      const connection = new ClickHouse({
        host: `${uri.protocol}${uri.hostname}`,
        port: uri.port,
        basicAuth: {
          username: uri.username,
          password: uri.password,
        },
        config: {
          session_timeout: uri.searchParams.has('session_timeout')
            ? uri.searchParams.get('session_timeout')
            : 5,
          database: uri.pathname.replace(/\//, ''),
        },
        // add ca certificate files to the connection
        reqParams: {
          agentOptions: {
            key: this.ClickClientKey,
            ca: [this.ClickRootCa],
            cert: this.ClickClientFullChain,
            maxVersion: 'TLSv1.3',
            minVersion: 'TLSv1.2',
          },
        },
        debug: uri.searchParams.has('debug'),
        format: 'json',
        raw: false,
      });
      try {
        // eslint-disable-next-line no-await-in-loop
        const result = await connection
          .query('SELECT 1 AS SUCCESS')
          .toPromise();
        // @ts-ignore
        if (Array.isArray(result) && result[0] && result[0].SUCCESS === 1) {
          this.connection = connection;
          break;
        }
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
      }
    }
  }
}

module.exports = ClickH;
