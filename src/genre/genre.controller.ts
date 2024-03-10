import {
	Controller,
	Get,
	HttpCode,
	Param,
	Post,
	Query,
	UsePipes,
	ValidationPipe,
} from '@nestjs/common';
import { GenreService } from './genre.service';
import { Auth } from '../auth/decorators/auth.decorator';
import { IdValidationPipe } from '../pipes/id.validation.pipe';

@Controller('genres')
export class GenreController {
	constructor(private readonly genreService: GenreService) {}

	@Get('by-slug/:slug')
	async getBySlug(@Param('slug') slug: string) {
		return this.genreService.getBySlug(slug);
	}

	@Get('/collections')
	async getCollections() {
		return this.genreService.getCollections();
	}

	@Get()
	async getAll(@Query('searchTerm') searchTerm?: string) {
		return this.genreService.getAll(searchTerm);
	}

	@Get(':id')
	@Auth('admin')
	async getGenreById(@Param('id', IdValidationPipe) id: string) {
		return this.genreService.getById(id);
	}

	@UsePipes(new ValidationPipe())
	@Post()
	@HttpCode(200)
	@Auth('admin')
	async createGenre() {
		return this.genreService.createGenre();
	}
}
