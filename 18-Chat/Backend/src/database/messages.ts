import { Message } from "../models/messages";

export class MessagesDatabase {
  async findMessages(myId: string, messagesOf: string) {
    const last30 = await Message.find({
      $or: [
        { from: myId, to: messagesOf },
        { from: messagesOf, to: myId },
      ],
    })
      .sort({ createdAt: "desc" })
      .limit(30);

    return last30;
  }

  async saveMessage(payload: { from: string; to: string; message: string }) {
    return Message.create(payload);
  }
}
