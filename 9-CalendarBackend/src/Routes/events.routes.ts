import { Router } from "express";
import { EventsController } from "../controllers/events.controller";
import { ValidatorBody } from "../middleware/validator.middleware";
import { UserDatabase } from "../database/datasource/user.database";
import { EventDatabase } from "../database/datasource/event.database";

export class EventsRoutes {
  static get routes() {
    const router = Router();
    const userDatasource = new UserDatabase();
    const eventDatasource = new EventDatabase();
    const controller = new EventsController(userDatasource, eventDatasource);

    router.get("/", controller.getEvents);
    router.post("/", ValidatorBody.createEvent, controller.createEvent);
    router.put("/:id", ValidatorBody.updateEvent, controller.updateEvent);
    router.delete("/:id", controller.deleteEvent);

    return router;
  }
}
