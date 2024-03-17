import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';

import { MoviesService } from './movies.service';
import { MoviesController } from './movies.controller';
import { MoviesEntity } from './movies.entity';
import { UserModule } from 'src/user/user.module';

@Module({
  controllers: [MoviesController],
  providers: [MoviesService],
	exports: [MoviesService],
  imports: [
		TypegooseModule.forFeature([
			{
				typegooseClass: MoviesEntity,
				schemaOptions: {
					collection: 'Movies',
				},
			},
		]),
		UserModule,
	],
})
export class MoviesModule {}
