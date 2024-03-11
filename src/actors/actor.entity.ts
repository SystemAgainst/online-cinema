import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import { prop } from '@typegoose/typegoose';
import { Types } from 'mongoose';

export interface IActorEntity extends Base {}

export class ActorEntity extends TimeStamps implements IActorEntity {
	@prop()
	name: string;

	@prop({ unique: true })
	slug: string;

	@prop()
	photo: boolean;

	_id: Types.ObjectId;
	id: string;
}
