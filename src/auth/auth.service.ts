import {
	BadRequestException,
	Injectable,
	UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { compare, genSalt, hash } from 'bcryptjs';

import { UserEntity } from '../user/user.entity';
import { AuthDto } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
import { RefreshTokenDto } from './dto/refresh-token.dto';

@Injectable()
export class AuthService {
	constructor(
		@InjectModel(UserEntity) private readonly UserEntity: ModelType<UserEntity>,
		private readonly jwtService: JwtService
	) {}

	async login(dto: AuthDto) {
		const user = await this.validateUser(dto);

		const tokens = await this.getTokenPair(String(user._id));

		return {
			user: this.getUserFields(user),
			...tokens,
		};
	}

	async getNewTokens({ refreshToken }: RefreshTokenDto) {
		if (!refreshToken) throw new UnauthorizedException('Please sign in!');

		const verifiedToken = await this.jwtService.verifyAsync(refreshToken);

		if (!verifiedToken) {
			throw new UnauthorizedException('Invalid token or expired!');
		}

		// how verifiedToken get _id?
		const user = await this.UserEntity.findById(verifiedToken._id);

		const tokens = await this.getTokenPair(String(user._id));

		return {
			user: this.getUserFields(user),
			...tokens,
		};
	}

	async register(dto: AuthDto) {
		const isUserExisted = await this.UserEntity.findOne({ email: dto.email });

		if (isUserExisted) {
			throw new BadRequestException(
				'User with same email has already existed in system'
			);
		}

		const salt = await genSalt(6);

		const newUser = new this.UserEntity({
			email: dto.email,
			password: await hash(dto.password, salt),
		});

		const tokens = await this.getTokenPair(String(newUser._id));

		return {
			user: this.getUserFields(newUser),
			...tokens,
		};
	}

	private async validateUser(dto: AuthDto) {
		const user = await this.UserEntity.findOne({ email: dto.email });

		if (!user) {
			throw new UnauthorizedException('User is not found');
		}

		const isValidPassword = await compare(dto.password, user.password);

		if (!isValidPassword) {
			throw new UnauthorizedException('Invalid password');
		}

		return user;
	}

	private async getTokenPair(userId: string) {
		const data = { _id: userId };

		const refreshToken = await this.jwtService.signAsync(data, {
			expiresIn: '15d',
		});

		const accessToken = await this.jwtService.signAsync(data, {
			expiresIn: '1d',
		});
		return { refreshToken, accessToken };
	}

	private getUserFields(user: UserEntity) {
		return {
			_id: user._id,
			email: user.email,
			isAdmin: user.isAdmin,
		};
	}
}
