import * as mongoose from 'mongoose';
import { IUser } from './IUser'

export interface IUserModel extends IUser, mongoose.Document {
    validPassword(password: string): boolean,
    generateHash(password: string): string
}
