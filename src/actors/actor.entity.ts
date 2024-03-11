import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import { prop } from '@typegoose/typegoose';
import { Types } from 'mongoose';

export interface IActorEntity extends Base {}

export class ActorEntity extends TimeStamps implements IActorEntity {
	@prop({ unique: true })
	email: string;

	@prop()
	password: string;

	@prop({ default: false })
	isAdmin: boolean;

	@prop({ default: [] })
	favourites?: [];

	_id: Types.ObjectId;
	id: string;
}
