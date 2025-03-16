import { NextFunction, Request, Response } from "express";
import { check, Meta, validationResult } from "express-validator";
import moment from "moment";

export class ValidatorBody {
  private static customValidator = {
    isDate: (value: Date, { req, location, path }: Meta) => {
      // console.log({ value, req, location, path });
      return value ? moment(value).isValid() : false;
    },
  };

  private static validator = {
    user: {
      name: check("name", "Name is required").not().isEmpty(),
      email: check("email", "Email is required").isEmail(),
      password: check("password", "Password is required")
        .notEmpty()
        .isLength({ min: 6 }),
    },
    event: {
      title: check("title", "title is required").not().isEmpty(),
      start: check("start", "date start is required").custom(
        this.customValidator.isDate
      ),
      end: check("end", "date end is required").custom(
        this.customValidator.isDate
      ),
    },
    validate: (req: Request, res: Response, next: NextFunction) => {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        res.status(400).json({ ok: false, errors: errors.mapped() });
        return;
      }
      next();
    },
  };

  static login = [
    this.validator.user.email,
    this.validator.user.password,
    this.validator.validate,
  ];

  static createUser = [
    this.validator.user.name,
    this.validator.user.email,
    this.validator.user.password,
    this.validator.validate,
  ];

  static createEvent = [
    this.validator.event.title,
    this.validator.event.start,
    this.validator.event.end,
    this.validator.validate,
  ];

  static updateEvent = [
    this.validator.event.title,
    this.validator.event.start,
    this.validator.event.end,
    this.validator.validate,
  ];
}
