import { compare, genSalt, hash } from "bcryptjs";

export class BcryptAdapter {
  static async hashPassword(password: string) {
    try {
      const salt = await genSalt(10);
      const encrypt = await hash(password, salt);
      return encrypt;
    } catch (e) {
      return null;
    }
  }
  static async comparePassword(password: string, hash: string) {
    try {
      const decrypt = await compare(password, hash);
      return decrypt;
    } catch (e) {
      return null;
    }
  }
}
