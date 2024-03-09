import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { UserEntity } from './user.entity';
import { ModelType } from '@typegoose/typegoose/lib/types';

@Injectable()
export class UserService {
	constructor(
		@InjectModel(UserEntity) private readonly userEntity: ModelType<UserEntity>
	) {}

	async getDataById(_id: string) {
		const user = await this.userEntity.findById(_id);

		if (!user) throw new NotFoundException('User not found');

		return user;
	}
}
