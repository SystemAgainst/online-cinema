import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypegooseModule } from 'nestjs-typegoose';
import { UserEntity } from './user.entity';

@Module({
	controllers: [UserController],
	imports: [
		TypegooseModule.forFeature([
			{
				typegooseClass: UserEntity,
				schemaOptions: {
					collection: 'User',
				},
			},
		]),
	],
	providers: [UserService],
	exports: [UserService],
})
export class UserModule {}
