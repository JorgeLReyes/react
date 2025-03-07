import { EventModel } from "../mongo/model/eventModel";
import { User } from "./user.database";

interface Event {
  id?: string;
  title: string;
  notes?: string;
  start: Date;
  end: Date;
  user: string | User;
}

export interface EventDatasource {
  createEvent: (newEvent: Event) => Promise<Event>;
  updateEvent: (id: string, event: Event) => Promise<Event | null>;
  findEventById: (id: string) => Promise<Event | null>;
  deleteEventById: (id: string) => Promise<Event | null>;
  getEvents: () => Promise<Event[] | null>;
}

export class EventDatabase implements EventDatasource {
  async createEvent(newEvent: Event) {
    const event = await EventModel.create(newEvent);
    return {
      id: event.id!,
      title: event.title!,
      notes: event.notes!,
      start: event.start!,
      end: event.end!,
      user: event.user?.toString()!,
    };
  }

  async updateEvent(id: string, event: Event) {
    const eventUpdate = await EventModel.findByIdAndUpdate(id, event, {
      new: true,
    }).lean<Event>();
    return eventUpdate;
  }

  async findEventById(id: string) {
    const event = await EventModel.findById(id).lean<Event>();
    return event;
  }

  async deleteEventById(id: string) {
    const event = await EventModel.findByIdAndDelete(id).lean<Event>();
    return event;
  }

  async getEvents() {
    const event = await EventModel.find()
      .populate("user", "name")
      .lean<Event[]>();
    return event;
  }
}
