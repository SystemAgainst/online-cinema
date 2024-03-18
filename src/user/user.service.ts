import { Injectable, NotFoundException } from '@nestjs/common';
import { ModelType, DocumentType } from '@typegoose/typegoose/lib/types';
import { InjectModel } from 'nestjs-typegoose';
import { Types } from 'mongoose';
import { genSalt, hash } from 'bcryptjs';

import { UserEntity } from './user.entity';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
	constructor(
		@InjectModel(UserEntity) private readonly userEntity: ModelType<UserEntity>
	) {}

	async getDataById(_id: string): Promise<DocumentType<UserEntity>> {
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

		if (user) {
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

		throw new NotFoundException('User not found');
	}

	async getFavoriteMovies(_id: Types.ObjectId) {
		// вторым аргументов в findById() передано поле, к-ое надо получить, т.к. нам не нужен весь userEntity
		return this.userEntity
			.findById(_id, 'favorites')
			.populate({
				path: 'favorites',
				populate: {
					path: 'genres',
				},
			})
			.exec()
			.then((data) => data.favorites);
	}

	async toggleFavorite(movieId: Types.ObjectId, user: UserEntity) {
		console.log(user);
		const { _id, favorites } = user;
		
		await this.userEntity.findByIdAndUpdate(_id, {
			favorites: favorites.includes(movieId)
				? favorites.filter((id) => String(id) !== String(movieId))
				: [...favorites, movieId],
		})
	}

	async getCount() {
		return this.userEntity.find().count().exec();
	}

	async getAll(searchTerm?: string) {
		let options = {};

		if (searchTerm) {
			options = {
				$or: [
					{
						email: new RegExp(searchTerm, 'i'),
					},
				],
			};
		}

		return this.userEntity
			.find(options)
			.select('-password -updatedAt -__v')
			.sort({ createdAt: 'desc' })
			.exec();
	}

	async delete(id: string) {
		return this.userEntity.findByIdAndDelete(id).exec();
	}
}
