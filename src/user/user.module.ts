import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypegooseModule } from 'nestjs-typegoose';
import { UserEntity } from './user.entity';

@Module({
	controllers: [UserController],
	providers: [UserService],
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
})
export class UserModule {}
