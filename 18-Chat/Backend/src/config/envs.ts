import { get } from "env-var";

export const envs = {
  PORT: get("PORT").required().asPortNumber(),
  DOMAIN: get("DOMAIN").required().asArray(),
  MONGO_USERNAME: get("MONGO_USERNAME").required().asString(),
  MONGO_PASSWORD: get("MONGO_PASSWORD").required().asString(),
  MONGO_DB_NAME: get("MONGO_DB_NAME").required().asString(),
  MONGO_DB_URL: get("MONGO_DB_URL").required().asString(),
  SECRET_KEY: get("SECRET_KEY").required().asString(),
};
