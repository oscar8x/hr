import { DataSource } from "typeorm";

export const appDataSource = new DataSource({
    type: "sqlite",
    database: "./src/db/metrics.sqlite",
    synchronize: true,
    logging: false,
    dropSchema: true,
    entities: ["src/entities/*.ts"],
    subscribers: [],
    migrations: [],
}) 