import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { UserEntity } from './user.entity';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { UpdateUserDto } from './dto/update-user.dto';
import { genSalt, hash } from 'bcryptjs';

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

	async updateProfile(_id: string, dto: UpdateUserDto) {
		const user = await this.getDataById(_id);
		const isExistedUser = await this.userEntity.findOne({ email: dto.email });

		if (isExistedUser && String(_id) !== String(isExistedUser._id)) {
			throw new NotFoundException('User has already existed');
		}

		if (dto.password) {
			const salt = await genSalt(10);

			user.password = await hash(dto.password, salt);
		}

		user.email = dto.email;

		if (dto.isAdmin || dto.isAdmin === false) {
			user.isAdmin = dto.isAdmin;
		}

		return await user.save();
	}
}
