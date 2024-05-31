import { createPool, Pool, PoolConfig } from 'mysql';

class MySQL {
  private host: string;
  private user: string;
  private password: string;
  private port: number;
  private disableLog: boolean;
  private connection: Pool;

  constructor (config: PoolConfig) {
    this.host = process.env.MYSQL_HOST!,
    this.user = process.env.MYSQL_USER!,
    this.password = process.env.MYSQL_PASSWORD!,
    this.port = Number(process.env.MYSQL_PORT!),
    this.disableLog = false;

    this.connection = createPool({
      host: this.host,
      user: this.user,
      password: this.password,
      port: this.port
    });
  }

  executeQuery = (query: string): Promise<any> => new Promise((resolve, reject) => {
    this.connection.query(query, (err, result) => {
      if (err) {
        if (!this.disableLog) console.log('Error: ' + query);
        return reject(err);
      }

      if (!this.disableLog) console.log('Correcto: ' + query);
      return resolve(result);
    })
  });

  closeConnection = (): void => this.connection.end();
}

export default MySQL;
