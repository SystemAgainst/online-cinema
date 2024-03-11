import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { ActorEntity } from './actor.entity';
import { ActorDto } from './dto/actor.dto';

@Injectable()
export class ActorsService {
	constructor(
		@InjectModel(ActorEntity)
		private readonly actorEntity: ModelType<ActorEntity>
	) {}

	async getBySlug(slug: string) {
		return this.actorEntity.findOne({ slug }).exec();
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
				],
			};
		}

		// TODO: Aggregations

		return this.actorEntity
			.find(options)
			.select('-updatedAt -__v')
			.sort({ createdAt: 'desc' })
			.exec();
	}

	// ADMIN
	async getById(_id: string) {
		const actor = await this.actorEntity.findById(_id);

		if (!actor) throw new NotFoundException('Actor not found!');

		return actor;
	}

	async createActor() {
		const defaultValue: ActorDto = {
			name: '',
			slug: '',
			photo: '',
		};

		const actor = await this.actorEntity.create(defaultValue);

		return actor._id;
	}

	async updateActor(_id: string, dto: ActorDto) {
		const updatedActor = await this.actorEntity
			.findByIdAndUpdate(_id, dto, { new: true })
			.exec();

		if (!updatedActor) throw new NotFoundException('Actor not found');

		return updatedActor;
	}

	async deleteActor(_id: string) {
		const deletedActor = await this.actorEntity.findByIdAndDelete(_id).exec();

		if (!deletedActor) throw new NotFoundException('Actor not found');

		return deletedActor;
	}
}
