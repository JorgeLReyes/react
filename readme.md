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
