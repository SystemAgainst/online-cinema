import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	Param,
	Post,
	Put,
	Query,
	UsePipes,
	ValidationPipe,
} from '@nestjs/common';
import { ActorsService } from './actors.service';
import { Auth } from '../auth/decorators/auth.decorator';
import { IdValidationPipe } from '../pipes/id.validation.pipe';
import { ActorDto } from './dto/actor.dto';

@Controller('actors')
export class ActorsController {
	constructor(private readonly actorsService: ActorsService) {}

	@Get('/by-slug/:slug')
	async getBySlug(@Param('slug') slug: string) {
		return this.actorsService.getBySlug(slug);
	}

	@Get()
	async getAll(@Query('searchTerm') searchTerm?: string) {
		return this.actorsService.getAll(searchTerm);
	}

	@Get(':id')
	@Auth('admin')
	async getActorById(@Param('id') id: string) {
		return this.actorsService.getById(id);
	}

	@UsePipes(new ValidationPipe())
	@Post()
	@HttpCode(200)
	@Auth('admin')
	async createActor() {
		return this.actorsService.createActor();
	}

	@UsePipes(new ValidationPipe())
	@Put(':id')
	@HttpCode(200)
	@Auth('admin')
	async updateActor(
		@Param('id', IdValidationPipe) id: string,
		@Body() dto: ActorDto
	) {
		return this.actorsService.updateActor(id, dto);
	}

	@Delete(':id')
	@HttpCode(200)
	@Auth('admin')
	async deleteActor(@Param('id', IdValidationPipe) id: string) {
		return this.actorsService.deleteActor(id);
	}
}
