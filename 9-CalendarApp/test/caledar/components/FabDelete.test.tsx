import { beforeEach, describe, expect, jest, test } from "@jest/globals";
import { fireEvent, render, screen } from "@testing-library/react";
import { FabDelete } from "../../../src/calendar/components/FabDelete";
import React from "react";
import { useCalendarStore } from "../../../src/hooks";

jest.mock("../../../src/hooks/useCalendarStore");

describe("FabDelete", () => {
  const startDeletingEventMock = jest.fn();
  beforeEach(() => {
    jest.resetAllMocks();
  });
  test("debe mostrar el componente y llamar a startDeletingEvent", () => {
    (useCalendarStore as jest.Mock).mockReturnValue({
      startDeletingEvent: () => startDeletingEventMock(),
      activeEvent: {
        title: "Evento",
      },
    });
    render(<FabDelete />);
    const button = screen.getByRole("button");
    fireEvent.click(button);
    expect(startDeletingEventMock).toHaveBeenCalled();
  });
  test("no debe mostrar el componente", () => {
    (useCalendarStore as jest.Mock).mockReturnValue({
      startDeletingEvent: () => startDeletingEventMock(),
      activeEvent: null,
    });
    const { container } = render(<FabDelete />);

    expect(container.childNodes.length).toBe(0);
  });
});
