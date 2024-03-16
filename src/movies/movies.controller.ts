import { Body, Controller, Get, HttpCode, Param, Post, Query } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { IdValidationPipe } from 'src/pipes/id.validation.pipe';
import { Types } from 'mongoose';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get('by-slug/:slug')
  async getBySlug(@Param('slug') slug: string) {
    return this.moviesService.getBySlug(slug);
  }

	@Get('by-actor/:actorId')
	async getByActorId(@Param('actorId', IdValidationPipe) actorId: Types.ObjectId) {
		return this.moviesService.getByActorId(actorId)
	}

  @Post('by-genres')
	@HttpCode(200)
	async getByGenreIds(
		@Body('genreIds')
		genreIds: Types.ObjectId[]
	) {
		return this.moviesService.getByGenreIds(genreIds);
	}

  @Get() 
  async getAll(@Query('searchTerm') searchTerm?: string) {
    return this.moviesService.getAll(searchTerm);
  }

  @Get()
  async getById(@Param('id') id: string) {
    return this.moviesService.getById(id);
  }
}
