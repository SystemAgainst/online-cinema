import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { MoviesEntity } from './movies.entity';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { NotFoundError } from 'rxjs';

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
}
