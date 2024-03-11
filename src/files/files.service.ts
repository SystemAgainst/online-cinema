import { Injectable } from '@nestjs/common';
import { IFileResponse } from './interfaces/files.interface';
import { path } from 'app-root-path';
import { ensureDir, writeFile } from 'fs-extra';

@Injectable()
export class FilesService {
	async saveFiles(
		files: Express.Multer.File[],
		folder: string = 'default'
	): Promise<IFileResponse[]> {
		const uploadFolder = `${path}/uploads/${folder}`;
		await ensureDir(uploadFolder);

		const result: IFileResponse[] = await Promise.all(
			files.map(async (file) => {
				await writeFile(`${uploadFolder}/${file.originalname}`, file.buffer);

				return {
					url: `/uploads/${folder}/${file.originalname}`,
					name: file.originalname,
				};
			})
		);

		return result;
	}
}
