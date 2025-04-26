import { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";

export class AuthMiddleware {
  private static validations = {
    email: body("email", "Email is required").isEmail(),
    password: body("password", "Password is required")
      .notEmpty()
      .isLength({ min: 6 }),
    name: body("name", "Name is required").notEmpty(),
  };

  private static validateFields = (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ ok: false, errors: errors.mapped() });
      return;
    }
    next();
  };

  static validateLogin = [
    this.validations.email,
    this.validations.password,
    this.validateFields,
  ];

  static validateRegister = [
    this.validations.name,
    this.validations.email,
    this.validations.password,
    this.validateFields,
  ];
}
