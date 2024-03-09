import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserEntity } from '../user.entity';

type TypeData = keyof UserEntity;

export const User = createParamDecorator(
	(data: TypeData, context: ExecutionContext) => {
		const request = context.switchToHttp().getRequest();
		const user = request.user;

		return data ? user?.[data] : data; // почему user?.[data], а не user?.data и в чем разница?
	}
);
