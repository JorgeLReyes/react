"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventsController = void 0;
class EventsController {
    constructor(userDatasource, eventDatasource) {
        this.userDatasource = userDatasource;
        this.eventDatasource = eventDatasource;
        this.getEvents = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { x_user } = req.body;
            try {
                const user = yield this.userDatasource.findUserById(x_user.uid);
                if (!user) {
                    res.status(401).json({
                        ok: false,
                        msg: "User not found",
                    });
                    return;
                }
                const events = yield this.eventDatasource.getEvents();
                res.status(201).json({
                    ok: true,
                    events,
                });
            }
            catch (error) {
                res.status(401).json({
                    ok: false,
                    msg: error,
                });
            }
        });
        this.createEvent = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const _a = req.body, { x_user } = _a, body = __rest(_a, ["x_user"]);
            try {
                const user = yield this.userDatasource.findUserById(x_user.uid);
                if (!user) {
                    res.status(401).json({
                        ok: false,
                        msg: "User not found",
                    });
                    return;
                }
                const event = yield this.eventDatasource.createEvent(Object.assign(Object.assign({}, body), { user: user._id }));
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
            }
            catch (error) {
                res.status(401).json({
                    ok: false,
                    msg: error,
                });
            }
        });
        this.updateEvent = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const idEvent = req.params["id"];
            const _a = req.body, { x_user } = _a, body = __rest(_a, ["x_user"]);
            try {
                const findEvent = yield this.eventDatasource.findEventById(idEvent);
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
                const newUpdateEvent = Object.assign(Object.assign({}, body), { user: x_user.id });
                const updateEvent = yield this.eventDatasource.updateEvent(idEvent, newUpdateEvent);
                res.json({
                    ok: true,
                    event: updateEvent,
                });
            }
            catch (error) {
                res.status(401).json({
                    ok: false,
                    msg: error,
                });
            }
        });
        this.deleteEvent = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const idEvent = req.params["id"];
            const { x_user } = req.body;
            try {
                const findEvent = yield this.eventDatasource.findEventById(idEvent);
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
                const event = yield this.eventDatasource.deleteEventById(idEvent);
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
            }
            catch (error) {
                res.status(401).json({
                    ok: false,
                    msg: error,
                });
            }
        });
    }
}
exports.EventsController = EventsController;
