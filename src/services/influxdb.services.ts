import { InfluxDB, QueryApi } from '@influxdata/influxdb-client';

export class InfluxServices {
  private org: string;
  private orgID: string;
  private bucketID: string;
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
    });
    this.queryApi = this.influxdb.getQueryApi(this.org);
  }

  setOrgID(id: string) {
    this.orgID = id;
  }

  setBucketID(id: string) {
    this.bucketID = id;
  }

  async getIDs(): Promise<boolean> {
    const url = 'http://localhost:8086/api/v2/buckets?name=ibisa';
    const headers = {
      Authorization: 'Token 0mn1c0ns4',
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };

    try {
      const response = await fetch(url, { method: 'GET', headers });
      if (response.ok) {
        const data = await response.json();
        if (data) {
          const orgID = data.bucket[0].orgID;
          const bucketID = data.bucket[0].id;
          console.log('ORG: IBISA - ', orgID);
          console.log('BUCKET: IBISA - ', orgID);
          this.setOrgID(orgID);
          this.setBucketID(bucketID);
        }
        console.log('Bucket information:', data);

        return true;
      } else {
        console.error(
          'Error fetching bucket information:',
          response.statusText
        );
        return false;
      }
    } catch (error) {
      console.error('An error occurred:', error);
      return false;
    }
  }

  async getAllMeasurements(bucket: string): Promise<string[]> {
    const query = `import "influxdata/influxdb/schema"
                       schema.measurements(bucket: "${bucket}")`;

    const result = await this.queryApi.collectRows<{ _value: string }>(query);
    return result.map((row) => row._value);
  }

  async getAllFields(measurement: string, bucket: string): Promise<string[]> {
    const query = `import "influxdata/influxdb/schema"
                   schema.measurementFieldKeys(bucket: "${bucket}", measurement: "${measurement}")`;

    const result = await this.queryApi.collectRows<{ _field: string }>(query);
    return result.map((row) => row._field);
  }
}

export const InfluxDBInstance = new InfluxServices();
