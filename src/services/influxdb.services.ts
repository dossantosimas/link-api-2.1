import { InfluxDB, QueryApi, Point } from '@influxdata/influxdb-client';
import dotenv from 'dotenv';

dotenv.config();

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
    this.token = process.env.INFLUX_TOKEN ?? '';
    this.url = process.env.INFLUX_URL_DEV ?? '';
    this.influxdb = new InfluxDB({
      url: this.url,
      token: this.token,
    });

    if (this.influxdb) {
      console.log('----------------> Conexion a Influxdb');
      // console.log(this.influxdb)
      this.queryApi = this.influxdb.getQueryApi(this.org);
    } else {
      console.error('----------------> No se pudo conectar a influxdb');
    }
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
          const orgID = data.buckets[0].orgID;
          const bucketID = data.buckets[0].id;
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
    try {
      const query = `import "regexp"
      from(bucket: "${bucket}")
      |> range(start: -12h, stop: now())
      |> filter(fn: (r) => (r["_measurement"] == "${measurement}"))
      |> keep(columns: ["_field"])
      |> group()
      |> distinct(column: "_field")
      |> limit(n: 1000)
      |> sort()`;

      const result = await this.queryApi.collectRows<{ _value: string }>(query);
      return result.map((row) => row._value);
    } catch (error) {
      console.error('An error occurred:', error);
      return [];
    }
  }

  async getData(
    bucket: string,
    measurement: string,
    field: string,
    range: string,
    yields: string
  ): Promise<any> {
    const query = `from(bucket: "${bucket}")
  |> range(start: -${range})
  |> filter(fn: (r) => r["_measurement"] == "${measurement}")
  |> filter(fn: (r) => r["_field"] == "${field}")
  |> yield(name: "${yields}")`;

    console.log('query:', query);

    const result = await this.queryApi.collectRows<{ _value: string }>(query);

    // console.log('RESULT: ', result);

    return result;
  }

  async getDataRange(bucket: string,
    measurement: string,
    field: string,
    start: string,
    stop: string,
    yields: string
  ): Promise<any> {
    const query = `from(bucket: "${bucket}")
  |> range(start: ${start},stop: ${stop})
  |> filter(fn: (r) => r["_measurement"] == "${measurement}")
  |> filter(fn: (r) => r["_field"] == "${field}")
  |> yield(name: "${yields}")`;

    console.log('query:', query);

    const result = await this.queryApi.collectRows<{ _value: string }>(query);

    // console.log('RESULT: ', result);

    return result;
  }

  async postData(bucket: string, measurement: string, origin: string, type: string, field: string, value: any) {
    const writeApi = this.influxdb.getWriteApi(this.org, bucket);
    let point = new Point(measurement).tag('origin', origin)

    if(type === "float"){
      point.floatField(field, value);
    } 

    if(type === "string"){
      point.stringField(field, value)
    }

    if(type=== "integer"){
      point.intField(field, value)
    }
      
    console.log(` ${point}`);

    writeApi.writePoint(point);

    writeApi.close().then(() => {
      console.log('WRITE FINISHED')
    })

    return true
  }
}

export const InfluxDBInstance = new InfluxServices();
