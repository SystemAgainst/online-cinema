import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { MoviesEntity } from './movies.entity';
import { ModelType } from '@typegoose/typegoose/lib/types';

@Injectable()
export class MoviesService {
  constructor(
    @InjectModel(MoviesEntity)
    private readonly moviesEntity: ModelType<MoviesEntity>
  ) {}
}
