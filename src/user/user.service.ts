import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
	constructor() {}

	async getDataById() {
		return { email: 'asdf' };
	}
}
