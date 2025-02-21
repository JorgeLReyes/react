# Redux

Redux es un **contenedor predecible del estado** de nuestra aplicación.

```bash
npm install @reduxjs/toolkit react-redux
```

- Redux es el patrón de gestión de estado que seguimos.
- React-Redux proporciona los componentes y hooks necesarios para integrar Redux con React.
- Redux Toolkit simplifica la configuración y permite escribir código "mutante" utilizando la librería Immer, que se encarga de generar un nuevo estado de forma inmutable.

## Store

El store centraliza la información que consumen los componentes dentro del árbol del proveedor.

> ⚠️ No todos los estados deben ir en el store.
> Solo aquellos que afectan a múltiples componentes o que deben mantenerse globales. Los estados locales pueden seguirse manejando con useState.

`Creación del Store`

Usamos la función `configureStore` de Redux Toolkit para crear el store.

```ts
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {},
});
```

> configureStore integra middlewares útiles por defecto como redux-thunk y habilita las DevTools.

`Proveer el store`

Para que React pueda acceder al store, utilizamos el componente <Provider> de `react-redux`.

- El <Provider> recibe el store creado y lo distribuye al árbol de componentes.

```jsx
import { store } from "./store";
import { Provider } from "react-redux";

<Provider store={store}>
  <App />
</Provider>;
```

## Slice

`createSlice` es una función que simplifica la creación de reducers y actions en Redux.

Cuando llamas a `createSlice`, la función devuelve un objeto que tiene al menos dos propiedades principales:

- actions: Un objeto con las acciones generadas automáticamente para los reducers que defines.
- reducer: La función reductora que maneja las actualizaciones del estado. Redux Toolkit toma el objeto reducers que defines y lo convierte en una única función reducer que maneja todas las acciones de ese slice.

Además, createSlice recibe algunas propiedades al ser invocada, que te explico ahora.

- name: El nombre es un identificador único para tu slice. Es usado internamente para generar los nombres de las acciones (aunque no lo uses directamente), pero más que nada ayuda a identificar a qué parte del estado pertenece ese slice.
- initialState: El estado inicial puede ser cualquier valor, no necesariamente un objeto. Puedes usar objetos, pero también pueden ser valores primitivos como cadenas, números o arreglos.
- reducers: Esta es la parte donde defines las acciones y sus correspondientes funciones reductoras (reducers). Un reducer es simplemente una función que toma el estado actual y una acción para retornar un nuevo estado. Aquí es donde defines cómo cambia el estado cuando se dispara una acción.

```js
import { createSlice } from "@reduxjs/toolkit";
export const counterSlice = createSlice({
  name: "counter",
  initialState: 0
  // o ,
  initialState: {counter: 0} ,
  reducers: {
    increment: (state) => {
      state.counter += 1;
      // o
      state += 1
    },
  },
});

// Exportamos las acciones para no exportar el objeto completo
// Son conocidas como Action create
export const { increment } = counterSlice.actions;
```

Un Action Creator es una función que devuelve una acción. Con Redux Toolkit, al usar createSlice, los action creators se generan automáticamente.

```js
export const { increment } = counterSlice.actions;
increment(); // 👉retorna { type: "counter/increment" }
```

⚠️ Importante:

- El increment del action creator NO es la misma función que escribiste en el objeto reducers.
- El action creator solo crea el objeto acción.
- El reducer generado por Redux Toolkit usa el type ("counter/increment") para saber a qué función del objeto reducers debe llamar.

Es decir, la funcion definida no es la misma que se abstrae de actions, ya que este es un generador de acciones, que le indica que reducer llamar si manda dicha funcion.

`Usar el slice`

Para conectar un slice al store:

1. Importa el slice creado.
2. En el objeto reducer de configureStore, asigna el slice a una propiedad.
   - El nombre de la propiedad será la clave con la que accederás al estado desde useSelector.
   - Usa .reducer para pasar solo la lógica del reducer al store.

Dentro del objeto reducer el store usaremos el slice como una propiedad, a la cual podemos darle otro nombre e igualarla al slice, que es como sera identificada para el store. Pero para poder usarlo debemos usar la propiedad reducer que se encuentra en el slice.

```js
import { configureStore } from "@reduxjs/toolkit";
import { counterSlice } from "./slices/counter/counter";

const store = configureStore({
  reducer: { counter: counterSlice.reducer }, // "counter" será la clave en el estado global
});
```

## Tipado del store en Redux

```js
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
```

1. RootState:
   Se utiliza para obtener el tipo del estado global de la aplicación. Usamos ReturnType<typeof store.getState> para obtener el tipo que devuelve getState(), es decir, el tipo completo del estado que Redux mantiene.

```js
export type RootState = ReturnType<typeof store.getState>;

// <typeof store.getState> obtiene la funcion de getState que sria algo como
const getState = () => ({
  counter: 0,
  // como objeto
   counter: { counter: 0},
});
// ReturnType obtiene el tipo que retorna esa funcion que será
{
  counter: 0,
}
// si el estado fuera un objeto se veria asi

{
  counter: { counter: 0},
}
```

2. AppDispatch:
   Se usa para obtener el tipo de la función dispatch del store. Es útil cuando necesitamos tipar correctamente las acciones que despachamos, garantizando que sean las correctas según los slices definidos.

Este tipo nos asegura que las acciones que pasemos a dispatch sean consistentes con las definidas en el store, evitando errores de tipo.

Las funciones de los reducers definidas en un slice están asociadas a una acción con un tipo específico que sigue el formato "name/reducerFunctionName". Este tipo es generado automáticamente por Redux Toolkit.

Por ejemplo, si creamos un slice llamado counterSlice con una función de reducer llamada increment, el tipo de la acción generada será "counter/increment", donde:

- counter es el valor que le dimos a la propiedad name del slice.
- increment es el nombre de la función de reducer.

Cuando utilizamos dispatch para enviar una acción, Redux Toolkit usa este tipo de acción para asegurarse de que la acción está correctamente tipada y asociada con el reducer adecuado.

Esto garantiza que solo se despachen acciones válidas que coincidan con las funciones de reducer definidas en el slice, lo que mejora la seguridad de tipos y la coherencia en la aplicación.

## UseSelector

UseSelector sirve para seleccionar información del state

```jsx
const count = useSelector((state: RootState) => state.counter.value);
```

Al usar useSelector en Redux, es mejor seleccionar solo la parte del estado que realmente necesitas en lugar de devolver el estado completo.

Razones para ser específico:

- Evita renders innecesarios: Si seleccionas todo el estado o un objeto grande, el componente se volverá a renderizar cada vez que cualquier parte del estado cambie.
- Optimiza el rendimiento: React solo re-renderiza cuando la parte seleccionada cambia.
- Mejora la inmutabilidad: Seleccionar propiedades específicas ayuda a que React detecte mejor los cambios.

`✅ Mejor práctica`

```js
const counter = useAppSelector((state) => state.counter.value);
```

🔹 Solo se renderiza cuando counter.value cambia.

`❌ Mala práctica`

```js
const counter = useAppSelector((state) => state.counter);
```

🔸 El componente se renderiza si cualquier propiedad de counter cambia, aunque no la uses.

Siempre selecciona lo más específico posible para mejorar el rendimiento de tu aplicación. 🚀

## UseDispatch

UseDispatch sirve para mandar a despachar las acciones

```jsx
const dispatch = useDispatch();
dispatch(action());
```

## Pasar argumentos al reducer

Las funciones definidas en reducer reciben 2 argumentos:

- state: el valor del estado actual
- action: un objeto con el tipo de accion y el payload

```js
// name: "counter"
incrementByNumber: (state, action) => {
  state.value += action.payload.value;
};
```

El objeto que se manda en el action se ve de la siguiente forma

```json
{
  "type": "counter/incrementByNumber",
  "payload": {
    "value": 3
  }
}
```

Donde el type redux lo manda implicitamente combinando el nombre del slice y el nombre de la funcion. El payload es lo que nosotros mandamos desde el dispatch.

Cuando usamos el dispatch en redux, unicamente nos tenemos que enfocar en mandar la funcion y dentro de esta el payload, es decir, cualquier valor que mandemos como argumento será el valor que se le asigne al payload.

Por ejemplo si nosotros mandamos el payload como un objeto:

```js
dispatch(incrementByNumber({ value: 3 }));
```

El payload se verá asi:

```json
  "payload": {
    "value": 3
  }
```

Si nosotros mandamos el payload como un primitivo:

```js
dispatch(incrementByNumber(3));
```

El payload se verá asi:

```json
  "payload": {
    "value": 3
  }
```

Entonces esto es importante ya que debemos de tener cuidado a la hora de como accederemos a este mismo desde la funcion reducer

### Tipar el payload

Tipar el payload nos ayudará a saber exactamente que valor se espera en el payload. Para hacerlo es muy sencillo, redux nos ofrece un tipo llamado `PayloadAction` que recibe un generico que será el tipo de valor esperado en el payload.

```js
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

incrementByNumber: (state, action: PayloadAction<number>) => {
   state.value += action.payload;
},
```

Asi que si en la funcion que se le pasa al dispatch recibe otro valor que no sea un numero en este caso, marcará un error

## Thunks: Asincronia con store

- Un thunk es una función que se usa para manejar lógica asíncrona (como peticiones HTTP) o lógica condicional antes de despachar acciones en Redux.
- Un thunk no es una acción; es una función que recibe el dispatch y, opcionalmente, el getState como argumentos.

```js
export const getPokemons = (page: number = 0) => {
  return (dispatch: AppDispatch, getState: RootState) => {
    dispatch(startLoadingPokemons());
  };
};
```

1. dispatch → Para despachar acciones o más thunks.
2. getState → Para obtener el estado actual del store.
3. extraArgument (opcional) → Puedes pasar argumentos extra (APIs, configs) si el middleware está configurado para eso.

### Flujo de trabajo de un Thunk

1. Llamada al thunk: Cuando haces dispatch(getPokemons()), Redux detecta que lo que pasas no es un objeto de acción común, sino una función (un thunk). Si estamos en ts debemos pasarle el tipado que abstraimos del `store.dispacth`

```js
const dispatch = useDispatch<AppDispatch>();
dispatch(getPokemons());
```

useDispatch devuelve una función que:

✅ Acepta un objeto acción (ej: { type: 'increment' }).
✅ O acepta una función thunk (ej: (dispatch) => { ... }).

Sin el tipado generico ts nos dará un error ya que espera que la funcion que le pasemos retorne un objeto y no una funcion

2. Middleware de Thunk: El middleware de thunk intercepta el thunk y lo ejecuta, pasando el dispatch del store como argumento a la función interna, permitiendo que puedas despachar acciones dentro del thunk.

3. La función interna: El thunk retorna una función que recibe el dispatch (y opcionalmente el getState). Esa función interna es donde puedes despachar más acciones y manejar lógica asíncrona.

4. Uso de dispatch dentro del thunk: Dentro del thunk, puedes usar el dispatch que se pasó como argumento para despachar otras acciones, como por ejemplo, dispatch(startLoadingPokemons()).

## RTK Query Overview

Si bien Redux Toolkit se usa comúnmente para manejar el estado de la aplicación, RTK Query se enfoca principalmente en simplificar las solicitudes de datos y la gestión de caché.

### ¿Qué es RTK Query?

RTK Query es un conjunto de utilidades para realizar peticiones a APIs de manera optimizada. No es necesario importarlo explícitamente, pero es importante mencionarlo para el bundle de tu aplicación.

Uno de los beneficios principales de RTK Query es que evita duplicados de datos en el caché, reutilizando los resultados de las peticiones ya realizadas.

### Configuración Básica

Para comenzar a usar RTK Query, definimos un api slice utilizando createApi. Este objeto actúa de manera similar a un slice de Redux, pero enfocado en la interacción con APIs y en la gestión de caché de las respuestas.

```jsx
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const todosApi = createApi({
  reducerPath: "todos", // Nombre único del reducer
  baseQuery: fetchBaseQuery({
    baseUrl: "https://miapi.com", // URL base para las peticiones
  }),
  endpoints: (builder) => ({
    // Definimos los endpoints (consultas y mutaciones)
    getTodos: builder.query({
      query: () => "/todos", // Define el endpoint para consultar datos
    }),
  }),
});
```

- reducerPath: Es el nombre del reducer donde se almacenarán los datos.
- baseQuery: Utiliza una función como `fetchBaseQuery` que facilita las peticiones HTTP, donde se configuran detalles como la URL base.
- endpoints: Es una función que recibe un `builder` para definir los endpoints disponibles, como consultas o mutaciones.

`fetchBaseQuery`

fetchBaseQuery es una función predeterminada proporcionada por RTK Query que se encarga de realizar las peticiones HTTP de manera sencilla. Esta función está configurada para manejar configuraciones básicas como la URL base, pero también permite configuraciones personalizadas.

Por ejemplo, si deseas crear tu propio custom base query, puedes hacerlo mediante una función que reciba tres argumentos: arg, api, y extraOptions. Estos argumentos permiten personalizar la petición según las necesidades de tu aplicación. Sin embargo, utilizar fetchBaseQuery es generalmente más conveniente, ya que ya maneja lo más común en las peticiones (como la serialización de las respuestas, configuración de headers, etc.).

`Builder`

El builder es un objeto que se pasa a la función endpoints dentro de createApi. Este objeto tiene métodos que nos permiten definir qué tipo de acción se realizará, ya sea una consulta (GET) o una mutación (POST, PUT, DELETE).

- builder.query: Se utiliza para definir peticiones de tipo GET que leen datos.
- builder.mutation: Se utiliza para definir peticiones de tipo POST, PUT o DELETE que modifican el estado del servidor.

### ¿Cómo funcionan las Queries y Mutations?

Cuando se define un endpoint, la función query o mutation es la que especifica cómo realizar la solicitud HTTP.

- query: En el caso de builder.query, la función query puede devolver simplemente un string con la URL o un objeto con detalles adicionales sobre la solicitud. O también puede devolver un objeto con más detalles de configuración como headers, params, etc.

```js
query: () => "/todos", // Ejemplo simple con solo la URL

query: () => ({
  url: "/todos",
  method: "GET", // Puede configurarse si se requiere
  headers: {
    "Authorization": "Bearer token"
  }
}),

```

La diferencia clave entre query y mutation radica en cómo se gestionan los datos después de la solicitud:

- query:
  - Las consultas almacenan los resultados en caché para evitar hacer solicitudes repetidas innecesarias. Si la misma consulta se realiza con los mismos parámetros, RTK Query devuelve los datos desde el caché en lugar de hacer una nueva solicitud.
  - Está diseñado para peticiones de solo lectura (GET), donde RTK Query puede almacenar los resultados en caché y optimizar las solicitudes subsiguientes.
- mutation:
  - Las mutaciones se utilizan para modificar datos en el servidor (como agregar, editar o eliminar recursos). Después de realizar una mutación, es común invalidar el caché relacionado, para asegurarse de que los datos mostrados en la interfaz estén actualizados.
  - Está diseñado para peticiones que alteran datos (POST, PUT, DELETE), donde generalmente se necesita invalidar o actualizar el caché para reflejar los cambios realizados en el servidor.

### Custom Hooks

Una vez que defines los endpoints usando createApi, RTK Query genera automáticamente custom hooks para cada uno de ellos. Estos hooks tienen el nombre del endpoint precedido por use y sufijos como Query o Mutation dependiendo de la acción.

Una vez que hayas configurado tu API con createApi y hayas definido los endpoints, RTK Query genera automáticamente hooks personalizados basados en los nombres de esos endpoints. Estos hooks tienen la forma use<EndpointName>Query o use<EndpointName>Mutation, dependiendo de si el endpoint es una consulta (query) o una mutación (mutation).

```jsx
export const { useGetTodosQuery } = todosApi;
```

## Asociarlo a store

1. Configurar el reducer en el Store: Para que el slice de RTK Query funcione correctamente, necesitas agregar el reducer en el configureStore. Esto es similar a agregar un slice de Redux tradicional, pero en el caso de RTK Query, usas el reducerPath como el nombre de la propiedad.

```js
const store = configureStore({
  reducer: {
    counter: counterSlice.reducer,
    pokemons: pokemonSlice.reducer,
    [todosApi.reducerPath]: todosApi.reducer, // Reducer de RTK Query (usando reducerPath como propiedad computada)
  },
});
```

El reducerPath de RTK Query es una clave única que ayuda a RTK Query a identificar su parte en el store y gestionar la caché y los estados relacionados con la API.

2. Usar reducerPath como clave dinámica: Al igual que en el ejemplo anterior, se utiliza [todosApi.reducerPath], que dinámicamente toma el nombre que definimos en el createApi (en este caso "todos"). Esto permite que el reducer de RTK Query se registre de manera única en el store, sin importar el nombre exacto.

Si decides cambiar la propiedad del reducer de [todosApi.reducerPath] a algo como "api", pero el reducerPath sigue siendo "todos" (como está definido en el createApi), efectivamente no funcionará correctamente.

- El reducerPath es un valor que RTK Query usa internamente para gestionar el estado y el caché. Este valor debe coincidir con el nombre de la propiedad que usas en el reducer de la configuración del store.

El reducerPath sigue siendo "todos" y RTK Query espera que el reducer se registre bajo esa propiedad en el store. Al poner "api", no se alinea con el valor esperado de "todos" que RTK Query usa internamente.

Si haces esto, RTK Query no podrá encontrar el estado asociado a la API y no funcionará correctamente. El middleware no sabría cómo gestionar los estados de la API y los resultados de la consulta, lo que podría causar errores de ejecución o no poder acceder a los datos correctamente.

### Configurar el Middleware de RTK Query

1. Por qué es necesario el Middleware: RTK Query usa un middleware para gestionar las solicitudes HTTP (en caché, optimización, etc.). Este middleware debe ser agregado explícitamente en la configuración del store.

2. Configuración del Middleware: El middleware se agrega a través de getDefaultMiddleware().concat(todosApi.middleware). Esto asegura que RTK Query pueda manejar correctamente las peticiones de la API, realizar caché y gestionar la expiración de las solicitudes.

Ejemplo:

```js
const store = configureStore({
  reducer: {
    counter: counterSlice.reducer,
    pokemons: pokemonSlice.reducer,
    [todosApi.reducerPath]: todosApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(todosApi.middleware),
});
```

- Explicación: getDefaultMiddleware() devuelve el conjunto de middleware predeterminado (que incluye Redux Thunk y otras configuraciones predeterminadas). Luego, usas .concat(todosApi.middleware) para añadir el middleware específico de RTK Query a este conjunto.

#### Propiedad middleware en el store

- La propiedad middleware en RTK Query se utiliza específicamente para agregar cualquier middleware adicional necesario, como el middleware de RTK Query para manejar las peticiones de la API.
- Si no usas getDefaultMiddleware().concat(todosApi.middleware), no se agregarán las funcionalidades relacionadas con las peticiones de API (caché, reintentos, etc.), lo que causaría errores en la gestión de solicitudes de la API.
- ¿Es necesario? Sí, es necesario cuando usas RTK Query. Si no lo incluyes, las operaciones de RTK Query no funcionarán correctamente y recibirás errores en la consola sobre la falta de middleware.

> El cache por defecto tiene 1 minuto de duracion
