import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { GenreEntity } from './genre.entity';

@Injectable()
export class GenreService {
	constructor(
		@InjectModel(GenreEntity)
		private readonly genreEntity: ModelType<GenreEntity>
	) {}

	async getById(_id: string) {
		const user = await this.genreEntity.findById(_id);

		if (!user) throw new NotFoundException('User not found');

		return user;
	}

	// async createGenre() {
	// 	const defaultValue: CreateGenreDto = {
	// 		name: '',
	// 		slug: '',
	// 		description: '',
	// 		icon: '',
	// 	};
	//
	// 	const genre = await this.genreEntity.create(defaultValue);
	//
	// 	return genre._id;
	// }
}
