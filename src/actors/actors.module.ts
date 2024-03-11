import { Module } from '@nestjs/common';
import { ActorsService } from './actors.service';
import { ActorsController } from './actors.controller';
import { TypegooseModule } from 'nestjs-typegoose';
import { ActorEntity } from './actor.entity';

@Module({
	controllers: [ActorsController],
	providers: [ActorsService],
	imports: [
		TypegooseModule.forFeature([
			{
				typegooseClass: ActorEntity,
				schemaOptions: {
					collection: 'Actor',
				},
			},
		]),
	],
})
export class ActorsModule {}
