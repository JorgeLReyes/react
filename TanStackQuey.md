# TanStackQuey

Se pude usar como gestor de estado

```bash
npm i @tanstack/react-query
npm i -D @tanstack/eslint-plugin-query
npm i @tanstack/react-query-devtools
```

Configuraremos un provider

- Usaremos el query client de `@tanstack/react-query`

```js
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App({ children }) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={true} />
    </QueryClientProvider>
  );
}
```

<ReactQueryDevtools /> Es un componente que permite visualizar devtools por parte de tanstack query y que al momento de llegar al build no estaran en este mismo

> Cuando invalidamos una query automaticamente se vuelve a disparar la query con useQuery que tenga esa key
