import { v4 as uuid } from "uuid";

export class Ticket {
  public id: string;
  public number: number;
  public desk?: string;
  public agent?: string;

  constructor(lastNumber: number) {
    this.id = uuid();
    this.desk = undefined;
    this.agent = undefined;
    this.number = lastNumber;
  }
}
