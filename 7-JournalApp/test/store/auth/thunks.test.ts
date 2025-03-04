import { beforeEach, describe, expect, jest, test } from "@jest/globals";
import {
  checkingAuthentication,
  startCreatingUserWithEmailPassword,
  startGoogleSignIn,
  startLoginWithEmailPassword,
  startLogout,
} from "../../../src/store/auth/thunks";
import { AppDispatch } from "../../../src/store/store";
import {
  checkingCredentials,
  login,
  logout,
} from "../../../src/store/auth/auth";
import {
  loginWithEmailPassword,
  logoutFirebase,
  registerUserWithEmailPassword,
  signInWithGoogle,
} from "../../../src/firebase/providers";
import { demoUser } from "../../fixtures/authFixtures";
import { clearNotesLogout } from "../../../src/store/journal";

// Tipar el mo

jest.mock("../../../src/firebase/providers");

describe("Thunks auth", () => {
  const dispacth = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("debe de invocar el checking credentials", async () => {
    await checkingAuthentication()(dispacth as AppDispatch);
    expect(dispacth).toHaveBeenCalledWith(checkingCredentials());
    expect(dispacth).toHaveBeenCalledWith({
      type: "auth/checkingCredentials",
    });
  });
  test("debe de llamar checking credentials y login (google)", async () => {
    const loginData = { ok: true, ...demoUser, uid: demoUser.uuid };

    (signInWithGoogle as jest.Mock).mockImplementation(() =>
      Promise.resolve(loginData)
    );
    await startGoogleSignIn()(dispacth as AppDispatch);

    expect(dispacth).toHaveBeenCalledWith(checkingCredentials());
    expect(dispacth).toHaveBeenCalledWith(login(demoUser));
  });
  test("debe de llamar checking credentials y logout (google)", async () => {
    const loginData = { ok: false, errorMessage: "Error al logearse" };

    (signInWithGoogle as jest.Mock).mockImplementation(() =>
      Promise.resolve(loginData)
    );
    await startGoogleSignIn()(dispacth as AppDispatch);

    expect(dispacth).toHaveBeenCalledWith(checkingCredentials());
    expect(dispacth).toHaveBeenCalledWith(
      logout({ message: "Error al logearse" })
    );
  });
  test("debe de autenticarse con email y password", async () => {
    const loginData = { ok: true, ...demoUser, uid: demoUser.uuid };
    const user = { email: demoUser.email!, password: "123456" };
    const loginMock = jest.fn(() => Promise.resolve(loginData));

    (loginWithEmailPassword as jest.Mock).mockImplementation(loginMock);

    await startLoginWithEmailPassword(user)(dispacth as AppDispatch);

    expect(loginWithEmailPassword).toHaveBeenCalledWith(user);
    expect(dispacth).toHaveBeenCalledWith(login(demoUser));
  });
  test("debe de dar error al autenticarse con email y password", async () => {
    const loginData = { ok: false, errorMessage: "Error al logearse" };
    const user = { email: demoUser.email!, password: "123456" };
    const loginMock = jest.fn(() => Promise.resolve(loginData));

    (loginWithEmailPassword as jest.Mock).mockImplementation(loginMock);

    await startLoginWithEmailPassword(user)(dispacth as AppDispatch);

    expect(loginWithEmailPassword).toHaveBeenCalledWith(user);
    expect(dispacth).toHaveBeenCalledWith(
      logout({ message: "Error al logearse" })
    );
  });
  test("debe de crear un usuario al autenticarse con email y password", async () => {
    const loginData = { ok: true, ...demoUser, uid: demoUser.uuid };
    const user = {
      email: demoUser.email!,
      password: "123456",
      displayName: demoUser.displayName!,
    };
    const loginMock = jest.fn(() => Promise.resolve(loginData));

    (registerUserWithEmailPassword as jest.Mock).mockImplementation(loginMock);

    await startCreatingUserWithEmailPassword(user)(dispacth as AppDispatch);

    expect(registerUserWithEmailPassword).toHaveBeenCalledWith(user);
    expect(dispacth).toHaveBeenCalledWith(login(demoUser));
  });
  test("debe de llamar logoutFirebase, clearNotes y logout", async () => {
    await startLogout()(dispacth as AppDispatch);

    expect(logoutFirebase).toHaveBeenCalled();
    expect(dispacth).toHaveBeenCalledWith(clearNotesLogout());
    expect(dispacth).toHaveBeenCalledWith(
      logout({
        message: "Sesión finalizada",
      })
    );
  });
});
