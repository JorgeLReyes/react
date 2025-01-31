## Pruebas unitarias y de integración

- Unitarias: enfocadas en pequeñas funcionalidades
- Integración: enfocadas en cómo reaccionan varias piezas en conjunto

### AAA

- Arrange: establecer el estado inicial (inicializar variables, importaciones)
- Act: Aplicamos acciones (llamar metodos o acciones)
- Assert: observar los resultados

### Paquetes

- Jest: Orientado para manejo a acerciones y mock
- [(React) Testing Library](https://testing-library.com/): Orientado para manejo del DOM virtual con React

### Pruebas con componentes

Primero configuramenos el archivo jest.config.ts, para esto en su propiedad `testEnviroment` le daremos el siguiente valor `jest-environment-jsdom` y este paquete lo debemos de instalar (de preferencia como dependencia de desarrollo)

Posteriormente si estamos trabajando con typescript debemos añadir el tipo de compilador que usará y en dado caso como debe resolver ciertos modulos

```json
{
  "files": [],
  "references": [
    { "path": "./tsconfig.app.json" },
    { "path": "./tsconfig.node.json" }
  ],
  "compilerOptions": {
    "jsx": "react-jsx",
    "esModuleInterop": true
  }
}
```

#### Render

Ahora una vez en el test usaremos la funcion render, que es una funcion que renderiza un componente en memoria. Debemos de importarlo de testing library

```js
import { render } from "@testing-library/react";
render(Component);
```

Cuando usamos render de React Testing Library más de una vez en la misma prueba, todos los componentes que renders inician comparten el mismo DOM virtual.

Render retorna ciertas propiedades como:

- container: similar a un DOM, es un nodo que contiene funciones de un elemento html en js
- getByText: obtiene un nodo por un texto, es decir el texto debe de encontrarse en un elemento dentro del componente
- getAllByText: obtiene un arreglo de los nodos por un texto, es decir el texto debe de encontrarse en uno o varios elementos dentro del componente
- getByTestId: buscar por dat-attribute

```js
import { render } from "@testing-library/react";
const {container, getByText} = render(Component);
expect(container):toMatchSnapshot()
```

El toMatchSnapshot crea una carpeta llamada snapshot a nivel del archivo de la prueba que se ejecuta en ese momento. Lo que hace es tomar una "fotografia" del componente y compara el snapshot con lo que retorna el componente actualizado y si difiere a prueba no pasa, ayudando a que el componente no cambie de manera accidental. Para actualizarlo pulsamos la tecla "u"

#### Screen

React testing library tiene un objeto llamado `screen` que nos ayuda a realizar limpiezas automaticas. Screen es o son los componentes renderizados.Es una representación global del DOM virtual que se utiliza para interactuar con los elementos renderizados.

El objeto screen actúa como una API global para consultar y depurar el contenido del DOM virtual. Por ejemplo:

> Screen es la representación del DOM actual de la prueba, lo que significa que contiene todo lo que se ha renderizado durante la ejecución de la prueba en curso.

Maneja metodos similares a render para la busqueda de elementos del dom mediante las pruebas. Es decir no tiene un metodo como container pero si otros metodos que ayudan a obtener los elementos html.

- `screen.debug()`: mostrará el HTML combinado de los componentes como si estuvieran en el mismo documento.

- `screen.get[All]ByRole()`: Permite buscar elementos en el DOM renderizado según su "rol", que es una categorización basada en las características de accesibilidad de los elementos HTML. Por ejemplo, los encabezados (<h1>, <h2>, etc.) tienen el rol de heading. Esto facilita encontrar elementos de manera más semántica y accesible. Además, acepta un segundo argumento, un objeto con propiedades que permiten filtrar aún más los elementos, como el texto que contienen, etiquetas aria, o niveles específicos (por ejemplo, level para headings).

```js
// Encuentra un heading de nivel 1 con texto "Hola Mundo"
const heading = screen.get[All]ByRole("heading", { name: "Hola Mundo", level: 1 });
expect(heading).toBeInTheDocument();
```

> si dentro de un elemento le asignamos un arial-label, la propiedad name del objeto recibido en byRole buscará el nombre por este arial-label (name, id, etc no modifican el valor de name que por defecto lo toma por el texto contenido en el elemento)

#### fireEvent

Dispara eventos dentro del componente, se le pasa como parametro al evento elegido el elemento al que se quiere hacer click

```js
import { fireEvent, render, screen } from "@testing-library/react";

test("should be click for reset, other methods", () => {
  render(<Counter value={value} />);
  fireEvent.click(screen.getByRole("button", { name: "btn-reset" }));
});
```
