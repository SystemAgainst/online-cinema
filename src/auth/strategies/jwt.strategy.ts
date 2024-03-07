import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from 'nestjs-typegoose';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { UserEntity } from '../../user/user.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    @InjectModel(UserEntity) private readonly UserEntity: ModelType<UserEntity>
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretKey: configService.get('JWT_SECRET'),
    });
  }

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  async validate({ _id }: Pick<UserEntity, '_id'>) {
    return this.UserEntity.findById(_id).exec();
  }
}
