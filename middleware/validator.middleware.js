"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidatorBody = void 0;
const express_validator_1 = require("express-validator");
const moment_1 = __importDefault(require("moment"));
class ValidatorBody {
}
exports.ValidatorBody = ValidatorBody;
_a = ValidatorBody;
ValidatorBody.customValidator = {
    isDate: (value, { req, location, path }) => {
        // console.log({ value, req, location, path });
        return value ? (0, moment_1.default)(value).isValid() : false;
    },
};
ValidatorBody.validator = {
    user: {
        name: (0, express_validator_1.check)("name", "Name is required").not().isEmpty(),
        email: (0, express_validator_1.check)("email", "Email is required").isEmail(),
        password: (0, express_validator_1.check)("password", "Password is required")
            .notEmpty()
            .isLength({ min: 6 }),
    },
    event: {
        title: (0, express_validator_1.check)("title", "title is required").not().isEmpty(),
        start: (0, express_validator_1.check)("start", "date start is required").custom(_a.customValidator.isDate),
        end: (0, express_validator_1.check)("end", "date end is required").custom(_a.customValidator.isDate),
    },
    validate: (req, res, next) => {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ ok: false, errors: errors.mapped() });
            return;
        }
        next();
    },
};
ValidatorBody.login = [
    _a.validator.user.email,
    _a.validator.user.password,
    _a.validator.validate,
];
ValidatorBody.createUser = [
    _a.validator.user.name,
    _a.validator.user.email,
    _a.validator.user.password,
    _a.validator.validate,
];
ValidatorBody.createEvent = [
    _a.validator.event.title,
    _a.validator.event.start,
    _a.validator.event.end,
    _a.validator.validate,
];
ValidatorBody.updateEvent = [
    _a.validator.event.title,
    _a.validator.event.start,
    _a.validator.event.end,
    _a.validator.validate,
];
