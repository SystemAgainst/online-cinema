import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { genSalt, hash } from 'bcryptjs';

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
}
