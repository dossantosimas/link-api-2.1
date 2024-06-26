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

  async getAllFields(
    measurement: string,
    bucket: string
  ): Promise<string[] | boolean> {
    const url = `http://localhost:8086/api/v2/query?org=${this.org}`;
    const headers = {
      Authorization: 'Token 0mn1c0ns4',
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };
    const payload = {
      query: `import "regexp"
              from(bucket: "ibisa")
              |> range(start: -12h, stop: now())
              |> filter(fn: (r) => (r["_measurement"] == "modbus"))
              |> keep(columns: ["_field"])
              |> group()
              |> distinct(column: "_field")
              |> limit(n: 1000)
              |> sort()`,
      dialect: {
        annotations: ['default'],
      },
    };
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: 'Token 0mn1c0ns4',
        },
        body: JSON.stringify(payload),
      });
      if (response.ok) {
        const data = await response.text();
        if (data) {
          const lines = data.split('\n');

          // Filtra las líneas que contienen ",,0,"
          const filteredLines = lines.filter((line) => line.includes(',,0,'));

          // Extrae los valores después de ",,0,"
          const values = filteredLines.map((line) =>
            line.split(',,0,')[1].trim()
          );

          // Crea un array de strings con los valores
          const arrayOfStrings: string[] = values;

          console.log(arrayOfStrings); //
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
}

export const InfluxDBInstance = new InfluxServices();
