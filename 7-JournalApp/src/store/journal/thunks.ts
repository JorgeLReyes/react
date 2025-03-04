import { collection, deleteDoc, doc, setDoc } from "firebase/firestore";
import { AppDispatch, RootState } from "../store";
import { FirebaseBD } from "../../firebase/init";
import {
  addNewEmptyNote,
  deleteNoteById,
  note,
  savingNewNote,
  setActiveNote,
  setNotes,
  setPhotosToActiveNote,
  setSaving,
  updateNote,
} from "./journal";
import { fileUpload, loadNotes } from "../../helpers/";

export const startNewNote = (firebaseBD: typeof FirebaseBD = FirebaseBD) => {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    const { uuid } = getState().auth;
    // const uuid = FirebaseAuth.currentUser?.uid;
    dispatch(savingNewNote());

    const newNote: note = {
      title: "",
      body: "",
      date: new Date().getTime(),
    };

    const newDoc = doc(collection(firebaseBD, `${uuid}/journal/notes`));
    await setDoc(newDoc, newNote);
    // setDoc(newDoc, newNote);
    newNote.id = newDoc.id;

    dispatch(addNewEmptyNote(newNote));
    dispatch(setActiveNote(newNote));
  };
};

export const startLoadingNotes = () => {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    const { uuid } = getState().auth;
    if (!uuid) throw new Error("Not user exist");
    const notes = await loadNotes(uuid);
    console.log(notes);
    dispatch(setNotes(notes));
  };
};

export const startSaveNote = () => {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    dispatch(setSaving());

    const { uuid } = getState().auth;
    const { active: note } = getState().journal;
    if (!uuid) throw new Error("Not user exist");

    const noteToFireStore = { ...note };
    delete noteToFireStore.id;

    const docRef = doc(FirebaseBD, `${uuid}/journal/notes/${note!.id}`);

    await setDoc(docRef, noteToFireStore, {
      merge: true,
    });

    dispatch(updateNote(note!));
  };
};

export const startUploadingFiles = (files: FileList) => {
  return async (dispatch: AppDispatch) => {
    dispatch(setSaving());

    const photosUrls = await Promise.all(
      Array.from(files).map((file) => fileUpload(file))
    );
    dispatch(setPhotosToActiveNote(photosUrls));
  };
};

export const startDeletingNote = () => {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      const { uuid } = getState().auth;
      const { active: note } = getState().journal;

      const docRef = doc(FirebaseBD, `${uuid}/journal/notes/${note!.id}`);
      await deleteDoc(docRef);

      dispatch(deleteNoteById(note!.id!));
    } catch (e) {
      console.log(e);
    }
  };
};
