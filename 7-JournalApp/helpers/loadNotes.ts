import { collection, getDocs } from "firebase/firestore/lite";
import { FirebaseBD } from "../src/firebase/init";
import { note } from "../src/store/journal";

export const loadNotes = async (uuid: string) => {
  if (!uuid) throw new Error("Uuid no existe");

  const collectionRef = collection(FirebaseBD, `${uuid}/journal/notes`);
  const docs = await getDocs(collectionRef);

  const notes: note[] = [];
  docs.forEach((doc) => {
    notes.push({ id: doc.id, ...(<note>doc.data()) });
  });

  return notes;
};
