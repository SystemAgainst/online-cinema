import { Base, TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";
import { Ref, prop } from '@typegoose/typegoose';
import { ActorEntity } from "src/actors/actor.entity";
import { GenreEntity } from "src/genre/genre.entity";


export interface IMoviesEntity extends Base {}

export class Parameters {
  @prop()
  year: number;

  @prop()
  duration: number;

  @prop()
  country: string;
}

export class MoviesEntity extends TimeStamps implements IMoviesEntity {
  @prop({unique: true})
  slug: string;

  @prop()
  videoUrl: string;

  @prop({ref: () => GenreEntity})
  genres: Ref<GenreEntity>[];

  @prop({res: () => ActorEntity})
  actors: Ref<ActorEntity>[]

  @prop()
  poster: string;

  @prop()
  bigPoster: string;

  @prop()
  title: string;

  @prop()
  description: string;

  // ~ popularity
  @prop({default: 0})
  countOpend?: number;

  @prop({default: 4.0})
  rating?: number;

  @prop()
  parameters?: Parameters;
}