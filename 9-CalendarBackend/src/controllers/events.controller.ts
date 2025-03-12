import { Request, Response } from "express";
import { UserDatasource } from "../database/datasource/user.database";
import { EventDatasource } from "../database/datasource/event.database";

export class EventsController {
  constructor(
    private userDatasource: UserDatasource,
    private eventDatasource: EventDatasource
  ) {}

  getEvents = async (req: Request, res: Response) => {
    const { x_user } = req.body;
    try {
      const user = await this.userDatasource.findUserById(x_user.uid);

      if (!user) {
        res.status(401).json({
          ok: false,
          msg: "User not found",
        });
        return;
      }

      const events = await this.eventDatasource.getEvents();

      res.status(201).json({
        ok: true,
        events,
      });
    } catch (error) {
      res.status(401).json({
        ok: false,
        msg: error,
      });
    }
  };

  createEvent = async (req: Request, res: Response) => {
    const { x_user, ...body } = req.body;
    try {
      const user = await this.userDatasource.findUserById(x_user.uid);

      if (!user) {
        res.status(401).json({
          ok: false,
          msg: "User not found",
        });
        return;
      }

      const event = await this.eventDatasource.createEvent({
        ...body,
        user: user._id,
      });

      if (!event) {
        res.status(401).json({
          ok: false,
          msg: "Error: event not created!",
        });
        return;
      }
      res.status(201).json({
        ok: true,
        event,
      });
    } catch (error) {
      res.status(401).json({
        ok: false,
        msg: error,
      });
    }
  };

  updateEvent = async (req: Request, res: Response) => {
    const idEvent = req.params["id"];
    const { x_user, ...body } = req.body;
    try {
      const findEvent = await this.eventDatasource.findEventById(idEvent);
      if (!findEvent) {
        res.status(404).json({
          ok: false,
          msg: "Error: event not found!",
        });
        return;
      }
      if (findEvent.user.toString() !== x_user.uid) {
        res.status(401).json({
          ok: false,
          msg: "Error: Not autorization for update this event!",
        });
        return;
      }

      const newUpdateEvent = { ...body, user: x_user.id };

      const updateEvent = await this.eventDatasource.updateEvent(
        idEvent,
        newUpdateEvent
      );
      res.json({
        ok: true,
        event: updateEvent,
      });
    } catch (error) {
      res.status(401).json({
        ok: false,
        msg: error,
      });
    }
  };

  deleteEvent = async (req: Request, res: Response) => {
    const idEvent = req.params["id"];
    const { x_user } = req.body;
    try {
      const findEvent = await this.eventDatasource.findEventById(idEvent);
      if (!findEvent) {
        res.status(404).json({
          ok: false,
          msg: "Error: event not found!",
        });
        return;
      }
      if (findEvent.user.toString() !== x_user.uid) {
        res.status(401).json({
          ok: false,
          msg: "Error: Not autorization for update this event!",
        });
        return;
      }
      const event = await this.eventDatasource.deleteEventById(idEvent);
      if (!event) {
        res.status(401).json({
          ok: false,
          msg: "Error: Event not deleting !",
        });
        return;
      }

      res.json({
        ok: true,
        event,
      });
    } catch (error) {
      res.status(401).json({
        ok: false,
        msg: error,
      });
    }
  };
}
