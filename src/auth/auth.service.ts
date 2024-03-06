import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { ModelType } from '@typegoose/typegoose/lib/types';
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
    const newUser = new this.UserEntity(dto);
    return newUser.save();
  }
}
