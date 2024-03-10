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

		if (!user) throw new NotFoundException('Genre not found');

		return user;
	}

	async getAll(searchTerm?: string) {
		let options = {};

		if (searchTerm) {
			options = {
				$or: [
					{
						name: new RegExp(searchTerm, 'i'),
					},
					{
						slug: new RegExp(searchTerm, 'i'),
					},
					{
						description: new RegExp(searchTerm, 'i'),
					},
				],
			};
		}

		return this.genreEntity
			.find(options)
			.select('-updatedAt -__v')
			.sort({ createdAt: 'desc' })
			.exec();
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
