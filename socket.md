# SOCKETS

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
