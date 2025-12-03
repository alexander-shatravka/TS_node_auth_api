import { Document } from 'mongoose';

interface IUser extends Document {
    username: string;
    password: string;
    role: 'user' | 'admin';
}

export default IUser;
