import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypegooseModule } from 'nestjs-typegoose';
import { UserEntity } from '../user/user.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { getJwtConfig } from '../config/jwt.config';

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
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getJwtConfig,
    }),
  ],
  providers: [AuthService, JwtService],
})
export class AuthModule {}
