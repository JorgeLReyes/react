"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventsRoutes = void 0;
const express_1 = require("express");
const events_controller_1 = require("../controllers/events.controller");
const validator_middleware_1 = require("../middleware/validator.middleware");
const user_database_1 = require("../database/datasource/user.database");
const event_database_1 = require("../database/datasource/event.database");
class EventsRoutes {
    static get routes() {
        const router = (0, express_1.Router)();
        const userDatasource = new user_database_1.UserDatabase();
        const eventDatasource = new event_database_1.EventDatabase();
        const controller = new events_controller_1.EventsController(userDatasource, eventDatasource);
        router.get("/", controller.getEvents);
        router.post("/", validator_middleware_1.ValidatorBody.createEvent, controller.createEvent);
        router.put("/:id", validator_middleware_1.ValidatorBody.updateEvent, controller.updateEvent);
        router.delete("/:id", controller.deleteEvent);
        return router;
    }
}
exports.EventsRoutes = EventsRoutes;
