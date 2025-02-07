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
3. Estado Interno:React también tiene su propio estado interno (en el "fiber tree", que es su unidad de trabajo), que le permite saber cuál es el estado actual de la aplicación después de aplicar todos los cambios.

- Sin función de actualización (setCategories([...state, "valor"])): React toma una "foto" del estado en el momento de la llamada. Si se llaman varias veces, puede sobrescribir el estado anterior.
- Con función de actualización (setCategories((state) => [...state, "valor"])): React evalúa el estado actualizado en cada llamada, usando el valor más reciente durante la ejecución en el batching.

Ejemplo:

```jsx
setCategories([...state, "1"]); // ["1"]
setCategories([...state, "2"]); // ["2"]
setCategories((state) => [...state, "3"]); // ["2", "3"]
```

> En react 17 o inferior se hacian n renderizaciones por cada cambio de estado, en react 18 o superior no se dispara la re-renderizacion hasta que a la funcion (hilo principal) termine.

`Cómo React maneja el estado en setState sin callback (extra)`

Si usas setState(nuevoValor) directamente sin una callback, React no consulta el estado más actualizado en el Fiber Tree durante el batching, sino que usa el valor que tenía la variable en el momento en que la función se ejecutó.

❌ Sin callback en setState (puede dar resultados inesperados)

```js
const [count, setCount] = useState(0);

const increment = () => {
  setCount(count + 1);
  setCount(count + 1);
  setCount(count + 1);
};
```

📌 ¿Qué pasa aquí?

1. count = 0 en la primera ejecución.
1. Se llama setCount(0 + 1), pero React aún no ha aplicado la actualización.
1. Se llama setCount(0 + 1) otra vez, pero count sigue valiendo 0 en la ejecución de la función.
1. Se llama setCount(0 + 1) por tercera vez, y lo mismo.
1. React aplica el último setCount(1), ignorando los anteriores (debido al batching).

- Resultado esperado: Queríamos incrementar en +3.
- Resultado real: Solo aumenta +1 porque count nunca se actualizó entre llamadas.

✅ Usando callback en setState (usa el estado más reciente)

```js
const increment = () => {
  setCount((prevCount) => prevCount + 1);
  setCount((prevCount) => prevCount + 1);
  setCount((prevCount) => prevCount + 1);
};
```

1. React usa el valor más reciente de count en cada llamada.
1. Se llama a setCount(prevCount => prevCount + 1), y prevCount es el último estado real en el Fiber Tree.
1. Como prevCount se actualiza en cada llamada, React suma correctamente los +3.

- Resultado esperado: count + 3
- Resultado real: Funciona correctamente y count se incrementa en 3.

> ✔ Sin callback, React usa el valor del estado en el momento en que la función se ejecuta, no el más actualizado en el Fiber Tree.
>
> ✔ Con callback, React usa prevState para asegurarse de que cada actualización se base en el estado más reciente.

`Asincronia en el batching`

Cuando en JavaScript se encuentra un await, la ejecución de la función se pausa, pero el hilo principal sigue corriendo.

1. JS detecta el await y mueve la promesa a la task queue.
1. Devuelve el control al event loop, permitiendo que React procese otras tareas.
1. Cuando la promesa se resuelve, la callback de then (o la continuación tras await) se envía a la microtask queue.
1. Antes de procesar nuevas tareas, el event loop revisa la microtask queue y ejecuta las actualizaciones pendientes.
1. Si en este proceso hubo cambios de estado en React (setState), React agrupa las actualizaciones y dispara un re-render antes de pintar la UI.

```javascript
useEffect(() => {
  const fetchData = async () => {
    setLoading(true); // Se agrupa en batch update
    const res = await fetch(url); // JS libera el control aquí
    const data = await res.json();
    setData(data); // React detecta cambio y re-renderiza
  };

  fetchData();
}, []);
```

### useEffect

Sirve para disparar efectos secundarios (procesos cuando algo suceda).

UseEffect recibe dos parametros:

- El efecto a disparar (callback)
- Lista de dependencias que son las condiciones por las que se desean ejecutar el callback y es opcional
  - Si el arreglo se deja vacio el hook solo se ejecuta al crear el componente
  - Si se le pasa una o mas dependencias se ejecutara unicamente cuando una de estas cambie
    > Es mala practica que useEffect sea asincrono ademas de que no puede ser asincrono ya que retorna una promesa y no una funcion como se espera.

`Cleanup`

El useEffect tiene un return que sirve para limpiar o cancelar observables, cancelar algo, etc.
Se ejecuta cuando:

1. Antes de que el componente se desmonte (unmount)
   Si el componente se elimina del árbol de React (por ejemplo, porque ya no se renderiza), React ejecuta la función de limpieza.

1. Antes de que el efecto se vuelva a ejecutar
   Si el efecto tiene dependencias (un array de dependencias como segundo argumento de useEffect), y alguna de esas dependencias cambia, React ejecuta la función de limpieza antes de ejecutar el efecto nuevamente.

1. En cada re-renderización (si no hay array de dependencias)
   Si no proporcionas un array de dependencias en useEffect, el efecto se ejecuta después de cada renderización. En este caso, la función de limpieza también se ejecuta antes de cada nueva ejecución del efecto.

En el siguiente ejemplo si no se hiciera la funcion de limpieza con cada ejecucion del efecto se agregaria un nuevo listener y ademas si el componente se desmonta el listener persistiria.

```js
useEffect(() => {
  const mouse = () => {
    console.log("Mouse moved");
  };
  addEventListener("mousemove", mouse);
  return () => {
    removeEventListener("mousemove", mouse);
    console.log("Unmounted");
  };
}, []);
```

### useRef

Useref no renderiza al componente. Pemite tener una referencia y cuando esta cambie no haya re-renderización.

```tsx
const inputRef = useRef<HTMLInputElement>(null);

// el ref manda el htmlElement y se lo establece al inputref

<input
  ref={inputRef}
  type="text"
  placeholder="Ingrese nombre"
  className="form-control"
/>;
```

El valor o referencia siempre lo devolvera en un objeto en la propiedad llamada current

1. Callback en ref (ref function): Cuando usas una función en ref, React ejecuta esa función cada vez que el elemento se monta o cambia. Además cada render genera una nueva versión de la función callback, lo que hace que React la ejecute de nuevo.
2. useRef (Objeto de referencia): Cuando usas useRef, obtienes un objeto { current: null } que React mantiene sin causar re-render cuando cambia.

`Comportamiento del DOM en React`

1. React utiliza un DOM virtual para manejar la UI de manera eficiente. Cada vez que el estado o las props de un componente cambian, React compara el DOM virtual anterior con el nuevo y actualiza solo las partes necesarias del DOM real. Esto permite optimizar las re-renderizaciones, haciendo que las actualizaciones sean más rápidas y menos costosas.
2. Si se cambia un valor controlado por React (como un value en un input o un className), React solo actualiza esas propiedades. Los cambios directos en el DOM a través de ref no afectan el DOM virtual, pero se pueden sobrescribir durante el siguiente render si el estado cambia y React vuelve a aplicar el valor de la propiedad controlada.

`Interacción entre ref y estado`
Si un elemento tiene propiedades controladas por el estado (como value, checked, o className), y usas un ref para modificar el DOM directamente, el valor controlado por el estado puede sobrescribir los cambios hechos a través de ref en el siguiente render.

- Ejemplo:
  - Si tienes un input cuyo valor está controlado por un estado (value="stateValue"), y usas un ref para modificar su clase (añadir bg), el valor del input se actualizará con el estado, pero la clase solo se mantendrá si no se sobrescribe por un nuevo render de React.
  - Si el estado cambia, React sobrescribirá la propiedad className con lo que está definido en el JSX, y las modificaciones hechas manualmente con ref pueden desaparecer.

` ¿Qué pasa si tienes un input controlado y usas un ref para modificar su DOM?`

- Cuando el estado cambia, React actualiza las propiedades que controla, como value o checked, pero no actualiza directamente otras propiedades como las clases (salvo que estén incluidas en el JSX del componente).
- Si agregas una clase a un input mediante ref y luego el estado del input cambia (por ejemplo, el value), React mantendrá el valor controlado y sobrescribirá las propiedades no controladas, como el className, solo si está basado en el estado.

`Resumen`

- React mantiene la sincronización entre el DOM real y el virtual solo para las propiedades controladas (a través de estado o props).
- ref no afecta al DOM virtual, pero los cambios realizados en el DOM real mediante ref pueden ser sobrescritos en el siguiente render si están relacionados con propiedades controladas por el estado.
- Es importante no modificar propiedades controladas directamente con ref, ya que puede generar desincronización o comportamientos inesperados.

### useLayoutEffect

> `useLayoutEffect puede afectar el desempeño. Se prefiere el uso de useEffect cuando sea posible.`

```js
useLayoutEffect(() => {
  // logica...
  // Element.getBoundingClientRect()
   const { height, width } = h2Ref.current!.getBoundingClientRect();
}, [dependencias]);
```

### Memo y UseMemo

- `Memo`

Es recomendado memorizar componentes cuando la propiedades cambian y son muy grandes

```js
import { memo } from "react";

const Small = memo(({ value }: { value: number }) => {
  console.log("Small renderizado");

  return <small>{value}</small>;
};)

export default Small;

```

`memo` es una funcion que memoriza el componente que recibe como argumento y solo cambiará cuando las propieades cambian (y estados)

- `useMemo`

useMemo es un hook de React que te permite memoizar un valor, es decir, calcular un valor una vez y reutilizarlo en renderizaciones posteriores, siempre y cuando sus dependencias no hayan cambiado.

useMemo memoriza el resultado de una funcion siempre y cuando las dependencias de este no cambien.

- Por defecto retorna undefiend.
- Retorna el valor que le indiquemos con return
- El valor se memoriza en el hook, dentro de la estructura interna de React. y podemos obtenerlo asignandolo a una variable
- Se reprocesa si las dependencias cambias
  - [] solo se procesa una vez
  - se procesa siempre que hay re-renderizado
  - \[dependencias] se reprocesa cada que alguna de las dependencias cambie

```js
useMemo(() => processHeavy(), [dependencias]);
```

- processHeavy: Una función que calcula el valor que quieres memoizar.
- dependencias: Un array de valores de los que depende el cálculo. Si alguno de estos valores cambia, useMemo recalcula el valor.

### UseCallback

> Si usas useCallback pero el componente no está memorizado con React.memo, entonces el callback se volverá a crear en cada render, lo que hace que useCallback no tenga mucho sentido.

Sirve para memorizar funciones, es importante porque un componente hijo al recibir una funcion esta funcion pasa como una nueva referencia ya que cuando un componente se re-renderiza la funcion cambia de referencia.

```js
useCallback(() => {}, []);
```

- Retorna la funcion que le pasemos como primer argumento, y solo se reprocesa cuando una de sus dependencias cambien
- Si no le pasamos dependencias la funcion quedará en un estado "congelado" el cual si hay valores dentro de esta como estados, variables, etc, siempre se quedaran con diho valor ya que estos tambien se memorizan.
- devuelve una función cuya referencia se mantiene igual mientras sus dependencias no cambien.

Por ejemplo:

En la siguiente funcion no hay dependencias, entonces el estado solo se modificará junto con el ultimo valor de counter, es decir si counter entra con un valor de 0, siempre que se llame a la funcion, counter siempre valdrá 0

```js
const increment = useCallback(() => setCounter(counter + 1), []);
```

Sin embargo, si queremos seguir manteniendo 0 dependencias en la funcion pero en este caso actualizar el estado podemos hacer uso del callback dentro de setCounter ya que con esto al momento de realizar el proceso de re-renderizado siempre se tomará el estado mas actualizado

`Sin cb dentro de setCounter`

```js
const increment = useCallback(() => setCounter(counter + 1), []);
```

📌Problema:

- Como counter no está en las dependencias del useCallback, la función se memoriza con el valor de counter en el momento en que se creó.
- Cada vez que se llama a increment, counter sigue siendo el mismo valor inicial porque está memorizado y nunca se actualiza dentro de la función.
- Esto provoca que, aunque llames a increment, siempre esté sumando 1 al mismo valor de counter, sin considerar actualizaciones previas.

Ejemplo de lo que pasa en cada llamada:

1. counter = 0 → se llama a increment(), pero usa el counter memorizado (0 + 1 = 1).
1. React actualiza counter = 1, pero la función sigue memorizada con counter = 0.
1. Se llama otra vez a increment(), pero sigue sumando desde el 0 memorizado (0 + 1 = 1 otra vez).
1. Como resultado, counter parece que no cambia correctamente.

`Con cb dentro de setCounter`

```js
const increment = useCallback(
  () => setCounter((prevCounter) => prevCounter + 1),
  []
);
```

Cuando usamos la callback dentro de setCounter al realizar el proceso de batching en vez de usar el estado que se le pasa como en el anterior ejemplo sin callback, va a consultar el estado actual que almacena react en el fiber three, entonces procede a la actualización aumentando el estado en 1, cuando se vuelve a llamar a la funcion sucede el mismo patron, como depende del estado que se le pase durante el batching que es el estado actual nuevamente aumenta en 1 el estado.

📌 ¿Por qué funciona bien?

- En este caso, setCounter recibe una función de actualización, donde prevCounter es el estado más reciente almacenado por React en su Fiber Tree.
- Como prevCounter siempre será el valor más actualizado de counter, cada vez que llamamos a increment, se toma el último valor del estado y se incrementa correctamente.

#### Otros usos con useEffect

Si nosotros usamos una funcion dentro de un use effect y esta funcion esta como:

- Dependencias
- Dentro del mismo componente
  Entonces si nosotros no usamos useCallback y hay una actualización de estado dentro de la funcion y a su vez esa funcion es una dependencia del useEffect entonces empezará un bucle de re-renderizacion

```javascript
// ❌ Sin useCallback cada actualizacion del estado crearia una nueva referencia para la funcion por lo cual disparará el bucle
  const increment = () => setCounter((counter) => counter + 1), [];
// ✅ Con useCallback al memorizar la funcion y no tener dependencias la referencia nunca cambiará y no sucederá un bucle
  const increment = useCallback(() => setCounter((counter) => counter + 1), []);

  useEffect(() => {
    increment();
  }, [increment]);

```

##### Con argumentos

Como sabemos useCallback retorna una funcion memorizada, asi que si queremos pasarle argumentos a esta funcion los definimos en el callback

useCallback solo memoriza la referencia de la función, pero los parámetros que le pases siguen siendo dinámicos.

```js
const increment = useCallback((value) => {
  setCounter((counter) => counter + value);
}, []);
```

🔸 ¿Qué memoriza useCallback aquí?
✅ Memoriza la referencia de la función increment.
✅ Memoriza que la función usa un parámetro value.
✅ No memoriza el valor de value, porque este se pasa dinámicamente en cada llamada.

### use(CustomHook)

- Debe de anteponerse la palabra "use" por buenas practicas
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

### Reducer

useReducer es un hook de React que gestiona el estado mediante una función reductora, útil cuando la lógica de actualización es compleja o involucra múltiples valores.

1. Es una función comun
2. Es una función pura
   - No debe tener efectos secundarios
     - Debe resolver los problemas sin llamar otras funciones
     - No deben realizar tareas asincronas
     - No debe de llamar localStorage o sessionStora ya que son considerados efectos secundarios
     - No debe de requerir más que una acción que puede tener un argumento
3. Debe de retornar un nuevo estado
4. Usualmente sólo recibe dos argumentos
   - Valor inicial del estado
   - Accion a ejecutar: decide como cambiará el estado
5. Sirve para tener centralizado todas las acciones que modifican el estado

```js
const [state, dispatch] = useReducer(reducer, initialArg, init?)
// state: estado
// dispatch: es la funcion que se llama para disparar acciones

// reducer: acciones
// initialArg: estado inicial
// init: function de inicialización
```

- reducer es una funcion que se encarga de actualizar el estado, pero la logica la implementamos nosotros, y la llamamos con el dispatch, el cual recibe un objeto con dos valores: type y payload
- initialArg es el estado inicial del componente
- init es una funcion pura, la cual se ejeucta cuando se monta el componente y retorna un estado transformado, es decir si por algun motivo el estado inicial se requiere que tenga algun formato o estructura distinta esta funcion puede realizar las modificaciones

📌 Elementos principales

- Estado (state) → Valor actual gestionado por el reducer.
- Despachador (dispatch) → Función que envía acciones al reducer.
- Reductor (reducer) → Función pura que recibe el estado actual y una acción, devolviendo un nuevo estado.
- Acciones (action) → Objetos con una propiedad type (y opcionalmente payload) que indican cómo actualizar el estado.

## Notas

- La propiedad key es requerida por React cuando renderizas una lista de elementos repetitivos dentro de un componente, especialmente dentro de .map().
- Las keys solo tienen que ser únicas entre hermanos, pero podemos usarlas en diferentes arrays.
- Cuando usamos un key diferente en cada render, React considera que el componente es nuevo y no reutiliza el anterior, lo que provoca un unmount (desmontaje) y un mount (montaje) nuevamente.
- Si actualizas el estado dentro de una promesa, React no las agrupará automáticamente, lo que provoca un re-render adicional. Sin embargo, si actualizas ambos estados dentro de la misma función asincrónica, React puede agrupar esas actualizaciones y hacer solo un render.
