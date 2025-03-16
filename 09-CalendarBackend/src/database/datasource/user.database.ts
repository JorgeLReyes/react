import { UserModel } from "../mongo/model/userModel";

export interface User {
  _id?: string;
  name?: string;
  email: string;
  password: string;
}

export interface UserDatasource {
  createUser: (newUser: User) => Promise<User>;
  findUserByEmail: (email: string) => Promise<User | null>;
  findUserById: (id: string) => Promise<User | null>;
}

export class UserDatabase implements UserDatasource {
  async createUser(newUser: User) {
    const user = await UserModel.create(newUser);
    return {
      _id: user._id.toString()!,
      name: user.name!,
      email: user.email!,
      password: user.password!,
    };
  }

  async findUserByEmail(email: string) {
    const user = await UserModel.findOne({ email }).lean<User>();
    return user;
  }

  async findUserById(id: string) {
    const user = await UserModel.findOne({ _id: id }).lean<User>();
    return user;
  }
}
