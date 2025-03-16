import { get } from "env-var";

export const envs = {
  PORT: get("PORT").required().asPortNumber(),
  MONGODB_USERNAME: get("MONGODB_USERNAME").required().asString(),
  MONGODB_PASSWORD: get("MONGODB_PASSWORD").required().asString(),
  MONGODB_NAME: get("MONGODB_NAME").required().asString(),
  MONGODB_URL: get("MONGODB_URL").required().asString(),
  SEED: get("SEED").required().asString(),
};
