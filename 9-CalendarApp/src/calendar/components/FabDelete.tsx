// import Swal from "sweetalert2";
import { useCalendarStore } from "../../hooks";

export const FabDelete = () => {
  const { startDeletingEvent, activeEvent } = useCalendarStore();

  if (!activeEvent) return null;

  const handleDelete = async () => {
    // const confirm = await Swal.fire({
    //   title: "¿Estas seguro?",
    //   text: `Eliminaras la nota ${activeEvent.title}`,
    //   icon: "warning",
    //   showCancelButton: true,
    //   confirmButtonColor: "#3085d6",
    //   cancelButtonColor: "#d33",
    //   confirmButtonText: "Yes, delete it!",
    // });

    // if (confirm.isConfirmed)
    startDeletingEvent();
  };

  return (
    <button className="btn btn-danger fab-danger" onClick={handleDelete}>
      <i className="fas fa-trash-alt"></i>
    </button>
  );
};
