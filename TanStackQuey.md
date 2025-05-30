# TanStackQuey

## Instalación

Instalamos la libreria

`npm i @tanstack/react-query`

El siguiente paquete es eslint, para buenas práticas

`npm i -D @tanstack/eslint-plugin-query`

Por ultimo podemos instalar las devtools, para tener una consola en la aplicación sobre el navegador sobre los cambios que suceden, y esta solo funcionará durante desarrollo, en producción no se mostrará

`npm i @tanstack/react-query-devtools`

## Proveedor

Primeramente crearemos un `provider` para usar la librería.

- Usaremos new QueryClient() para obtener el cliente
- Usaremos QueryClientProvider para proveer el cliente que hemos creado, se lo proporcionamos en su propiedad llamada client

```js
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>
);
```

Para añadir las devtool usaremos el componente de <ReactQueryDevtools /> y lo añadimos dentro del proveedor.

```js
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <App />
    <ReactQueryDevtools/>
  </QueryClientProvider>
);

```

## UseQuery

> Cuando invalidamos una query automaticamente se vuelve a disparar la query con useQuery que tenga esa key

UseQuery se dispará cuando se monta el componente o se requiere volver a disparar la petición

`useQuery recibe un objeto con las siguientes propiedades`

- queryKey: como se identificará esta petición y se le pasará en forma de arreglo, esto permitirá que si se hace la petición en otro lugar de la aplicación, verifica si existe la key y si esta vigente, entonces retorna su cache
- queryFn: función que se dispará cuando el useQuery se monta o se vuelve a disparar
- staleTime: sirve para que mantenga el valor en cache por el tiempo que le definamos (unicamente para la llve definida en ese query)
- retry: recibe el numero de reintentos si falla de la petición hasta que retorne la data o haya un error, si es false, este comportamiento se desactiva
- retryDelay: cuantos milisegundos habrá antes de un reintento
- placeholderData: mientras la data esta cargando podemos pasarle información de relleno para que la muestre mientras carga la data
- initialData: es la información que tendra esa query desde el inicio y que persistira por el tiempo dado en el staleTime
- enabled: controla si se ejecuta la función `queryFn` para obtener datos. Cuando `enabled: false`, la query **no hace fetch**, pero la query sigue existiendo con su `queryKey`. `enabled` es útil para condicionar la ejecución, pero no para proteger el acceso a datos indefinidos en `queryKey` o en el `queryFn`.

```js
const {} = useQuery({
  queryKey: ["cripto"],
  queryFn: getCripto,
  staleTime: 1000 * 5,
  retry: false,
  enabled: true,
});
```

En TanStack Query, es recomendable usar queryKey como un array estructurado en lugar de una cadena concatenada.

```js
{
  queryKey: ["issues", issueNumber];
  // o si no importa el orden de las llaves
  queryKey: ["issues", { issueNumber }];
}
```

- Cache y refetch precisos: Cada combinación única se gestiona como una entrada distinta en la caché.
- Invalidación flexible: Puedes invalidar todas las queries relacionadas con "issues" usando:
- Si el orden en la queryKey no importa podemos mandar los items del array como un objeto

`useQuery retorna el siguiente objeto`

- data: retorna el valor o los datos de la petición que se realiza en base a la funcion pasada en queryFn, e inferirá que tipo de valor retorna dependiendo lo que retorne la funcion que le pasamos. Cabe decir que la data ya viene procesada para usarla.
  - Puede retornar undefiend o el valor esperado, ya que hay un momento en el que mientras se realiza la petición la data no existe
- error: es un objeto con el error
- refetch: es una función que podemos usar para volver a llamar la funcion de queryFn y actualiza la data
- isLoading: es true solo la primera vez que el query se ejecuta (cuando aún no hay data en caché).
- isFetching: es true cada vez que se hace una nueva solicitud, ya sea al montar, al hacer refetch, o por revalidaciones automáticas.

> Cuando usamos la query con una misma llave en otros componentes, todos los componentes que usen esa llave se actualizá su data

## Default options

Podemos tener configuraciones globales las cuales podemos establecer desde el cliente

```js
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});
```

## useQueryClient

Es un hook que lo que hace es buscar el cliente que definimos al inicio de la aplicación y

`prefetchQuery`funciona muy similar a useQuery pero esta funcion la ejecutamos de forma manual, pero esta funcion no retorna nada (void)

```js
queryClient.prefetchQuery({
  queryKey: ["issues", issue.number],
  queryFn: () => getIssue(issue.number),
  staleTime: 1000 * 60,
});
```

`setQueryData` establece data directamente en una key que nosotros definamos

```js
queryClient.setQueryData(["issues", issue.number], data, {
  updateAt: Date.now() + 1000 * 60,
});
```

- updateAt: recibe una fecha en la cual la información se mantendra "fresca"

## useInfiniteQuery

Retrona las mismas propiedades que tiene el useQuery. Pero recibe las siguientes propiedades

- queryKey: es el arreglo de llaves, esta propiedad se usa como anteriormente se ha explicado
- queryFn: es la funcion que se dispara al llamar al query sin embargo recibe dos parametros
  - pageParam
  - queryKey: es el querykey que pasamos como valor
- staleTime: el tiempo en que se manendra fresca la información
- initialPageParam: la pagina en la que iniciará la petición
- getNextPageParam: es una funcion que retorna la siguiente pagina si es que hay, recibe dos parametros:
  - lastPage: es la ultima data devuelta por queryfn
  - page: es un array de toda la data que se va acumulando
