# SOCKETS

`npm i socket.io`

Los web sockets mantienen la comunicacion full duplex (cliente-servidor)

- Socket: identificador de la conexión de un cliente
- Emitir: cleinete emite un evento
- Evento: acción que el cliente o servidor disparan

Nota rápida: Diferencia entre WebSocket puro y Socket.IO
WebSocket puro:

`Protocolo: ws:// o wss://.`

- Comunicación directa basada en mensajes binarios o de texto.
- No incluye reconexión automática, rooms, broadcast ni eventos personalizados.
- Tú tienes que estructurar manualmente los mensajes ({ type, payload }).
- Solo funciona si el cliente y servidor soportan WebSocket.
  `Socket.IO:`
- Usa http:// o https:// para iniciar la conexión.
- Internamente empieza con HTTP long-polling y luego hace upgrade a WebSocket si es posible.
- Maneja automáticamente reconexiones, rooms, namespaces y eventos personalizados (socket.emit('event', data)).
- El cliente solo recibe los eventos a los que esté suscrito, no necesita filtrar por tipo.
- Mejor soporte para firewalls y proxies que bloquean WebSocket puro.

1. El archivo socket.io.js lo expone automáticamente el servidor de Socket.io

   - No depende de que tú lo subas manualmente ni de un CDN externo si lo cargas desde tu propio servidor.
   - Cuando haces:

   ```html
   <script src="http://localhost:3000/socket.io/socket.io.js"></script>
   ```

   Estás cargando la librería directamente desde tu servidor backend.

2. Necesitas importar la librería en tu HTML o JS cliente

   - Aunque el archivo esté disponible, necesitas cargarlo explícitamente para poder usar io() en tu código cliente.

3. Conexión por defecto (io())

   - Cuando usas io() sin argumentos Socket.io automáticamente se conecta al mismo servidor desde donde se cargó la página.
   - Si tu página fue servida desde http://localhost:3000, se conecta allí.
   - Si tu página fue servida desde https://midominio.com, se conecta a ese dominio.

## emitir y escuchar

El emit sirve para emitir un mensaje a, en este caso, el cliente que se acaba de conectar. Para emitir usamos el metodo `emit` donde recibe el nombre del evento/mensaje y la data

Para que ese mensaje emitido sea escuchado en el cliente podemos usar el socket que nos provee sokcet.io, para escuchar el mensaje o envento debemos usar `on` que recibe el nombre del evento/mensaje a escuchar y la data recibida

`Backend emite Frontend escucha`

```js
// Backend
io.on("connection", (client) => {
  client.emit("message", "Hello from serve");
});

// Frontend
const socket = io("http://localhost:3000");
socket.on("message", (data) => console.log(data));
```

`Frontend emite Backend escucha`

```js
// Frontend
socket.emit("message", { msg: "Hello from the client" });

// Backend
io.on("connection", (client) => {
  client.on("message", (data) => {
    console.log(data);
  });
});
```

### Emitir a todos los sockets conectados

Para emitir un mensaje a todos los clientes basta con sustituir el socket por el servidor, es decir, tomaremos el servidor y emitiremos el mensaje

```js
const io = new Server(httpServer);

io.on("connection", (client) => {
  client.on("mensaje", (data) => {
    // client.emit("mensaje", data);
    io.emit("mensaje", data);
  });
});
```

`Evento: connect`

```javascript
import { io } from "socket.io-client";

const socket = io("http://localhost:3000");

socket.on("connect", () => {
  console.log("✅ Cliente conectado al servidor");
});
```

- El cliente detecta que se conectó exitosamente al servidor.
- Este evento se dispara automáticamente cuando la conexión es exitosa.

## Con REACT

`npm i socket.io-client`

```js
import { io } from "socket.io-client";
// También existe (más vieja, pero válida)
// import { connect } from "socket.io-client";

const socket = io("http://localhost:3000");

io("http://localhost:3000", {
  transports: ["websocket"],
});
```

> Cuando usas transports: ['websocket'] en Socket.io, le estás indicando al cliente que solo intente usar WebSocket y que no intente otros métodos de transporte como el HTTP long-polling. Esto es útil cuando ya sabes que tu servidor solo manejará WebSocket, lo que puede hacer que la conexión sea más rápida, ya que el cliente no pierde tiempo intentando hacer un upgrade a WebSocket desde otro transporte. Sin embargo, si por alguna razón la red o el servidor no permiten WebSocket, la conexión fallará inmediatamente, sin intentar usar el método de polling como alternativa.
>
> Por defecto, Socket.io intentará el long-polling y luego hará un upgrade a WebSocket si es posible. Al forzar el uso de WebSocket, estás diciendo "no intentes otras opciones, solo usa WebSocket". Es útil cuando sabes que ambas partes (cliente y servidor) están configuradas para WebSocket y no quieres complicar la conexión

### `socket.off` Limpiar los eventos

La función .off() de socket.io-client es la forma de quitar o remover un listener que antes agregaste con .on().

### solo tener un cliente

`Resolverlo con useMemo`

> Memoriza el resultado, por lo cual simepre devolvera el mismo socket

```js
const socket = useMemo(
  () => io(serverPath, { transports: ["websocket"] }),
  [serverPath]
);
```

`Resolverlo con useState`

> Solo ejecuta la funcion una vez y evalua solo el resultado, si no le pasamos una funcion el socket se creara por cada renderizacion

```js
const socket = useState(() => io(serverPath, { transports: ["websocket"] }));
```

`Resolverlo con useRef (preferentemente)`

> No depende de renderizaciones, la actualizacion es manual, por lo cual el socket solo cambia y se crea de nuevo si lo hacemos explicitamente

```js
const socket = useRef < Socket > undefined;

if (!socket.current)
  socket.current = io(serverPath, { transports: ["websocket"] });
```

### Respuesta u oyente mediante callback del emit

Podemos usar un callback en vez de un `socket.on` para permitir que el servidor sea el que nos de una respuesta mas directa, sin depender de listener por parte del cliente, sin embargo esto hara que la respuesta sea unicamente para el socket que emitio el evento

🧠 ¿Qué implica esto?

- ✅ Solo el socket que emitió el evento recibe la respuesta.
- ✅ No necesitas tener un socket.on(...) para ese evento en el cliente.
- 🚫 Otros clientes no se enteran de lo que pasó, a menos que tú lo emitas aparte.

```js
// Cliente
socket.emit("request-ticket", null, (ticket: Ticket) =>
  setTicket(ticket.number)
);

// Servidor
socket.on("request-ticket", (data, callback) =>
  callback(this.ticketList.createTicket())
);
```

> Usar el callback es como una respuesta privada
>
> Usar socket.on es como una emisora de radio 📡

### Broadcast

Solo emite la señal a los clientes excepto al del socket actual

```js
socket.broadcast.emit("event", data);
```

## Mas sobre la configuracion de io()

1. autoConnect
   - Es una opción de configuración en io() que determina si la conexión con el servidor se establece automáticamente al crear el socket.
   - `autoConnect: true:` Conecta automáticamente al servidor al crear el socket. Este es el valor por defecto.
   - `autoConnect: false:` El socket no se conecta automáticamente al servidor cuando lo creas. Tendrás que llamarlo explícitamente con socket.connect().

```js
io(serverPath, {
  transports: ["websocket"],
  autoConnect: true,
  forceNew: true,
});

// Con autoconnect en false
// socket.connect();
```

2. forceNew
   - Es una opción que fuerza la creación de una nueva instancia del socket, incluso si ya existe una conexión activa.
   - `forceNew: true` garantiza que se cree una nueva instancia de socket, incluso si hay una conexión activa.
   - Esto evita que se reutilicen sockets antiguos, lo cual es útil cuando necesitas una nueva instancia o conexión limpia.

```js
io(serverPath, {
  transports: ["websocket"],
  autoConnect: true,
  forceNew: true, // Crea una nueva instancia siempre
});
```

3. query

Se puede mandar cierta informacion a travez de esta propiedad

```js
io(serverPath, {
  transports: ["websocket"],
  autoConnect: true,
  forceNew: true, // Crea una nueva instancia siempre,
  query: {},
});

// backend
socket.handshake.query;
```

## Cookies

Se puden enviar y recibir cookies desde sockets. Cuando usamos el cliente de socket debemos pasarle en la configuracion la propiedad de credentials en true

```js
io(serverPath, {
  transports: ["websocket"],
  withCredentials: true,
});
```

En el servidor de sockets tenemos que configurar el CORS si no lo hemos configurado, pero si usamos un servidor http que ya lo tiene, entonces no será necesario, a menos que de algun error.

Y unicamente accedemos a las cookies de la siguiente forma

```js
socket.handshake.headers.cookie;
```

Es importante saber que las cookies vienen en string y estan divididas por ";", por lo cual podemos usar el paquete de `cookie` para parsearlas y usarlas como objeto

```js
import * as cookie from "cookie";

const cookies = cookie.parse(socket.handshake.headers.cookie!);
console.log(cookies.token);
```

## Salas (ROOMS - Join)

Las **rooms** son canales virtuales que permiten organizar sockets en grupos para emitir eventos dirigidos solo a un subconjunto de clientes conectados.

```js
// Unirse a una sala
socket.join("nombre-sala");

// Emitir un evento a una sala
io.to("nombre-sala").emit("evento", data);

// Salir de una sala (opcional)
socket.leave("nombre-sala");
```

- Un socket puede estar en múltiples salas al mismo tiempo.
- Cada socket se une automáticamente a una sala con su propio id.
- Las salas se crean automáticamente al hacer join() y desaparecen si no hay sockets en ellas.
