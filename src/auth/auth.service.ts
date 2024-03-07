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

@Injectable()
export class AuthService {
  /**
   * TODO:
   * 1. add entity for db-connection
   * 2. authentication and actions with user will be separated
   */
  constructor(
    @InjectModel(UserEntity) private readonly UserEntity: ModelType<UserEntity>
  ) {}

  async login(dto: AuthDto) {
    return this.validateUser(dto);
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

    return newUser.save();
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
}
