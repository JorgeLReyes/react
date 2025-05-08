import { User } from "../models/user";

interface UserProps {
  name?: string;
  email: string;
  password: string;
}

export class UserDatabase {
  async findUserById(id: string) {
    return User.findById(id);
  }

  async findUserByEmail(email: string) {
    return User.findOne({ email });
  }

  async createUser({ email, password, name }: UserProps) {
    return User.create({ email, password, name });
  }

  async updateOnlineUser({ uid }: { uid: string }) {
    return User.findByIdAndUpdate(uid, {
      online: true,
    });
  }
  async updateOfflineUser({ uid }: { uid: string }) {
    return User.findByIdAndUpdate(uid, {
      online: false,
    });
  }

  async getUsers() {
    return User.find().sort("-online");
  }
}
