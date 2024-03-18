import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import { Ref, prop } from '@typegoose/typegoose';
import { MoviesEntity } from 'src/movies/movies.entity';

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface UserEntity extends Base {}

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class UserEntity extends TimeStamps {
	@prop({ unique: true })
	email: string;

	@prop()
	password: string;

	@prop({ default: false })
	isAdmin?: boolean;

	@prop({ default: [], ref: () => MoviesEntity })
	favorites?: Ref<MoviesEntity>[];
}
