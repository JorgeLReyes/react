import { Request, Response } from "express";
import { MessagesDatabase } from "../database/messages";

export class ChatController {
  constructor(public database: MessagesDatabase) {}
  getChat = async (req: Request, res: Response) => {
    const myId = req.body.user.uid;
    const messagesOf = req.params.of;

    const messages = await this.database.findMessages(myId, messagesOf);

    res.status(200).json({
      ok: true,
      messages,
    });
  };
}
