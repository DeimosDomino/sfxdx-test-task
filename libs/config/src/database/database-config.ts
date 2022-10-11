import {PostgresConnectionOptions} from "typeorm/driver/postgres/PostgresConnectionOptions";

export const DATABASE_CONFIG: PostgresConnectionOptions = {
    type: 'postgres',
    host: process.env.DATABASE_HOST || 'localhost',
    port: parseInt(process.env.DATABASE_PORT) || 5432,
    username: process.env.DATABASE_USERNAME || 'root',
    password: process.env.DATABASE_PASSWORD || 'root',
    database: process.env.DATABASE || 'test-task-db',
    synchronize: true,
}
