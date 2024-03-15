import { Controller, Get, Param, Query } from '@nestjs/common';
import { MoviesService } from './movies.service';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get('by-slug/:slug')
  async getBySlug(@Param('slug') slug: string) {
    return this.moviesService.getBySlug(slug);
  }

  @Get() 
  async getAll(@Query('searchTerm') searchTerm?: string) {
    return this.moviesService.getAll(searchTerm);
  }
}
