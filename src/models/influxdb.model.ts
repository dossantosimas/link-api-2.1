export interface influxdbWrite {
    bucket: string,
    origin: string,
    measurement: influxdb_Measurement[]
}


interface influxdb_Measurement {
    name: string,
    fields: influxdb_Fields[]
}

interface influxdb_Fields {
    name: string,
    value: string | number,
    type: "float" | "string" | "integer"
}