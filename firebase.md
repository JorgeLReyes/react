# Firebase

1.  Crear un proyecto y configurar
2.  Usar el script que proporciona firebase

```js
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCCchrMhTSKanKZDdZsgb17whV30opi1cg",
  authDomain: "react-cursos-a3ca7.firebaseapp.com",
  projectId: "react-cursos-a3ca7",
  storageBucket: "react-cursos-a3ca7.firebasestorage.app",
  messagingSenderId: "655339010286",
  appId: "1:655339010286:web:0a201b383e78c9b8871bff",
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
```

`initializeApp(config)` crea una instancia de tu proyecto Firebase usando tus credenciales (API keys, IDs, etc.).
Esta instancia contiene la configuración necesaria para conectar Auth, Firestore, y otros servicios.

## Autenticacion y base de datos (CloudFireStore)

```js
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";

export const FirebaseAuth = getAuth(FirebaseApp);
export const FirebaseBD = getFirestore(FirebaseApp);
```

`getAuth` y `getFirestore` usan la instancia creada por initializeApp para devolverte el servicio listo para usar. Sin FirebaseApp, Firebase no sabría a qué proyecto conectar.

> Si solo tienes un proyecto, podrías llamar a getAuth() o getFirestore() sin pasarle el FirebaseApp, y usaría la instancia por defecto. Pero pasarla explícitamente es más claro y útil si manejas múltiples proyectos.

### getAuth(app)

Devuelve una instancia del objeto Auth, que es el núcleo del sistema de autenticación de Firebase. 🔐

- Conecta al servicio de autenticación de Firebase.
- Permite login con Google, email, etc.
- Usa la instancia creada por initializeApp para saber a qué proyecto conectar.

### getFirestore(app)

- Conecta a la base de datos Firestore.
- Permite leer, escribir y actualizar datos.
- También usa la instancia creada por initializeApp.

> Otra base: getDatabase() se usa para conectarse a la Realtime Database de Firebase, que es distinta de Firestore.
> import { getDatabase } from "firebase/database;

### Provider authenticated

```js
const provider = new GoogleAuthProvider();
```

- Crea una instancia del proveedor de Google.
- Define que el método de autenticación será Google (y puedes configurarlo con scopes si necesitas permisos extra, como acceso a Google Drive).

El provider tiene una propiedad llamada addScope que es una funcion que recibe los permisos que pedirá el proveedor al usuario

```js
provider.addScope("https://www.googleapis.com/auth/userinfo.email");
provider.addScope("https://www.googleapis.com/auth/userinfo.profile");
```

`Metodo para iniciar la autentificación (Google)`

> https://firebase.google.com/docs/auth/web/google-signin?hl=es-419#web_2

Crearemos una función que al llamarla nos permitirá autentificarnos con el proveedor que le pasemos

```js
export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(FirebaseAuth, provider);
  } catch (e) {}
};
```

Para ello usaremos `signInWithPopup` que recibe como parámetro el objeto que retorna getAuth y el proveedor que creamos. Este metodo permite abrir una ventana emergente, pero si quisieramos redirigir al usaurio usamos `signInWithRedirect` que recibe los mismos parámetros

Ahora los proveedores tienen un metodo de clase llamado `credentialFromResult` que recibe el resultado de la autentificación

```js
const credential = GoogleAuthProvider.credentialFromResult(result);
```

Ahora si todo sale bien podemos obtener cierta información del usaurio como correo, nombre del usurio, etc., gracias al objeto que nos retorna `signInWithPopup` (o `signInWithRedirect`)

### Provider authenticated con correo y contraseña

A diferencia de proveedores externos aqui solo existe un metodo que `createUserWithEmailAndPassword` que nos pide elobjeto autenticador, el correo y contraseña, y retorna las mismas propiedades que cualquier proveedor

```js
const result = await createUserWithEmailAndPassword(
  FirebaseAuth,
  email,
  password
);
```

Aunque con lo anterior seria suficiente, podemos personalizar el perfil con el que se autentifica desde firebase, ya que por defecto propiedades como displayName, photoUrl, etc., no vienen establecidas

Para ello usaremos `updateProfile`, donde como parámetros pide el usuario que se acaba de crear el firebase, es decir, el "result", y un objeto que lleva dos propiedades que son displayName y photoURL, donde ambas son opcionales.

```js
const result = await createUserWithEmailAndPassword(
  FirebaseAuth,
  email,
  password
);

await updateProfile(result.user, {
  displayName,
});
```

Tambien podemos usar FirebaseAuth con la propiedad currentUser, que es una funcion y, que gracias a la funcion con la que autentiquemos a un usuario, esta funcion siempre hace referencia al usuario autenticado en la instancia actual de la app si es que se crea.

```js
    await updateProfile(FirebaseAuth.currentUser!, {
      displayName,
    });

```

Otra forma que es con un funcion llamada `onAuthStateChanged` que permite estar al pendiente de los cambios del usuario, retorna algo conocido como un observable, que es na funcion que emite valores.

```js
onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("Usuario autenticado:", user.displayName);
  } else {
    console.log("Usuario no autenticado");
  }
});
```

Como parámetros recibe

- El auth que retorna getAuth
- Una callback qe recibe como argmento el usuario

Si se necesita limpiar por algun motivo el observable, se hace de la siguiente forma:

```js
useEffect(() => {
  const unsubscribe = onAuthStateChanged(FirebaseAuth, (user) => {
    console.log("Usuario autenticado:", user);
  });

  return () => unsubscribe(); // Limpieza al desmontar el componente
}, []);
```

1. onAuthStateChanged escucha cambios en el estado del usuario autenticado.
1. Devuelve una función (unsubscribe) que, al ejecutarse, detiene la suscripción.
1. El return en useEffect ejecuta esa función cuando el componente se desmonta, evitando fugas de memoria.
