import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { NotFoundError } from 'rxjs';
import { Types } from 'mongoose';

import { MoviesEntity } from './movies.entity';
import { CreateMovieDto } from './dto/create-movie.dto';


@Injectable()
export class MoviesService {
  constructor(
    @InjectModel(MoviesEntity)
    private readonly moviesEntity: ModelType<MoviesEntity>
  ) {}

  async getBySlug(slug: string) {
    const targetObject = await this.moviesEntity.findOne({ slug }).exec();

    if (!targetObject) throw new NotFoundError('Movie does not found');

    return targetObject;
  }

  async getAll(searchTerm?: string) {
    let options = {};

    if (searchTerm) {
      options = {
        $or: [
          {
            title: new RegExp(searchTerm, 'i'),
          }
        ]
      }
    }

    return this.moviesEntity
      .find(options)
      .select('-updatedAt -__v')
      .sort({ createdAt: 'desc' })
      .populate('actors genre')
      .exec();
  }

  async getById(_id: string) {
    const entityById = await this.moviesEntity.findById(_id);

    if (!entityById) throw new NotFoundException('Movie not found!');

    return entityById;
  }

  async getByActorId(actorId: Types.ObjectId) {
    return this.moviesEntity.find({actors: actorId}).exec();;
  }

  async getByGenreIds(genreIds: Types.ObjectId[]) {
		return this.moviesEntity.find({ genres: { $in: genreIds } }).exec();
	}

  async updateCountOpened(slug: string) {
		return this.moviesEntity
			.findOneAndUpdate({ slug }, { $inc: { countOpened: 1 } })
			.exec()
	}

  /* Admin area */

	async create() {
		const defaultValue: CreateMovieDto = {
			bigPoster: '',
			actors: [],
			genres: [],
			description: '',
			poster: '',
			title: '',
			videoUrl: '',
			slug: '',
		}
		const movie = await this.moviesEntity.create(defaultValue)
		return movie._id
	}

	async update(
		id: string,
		dto: CreateMovieDto
	) {
		return this.moviesEntity.findByIdAndUpdate(id, dto, { new: true }).exec()
	}

	async delete(id: string) {
		return this.moviesEntity.findByIdAndDelete(id).exec()
	}

	async getMostPopular() {
		return this.moviesEntity
			.find({ countOpened: { $gt: 0 } })
			.sort({ countOpened: -1 })
			.populate('genres')
			.exec()
	}

	async updateRating(id: string, newRating: number) {
		return this.moviesEntity
			.findByIdAndUpdate(id, { rating: newRating }, { new: true })
			.exec()
	}
}
