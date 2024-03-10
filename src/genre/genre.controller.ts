import { Controller, Get, Param } from '@nestjs/common';
import { GenreService } from './genre.service';
import { Auth } from '../auth/decorators/auth.decorator';
import { IdValidationPipe } from '../pipes/id.validation.pipe';

@Controller('genre')
export class GenreController {
	constructor(private readonly genreService: GenreService) {}

	@Get(':id')
	@Auth('admin')
	async getGenre(@Param('id', IdValidationPipe) id: string) {
		return this.genreService.getById(id);
	}

	// @UsePipes(new ValidationPipe())
	// @Post()
	// @HttpCode(200)
	// @Auth('admin')
	// async createGenre() {
	// 	return this.genreService.createGenre();
	// }
}
