import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';

import { MoviesService } from './movies.service';
import { MoviesController } from './movies.controller';
import { MoviesEntity } from './movies.entity';

@Module({
  controllers: [MoviesController],
  providers: [MoviesService],
  imports: [
		TypegooseModule.forFeature([
			{
				typegooseClass: MoviesEntity,
				schemaOptions: {
					collection: 'Movies',
				},
			},
		]),
	],
})
export class MoviesModule {}
