import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type note = {
  id?: string;
  title: string;
  body: string;
  date: number;
  imageUrl?: string[];
};

interface Journal {
  isSaving: boolean;
  messageSave: string;
  notes: note[];
  active: note | null;
}

const initialState: Journal = {
  isSaving: false,
  messageSave: "",
  notes: [],
  active: null,
};

export const journalSlice = createSlice({
  name: "journal",
  initialState,
  reducers: {
    savingNewNote: (state) => {
      state.isSaving = true;
    },
    addNewEmptyNote: (state, action: PayloadAction<note>) => {
      state.notes.push(action.payload);
      state.isSaving = false;
    },
    setActiveNote: (state, action: PayloadAction<note>) => {
      state.active = action.payload;
      state.messageSave = "";
    },
    setNotes: (state, action: PayloadAction<note[]>) => {
      state.notes = action.payload;
    },
    setSaving: (state /* action */) => {
      state.isSaving = true;
      state.messageSave = "";
    },
    updateNote: (state, action: PayloadAction<note>) => {
      state.isSaving = false;
      state.notes = state.notes.map((note) =>
        note.id !== action.payload.id ? note : action.payload
      );
      state.messageSave = `Nota: "${action.payload.title}", actualizada correctamente`;
    },
    setPhotosToActiveNote: (state, action: PayloadAction<string[]>) => {
      state.active!.imageUrl = [
        ...(state.active?.imageUrl || []),
        ...action.payload,
      ];
      state.isSaving = false;
    },
    clearNotesLogout: (state) => {
      state.isSaving = false;
      state.messageSave = "";
      state.notes = [];
      state.active = null;
    },
    deleteNoteById: (state, action: PayloadAction<string>) => {
      state.notes = state.notes.filter((note) => note.id !== action.payload);
      state.active = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  addNewEmptyNote,
  setActiveNote,
  setNotes,
  setSaving,
  updateNote,
  deleteNoteById,
  savingNewNote,
  setPhotosToActiveNote,
  clearNotesLogout,
} = journalSlice.actions;
