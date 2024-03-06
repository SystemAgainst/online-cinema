import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { ModelType } from '@typegoose/typegoose/lib/types';

@Injectable()
export class AuthService {
  /**
   * TODO:
   * 1. add entity for db-connection
   * 2. authentication and actions with user will be separated
   */
  constructor(
    @InjectModel(UserModel) private readonly UserModel: ModelType<UserModel>
  ) {}

  async register(dto: any) {
    return undefined;
  }
}
