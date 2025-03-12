# AXIOS

Podemos usar axios.create para configurar la peticion sin tener que estar agregando parametros en cada una de estas.

## Interceptores

Permiten interceptar las peticiones tanto las que van al backend como las que regresan de este

```js
axios.create({}).interceptors.request.use((config) => {
  config.headers.set("Authorization", "Authorization");
  return config;
});
```

## withCredentials

Permite enviar las cookies del cliente hacia un servidor. Esta propiedad se tiene que añadir a la configuracion de la peticion ya que si no no enviará las cookies
