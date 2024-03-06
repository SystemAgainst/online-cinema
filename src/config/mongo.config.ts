import { ConfigService } from '@nestjs/config';
import { TypegooseModuleOptions } from 'nestjs-typegoose';
import * as process from 'process';

export const getMongoDbConfig = async (
  configService: ConfigService
): Promise<TypegooseModuleOptions> => ({
  uri: configService.get(process.env.MONGO_URI),
});
