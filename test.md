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

> Al obtener un elemento podemos suar metodos como get, set con sus propiedades

- Los metodos con get de screen retorna errores en caso de no existir el elemento, si solo queremos saber si existe o no sin que retorne un error que provoque una excepcion usaos query en vez de get

```js
// Encuentra un heading de nivel 1 con texto "Hola Mundo"
const heading = screen.get[All]ByRole("heading", { name: "Hola Mundo", level: 1 });
expect(heading).toBeInTheDocument();
```

> si dentro de un elemento le asignamos un arial-label, la propiedad name del objeto recibido en byRole buscará el nombre por este arial-label (name, id, etc no modifican el valor de name que por defecto lo toma por el texto contenido en el elemento)

#### fireEvent

Dispara eventos dentro del componente, se le pasa como parametro al evento elegido el elemento al que se quiere hacer click, y como segundo argumento (opcional) un objeto con opciones de acuerdo al evento seleccionado.

```js
import { fireEvent, render, screen } from "@testing-library/react";

test("should be click for reset, other methods", () => {
  render(<Counter value={value} />);
  fireEvent.click(screen.getByRole("button", { name: "btn-reset" }));
});
```

`Evento change`

Cuando se dispara un evento con fireEvent el valor mandado es el evento con las propiedades correspondientes, sin embargo, podemos modificar el valor mandado en el evento que se encuentra en `event.target.value`

```js
fireEvent.input(input, {
  // son las opciones del evento, es decir, event.[props]
  target: {
    value: "Demon slayer",
  },
});
```

#### customHooks

Los hooks no pueden ser usados en funciones que no son componentes o "functional component" ya que requieren el ciclo de vida de los componentes de react.

Para resolver este problema usaremos `renderHook` el cual recibe un callback en donde llamamos el custom hook

```js
renderHook(() => useFetchGifs("Shinobu"));
```

El render hook retorna varias propiedades como

- result: Representa el valor de retorno del hook en su estado actual.
- rerender: Permite volver a ejecutar el hook con nuevos parámetros.
- unmount: Desmonta el hook, simulando que el componente deja de existir.

El result tiene o retorna un objeto con una propiedad llamada current en donde viene el resultado del custom hook

1. Cuando ejecutas renderHook(() => useFetchGifs("Shinobu")), el hook se monta en un entorno controlado por react-testing-library.

2. Cuando el estado del hook cambia, React automáticamente re-renderiza el hook en el entorno de prueba.

3. result.current se actualiza automáticamente con el nuevo estado del hook, sin que tú tengas que hacer una reasignación manual.

Existe una funcion llamada `waitFor` (espera por) que es una promesa y recibe un callback que debe retornar un valor booleano y como segundo valor recibe un objeto que puede recibir una propiedad llamada timeout que indica el tiempo que tiene para que la condicion de la funcion de callback se cumpla

`waitFor` es una función de React Testing Library que espera de manera asíncrona hasta que una condición se cumpla.

- `waitFor` ejecuta la función de callback varias veces hasta que la condición se cumpla o el tiempo de espera expire.
- Si el texto no está disponible de inmediato, sigue intentando hasta que lo encuentre.
- Si después de un tiempo el elemento aún no aparece, la prueba falla.

#### Metodos de jest

- toContainEqual: se espera que en una lista de elementos el valor proporcionado en esta funcion se encuentre en esta lista, En los objetos compara los valores de forma profunda, es decir, compara las propiedades de los objetos, no las referencias.
- toContain:Compara el valor exactamente (por referencia en objetos o por valor en primitivos).

#### Mocks jest

`Jest functions (jest.fn())`: es un mock o una funcion mock que es una simulacion de una funcion que permite "espiar" sobre lo que sucede en esta misma

```jsx
const onAddCategory = jest.fn(() => true);
// Cuantas veces fue llamada
expect(onAddCategory).toHaveBeenCalledTimes(1);
// Con que argumentos fue llamada
expect(onAddCategory).toHaveBeenCalledWith(inputValue);
```

`Mockear un hook`

Usaremos la funcion jest.mock que recibe como parametro un url o path de un modulo que es del que hara el mock.

Una vez hecho el mock del componente debemos establecerle su retorno ya que al hacer el mock practicamente la funcion queda en blanco y necesitamos implementarlo. El componente mockeado automaticamente obtiene funciones de jest para los mocks

```js
useMook["mockReturnValue"](ReturnValue);
// otra forma para que ts no de error de tipado
(useFetchGifs as jest.Mock).mockReturnValue(ReturnValue);
```

Jest reastrea el archivo con la ruta absoluta para saber hacia donde apunta el archivo y cuando lea el componente saber si hay algun archivo al que debe hacer mock

`Mockear un componente`
Cuando mockeamos módulos o componentes en Jest, el comportamiento depende de cómo los exportamos en el archivo original. Existen dos casos principales: export default y export named.

1. Mockeando un componente con export default: Si el archivo exporta un componente por defecto (export default), el mock debe usar la clave default. Esto es porque default es el nombre de la exportación por defecto que se encuentra en el archivo.

Ejemplo:

```jsx
const GifGrid = () => <div>GifGrid</div>;
export default GifGrid;

// En el test
jest.mock("../src/components/GifGrid", () => ({
  default: jest.fn().mockReturnValue(<div>Mocked GifGrid</div>),
}));
```

2. Mockeando un componente con export const o exportaciones nombradas: Si el componente es exportado con un nombre específico (export const GifGrid), entonces el mock debe usar ese nombre en lugar de default.

Ejemplo:

```jsx
export const GifGrid = () => <div>GifGrid</div>;

// En el test
jest.mock("../src/components/GifGrid", () => ({
  GifGrid: jest.fn().mockReturnValue(<div>Mocked GifGrid</div>),
}));
```

#### Resolucion a problemas con importaciones css

Cuando importamos archivos como .css jest no sabe como resolverlos, ya que intentará interpretar archivos con extensiones ajenas a .js como código JavaScript, pero fallará porque no son archivos JS.

`moduleNameMapper` es una opción de configuración en Jest que permite reemplazar o redirigir módulos cuando se importan en los archivos de prueba. Sirve para mapear módulos a otros módulos o mocks. Esto es útil cuando Jest no puede interpretar ciertos archivos, como CSS, imágenes o paquetes específicos.

`identity-obj-proxy` devolverá un objeto con los nombres de las clases CSS como strings.

Ejemplo:

- Si tienes un archivo styles.css así:

```css
.card {
  background-color: red;
  padding: 10px;
}
```

Y en tu código importas estilos:

```js
import styles from "./styles.css";
```

- Cuando Jest ejecuta los tests, en lugar de intentar interpretar CSS (lo que fallaría), identity-obj-proxy hace que styles sea un objeto de JavaScript como este:

```js
{
  card: "card",
  button: "button"
}

```
