import { beforeEach, describe, expect, jest, test } from "@jest/globals";
import { startNewNote } from "../../../src/store/journal/thunks";
import { AppDispatch, RootState } from "../../../src/store/store";
import { FirebaseBD } from "../../../src/firebase/init";
import { savingNewNote } from "../../../src/store/journal";

// QUITAR EL AWAIT HACIA FIREBASE EN TEST DE THUNKS JOURNAL

describe("Journal thunks", () => {
  const dispatch = jest.fn();
  const getState = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });
  test("startNewNote debe de crear una nueva nota en blanco", () => {
    getState.mockReturnValue({
      auth: { uuid: "TEST-UID" },
    });

    startNewNote(FirebaseBD)(
      dispatch as AppDispatch,
      getState as () => RootState
    );

    expect(dispatch).toHaveBeenCalledWith(savingNewNote());
    // expect(dispatch).toHaveBeenCalledWith({
    //   type: "journal/addNewEmptyNote",
    //   payload: {
    //     title: "",
    //     body: "",
    //     date: expect.any(Number),
    //     id: expect.any(String),
    //   },
    // });
    // expect(dispatch).toHaveBeenCalledWith({
    //   type: "journal/setActiveNote",
    //   payload: {
    //     title: "",
    //     body: "",
    //     date: expect.any(Number),
    //     id: expect.any(String),
    //   },
    // });
  });
});
