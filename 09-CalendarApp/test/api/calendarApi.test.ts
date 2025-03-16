import { describe, expect, test } from "@jest/globals";
import { api } from "../../src/api/calendarApi";

describe("calendarApi", () => {
  test("debe tener la configuracion por defecto", async () => {
    expect(api.defaults.baseURL).toContain(process.env.VITE_API_URL);
    expect(api.defaults.withCredentials).toBeTruthy();

    try {
      await api.get("/inexistente");
    } catch (error) {
      expect(error.config.withCredentials).toBeTruthy();
    }
  });
});
