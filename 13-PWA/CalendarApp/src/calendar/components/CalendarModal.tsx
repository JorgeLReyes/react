import { ChangeEvent, FormEvent, useEffect, useMemo, useState } from "react";
import Modal from "react-modal";
import DatePicker, { registerLocale } from "react-datepicker";
import "./Modal.css";
import { addHours, differenceInDays, startOfDay, endOfDay } from "date-fns";
import { Event } from "../../types";
import "react-datepicker/dist/react-datepicker.css";
import { es } from "date-fns/locale/es";
import { useCalendarStore, useUiStore } from "../../hooks";
registerLocale("es", es);

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

Modal.setAppElement("#root");
export const CalendarModal = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const { isDateModalOpen, onCloseModal } = useUiStore();
  const { activeEvent, startSavingEvent } = useCalendarStore();
  const [form, setForm] = useState<Omit<Event, "_id">>({
    title: "",
    notes: "",
    start: new Date(),
    end: addHours(new Date(), 0.5),
  });

  useEffect(() => {
    if (activeEvent) {
      setForm({
        title: activeEvent.title,
        notes: activeEvent.notes,
        start: new Date(activeEvent.start),
        end: new Date(activeEvent.end),
      });
    }
  }, [activeEvent]);

  useEffect(() => {
    if (form.start.getTime() >= form.end.getTime()) {
      setForm((prev) => ({ ...prev, end: addHours(form.start, 0.5) }));
    }
  }, [form.start, form.end]);

  const minMaxDates = useMemo(
    () => ({
      minStart: startOfDay(new Date()),
      // maxStart: addDays(new Date().setHours(23, 59, 59, 0), 0),
      maxStart: endOfDay(new Date()),
      minEnd:
        differenceInDays(form.end, form.start) <= 0
          ? addHours(form.start, 0.5)
          : startOfDay(new Date()),
      maxEnd: endOfDay(new Date()),
    }),
    [form.start, form.end]
  );

  const titleClass = useMemo(() => {
    if (!formSubmitted) return;
    return form.title!.length <= 0 ? "is-invalid" : "";
  }, [form.title, formSubmitted]);

  const onInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const setDate = (name: string, date: Date) =>
    setForm((prev) => ({ ...prev, [name]: date }));

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormSubmitted(true);
    if (!form.title) return;

    await startSavingEvent({
      ...form,
      id: activeEvent?.id,
    });
    setFormSubmitted(false);
    onCloseModal();
  };

  return (
    <>
      <Modal
        isOpen={isDateModalOpen}
        onRequestClose={onCloseModal}
        style={customStyles}
        className={"modal"}
        overlayClassName={"modal-fondo"}
        closeTimeoutMS={200}
      >
        <h1> Nuevo evento </h1>
        <hr />
        <form className="container" onSubmit={onSubmit}>
          <div className="form-group mb-2">
            <label>Fecha y hora inicio</label>
            {/* <input
              className="form-control"
              placeholder="Fecha inicio"
              type="date"
            /> */}
            <DatePicker
              className="form-control"
              minDate={new Date()}
              minTime={minMaxDates.minStart}
              maxTime={minMaxDates.maxStart}
              selected={form.start}
              showTimeSelect
              onChange={(date) => setDate("start", date!)}
              dateFormat={"Pp"}
              locale="es"
              timeCaption="Hora"
            />
          </div>

          <div className="form-group mb-2">
            <label>Fecha y hora fin</label>
            <DatePicker
              minDate={form.start}
              minTime={minMaxDates.minEnd}
              maxTime={minMaxDates.maxEnd}
              className="form-control"
              selected={form.end}
              showTimeSelect
              onChange={(date) => setDate("end", date!)}
              dateFormat={"Pp"}
              locale="es"
              timeCaption="Hora"
            />
          </div>

          <hr />
          <div className="form-group mb-2">
            <label>Titulo y notas</label>
            <input
              type="text"
              className={`form-control ${titleClass}`}
              placeholder="Título del evento"
              name="title"
              autoComplete="off"
              value={form.title}
              onChange={onInputChange}
            />
            <small id="emailHelp" className="form-text text-muted">
              Una descripción corta
            </small>
          </div>

          <div className="form-group mb-2">
            <textarea
              className="form-control"
              placeholder="Notas"
              rows={5}
              name="notes"
              style={{
                resize: "none",
              }}
              value={form.notes}
              onChange={onInputChange}
            ></textarea>
            <small id="emailHelp" className="form-text text-muted">
              Información adicional
            </small>
          </div>

          <button type="submit" className="btn btn-outline-primary btn-block">
            <i className="far fa-save"></i>
            <span> Guardar</span>
          </button>
        </form>
      </Modal>
    </>
  );
};
