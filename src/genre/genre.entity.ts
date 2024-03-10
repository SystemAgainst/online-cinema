import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import { prop } from '@typegoose/typegoose';

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface GenreEntity extends Base {}

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class GenreEntity extends TimeStamps {
	@prop()
	name: string;

	@prop({ unique: true })
	slug: string;

	@prop()
	description: string;

	@prop()
	icon: string;
}
