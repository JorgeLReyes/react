# Router v6

`npm install react-router-dom@6`

BrowserRouter es un high order component, que significa que recibe otros componentes dentro de el y tienen acceso a la información que provee el padre.

Para iniciar un router debemos envolver el router dentro de este componente.

```jsx
import { BrowserRouter } from "react-router-dom";
<BrowserRouter>
  <App />
</BrowserRouter>;
```

- BrowserRouter: Es el proveedor que envuelve toda la aplicación y permite usar el enrutador.
- Routes: Agrupa todas las rutas definidas con Route. Si divides rutas en varios archivos, cada archivo necesita un Routes.
- Route : Define una ruta específica y el componente que debe

```jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}
```

Si divides las rutas en otro archivo, necesitas otro Routes:

```jsx
import { Routes, Route } from "react-router-dom";

export default function MoreRoutes() {
  return (
    <Routes>
      <Route path="/contact" element={<Contact />} />
      <Route path="/services" element={<Services />} />
    </Routes>
  );
}
export default function App() {
  return (
<BrowserRouter>
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/about" element={<About />} />
    <Route path="/*" element={<MoreRoutes />} />
  </Routes>
  ;
</BrowserRouter>);
}
```

## Redirecciones

Usaremos el componente <Navigate> de la libreria react dom.

- Primero crearemos una nueva ruta con x nombre
- En su atributo element le pasaremos el componente <Navigate>
- Al componente navigate le pasaremos el atributo `to` que es a la ruta a la que redirigirá el roouter

```jsx
<Route path="/" element={<Navigate to="/login" />} />
```

## NavLinks

Funcionan visualmente como los elementos <a> de HTML pero en base al router, lo cual permite que no se recarge la pagina.

- Reciben la propiedad `to` que hace referencia al path de la pagina hacia donde "redirigiran"
- En su className pueden recibir una funcion que recibe como parámetro isActive el cual es un valor booleano que ayuda para saber si aplica o no una clase cuando nos encontremos en la ruta del path hacia donde este dirige. Sin embargo si tenemos una clase llamada active por defecto tomará esta clase

```jsx
<NavLink className="someClass" to="/marvel">
  Link
</NavLink>

// o
<NavLink
  className={({ isActive }) => `nav-item nav-link ${isActive ? "active2" : ""}`} to="/marvel">
  Link
</NavLink>
```

> Link actua de la misma manera pero sin detectar en que path nos encontramos

## Pasando una ruta a un componente con rutas

Si tenemos distribuidas las rutas para un mejor control de estas, y queremos pasar el control a ese <Routes> para que analice sus rutas, en el path de alguna de las rutas principales añadimos el path o expresion `/*` o `*` que practicamente indica cualquier ruta, si es que no coincide con alguna de las anteriores

```jsx
<Routes>
  <Route path="login" element={<LoginPage />} />
  // Cualquier ruta que no sea anteriores a este despliegan el componente
  <Route path="/*" element={<HeroesRoutes />} />
</Routes>
```

El flujo es que entra al componente HeroesRoutes que contiene otro <Routes> y evalua sus rutas de este mismo, y si no coincide con ninguna solo renderiza lo que neste fuera de <Routes>

> Routes no puede tener hijos jsx o componentes que no sean especificamente <Route>

## Navigate push / replace

`useNavigate` es un customHook ya que no viene de la libreria o paquete de react

Este hook nos provee de un objeto con las siguientes propiedades (con ejemplos de valores).

```js
import { useNavigate } from "react-router-dom";
const navigate = useNavigate();
// retorna una funcion
navigate();
```

A la funcion que retorna `useNavigate` se le puede pasar como:

```js
navigate(to, options);
// to -> ruta a donde se quiere navegar
// options
navigate("/path");
navigate(-1);
navigate(+1);
navigate("?query=value");
navigate("#query=value");
```

- primer argumento
  - una cadena en forma de url
  - un objeto con las siguientes propiedes: pathname, search, hash
    - **pathname**: ruta relativa hacia donde se quiere navegar
      - Es importante decir que cuando le pasemos la propiedad de pathname siempre antepongamos al inicio de la ruta el `/` ya que si solo ponemos el pathname sin dicho caracter se le agregará ese valor a la ruta actual, es decir, no se "limpiará" la ruta desde el root del url
    - **search**: query params o parametros de busqueda (?param=value)
    - **hash**: parametros con hash (#param)
  - numero positivo o negativo para navegar en el historial
- segundo argumento: un objeto con las propiedades: replace, state, relative
  - replace(boolean): la entrada anterior al path actual se borra si esta propiedad esta en true, es decir, evita que el cliente regrese al historial anterior.
  - relative(boolean): Por defecto, la navegación es absoluta, pero puedes hacerla relativa si pasas relative: "path" como opción.
    - Si estás en /users, te lleva a /users/profile

## Argumentos por url

Para que se puedan mandar valores dinamicos en una ruta, al definirla debemos usar un "/:" y el nombre del argumento que va a recibir

```js
<Route path="hero/:heroId" element={<Component />} />
```

### useParams

Cuando se quiere recuperar un argumento o segmento por el url, usamos `useParams` que nos permitira recuperar los argumentos de la url en la que nos encontramos en ese momento y solo si el componente que lo tiene se está renderizando

```jsx
import { useParams } from "react-router-dom";

const HeroPage = () => {
  const heroPage = useParams();
};
```

En el caso anterior nos daria el siguiente valor

```js
{*: 'hero/dc-batman',
heroId: 'dc-batman'}
```

Donde:

- \*: nos aparece como parámetro ya que en la ruta principal existe algo como `/ruta/*` y cualquier valor que le prosiga será considerado un parámetro
- heroId: este es el nombre que le hemos dado al parámetro desde la ruta definida

useParams no detecta los query params, que son los parametros que se mandan despues de un `?`, solo obtenemos los segmentos del url que especificamos.

### Query Params

os query params se diferencian porque en la url todas los parametros anteceden de un `?`

#### useLocation

useLocation es un hook que permite obtener valores (que son strings) sobre la url, osea valores sobre la localización en donde nos encontramos. Estos valores son solo de lectura, por lo cual si los modificamos no pasará nada.

> query-string package permite parsear los parametros a objeto

```json
{
  "pathname": "/heroes/search",
  "search": "?q=batmna",
  "hash": "",
  "state": null,
  "key": "s6p0w706"
}
```

#### useSearchParams

useSearchParams() en React Router devuelve un array con dos elementos:

```js
const [searchParams, setSearchParams] = useSearchParams();
```

- searchParams → Es un objeto similar a URLSearchParams, que te permite acceder a los parámetros de la URL.
- setSearchParams → Es una función para actualizar los parámetros de búsqueda sin recargar la página. Recibe un objeto con los parámetros y sus valores

  `Complementar con encode si es necesario:`
  | Método | Codifica | Usar cuando |
  | ------------------ | ----------------------------------------------- | -------------------------------------------------------------------- |
  | encodeURI | Solo caracteres especiales (excepto /, ?, &, =) | Tienes una URL completa y quieres evitar que se rompa. |
  | encodeURIComponent | Todos los caracteres especiales | Quieres codificar solo valores dentro de una URL (ej. query params). |

## Rutas protegidas

Debemos usar el <Route> como high order component, que es un <Route> que recibe otras rutas <Route> como hijas

```jsx
<Routes>
  <Route path="invoices" element={<Invoices/>}>
    <Route path=":invoiceId" element={<Invoice/>}/>
    <Route path="sent" element={<SendInvoices/>}/>
  <Route>
</Route>
```

### Outlet Component

Es el que haria la representacion de las rutas que recibe un Route y que se usará dentro del componente que se renderiza con el path del <Route> padre

```jsx
<Routes>
  <Route path="invoices" element={<Invoices/>}>
    <Route path=":invoiceId" element={<Invoice/>}/> // Parte del outlet
    <Route path="sent" element={<SendInvoices/>}/> // Parte del outlet
  <Route>
</Route>

```

Y el componente se veria asi

```jsx
function Invoices() {
  return (
    <div>
      <h1>Invoices</h1>
      <Outlet />
    </div>
  );
}
```

Aunque podriamos hacerlo de la siguiente manera.

Hacemos que la ruta que queremos hacer privada sea renderizada condicionalmente dentro de un componente que es el que dará o no acceso a que se renderize el componente que contiene la ruta protegida

```jsx

// Ruta publica
<Route path="/heroes/*" element={<HeroesRoutes />} />

// Ruta privada con el componente protegido
<Route path="/heroes/*" element={<PrivateRoute><HeroesRoutes /></PrivateRoute>}/>
```

Y asi quedaria el componente privado.

```jsx
const PrivateRoute = ({ children }: { children: ReactNode }) => {
  const logged = true;
  return logged ? children : <Navigate to="/login" />;
};
```

> Cuando HeroesRoutes se renderiza dentro de PrivateRoute, React Router detecta que es un componente que contiene más <Route> y vuelve a evaluar sus rutas internas.

`Con outlet` quedaria de la siguiente manera:

```jsx
<Route path="/heroes/*" element={<HeroesRoutes />}>
  <Route path="marvel" element={<MarvelPage />} />
  <Route path="dc" element={<DCPage />} />
  <Route path="search" element={<SearchPage />} />
  <Route path="hero/:id" element={<HeroPage />} />
  {/* <Route path="hero/:heroId" element={} /> */}
  <Route index element={<Navigate to="/heroes/marvel" />} />
</Route>
```

```jsx
const HeroesRoutes = () => {
  return (
    <>
      <Navbar />
      <div className="container">
        <Outlet />
      </div>
    </>
  );
};
```

> No se pede poner un <Route> como hijo directo de un Componente. Un <Route> solo puede ser usado como un hijo de un elemento <Routes>, nunca se debe renderizar de manera directa.

```js
<Route
  path="/login"
  element={
    <PublicRoute>
      // ❌ Debe estar entre un Routes
      <Route path="/" element={<Login />} />
    </PublicRoute>
  }
/>
```

## createBrowserRouter

Primero empezaremos importando `createBrowserRouter` y `RouterProvider`

- `createBrowserRouter` es una funcion que recibe como argumento un array de objetos de rutas, con dos principales propiedades: path y element

```js
import { createBrowserRouter } from "react-router-dom";
const router = createBrowserRouter([
  {
    path: "/",
    element: <div>Hello world!</div>,
  },
]);
```

Ahora necesitaremos en este caso un provider, que es practicamente como el BrowserRouter pero este componente proveedor recibe como propiedad un router que es el que creamos con `createBrowserRouter`

```js
import { RouterProvider } from "react-router-dom";

export const MainRouter = () => {
  return <RouterProvider router={router} />;
};
```

### createRoutesFromElements

Configurar rutas con JSX. Puedes hacerlo con createRoutesFromElements. No hay ninguna diferencia funcional entre JSX u objetos al configurar tus rutas, es simplemente una preferencia de estilo.

```jsx
import {
  createRoutesFromElements,
  createBrowserRouter,
  Route,
} from "react-router-dom";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path="/"
      element={<Root />}
      loader={rootLoader}
      action={rootAction}
      errorElement={<ErrorPage />}
    >
      <Route errorElement={<ErrorPage />}>
        <Route index element={<Index />} />
        <Route
          path="contacts/:contactId"
          element={<Contact />}
          loader={contactLoader}
          action={contactAction}
        />
        <Route
          path="contacts/:contactId/edit"
          element={<EditContact />}
          loader={contactLoader}
          action={editAction}
        />
        <Route path="contacts/:contactId/destroy" action={destroyAction} />
      </Route>
    </Route>
  )
);
```

### Componente de página de error

Dentro del objeto de alguna ruta podemos usar una propiedad llamada errorElement que renderiza un elemento jsx o componente en caso de que la url padre o hijas de algun error

```jsx
const router = createBrowserRouter([
  {
    path: "/",
    element: <div>Hello world!</div>,
    errorElement: <ErrorPage />,
  },
]);
```

#### useRouteElement

Es un custom hook de react dom que permite capturar el error en caso de que la pagina o url cause un error, como por ejempo, que el path no se encuentre

- Si un errorElement está definido en una ruta, captura errores SOLO de esa ruta y sus hijos.
- Si una ruta no tiene errorElement, el de su padre más cercano lo maneja.
- Si el error ocurre en un loader o action, también se captura en errorElement.

```jsx
import { useRouteError } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError() as { statusText: string };
  // ...
  }
```

#### Error contextual

Ocurre cuando una ruta válida genera un error en su loader, action o en el propio componente. Se maneja con errorElement.

```jsx
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "dashboard",
        element: <Dashboard />,
        loader: async () => {
          throw new Error("Falló la carga de datos");
        },
        errorElement: <DashboardError />, // Captura errores solo en esta ruta
      },
    ],
  },
  { path: "*", element: <NotFound /> }, // Maneja URLs inexistentes
]);
```

- 📌 Si alguien entra a /random, verá NotFound porque esa ruta no existe.
- 📌 Si /dashboard tiene un fallo en su loader, solo se verá DashboardError, sin afectar toda la app.

### Rutas anidadas

Si queremos que una ruta este a nivel de la raiz de otra ruta simplemente creamos un nuevo objeto a ese nivel, pero si queremos que empiecen a compartir componentes como ciertos layouts debemos de empezarlos a envolver en un mismo nivel.

Aqui es donde usaremos la propiedad children

```js
const router = createBrowserRouter([
  {
    path: "/",
    element: <div>Hello world!</div>,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "login",
        element: <Contact />,
      },
    ],
  },
]);
```

#### Index route o ruta de indice

Es una ruta hija que en vez de tener un path tiene una propieadad llamada index en true y se renderiza cuando la ruta padre se renderice, es decir, si estamos en el root se renderizará en el root, si entra como hija de otra ruta, se renderizará cuando su padre se renderice.

- Si el padre es "/" el index es "/" y se renderizará cuando la ruta sea exactamente la del padre
- Si el padre es "/ruta" el index es "/ruta" y se renderizará cuando la ruta sea exactamente la del padre
- Si el padre es "/ruta" el index es "/ruta", pero si la url en ese momento es "/ruta/rutaHija", entonces no se renderizará.

El index: true permite que una ruta tenga un contenido por defecto sin interferir con las rutas hijas.

Sin un índice, si visitas la ruta padre, no se renderizaría nada dentro del <Outlet /> hasta que accedas a una subruta específica.

Con index: true, puedes definir qué se muestra por defecto en la ruta padre sin afectar el comportamiento de las demás rutas hijas.

### loader y useLoaderData

La propiedad loader recibe como valor una funcion que puede o no ser asrincrona y que el valor que retorna devuelve al componente de la ruta que se va a renderizar. Esta funcion se ejecutará antes de que el componente se renderize.

```js
import Root, { loader as rootLoader } from "./routes/root";

export async function loader() {
  const contacts = await getContacts();
  return { contacts };
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: rootLoader,
    children: [
      {
        path: "contacts",
        element: <Contact />,
      },
    ],
  },
]);
```

`useLoaderData` es un custom hook que permitirá obtener los valores que fueron proporcionados por el retorno de la funcion de loader.

```js
import { Outlet, Link, useLoaderData } from "react-router-dom";

export default function Root() {
  const { contacts } = useLoaderData();
}
```

### Segmentos o parámetros en la URL

Para hacer un ruta que recuba un parámetro dinámico usaremos `:`. Los dos puntos tienen un significado especial, ya que lo convierten en un "segmento dinámico". Los segmentos dinámicos coincidirán con los valores dinámicos (cambiantes) en esa posición de la URL. A estos valores de la URL los llamamos "Parámetros de URL" o, simplemente, "parámetros".

Si el componente que se renderizará con la ruta dinamica es hijo de otro y solo queremos que a la ruta padre se le añada este segmento dinamico, en el path del componente que recibe la url dinamica podemos unicamente poder `:<param>`

En el siguiente ejempo a la ruta dinamica le anteponemos otra ruta, entonces se navegaria hacia `/heroes/hero/:id` pero si omitimos "hero" podemos dejar unicamente `:id` y navegariamos hacia `/heroes/:id`

```jsx
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "heroes",
        element: (
          <PrivateRoute>
            <HeroesRoutes />
          </PrivateRoute>
        ),
        children: [
          {
            path: "hero/:id",
            element: <HeroPage />,
          },
        ],
      },
    ],
  },
]);
```

##### Params con loader

Los params `(:param)` se pasan al loader con claves que coinciden con el segmento dinámico. Por ejemplo, nuestro segmento tiene un nombre, :contactId por lo que el valor se pasará como params.contactId.

```jsx
import { Form, useLoaderData } from "react-router-dom";
import { getContact } from "../contacts";

export async function loader({ params }) {
  const contact = await getContact(params.contactId);
  return { contact };
}

// Component
export default function Contact() {
  const { contact } = useLoaderData();
  // existing code
}
```

```jsx
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: rootLoader,
    action: rootAction,
    children: [
      {
        path: "contacts/:contactId",
        element: <Contact />,
        loader: contactLoader,
      },
    ],
  },
]);
```

### Actions

Las acciones (action) en React Router permiten manejar la lógica de una solicitud HTTP que es enviada desde un formulario, como si fuera una función de tipo "submit", pero sin necesidad de recargar la página. Son útiles para manejar peticiones asíncronas, procesamiento de datos y redirección dentro de tu aplicación.

Una acción es una función que se ejecuta cuando se hace una solicitud POST desde un formulario, similar al comportamiento de un manejador tradicional de formularios. Su propósito es manejar la lógica detrás de los datos enviados en un formulario, ya sea para procesarlos, validarlos, o realizar otras operaciones como redirigir al usuario.

Para usar una acción en React Router, debes asociar la ruta con una función action. Esta función manejará las solicitudes HTTP que lleguen a la ruta, normalmente asociadas a un formulario que realiza una petición POST.

Cuando un formulario <Form> lanza un submit con el metodo post, la accion definida en esa ruta la capturará (si el formulario tiene definido una ruta en la accion, la accion de esa ruta la captuará, tenga en cuenta que el path es relativo a la ruta que nos encontramos si no se antepone un /). Uns vez recibida la funcion cuenta con dos parámetros:

- request: tiene una propiedad llamada formData, que es una funcion que retorna la data del formulario
- params: captura los segmetos dinámicos de la ruta como propieades

```jsx
export async function contactAction({ request, params }) {
  const formData = await request.formData();
  const updates = Object.fromEntries(formData);
  await updateContact(params.contactId, updates);
  return redirect(`/contacts/${params.contactId}`);
}
```

> redirect es una funcion de react-router que redirige a la ruta correspondiente

#### Usando el componente <Form> con action

El componente <Form> de React Router se puede utilizar tanto con la propiedad action (como un formulario tradicional HTML) como sin ella, utilizando la función action asociada a la ruta.

1. Cuando no defines action en el <Form>:

- Si no defines la propiedad action, React Router usará la función action asociada a la ruta correspondiente para manejar la solicitud POST.
- Si no hay función action asociada, el formulario se comportará como un formulario HTML tradicional, haciendo una solicitud al action especificado o a la URL de la ruta.

```jsx
<Form method="post">
  <input type="text" name="name" />
  <button type="submit">Submit</button>
</Form>
```

2. Cuando defines action en el <Form>:

- Si defines la propiedad action en el formulario, se enviará la solicitud POST a la URL especificada en action.
- Si hay una función action en esa ruta, React Router interceptará la solicitud y la manejará de manera asincrónica.

```jsx
<Form method="post" action="/submit">
  <input type="text" name="name" />
  <button type="submit">Submit</button>
</Form>
```

Para definir un action en las rutas lo hacemos de la siguiente manera:

```jsx
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: rootLoader,
    action: rootAction,
    children: [
      {
        path: "contacts/:contactId",
        element: <Contact />,
        action: contactAction,
        loader: contactLoader,
      },
    ],
  },
]);
```

#### Comportamiento de useActionData() en React Router

Cuando se usa useActionData() con Form en React Router, hay un comportamiento importante a tener en cuenta: React Router siempre limpia useActionData() al iniciar una nueva navegación con Form. Esto sucede para evitar que los datos de una acción previa persistan incorrectamente en una nueva solicitud.

`¿Cómo funciona?`

1. Al enviar el formulario con Form, useActionData() se reinicia a undefined inmediatamente.
1. Luego, cuando la action del formulario se ejecuta y retorna datos, el componente se renderiza nuevamente con los nuevos datos.

`¿Por qué ocurre este comportamiento?`

- Garantiza que useActionData() solo contenga datos de la acción más reciente.
- Evita estados obsoletos al cambiar de navegación.
- Mantiene consistencia en la UI, asegurando que el usuario solo vea los datos correctos en cada nueva búsqueda o acción.

Este comportamiento es automático y no requiere configuración adicional. Si se necesita persistencia de datos entre navegaciones, se debe manejar con un estado global o en la URL (useSearchParams).

#### Capturando valores de retorno de action

Si decidimos que la funcion action no hará una redirección podemos hacer un return de los valores y en el componente usaremos useActionData() que retornará la data del action

### UseNavigation

useNavigation es un custom hook que permite saber como se encuentra la carga de contenido de elemento que renderiza la url, este maneja 3 estados que son:

- "idle"
- "submitting"
- "loading".

### useSubmit

```jsx
const submit = useSubmit();

<Form id="search-form" role="search">
  <input
    id="q"
    aria-label="Search contacts"
    placeholder="Search"
    type="search"
    name="q"
    defaultValue={q}
    onChange={(event) => {
      submit(event.currentTarget.form, {
        replace: !isFirstSearch,
      });
    }}
  />
  {/* existing code */}
</Form>;
```

Con submi, mientras escribe, el formulario se envía automáticamente.
En el argumento estamos pasando event.currentTarget.form. El currentTargetes el nodo DOM al que está asociado el evento y el currentTarget.formes el nodo de formulario principal de la entrada. La submitfunción serializará y enviará cualquier formulario que le pase.

- submit recibe como segundo argumento un objeto con una propiedad replace, que reemplaza los resultados de la búsqueda, ya que con cada envio se crea una nueva entrada en el hitorial

### useFetcher

useFetcher es un hook de React Router v6.4+ que te permite interactuar con rutas de forma asincrónica y cargar datos sin necesidad de navegar o cambiar la URL. Es útil para obtener datos o realizar acciones (como enviar formularios) sin hacer una redirección o recargar la página. Funciona como un "fetcher" de datos, manejando la carga de información y el estado de la solicitud.

Características clave:

- Carga de datos sin cambiar la URL: Puedes hacer peticiones HTTP (usualmente con GET, POST, etc.) sin cambiar la URL de la página.
- load(): Usado para hacer solicitudes a una URL y obtener datos.
- state: Puedes manejar el estado de la solicitud, como si está cargando, si hubo un error, o si la solicitud fue exitosa.
- Ideal para formularios y peticiones asíncronas: Se usa comúnmente para enviar datos a un servidor sin cambiar la URL o navegar a otra página.

```js
import { useFetcher } from "react-router-dom";

const MyComponent = () => {
  const fetcher = useFetcher();

  const handleLoadData = () => {
    fetcher.load("/api/data");
  };

  return (
    <div>
      <button onClick={handleLoadData}>Load Data</button>
      {fetcher.state === "loading" && <p>Loading...</p>}
      {fetcher.data && <p>{fetcher.data}</p>}
    </div>
  );
};
```

- useFetcher te permite cargar y manejar datos sin redirigir o cambiar la URL.
- Ideal para obtener datos de forma asíncrona, como peticiones a APIs o enviar formularios.

### Otros componentes de router dom

#### Form

El Form nos permite usar un formulario de manera muy similar a el formulario de HTML pero con la diferencia que no recarga la página al ser enviado, es decir, podemos dispensar de hacer un metodo que capture el evento. Ademas este <Form> es que este usa los actions por defecto

En un <Form>, los nombres de los inputs (name="q") actúan directamente como los parámetros en la URL.

```jsx
<Form method="get">
  <input type="text" name="q" />
  <button>Search</button>
</Form>

// Output
// /ruta-actual?q=valor
```

# Router v7

Todos los componentes y funciones se toman de react-router (no de react-router-dom)

Versión mas actual:
`npm i react-router`

- `Routes`: Definición de las rutas
- `Route`: La ruta
- `Outlet`: Sirve para renderizar rutas hijas dentro de rutas padre

## Formas de definir la ruta

`Con path`:

```js
<Route element={<AuthLayout />} path="/ruta"></Route>
```

`Con index`:

Cuando queremos que una ruta sea la principal ya sea del Router o de un padre, es decir, cuando ocurre anidación de rutas y deseamos que una de estas tambien haga match con la ruta padre, usaremos index, haciendola la ruta por defecto

```js
<Route element={<AuthLayout />} index></Route>
```

## Outlet

Las rutas absolutas no son permitidas dentro de las rutas anidadas.

- Se puede resolver anteponiendo la ruta padre

```js
import { Outlet } from "react-router";

// ❌Esto esta mal
<Route path="/auth" element={<AuthLayout />}>
  <Route path="/login" element={<h1>Hi</h1>} />
</Route>



<Route path="/auth" element={<AuthLayout />}>
  <Route path="/auth/login" element={<h1>Hi</h1>} />
</Route>;
```

## React Router (v7) como framework

```bash
npx create-react-router@latest my-react-router-app
```

### Routing y Route Module (Explicación teórica)

#### Routing

`Forma de implementar el sistema de rutas`

Podemos crear un archivo de rutas como:

```js
export default [index("routes/home.tsx")] satisfies RouteConfig;
```

Pero también se puede trabajar como "file system routing" con un paquete creado por los mismos creadores de React Router

`Funciones`

Hay funciones al momento de trabajar con rutas como las siguientes:

- index: nos sirve para definir la ruta y componente que se mostrará en la ruta padre, conocido como un "route module"
- route: sirve para definir rutas junto con el componente que renderizá
- layout: nos permite crear "nester router", que servira para que los hijos route compartan el diseño que este en ese layout
- ...prefix: añade un prefijo a cada una de las rutas
- splats: comodin que permite que una ruta "atrape" una ruta en especifico que haga match con esta. Por ejemplo `ruta/*`

#### Route Module

Permite al framework conectar y componenter a las rutas con muchas acciones, loaders, etc.

Cuando se crea un componente para una ruta recibe:

- loaderData: producto de la funcion loader
  - serverLoader (loader): se ejecuta solo del lado del servidor, solo le llega el producto de la funcion al cliente, y se ejecuta o puede ejecutarse en el pre-rendering
  - clienteLoader: se ejecuta del lado del cliente y se puede llamar el server loader
- actionData:producto de la funcion action
  - serverActions: accion ejecutada del parte del servidor e invalida rutas cuando ya estan generadas para no re-generarla
  - clientActions: acciones del parte del cliente
- params: un obeto con los parametros
- matches: urls que hacen match con la ruta en la que nos encontramos

```js
import type { Route } from "./+types/route-name";

export default function MyRouteComponent({
  loaderData,
  actionData,
  params,
  matches,
}: Route.ComponentProps) {
  return (
    <div>
      <h1>Welcome to My Route with Props!</h1>
      <p>Loader Data: {JSON.stringify(loaderData)}</p>
      <p>Action Data: {JSON.stringify(actionData)}</p>
      <p>Route Parameters: {JSON.stringify(params)}</p>
      <p>Matched Routes: {JSON.stringify(matches)}</p>
    </div>
  );
}
```

## Creación de layouts y componentes

Para cualquier componente o layout creado es necesario que se exporte por defecto ya que al definir su path en la ruta a la que se asignará buscará una exportación por default o defecto

## Creación de rutas

Todas las rutas que definamos van a ir en el array que acabemos exportando por default

`Index`

El index será la ruta que se desea mostrar cuando estemos en una ruta como / (root) o como ruta padre a partir de una segmentacion como /ruta (root de ruta)

```js
import {type RouteConfig, index} from "@react-router/dev/routes";


export default [index("routes/home.tsx")] satisfies RouteConfig;
```

`Route`

Es una funcion que recibe el nombre de la ruta y el path del componente a renderizar

```js
import {route} from "@react-router/dev/routes";

route("ruta", "path/relative/to/componente.tsx"),
```

`Layout`

Es una función que recibe:

- primer parametro el path relativo en donde se encuentra el archivo de layout
- segundo paramtro un array con todas las rutas hijas

```js
import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  // Home
  index("routes/home.tsx"),

  // Auth
  layout("./layouts/auth-layout.tsx", [
    route("login", "routes/auth/login-page.tsx"),
  ]),
] satisfies RouteConfig;
```

Conforme lo anterior hay puntos que mencionar:

- Cuando usamos un layout como en el ejemplo y definimos rutas, al ingresar a esa ruta lo haremos directamente como la nombramos, por ejemplo, en este caso seria `/login`
- El layout internamente en el componente debemos usar <Outlet/> que permite renderizar las rutas hijas

`Prefix`

Permite enmarcar un grupo de rutas para que compartan un prefijo. En pocas palabras, si tenemos rutas que compartan un prefijo como segmento podemos usar prefix

Como parametros recibe

- Primer parametro el prefijo que compartiran las rutas
- Segundo parametro las rutas o layout con sus rutas

```js
...prefix("auth", [
  layout("./layouts/auth-layout.tsx", [
    route("login", "routes/auth/login-page.tsx"),
    route("register", "routes/auth/register-page.tsx"),
  ]),
]),
```

Cabe destacar que el prefix debe aplicarse usando el operador spread (...), ya que retorna un arreglo de rutas modificadas, y necesitamos esparcirlas dentro del arreglo principal de rutas. Retorna una serie de elementos que iran a la exportación de las rutas

## Route Module - loader function

[Loader - Documentación](https://reactrouter.com/start/framework/route-module#loader)

Esta función debe ir dentro de un archivo de Route Module que es un componente que se renderiza directamente en una ruta, inclusive los layouts lo son.

```js
export async function loader() {
  return { message: "Hello, world!" };
}
```

Esta funcion loader solo se dispara del lado del servidor. Cabe mencionar que la función debe de llamarse explicitamente "loader".

### Metodos y Propiedades que los route modules (Using props)

#### Loader, ClientLoader y LoaderData

- `loader:` Es una funcion que se llama del lado del servidor y se le retorna la data al route module
- `loaderData`: Recibe los datos que se retornaron desde la funcion loader

```js
export async function loader() {
  const clients = await getClients();
  return { clients };
}

// El tipado Route.ComponentProps se "importa" del mismo archivo donde nos encontramos (es autogenerado por react router) para obtener el tipado correcto de, en este caso, la data retornada por loader
const ChatLayout = ({ loaderData }: Route.ComponentProps) => {};
```

> El loader del layout se ejecuta cada vez que se monta una ruta dentro de ese layout, a menos que se optimice manualmente

- `clientLoader:` es una funcion para obtener data que solo se dispara del lado del cliente

```js
export async function clientLoader({ serverLoader }) {
  return {
    message: "Hello, world! from testing page client loader",
  };
}

export default function MyRouteComponent({ loaderData }) {
  return <>{loaderData}</>;
}
```

Con loader y clientLoader

Cuando usamos loader y clientLoader juntos en una ruta:

- El loader se ejecuta en el servidor (durante la renderización inicial o cuando se recarga la página) y su función principal es obtener datos para la ruta.
- El clientLoader se ejecuta en el cliente (por ejemplo, al hacer navegación interna con React Router sin recargar la página).

Si usamos loader y clientLoader juntos, el componente recibirá en su prop loaderData la información que retorna clientLoader, no directamente la del loader.

El clientLoader recibe un objeto con propiedades, entre ellas serverLoader, que es una función que al invocarla devuelve una promesa con los datos que originalmente entrega el loader. Esto permite que clientLoader pueda acceder o reutilizar esa data del servidor si lo necesita.

Como serverLoader es una función que devuelve una promesa, es necesario usar await para obtener los datos cuando se llama dentro del clientLoader.

```js
export async function loader() {
  return { message: "Hello, world! from testing page server loader" };
}

export async function clientLoader({ serverLoader }: Route.ClientLoaderArgs) {
  return { message: "Hello, world! from testing page client loader" };
}

export default function MyRouteComponent({
  loaderData,
}: Route.ComponentProps) {}
```

#### Meta, Headers y Links

- `meta`: permite definir metadata

En el root de la aplicación veremos el siguiente codigo

```js
export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
```

Cuando usemos la funcion meta en un route module o layout, en el componente <Meta> es donde se insertará esa metadata. Esta funcion debe exportarse con el nombre "meta". Se llama automaticamente cunado la aplicación cree ese route module o haya un pre-rendering

- `headers`: definen los encabezados http que se enviarán con la respuesta

```js
export function headers() {
  return {
    "X-Stretchy-Pants": "its for fun",
    "Cache-Control": "max-age=300, s-maxage=3600",
  };
}
```

- `links`: definen exactamente los links como lo hace la etiqueta link de html en el head

```js
export function links() {
  return [
    {
      rel: "icon",
      href: "/favicon.png",
      type: "image/png",
    },
    {
      rel: "stylesheet",
      href: "https://example.com/some/styles.css",
    },
    {
      rel: "preload",
      href: "/images/banner.jpg",
      as: "image",
    },
  ];
}
```

- `HydrateFallback`: sirve cuando la aplicacion se pondra en un proceso de carga inicial de la página

```js
export async function clientLoader() {
  await sleep(1500);
  return { hola: "mundo" };
}

export function HydrateFallback() {
  return <p>Loading Page...</p>;
}
```

Si usamos loader mientras usamos Hydrate entonces este se desactiva, para volver a tener este comportamiento debemos explicitamente decirle al compoentne que se hidrate.

```js
clientLoader.hydrate = true as const;
```

Para solucionar el tema de cuando sucede una navegación del cliente, podemos usar NavLink y usar la propiedad isPending que nos da en su callback al usar claseName

```js
<NavLink
  to="/auth/testing-args"
  className={({ isPending }) => (isPending ? "text-red-500" : "text-blue-500")}
>
  Testing Args Page
</NavLink>
```

isPending se activa si la navegación no es instantánea, independientemente de si el retraso es por loader, clientLoader, lazy loading, o cualquier promesa pendiente asociada a la ruta.

#### Argumentos dinamicos

Sabemos que para hacer una ruta dinamica un segmento debe de verse como :param. En react router en vez de usar hooks como useParams, podemos usar la propiedad de params que reciben los route modules, y este los recibe como un objeto y el nombre de la propiedad es el nombre del segmento dinamico

```js
function TestingArgsPage({ params }: Route.ComponentProps) {
  const { id } = params;
}
```

`Parametros en el clientLoader`

Si necesitamos por alguna razon usar los paramtros en el cliente loader, en las props de este recibimos una llamada params

```js
export async function clientLoader({ params }: Route.ClientLoaderArgs) {
  const { id } = params;
  await sleep(1500);
  return { hola: "mundo" };
}
```

`Parametros en el loader`

Si necesitamos por alguna razon usar los paramtros en el server loader, en las props de este recibimos una llamada params. Lo unico que varia es el tipado para este caso

```js
export async function clientLoader({ params }: Route.LoaderArgs) {
  const { id } = params;
  await sleep(1500);
  return { hola: "mundo" };
}
```

`Action y clientAction`

- Action: Funcion que se llama del lado del servidor

Este recibe una propiedad llamada request que es donde le llega la data para poder extraerla

```js
export async function action({ request }) {
  const data = await request.formData();

  return { ok: true };
}
```

> La data retornada se verá reflejada en el actionData que recibe el componente

- ClientAction: Recibe el posteo y se ejecuta del lado del cliente

Recibe el serverAction como propiedad por si queremos usar el action del servidor, pero recibe tambien request que recibe la data asi como en action

```js
export async function clientAction({
  serverAction,
  request,
}: Route.ClientActionArgs) {
  const dataForm = await request.clone().formData();
  const data = await serverAction();
  return { dataForm: Object.fromEntries(dataForm), data };
}
```

> Cuando ya se lee el "body" o data de la request viene como un readablestream el cual se lee una unica vez, una vez utilizado ya no lo podemos usar como la primera vez

- Cuando no usas clientAction, el action del servidor se ejecuta automáticamente al enviar un formulario o realizar una petición HTTP que lo dispare (por ejemplo, un submit en una ruta que tiene definido un action).
- Al usar clientAction, el action del servidor no se ejecuta automáticamente. En este caso, el clientAction funciona como intermediario y debe llamar explícitamente al serverAction (o action) para que se ejecute y procese la solicitud.

Para usar los actions usaremos el componente Form que viene en react-router. Debemos definir:

- method en post
- action: ruta hacia donde enviará la acción, donde si no se define se mandará a la misma ruta en donde nos encontramos

```js
<Form method="post"></Form>
```

La diferencia entre usar en este caso el elemento form con el componente Form es que con el componente ya no se provoca el refresh del navegador, a pesar de que si se manda la información de ambas formas, usando el componente no hay refresh.

`Nota sobre el manejo del stream en Request entre cliente y servidor`

- Cuando desde el cliente llamas a serverAction(request) o haces un fetch(request), el stream del body comienza a transmitirse hacia el servidor.
- Esta transmisión "abre" el stream y lo bloquea para futuras lecturas en el cliente; por eso, después de hacer esa llamada, no puedes volver a leer el body original en el cliente sin haber hecho un request.clone() antes de enviarlo.
- En el servidor, el objeto Request recibido tiene un stream único y legible solo una vez; aunque no hayas leído el body aún, el stream ya no puede ser clonado para múltiples lecturas.
- Por eso, la única manera de preservar la posibilidad de leer el body varias veces (cliente y servidor) es clonar el Request en el cliente antes de enviarlo.
- Clonar en el servidor no es efectivo para este propósito porque el stream que llega ya es un recurso único y consumible una sola vez.

### createCookieSessionStorage

Esta funcion permite crear sesiones con cookies, y las funciones que retorna debemos llamarlas en un contexto de servidor, como un loader, action, serverAction, o alguna función llamada desde ellos.

```js
const { getSession, commitSession, destroySession } =
  createCookieSessionStorage<SessionData, SessionFlashData>({
    // a Cookie from `createCookie` or the CookieOptions to create one
    cookie: {
      name: "__session",

      // all of these are optional
      domain: "localhost",
      // Expires can also be set (although maxAge overrides it when used in combination).
      // Note that this method is NOT recommended as `new Date` creates only one date on each server deployment, not a dynamic date in the future!
      //
      // expires: new Date(Date.now() + 60_000),
      httpOnly: true,
      maxAge: 60 * 60 * 24,
      path: "/",
      sameSite: "lax",
      secrets: ["s3cret1"],
      secure: true,
    },
  });
```

- getSession permite obtener la sesión actual en caso de que exista, en caso de que no, regresa undefiend

```js
const session = await getSession(request.headers.get("Cookie"));
if (session.get("userId")) {
  return redirect("/chat");
}
```

- commitSession
- destroySession

`Funcion data`

Cuando queremos crear una sesion usaremos la funcion data, que crea respuestas que contienen el status y headers

```js
return data(
  { error: session.get("error") },
  {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  }
);
```

`Funcion sesion.flash`

session.flash("key", value)?
Guarda un dato temporal bajo esa clave (key).

Ese dato:

- Se guarda en la cookie como parte de la sesión.
- Se marca internamente como "flashable", es decir, desaparecerá después del siguiente commitSession().

- Cuando haces commitSession(session) y envías el Set-Cookie, se guarda esa sesión con el dato flash.
- En la siguiente petición, si lees la sesión y haces session.get("error"), obtienes ese valor flash.
- Pero después de que se lee ese dato flash en esa siguiente petición, el dato flash se borra automáticamente para no persistir más.

`useLoaderData`

Es un hook que permite acceder a loader mas cercano de los nodos superiores

```js
const some = useLoaderData<any>();
```

`shouldRevalidate`

Cuando usamos un <Form> el componente que usa el action se va a revalidar, lo cual es practicamente que se volvera a renderizar, esto lo podemos evitar si lo vemos necesario usando shouldRevalidate en false

```js
export function shouldRevalidate() {
  return false;
}
```

## Pre rendering

`react-router.config.ts`, si usamos true trabajara con ssr y si es false sera una SPA

```js
import type { Config } from "@react-router/dev/config";

export default {
  // Config options...
  // Server-side render by default, to enable SPA mode set this to `false`
  ssr: true,
} satisfies Config;
```

El prerendering nos ayuda a tener route modules con contenido estatico, es decir, se generaran cuando hagamos el build, pero a su vez pueden tener dinamismo.

La funcion prerender debe retorna un arreglo de string con las rutas que queremos hacerle prerendering

```js
import type { Config } from "@react-router/dev/config";

export default {
  // Config options...
  // Server-side render by default, to enable SPA mode set this to `false`
  ssr: true,
  async prerender() {
    return [];
  },
} satisfies Config;
```

Practicamente lo que sucede es que la página se crea antes de ser solicitada
