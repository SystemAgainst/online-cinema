import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { UserEntity } from '../user/user.entity';

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

  async register(dto: any) {
    const newUser = new this.UserEntity(dto);
    return newUser.save();
  }
}
