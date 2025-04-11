import { v4 as uuid } from "uuid";

export class Band {
  public name: string;
  public votes = 0;
  public id: string;

  constructor(name: string) {
    this.name = name;
    this.votes = 0;
    this.id = uuid();
  }
}
