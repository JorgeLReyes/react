import { Ticket } from "./ticket";

export class TicketList {
  public pendingTickets: Ticket[];
  public assignedTickets: Ticket[];
  public lastTicket: number = 0;

  constructor() {
    this.pendingTickets = [];
    this.assignedTickets = [];
  }

  private get nextTicketNumber() {
    return (this.lastTicket += 1);
  }

  get lastThrityTeenTickets() {
    return this.assignedTickets.slice(0, 13);
  }

  createTicket() {
    const ticket = new Ticket(this.nextTicketNumber);
    this.pendingTickets.push(ticket);
    return ticket;
  }

  assingTicket({ agent, desk }: { agent: string; desk: string }) {
    if (this.pendingTickets.length === 0) return null;

    const nextTicket = this.pendingTickets.shift() as Ticket;
    nextTicket.desk = desk;
    nextTicket.agent = agent;

    this.assignedTickets.unshift(nextTicket);

    return nextTicket;
  }
}
