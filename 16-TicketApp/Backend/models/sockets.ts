import { Server, Socket } from "socket.io";
import { TicketList } from "./ticket-list";

export class Sockets {
  public ticketList: TicketList;

  constructor(public io: Server) {
    this.ticketList = new TicketList();
    this.socketEvents();
  }

  socketEvents() {
    this.io.on("connection", (socket) => {
      console.log("Client connected", socket.id);

      socket.on("request-ticket", (data, callback) =>
        callback(this.ticketList.createTicket())
      );

      socket.on("next-ticket", (user, callback) => {
        const ticket = this.ticketList.assingTicket(user);
        callback(ticket);
        this.io.emit("ticket-assigned", this.ticketList.lastThrityTeenTickets);
      });

      // this.io.emit("ticket-assigned", this.ticketList.lastThrityTeenTickets);
    });
  }
}
