import { DataSource, DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';
import * as dotenvExpand from 'dotenv-expand';
import databaseConfig from '../config/database.config';

dotenvExpand.expand(dotenv.config());

const { autoLoadEntities, synchronize, ...config } = databaseConfig();

export default new DataSource({
  ...(config as DataSourceOptions),
  entities: ['dist/services/**/*.entity.js'],
  migrations: ['dist/database/migrations/*.js'],
});
