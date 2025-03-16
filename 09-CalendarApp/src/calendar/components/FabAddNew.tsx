import { useCalendarStore, useUiStore } from "../../hooks";

export const FabAddNew = () => {
  const { onOpenModal } = useUiStore();
  const { onActiveEvent } = useCalendarStore();

  const handleModal = () => {
    onActiveEvent({
      title: "",
      notes: "",
      start: new Date(),
      end: new Date(),
    });
    onOpenModal();
  };

  return (
    <button className="btn btn-primary fab" onClick={handleModal}>
      <i className="fas fa-plus"></i>
    </button>
  );
};
