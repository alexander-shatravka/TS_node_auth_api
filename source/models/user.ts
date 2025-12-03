import mongoose, { Schema } from 'mongoose';
import IUser from '../interfaces/user';

const UserSchema: Schema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true, default: 'user' },
    firstName: { type: String, required: false },
    lastName: { type: String, required: false },
  },
  {
    timestamps: true
  }
);

export default mongoose.model<IUser>('User', UserSchema);
