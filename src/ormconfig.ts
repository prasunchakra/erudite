import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";
import { TagEntity } from "./tag/tag.entity";
import { UserEntity } from "./user/user.entity";

const config: PostgresConnectionOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: '',
    database: 'erudite',
    entities: [TagEntity, UserEntity],
    synchronize: true,
};

export default config;