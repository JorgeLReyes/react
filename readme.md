# REACT FERNANDO HERRRERA

El codigo jsx es codigo javascript con codigo xml que es codigo declarativo

Importar react con babel

```html
<script
  crossorigin
  src="https://unpkg.com/react@16/umd/react.production.min.js"
></script>
<script
  crossorigin
  src="https://unpkg.com/react-dom@16/umd/react-dom.production.min.js"
></script>
<script src="https://unpkg.com/babel-standalone@6/babel.min.js"></script>

<script type="text/babel">
  const divRoot = document.querySelector("#root");
  const nombre = "Jorge";
  const h1Tag = <h1>Hola {nombre}</h1>;
  ReactDOM.render(h1Tag, divRoot);
</script>
```

- ReactDOM.render era un método más directo que simplemente tomaba el componente y el nodo del DOM.
- ReactDOM.createRoot en React 18 crea un "root" que gestiona el renderizado de los componentes, y es a través de este root que se hace la renderización (root.render).

```jsx
const App = () => {
  return <h1>Hola Mundo</h1>;
};

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);

```

## Babel

Permite usar caracteristicas actuales de js en cualquier navegador que soporten o no estas caracteristicas. React elimina babel con jsx pero con archivos js implicitamente si se usa babel

React elimina con el jsx elimina la necesidad de babel

## Exportaciones

```js
export { exportacion1 as default, exportacion2 };
```

## Promesas

```js
const promesa = new Promise((resolve, reject) => {
  // Los argumentos de resolve se los transfiere al then
  setTimeout(() => resolve(), 2000);
});
```

## Componentes

Pequeña pieza de código encapsulada reutilizable que puede tener estado o no. Todos los componentes van con PascalCamelCase

## JSX vs JS

En cuanto a extensiones de archivos ambas son iguales o indiferentes pero se aconseja que si regresa la funcion un jsx entonces usar su extension correspondiente

## Nodo Padre (Fragment)

```javascript
import { Fragment } from "react";

<Fragment></Fragment>
// o
<></>;
```

Todo componente debe retornar un solo nodo (Nodo padre) que envuelva o puede envolver un grupo de elementos xml

Fragmento es un agrupador de otros elemento de jsx.

## Variables

Para reemplazar dentro del html por una expresion de js que no sea un objeto se usan las llaves {}

```js
const App = () => {
  return (
    <>
      <h1>Hola Mundo {message}</h1>
    </>
  );
};
```

> Si un valor es constante y no tiene relación con el estado o hook es mejor que la variable este fuera del componente pero no afecta al scope global y no reprocesa o re-renderiza dicha variable. Los objetos no son permitidos como un hijo de un elemento jsx

> Una promesa es un objeto por lo cual no permite renderizar su producto dentro del return de la funcion

> Las funciones por igual si no tienen dependencia con algun hook o alguna variable entonces es mejor sacarla del componente ya que con cada re-renderizado reasigna el estado en memoria

## Estilos

Para usar estilos en react hay 3 formas:

- En linea

```javascript
import "./styles.css";
```

- Modulos

```javascript
<span
  style={{
    color: "red",
  }}
>
  -
</span>
```

- Importaciones de hojas de estilo, los estilos actuaran como propiedades al momento de importar la hoja

```javascript
import styles from "./styles.module.css";

 <h1 className={styles["bg-blue"]}><h1>
```

## Props (comunicación unidireccional)

Las props es un objeto que de manera implicita tienen todos los componentes de React y permite establecer un canal de comunicación entre el padre e hijo

- PropTypes

Se tiene que instalar el paquete llamado `PropTypes`. Para usar el tipado de propiedades usaremos la propiedad propTypes de los componentes y dentro de cada propiedad de este objeto usaremos el paquete de PropTypes. Este paquete no evita que la aplicación siga funcionando siempre y cuando se mande la propiedad.

Su función es exclusivamente para desarrollo y están diseñadas para ayudar a los desarrolladores a identificar errores en las props que se pasan a los componentes.

```js
// npm install --save prop-types - depende la version pueden venir instalada por defecto
import PropTypes from "prop-types";

App.propTypes = {
  title: PropTypes.string.isRequired,
};
```

- DefaulProps

En lugar de usar defaultProps, se recomienda utilizar parámetros predeterminados de JavaScript al definir las propiedades, ya que este será eliminado en versiones posteriores.

```javascript
App.defaultProps = {
  subtitle: "Subtitle",
};
```

## Eventos

Al pasarle el evento podemos acceder lo siguiente:

- e: es el SyntheticBaseEvent que es un evento especial de react que envuelve al evento original de js
- e.nativeEvent: retorna el evento original de js

Si a los anteriores le concatenamos la prop target devuelve el elemento que dispara el evento

```javascript
console.log(e);
console.log(e.nativeEvent);
console.log(e.target);
console.log(e.nativeEvent.target);
```

## Estados

- useState

Se re-erenderiza el componente con cualquier cambio al estado pero el estado se mantiene

```js
const [valueState, setValueState] = useState < type > initialValue;

setCounter((valorActual) => valorActual + 1);
```

Cuando cambia el estado el componente se vuelve a ejecutar pero el valor del estado se mantiene porque React lo gestiona internamente entre render

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
