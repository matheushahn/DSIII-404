import { ObjectInterest } from './ObjectInterest';

export interface Object {
    id?: String;
    name?: String;
    thumbnail?: String;
    description?: String;
    category?: String;
    city?: String;
    state?: String;
    cep?: String;
    createdAt?: number;
    updatedAt?: number;
    userId?: String;
    imageSrc?: String;
    active?: boolean;
    interestList?: Array<ObjectInterest>;
}
