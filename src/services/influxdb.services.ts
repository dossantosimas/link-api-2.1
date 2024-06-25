import { InfluxDB, QueryApi } from '@influxdata/influxdb-client';

export class InfluxServices {
  private org: string;
  private token: string;
  private url: string;
  private influxdb: InfluxDB;
  private queryApi: QueryApi;

  constructor() {
    this.org = process.env.INFLUX_ORG ?? '';
    this.token = process.env.INFLUX_BUCKET_AUTH ?? '';
    this.url = process.env.INFLUX_URL ?? '';
    this.influxdb = new InfluxDB({
        url: this.url,
        token: this.token,
      })
    this.queryApi = this.influxdb.getQueryApi(this.org);
  }

  async getAllMeasurements(bucket: string): Promise<string[]> {
    const query = `import "influxdata/influxdb/schema"
                       schema.measurements(bucket: "${bucket}")`;

    const result = await this.queryApi.collectRows<{ _value: string }>(query);
    return result.map((row) => row._value);
  }

}

export const InfluxDBInstance = new InfluxServices();
