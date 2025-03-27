import { beforeEach, describe, expect, jest, test } from "@jest/globals";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { useAuthStore } from "../../src/hooks/useAuthStore";
import { App } from "../../src/Router/components/App";
import CheckRoute from "../../src/Router/components/CheckRoute";
import { CalendarPage } from "../../src/calendar/pages/CalendarPage";

jest.mock("../../src/hooks/useAuthStore");
jest.mock("../../src/calendar/pages/CalendarPage", () => ({
  CalendarPage: () => <h1>Calendar Page</h1>,
}));
const testRouter = (initialEntries: string[]) =>
  createMemoryRouter(
    [
      {
        path: "/",
        element: <App />,
        children: [
          {
            path: "auth/*",
            element: (
              <CheckRoute
                statusCurrent={"not-authenticated"}
                pathRedirect="/"
              />
            ),
            children: [{ path: "login", element: <h1>Login Page</h1> }],
          },
          {
            path: "*",
            element: (
              <CheckRoute
                statusCurrent={"authenticated"}
                pathRedirect="/auth/login"
              />
            ),
            children: [{ index: true, element: <CalendarPage /> }],
          },
        ],
      },
    ],
    { initialEntries }
  );

describe("Router", () => {
  const checkAuthTokenMock = jest.fn();

  beforeEach(() => {
    jest.resetAllMocks();
  });

  test("debe de mostrar la pantalla de carga y llamar a checkAuthToken", () => {
    (useAuthStore as jest.Mock).mockReturnValue({
      status: "cheking",
      checkAuthToken: () => checkAuthTokenMock(),
    });

    const { container } = render(<RouterProvider router={testRouter(["/"])} />);
    expect(container.childElementCount).toBe(0);

    waitFor(() => expect(checkAuthTokenMock).toHaveBeenCalled());
  });
  test("debe de mostrar el login en caso de no estar autenticado", () => {
    (useAuthStore as jest.Mock).mockReturnValue({
      status: "not-authenticated",
      checkAuthToken: () => checkAuthTokenMock(),
    });

    render(<RouterProvider router={testRouter(["/"])} />);

    waitFor(() => expect(screen.getByText("Login Page")).toBeTruthy());
  });
  test("debe de mostrar el calendario si estamos autenticado", () => {
    (useAuthStore as jest.Mock).mockReturnValue({
      status: "authenticated",
      checkAuthToken: () => checkAuthTokenMock(),
    });

    render(<RouterProvider router={testRouter(["/"])} />);

    waitFor(() => expect(screen.getByText("Calendar Page")).toBeTruthy());
  });
});
