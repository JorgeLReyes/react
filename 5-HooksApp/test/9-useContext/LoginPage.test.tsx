import { describe, expect, test, jest } from "@jest/globals";
import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { UserContext } from "../../src/09-useContext/context/UserContext";
import LoginPage from "../../src/09-useContext/LoginPage";
describe("LoginPage", () => {
  test("debe mostrar el componente sin el usuario", () => {
    render(
      <UserContext.Provider value={{}}>
        <LoginPage />
      </UserContext.Provider>
    );
    screen.debug();
    expect(screen.getByLabelText("user").textContent).toBe("");
  });
  test("debe llamar el setUser", () => {
    const setUserMock = jest.fn();
    render(
      <UserContext.Provider value={{ user: undefined, setUser: setUserMock }}>
        <LoginPage />
      </UserContext.Provider>
    );
    const button = screen.getByRole("button");
    fireEvent.click(button);
    expect(setUserMock).toHaveBeenCalledWith({
      name: "John Doe",
      id: 123,
      email: "jorge",
    });
  });
});
