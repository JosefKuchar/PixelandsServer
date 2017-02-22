import * as mongoose from 'mongoose'
import * as bcrypt from 'bcryptjs'

import { IUserModel } from './IUserModel'

export const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

UserSchema.methods.validPassword = function(password: string): boolean {
    return bcrypt.compareSync(password, this.password);
}

UserSchema.methods.generateHash = function(password: string): string {
    return bcrypt.hashSync(password, 8);
}

const User = mongoose.model<IUserModel>('User', UserSchema);
export default User;