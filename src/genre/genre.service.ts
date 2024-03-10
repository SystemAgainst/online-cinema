import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { GenreEntity } from './genre.entity';
import { CreateGenreDto } from './dto/create-genre.dto';

@Injectable()
export class GenreService {
	constructor(
		@InjectModel(GenreEntity)
		private readonly genreEntity: ModelType<GenreEntity>
	) {}

	async getBySlug(slug: string) {
		return this.genreEntity.findOne({ slug }).exec();
	}

	// TODO: realized entity film to finish this function
	async getCollections() {}

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

	// FOR ADMIN
	async getById(_id: string) {
		const genre = await this.genreEntity.findById(_id);

		if (!genre) throw new NotFoundException('Genre not found');

		return genre;
	}

	async createGenre() {
		const defaultValue: CreateGenreDto = {
			name: '',
			slug: '',
			description: '',
			icon: '',
		};

		const genre = await this.genreEntity.create(defaultValue);

		return genre._id;
	}

	async updateGenre(_id: string, dto: CreateGenreDto) {
		const updatedGenre = await this.genreEntity
			.findByIdAndUpdate(_id, dto, { new: true })
			.exec();

		if (!updatedGenre) throw new NotFoundException('Genre not found');

		return updatedGenre;
	}

	async deleteGenre(_id: string) {
		const deletedGenre = await this.genreEntity.findByIdAndDelete(_id).exec();

		if (!deletedGenre) throw new NotFoundException('Genre not found');

		return deletedGenre;
	}
}
