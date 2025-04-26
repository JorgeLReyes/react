import { Message } from "../models/messages";

export class MessagesDatabase {
  async findMessages(myId: string, messagesOf: string) {
    const last30 = await Message.find({
      $or: [
        { of: myId, to: messagesOf },
        { of: messagesOf, to: myId },
      ],
    })
      .sort({ createdAt: "desc" })
      .limit(30);

    return last30;
  }
}
