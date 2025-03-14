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

> npm i jest @types/jest jest-environment-jsdom @testing-library/react ts-jest -D

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

📌`waitFor`

La función `waitFor` es una **promesa** que recibe un **callback** y espera hasta que la condición definida en él se cumpla. También acepta un segundo argumento opcional, un **objeto de configuración**, que puede incluir la propiedad `timeout`, la cual define el tiempo máximo de espera antes de que la prueba falle.

> Existe una funcion llamada `waitFor` (espera por) que es una promesa y recibe un callback que debe retornar un valor booleano y como segundo valor recibe un objeto que puede recibir una propiedad llamada timeout que indica el tiempo que tiene para que la condicion de la funcion de callback se cumpla

- ¿Cómo funciona `waitFor`?
  - `waitFor` ejecuta repetidamente la función de callback hasta que la condición se cumpla o el tiempo de espera expire.
  - Si el elemento o valor esperado no está disponible de inmediato, `waitFor` sigue intentando hasta encontrarlo.
  - Si después del tiempo especificado la condición no se cumple, la prueba fallará.

El siguiente código prueba la actualización del estado de un contador, esperando que su valor aumente tras llamar a `increment`. Sin embargo, hay un detalle importante:

```js
test("El contador debe aumentar en 1 - waitFor", async () => {
  const { result } = renderHook(() => useCounter(100));
  const { counter, increment } = result.current;

  increment(); // Se llama a la función para incrementar el contador

  await waitFor(() => {
    expect(counter).toBe(101); // Esperamos que el contador haya cambiado
  });
});
```

🔍 Peculiaridad en este código

El valor de counter fue extraído en el momento en que se ejecutó renderHook. Dado que los valores primitivos en JavaScript son inmutables y no reaccionan a cambios en el estado, counter dentro del waitFor sigue siendo el mismo valor inicial. Sin embargo, en algunos casos el valor podría cambiar, pero esto no es seguro y depende de cómo Jest maneje la ejecución de las pruebas.

- Ese valor de counter es un primitivo y no se actualizará aunque el estado del hook cambie.
- Sin embargo, en la prueba con waitFor, el callback se ejecuta varias veces hasta que la condición se cumpla. Dependiendo de cómo Jest maneja el ciclo de ejecución, podría darse el caso en el que counter se actualice accidentalmente si en ese momento se está reevaluando result.current, pero esto no es fiable.
- Por eso lo correcto es hacer la aserción sobre result.current.counter, ya que este siempre reflejará el estado más reciente.

A pesar de que increment() actualiza el estado del hook, la variable counter dentro del expect no se actualizará automáticamente. En su lugar, deberíamos referenciar result.current.counter, que siempre reflejará el estado más reciente:

```js
test("El contador debe aumentar en 1 - waitFor (corregido)", async () => {
  const { result } = renderHook(() => useCounter(100));
  const { increment } = result.current;

  act(() => {
    increment();
  });

  await waitFor(() => {
    expect(result.current.counter).toBe(101); // Ahora se accede al valor actualizado
  });
});
```

📌`act`

> Act espera a que react actualice y re-renderice el estado para continuar con las pruebas

- act es una función de React Testing Library que asegura que todas las actualizaciones de estado y efectos se completen antes de que realices las aserciones.
- Sincrónicamente garantiza que todas las actualizaciones de estado y el renderizado de React se hayan completado antes de continuar. Esto es cierto tanto para las actualizaciones de estado sincrónicas como asincrónicas.
- Cuando se envuelven operaciones asincrónicas dentro de act, como promesas o setTimeout, act espera hasta que la operación asincrónica haya terminado y React haya procesado el cambio de estado, actualizando el componente.
- Por tanto, act asegura que el estado se haya actualizado y que el renderizado de React se haya completado antes de proceder con las aserciones, sin necesidad de esperar explícitamente con waitFor.

🛑 `<valorExtraido de result.current>` es una variable primitiva o no primitiva, pero el hook siempre se encargará de devolver tanto objetos como valores "nuevos".
A lo que se quiere llegar es que regularmente en un hook siempre se retornara un objeto u array los cuales apuntan a referencia y esta referencia siempre cambiará al ser retornados.
Result es un objeto que jamás cambiará jamas cambia su referencia y aunque se pudiera pensar que current tampoco, es todo lo contrario ya que como el es el que recibe el valor del hook, lo mas seguro es que el hook retorne un nuevo objeto, por lo cual current nunca tendrá la misma referencia.

```js
test("counter debe aumentar en 1 - act", () => {
  const { result } = renderHook(() => useCounter(100));
  const { increment } = result.current;
  act(() => {
    increment();
    increment(2);
  });
  expect(result.current.counter).toBe(103);
});
```

🥊`waitFor vs act`

| **Función** | **¿Qué hace?**                                                                                                                                                                                                      | **¿Cuándo usarla?**                                                                                                                                       |
| ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `act`       | Agrupa actualizaciones de estado y asegura que React procese los cambios antes de continuar con la prueba. Se usa tanto para actualizaciones síncronas como asíncronas, pero **no espera** que una promesa termine. | Cuando necesitas que React re-renderice el componente antes de hacer aserciones. En actualizaciones asíncronas, se combina con `waitFor` si es necesario. |
| `waitFor`   | Reintenta ejecutar un callback varias veces hasta que la condición se cumpla o se agote el tiempo de espera.                                                                                                        | Cuando esperas que el estado o el DOM se actualicen de forma asíncrona y necesitas asegurarte de que el cambio haya ocurrido.                             |

#### renderHook con providers

Cuando se prueba un hook que depende del contexto (como Redux), se debe usar el segundo argumento de renderHook para envolverlo en un Provider:

```jsx
const { result } = renderHook(() => useUiStore(), {
  wrapper: ({ children }) => <Provider store={store}>{children}</Provider>,
});
```

- El wrapper debe incluir {children}, ya que representa el componente interno donde se ejecuta el hook.
- Si se omite {children}, el Provider no renderizará nada y el hook no tendrá acceso al contexto de Redux, lo que provocará errores.

#### Probar con un context

Cuando usamos un componente con useContext debemos indicarle de donde obtendrá su contexto porque para el test no existe, asi que usaremos el provider del context y le pasaremos los valores que deseamos que el compontente hijo tenga

```js
test("debe mostrar el componente sin el usuario", () => {
  render(
    <UserContext.Provider
      value={{
        user: {
          name: "jorge",
          email: "jorge@gmail.com",
          id: 1,
        },
      }}
    >
      <HomePage />
    </UserContext.Provider>
  );
  screen.debug();
});
```

#### Metodos de jest

- toContain: Se usa para verificar si un valor específico (por ejemplo, un número, una cadena, o un objeto) está presente dentro de un arreglo o iterable. Para objetos, comparará las referencias de memoria, no el contenido
- toContainEqual: se espera que en una lista de elementos el valor proporcionado en esta funcion se encuentre en esta lista, En los objetos compara los valores de forma profunda, es decir, compara las propiedades de los objetos, no las referencias.
- toEqual: compara el contenido de los objetos de forma recursiva. Esto significa que verifica si los valores y propiedades de los objetos son iguales, aunque no sean exactamente el mismo objeto en memoria.
- toStrictEqual: verifica la estructura interna de los objetos y asegura que las propiedades de los objetos sean del tipo correcto (en lugar de solo comparar el valor).

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

##### Mocks a hooks

Para poder mockear un hook, debemos hacer un mook parcial ya que comunmente los hooks viene en un paquete con mas hooks. En este caso veremos como mockear un hook de react-router-dom

Para ello haremos un mook sobre la libreria de react-router-dom, para ello el primer parámetro le pasaremos el path o nombre de la libreria.

Como segundo parámetro jest.mock recibe un callback, que en este caso, retorna para este caso un objeto que seran los modulos o hooks. Asi que si queremos mockear un hook debemos de llamar la propiedad tal cual se llama el hook, pero si solo le pasamos el nombre del hook que queremos usar, todos los demas hooks "ya no existen", por lo cual al usarlo en otros test no encontrarian el hook.

> La función dentro de jest.mock se ejecuta en el momento en que se evalúa el módulo, es decir, antes de que los tests comiencen a ejecutarse.

Para que esos hooks se mantengan con su implementacion usaremos jest.requeriActual, que es una funcion que indica que usa lo que exporta la libreria que se le pase como argumento y eso mismo es lo que retorna en forma de objeto que es como comunmente hacen los modulos, es decir, obtiene el módulo original para no perder funciones

```jsx
jest.mock("react-router-dom", () => ({
  // exparse todo lo que viene en la libreria
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));
```

Si no establecieramos el `useNavigate` para ser mockeado desde el principio Jest ya ha reemplazado el módulo entero cuando se mockea.
Por lo tanto, si no se define `useNavigate` en el mock desde el inicio, no se puede mockear después porque el módulo ya fue sobrescrito y, no necesitas mockear la implementación real ya que esta se mantiene disponible y puedes usarla sin problemas.

> Si haces un jest.mock de un paquete y dejas que requireActual pase todas las implementaciones reales, no podrás mockear una función específica de ese módulo después.

#### Router

```js
import { MemoryRouter } from "react-router-dom";
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

> Si solo quieres espiar sin cambiar la implementación → jest.spyOn()
>
> Si quieres espiar y además mockear, usa jest.spyOn().mockImplementation()
>
> Por ultimo hacemos spy.mockRestore para recuperear la implementacion en caso de haberla cambiado

### Pruebas con router

#### MemoryRouter

El MemoryRouter se importa de react-router-dom y permite tener ciertas caracteriticas que el mismo BrowserRouter(v6).

- MemoryRouter es un tipo de router en React Router que mantiene la navegación en memoria en lugar de usar la URL del navegador.
- Tiene una propiedad llamada initialEntries que recibe un arreglo de rutas que son las rutas que estaran disponibles para esa prueba

##### Routes explicito e implicito

1. Sin Routes ni Route:
   En React Router v6, cuando usas MemoryRouter con initialEntries, React Router maneja la ruta automáticamente y renderiza el componente correspondiente basado en la URL proporcionada en initialEntries, sin necesidad de definir explícitamente las rutas.

```jsx
<MemoryRouter initialEntries={["/login"]}>
  <PublicRoute>{children}</PublicRoute>
</MemoryRouter>
```

React Router automáticamente hace coincidir la ruta (/login) con el componente (PublicRoute), sin la necesidad de especificar rutas explícitas mediante Routes o Route.

Esta forma es útil para pruebas simples cuando solo tienes una ruta que necesitas simular o cuando no tienes un conjunto complejo de rutas que gestionar.

2. Con Routes y Route:
   Si tienes múltiples rutas y necesitas un control más detallado sobre qué componente se renderiza para cada ruta, debes usar Routes y Route. Aquí defines explícitamente las rutas y los componentes que se deben renderizar para cada una.

```jsx
<MemoryRouter initialEntries={["/login"]}>
  <Routes>
    <Route path="login" element={<PublicRoute>{children}</PublicRoute>} />
    <Route path="heroes" element={<h1>Marvel route</h1>} />
  </Routes>
</MemoryRouter>
```

- Sin Routes y Route: React Router maneja la ruta automáticamente si se pasa a initialEntries.
- Con Routes y Route: Debes definir explícitamente las rutas y los componentes asociados.

> Para evaluar el localstorage usamos el objeto Storage.prototype y mockeamos con jest la funcion que necesiamos estar espiando (Storage.prototype.setItem = jest.fn())

### Pruebas con redux

Para evaluar los slices del store o reducers podemos retonar el mismo slice que nos regresará el objeto que hemos construido. Es decir, podemos obtener propiedades como actions, reducer, name, etc.

` Evaluar el estado`

Podemos evaluar el estado de dos formas, con la funcion getInicialState que nos retorna el estado desde el store

```js
expect(authSlice.getInitialState()).toEqual(initialState);
```

O simular el estado con la funcion `slice.reducer` que nos da el mismo slice, que es la función que maneja las actualizaciones del estado en tu Redux slice. Es responsable de procesar las acciones y actualizar el estado en función del type de la acción.

Esta se usa principalmente para testear o simular cómo se comporta un reducer con un estado dado y una acción específica, sin interactuar directamente con la store de Redux.

> Llamar a slice.reducer no afecta la store global de Redux, solo calcula un nuevo estado basándose en la acción. Para modificar el estado global debes usar dispatch.

El slice.reducer en Redux recibe dos parámetros:

- state: El estado actual que se está gestionando. Si es la primera vez que se ejecuta el reducer, este será el estado inicial que hayas definido. En otros casos, será el estado que haya sido actualizado por acciones anteriores.
- action: Un objeto que generalmente tiene al menos dos propiedades:

```js
const state = authSlice.reducer(initialState, {
  type: "",
}); // el objeto mandado es una accion
expect(state).toEqual(initialState);
```

#### Thunks

Para probar un thunks podemos hacer un mock de un dispatch y llamaos al action creators para saber como fue llamado ese dispatch

```js
const dispacth = jest.fn();
checkingAuthentication()(dispacth as AppDispatch);
expect(dispacth).toHaveBeenCalledWith(checkingCredentials());
expect(dispacth).toHaveBeenCalledWith({ type: "auth/checkingCredentials" });
```

> Si estamos con firebase lo mejor es trabajar con el modulo de "firebase/firestore sin la version lite"

> MockResolveValue para promesas
> MockReturnValue para funciones normales

### Variables de entorno

Actualmente no se puede usar el paquete import.meta.env\[var]

Por lo cual una forma ideal seria definiendo una funcion que retorne las variables de entorno pero a su vez desde el test pueda ser mockeada.

Primero definimos la funcion:

```js
export const getEnviroments = () => {
  const ENVS = import.meta.env;

  return { ...ENVS };
};
```

Es importante destacar que no hacemos el spread del `import.meta.env` en el return ya que puede ser que retorne un objeto vacio. Podría haber un problema porque import.meta.env no siempre está disponible en tiempo de ejecución en todos los entornos.

Ahora usaremos el archivo jest.setup.ts que es un archivo que se ejecuta antes de iniciar todos los test, esto gracias a que lo difnimos en la propiedad `setupFiles` del config de jest. Esto lo que hace es ejecutar todo lo que hay y usarlo en cada prueba si es necesario

Posterior a eso usaremos un paquete llamado `dotenv`

```js
import { config } from "dotenv";
import { jest } from "@jest/globals";

config({
  path: ".env.test",
});

jest.mock("./src/helpers/getEnviroments", () => ({
  getEnviroments: () => ({ ...process.env }),
}));
```

Aqui configuraremos el archivo, si es que querermos usar las varibales de test, si no, podemos omitir dicha configuracion.

Posteriormente ahora si realizamos el mock y aqui es donde, como jest corre mediante node, podemos usar process y asi obtener las variables de entorno

#### PreloadState

En tests con Redux, preloadedState es útil para establecer un estado inicial específico y evitar dependencias en el estado por defecto de los reducers.

`¿Cuándo usarlo?`

- Para simular estados específicos, como un usuario autenticado o no autenticado.
- Para evitar la influencia del estado inicial del reducer en las pruebas.
- Para testear componentes con un estado predefinido sin necesidad de ejecutar acciones previas.

> Notas:
> Cuando usas jest.mock() sin una implementación personalizada, el objeto exportado se mantiene como un objeto, pero todas sus propiedades (sean funciones o valores) se convierten en funciones simuladas (jest.fn()), incluso si esas propiedades originalmente no eran funciones.
