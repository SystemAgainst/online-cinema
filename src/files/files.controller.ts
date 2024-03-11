import {
	Controller,
	HttpCode,
	Post,
	Query,
	UploadedFile,
	UseInterceptors,
} from '@nestjs/common';
import { FilesService } from './files.service';
import { Auth } from '../auth/decorators/auth.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { IFileResponse } from './interfaces/files.interface';

@Controller('files')
export class FilesController {
	constructor(private readonly filesService: FilesService) {}

	@Post()
	@HttpCode(200)
	@Auth('admin')
	@UseInterceptors(FileInterceptor('image'))
	async uploadFile(
		@UploadedFile() file: Express.Multer.File,
		@Query('folder') folder?: string
	): Promise<IFileResponse[] | undefined> {
		return this.filesService.saveFiles([file], folder);
	}
}
