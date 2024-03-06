import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypegooseModule } from 'nestjs-typegoose';
import { UserEntity } from '../user/user.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  controllers: [AuthController],
  imports: [
    TypegooseModule.forFeature([
      {
        typegooseClass: UserEntity,
        schemaOptions: {
          collection: 'User',
        },
      },
    ]),
    ConfigModule,
  ],
  providers: [AuthService],
})
export class AuthModule {}
