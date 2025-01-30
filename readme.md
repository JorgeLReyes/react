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

Una forma de pasar propiedades a los hijos es de la siguiente manera

```jsx
images.map((img) => <GifItem key={img.id} title={img.title} />);
```

Pero tambien podemos pasarlas medianet destructuracion, es decir, esparcimos las "properties", todas las propiedades del img se esparcen en el contenedor hijo

```jsx
images.map((img) => <GifItem key={img.id} {...img} />);
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

## Hooks

> Los hooks no deben ser condicionales

### useState

Cada vez que el estado se modifica el componente se vuelve a renderizar

En useState se retorna el estado y una funcion que modifica el estado, esta funcion puede recibir un parametro pero de dos maneras distintas:

- El valor que se quiere añadir al estado
- Una callback que recibe como funcion el estado actual y retorna el nuevo estado para ser modificado

```js
setState([...state, "Value"]);
setState((state) => [...state, "Value"]);
```

`Batching y actualización de estado en React`

React mantiene un registro interno de los cambios a través de un sistema de colas de actualizaciones.

1. Registro Interno (Update Queue): Cuando llamas a setState, React no actualiza el estado inmediatamente. En su lugar, guarda la actualización en una cola de actualizaciones (update queue), que es una estructura interna.
2. Evaluación al final del ciclo:Después de que el ciclo de ejecución de la función se completa, React evalúa todas las actualizaciones en la cola. Es aquí donde se resuelven los efectos del batching: las actualizaciones se aplican todas juntas, y React calcula el estado final basado en las actualizaciones de la cola.
3. Estado Interno:React también tiene su propio estado interno (en el "fiber", que es su unidad de trabajo), que le permite saber cuál es el estado actual de la aplicación después de aplicar todos los cambios.

- Sin función de actualización (setCategories([...state, "valor"])): React toma una "foto" del estado en el momento de la llamada. Si se llaman varias veces, puede sobrescribir el estado anterior.
- Con función de actualización (setCategories((state) => [...state, "valor"])): React evalúa el estado actualizado en cada llamada, usando el valor más reciente durante la ejecución en el batching.

Ejemplo:

```jsx
setCategories([...state, "1"]); // ["1"]
setCategories([...state, "2"]); // ["2"]
setCategories((state) => [...state, "3"]); // ["1", "3"]
```

> En react 17 o inferior se hacian n renderizaciones por cada cambio de estado, en react 18 o superior no se dispara la re-renderizacion hasta que a la funcion (hilo principal) termine.

### useEffect

Sirve para disparar efectos secundarios (procesos cuando algo suceda).

UseEffect recibe dos parametros:

- El efecto a disparar (callback)
- Lista de dependencias que son las condiciones por las que se desean ejecutar el callback y es opcional
  - Si el arreglo se deja vacio el hook solo se ejecuta al crear el componente
  - Si se le pasa una o mas dependencias se ejecutara unicamente cuando una de estas cambie
    > Es mala practica que useEffect sea asincrono ademas de que no puede ser asincrono ya que retorna una promesa y no una funcion como se espera.

### use(CustomHook)

- Debe de anteponerse la palabra "use"
- Es una funcion que retorna algo
- Los estados del hook son independientes del componente que lo llama, pero se reinician si el componente se desmonta.
- Cada vez que el componente se re-renderiza, el custom hook se vuelve a ejecutar, pero mantiene su estado si el componente no se desmontó.

Aunque el estado dentro del custom hook está aislado, el componente que invoca al hook sí es consciente de esos cambios de estado. La re-renderización del componente ocurre porque:

- React detecta que el valor de la propiedad que pasa el hook ha cambiado.
- Aunque el hook gestiona su propio estado, React vuelve a renderizar el componente cuando uno de los valores que devuelve el hook cambia, ya que esos valores son ahora parte del ciclo de vida del componente. Es decir, si el hook cambia images, eso afecta al componente que usa el hook.

El componente que usa el hook se "suscribe" indirectamente a esos cambios, y React vuelve a renderizar el componente, porque ese valor (el que devuelve el hook) ha cambiado.

El ciclo sería algo así:

1. El componente se renderiza por primera vez.
1. El hook se ejecuta dentro del componente, inicializando su estado (por ejemplo, con useState).
1. Si el hook realiza una actualización de estado (como setImages), React marca el componente como "necesitando ser renderizado nuevamente" porque el valor que se devuelve del hook (como images) ha cambiado.
1. El componente se vuelve a renderizar con los nuevos valores proporcionados por el hook.

- El custom hook gestiona su propio estado y es independiente dentro de su lógica.
- Sin embargo, el hook devuelve el estado que luego el componente usa, lo que provoca que React detecte cambios y vuelva a renderizar el componente si es necesario.
- Aunque el estado está aislado dentro del hook, cualquier cambio en el valor que el hook devuelve provoca la re-renderización del componente que usa ese hook.

## Notas

- La propiedad key es requerida por React cuando renderizas una lista de elementos repetitivos dentro de un componente, especialmente dentro de .map().
- Las keys solo tienen que ser únicas entre hermanos, pero podemos usarlas en diferentes arrays.
- Cuando usamos un key diferente en cada render, React considera que el componente es nuevo y no reutiliza el anterior, lo que provoca un unmount (desmontaje) y un mount (montaje) nuevamente.
- Si actualizas el estado dentro de una promesa, React no las agrupará automáticamente, lo que provoca un re-render adicional. Sin embargo, si actualizas ambos estados dentro de la misma función asincrónica, React puede agrupar esas actualizaciones y hacer solo un render.
