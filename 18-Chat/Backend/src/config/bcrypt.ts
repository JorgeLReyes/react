import { genSalt, hash, compare } from "bcryptjs";

export class BcryptAdapter {
  static async hashPassword(password: string) {
    try {
      const salt = await genSalt(10);
      return await hash(password, salt);
    } catch (e) {
      return null;
    }
  }
  static async verifyPassword(password: string, hash: string) {
    try {
      return await compare(password, hash);
    } catch (e) {
      return null;
    }
  }
}
