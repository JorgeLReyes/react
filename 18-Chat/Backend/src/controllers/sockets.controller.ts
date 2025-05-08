import { MessagesDatabase } from "../database/messages";
import { UserDatabase } from "../database/user";

export class SocketController {
  constructor(
    private databaseUser: UserDatabase,
    private messsageDatabase: MessagesDatabase
  ) {}

  async userConnected(uid: string) {
    return this.databaseUser.updateOnlineUser({ uid });
  }
  async userDisconnected(uid: string) {
    return this.databaseUser.updateOfflineUser({ uid });
  }

  async listUsers() {
    return this.databaseUser.getUsers();
  }

  async saveMessage(payload: { from: string; to: string; message: string }) {
    return this.messsageDatabase.saveMessage(payload);
  }
}
