import { IsArray, IsNumber, IsString } from "class-validator";

export class Parameters {
  @IsNumber()
  year: number;

  @IsNumber()
  duration: number;

  @IsString()
  country: string;
}

export class CreateMovieDto {
  @IsString()
  slug: string;

  @IsString()
  videoUrl: string;

  @IsArray()
  @IsString({each: true})
  genres: string[];

  @IsArray()
  @IsString({each: true})
  actors: string[];

  @IsString()
  poster: string;

  @IsString()
  bigPoster: string;

  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsString()
  parameters?: Parameters;
}