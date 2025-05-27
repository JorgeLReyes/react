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

```js
const {} = useQuery({
  queryKey: ["cripto"],
  queryFn: getCripto,
  staleTime: 1000 * 5,
  retry: false,
});
```

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
