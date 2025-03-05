`npm i react-big-calendar date-fn`

[Calendar web doc](https://jquense.github.io/react-big-calendar/examples/index.html?path=/docs/about-big-calendar--page)

```js
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { enUS } from "date-fns/locale/en-US";
import { format, parse, addHours, startOfWeek, getDay } from "date-fns";
import { Navbar } from "../components/Navbar";

const locales = { "en-US": enUS };

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const events = [
  {
    title: "Meeting",
    notes: "Reunion",
    start: new Date(),
    end: addHours(new Date(), 2),
    bgColor: "#fafafa",
    user: {
      id: "123",
      name: "Ingi",
    },
  },
];

export const CalendarPage = () => {
  return (
    <div>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: "calc(100vh - 80px)" }}
      />
    </div>
  );
};
```

`Calenario en español`

```js
const locales = { es: es };

export const getMessageEs = () => ({
  allDay: "Todo el día",
  previous: "<",
  next: ">",
  today: "Hoy",
  month: "Mes",
  week: "Semana",
  day: "Día",
  agenda: "Agenda",
  date: "Fecha",
  time: "Hora",
  event: "Evento",
  noEventsInRange: "No hay eventos en este rango",
  showMore: (total: number) => `+ Ver más (${total})`,
});

const eventStyleGetter = (
  event: Events,
  start: Date,
  end: Date,
  isSelected: boolean
) => {
  const style = {
    backgroundColor: "#347cf7",
    borderRadius: "0px",
    opacity: 0.8,
    border: "0",
    color: "white",
  };

  return {
    style,
  };
};

<Calendar
  localizer={localizer}
  events={events}
  startAccessor="start"
  endAccessor="end"
  style={{ height: "calc(100vh - 80px)" }}
  // Prop culture que buscará en locales
  culture="es"
  messages={getMessageEs()}
  eventPropGetter={eventStyleGetter}
  components={{
    event: CalendarEvent,
  }}
/>;
```

## Propieadades de `<Calendar>`

- events: Es un arreglo de objetos con los eventos que apareceran en el calendario de los cuales cada evento debe llevar como míimo las propiedades:
  - start: fecha donde inicia el evento
  - end: fecha donde finaliza el evento
- messages: objeto que setea los textos para que aparezcan como los definimos, este objeto tiene propiedes de las cuales su valor es el texto que se reemplazará en el calendario
- eventPropGetter: es una funcion que recibe como argumentos (los manda esta misma propiedad) event,start,end, isSelected y debe retornar un objeto que puede tener una propiedad llamada styles que setea la forma en que se ve el evento
- components: podemos sobreescribir los componentes que se muestran en el calendario, debemos ver la propiedadya que esta se asocia con el componente, se manda la referencia del componente pero no el componente como tal

## Eventos

Los eventos son propieades del mismo Calendar y cuando se active uno retorna el evento que se seleccionó, por lo cual el evento retorna las propiedades definidas en este mismo.
Tambien para el caso del evento onView este retorna en que seccion del calendario nos encontramos

```js
<Calendar onDoubleClickEvent={onDoubleClick} onSelectEvent={onSelect} />
```

- Algo importante es que si usamos el evento onView nos aseguremos de usar un estado, ya quee actualmente si usamos el evento y queremos cambiar entre ventanas, la funcion que asignemos al evento no aplicará una re-renderización como lo haria normalmente, asi que debemos usar un estado y a su vez la propiedad View de calendar, que setea la vista del calendario que puede ser mes, semana, dia o agenda.
- Tambien existe la propiedad defaultView que hace que el calendario carge es la vista seleccionada la primera vez que se renderize

`OnView, onNavigate, view, date`

Ahora es importante destacar dos eventos y dos propieades que manejan la parte de la vista y la forma en que se desplaza entre dia, mes, año o alguna fecha.

- `OnView y view`

La función onView nos permite conocer en qué sección del calendario nos encontramos, ya que recibe como parámetro el nombre de la vista seleccionada (por ejemplo, "month", "week", "day", etc.).

Esta función se relaciona directamente con la propiedad view, la cual le indica al calendario qué vista debe mostrar.

Si bien el calendario puede funcionar solo con onView, podría ocurrir que el cambio de vista no actualice correctamente el componente. Para evitar esto, usamos una variable de estado que almacene la vista actual. Luego, pasamos esta variable a la propiedad view, asegurando que cualquier cambio en la vista se refleje correctamente en la interfaz.

```jsx
const [view, setViewCurrently] = useState<View>(
    (localStorage.getItem("lastView") as View) || "week"
);

<Calendar
 defaultView="agenda"
 onView={onViewChange}
 view={view}
/>
```

- `onNavigate y date`

La función `onNavigate` se dispara cada vez que el usuario navega por el calendario utilizando los controles de navegación (como las flechas de "anterior" y "siguiente").

La función onNavigate recibe dos parámetros:

- newDate: La nueva fecha calculada en base a la acción de navegación (por ejemplo, avanzar o retroceder un mes, semana o día).
- view: La vista actual del calendario en el momento en que se hace la navegación. Puede ser month, week, day, entre otras.

onNavigate es responsable de actualizar el estado de la fecha para reflejar el cambio de vista. Esta función se ejecuta antes de que la vista se actualice, ya que es la encargada de calcular y pasar la nueva fecha, lo que permite que el calendario renderice la vista correcta de acuerdo con la fecha proporcionada.

La fecha calculada por onNavigate depende del tipo de vista (view). Si la vista es month, onNavigate calculará la nueva fecha para mostrar el siguiente mes o el mes anterior. Si es week, calculará la fecha para la semana siguiente o anterior, y si es day, calculará la fecha del día siguiente o anterior.

La propiedad `date` representa la fecha actual que se muestra en el calendario, dependiendo de la vista activa. Esta fecha se calcula en función de las acciones del usuario y se actualiza cada vez que se navega a una nueva sección o se cambia la vista.

date se usa para determinar qué fecha o periodo debe mostrarse en el calendario. Dependiendo del valor de date y del valor de view (que indica si estamos viendo un día, una semana o un mes), el calendario renderiza el contenido adecuado (como las celdas de los días, las semanas o los eventos de ese mes).

Cuando onNavigate se ejecuta, pasa una nueva fecha (newDate) que se actualiza como el nuevo valor de date. Esto indica al calendario que debe renderizar los eventos o la información correspondiente a la nueva fecha.

El valor de date depende también de view. Por ejemplo:

- Si la vista es month, date representa el primer día del mes que debe mostrarse.
- Si la vista es week, date representa el primer día de la semana.
- Si la vista es day, date representa el día específico que está seleccionado.

```jsx
const [view, setViewCurrently] = useState<View>(
    (localStorage.getItem("lastView") as View) || "week"
);

<Calendar
 defaultView="agenda"
 onView={onViewChange}
 view={view}
/>
```

> [Modal](https://www.npmjs.com/package/react-modal)

> [Date Picker](https://www.npmjs.com/package/react-datepicker)
