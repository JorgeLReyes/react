import "whatwg-fetch";
import "dotenv/config";
import { jest } from "@jest/globals";

jest.mock("./src/helpers/envs", () => ({
  envs: () => ({
    ...process.env,
  }),
}));
