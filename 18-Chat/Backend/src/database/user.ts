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
}
