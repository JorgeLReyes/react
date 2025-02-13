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
