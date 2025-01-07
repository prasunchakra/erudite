
import { UserEntity } from '../user.entity';

export interface ExpressRequest extends Request {
    user?: UserEntity;
}   