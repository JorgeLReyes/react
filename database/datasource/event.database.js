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
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventDatabase = void 0;
const eventModel_1 = require("../mongo/model/eventModel");
class EventDatabase {
    createEvent(newEvent) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const event = yield eventModel_1.EventModel.create(newEvent);
            return {
                id: event.id,
                title: event.title,
                notes: event.notes,
                start: event.start,
                end: event.end,
                user: (_a = event.user) === null || _a === void 0 ? void 0 : _a.toString(),
            };
        });
    }
    updateEvent(id, event) {
        return __awaiter(this, void 0, void 0, function* () {
            const eventUpdate = yield eventModel_1.EventModel.findByIdAndUpdate(id, event, {
                new: true,
            }).lean();
            return eventUpdate;
        });
    }
    findEventById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const event = yield eventModel_1.EventModel.findById(id).lean();
            return event;
        });
    }
    deleteEventById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const event = yield eventModel_1.EventModel.findByIdAndDelete(id).lean();
            return event;
        });
    }
    getEvents() {
        return __awaiter(this, void 0, void 0, function* () {
            const event = yield eventModel_1.EventModel.find()
                .populate("user", "name")
                .lean();
            return event;
        });
    }
}
exports.EventDatabase = EventDatabase;
