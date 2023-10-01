import mongoose, { mongo } from "mongoose";

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    authentication: {
        password: { type: String, required: true, select: true },
        salt: { type: String, select: true },
        sessionToken: { type: String, select: true},
    },
    money: { type: Number, required: true, default: 0, select: true },
    requested_money: { type: Number, required: true, default: 0, select: true },
    item: { type: String, required: false, select: true },
});

export const UserModel = mongoose.model('User', UserSchema);

export const getUsers = () => UserModel.find();
export const getUserByEmail = (email: string) => UserModel.findOne({ email });
export const getUserBySessionToken = (sessionToken: string) => UserModel.findOne({ 
    'authentication.sessionToken': sessionToken,
 });
 export const getUserById = (id: string) => UserModel.findById(id);
 export const createUser = (values: Record<string, any>) => new UserModel(values).save().then((user) => user.toObject());
 export const deleteUserById = (id: string) => UserModel.findOneAndDelete({ _id: id });
 export const updateUserById = (id: string, values: Record<string, any>) => UserModel.findByIdAndUpdate(id, values);