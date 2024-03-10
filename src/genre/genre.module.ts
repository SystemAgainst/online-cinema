import { Module } from '@nestjs/common';
import { GenreService } from './genre.service';
import { GenreController } from './genre.controller';
import { TypegooseModule } from 'nestjs-typegoose';
import { GenreEntity } from './genre.entity';

@Module({
	controllers: [GenreController],
	providers: [GenreService],
	imports: [
		TypegooseModule.forFeature([
			{
				typegooseClass: GenreEntity,
				schemaOptions: {
					collection: 'Genre',
				},
			},
		]),
	],
})
export class GenreModule {}
