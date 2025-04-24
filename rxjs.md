`npm i rxjs`

Subject es un tipo de observable lo cual permite suscribirse y emitir valores

```js
// creando observable
const observableNewMarker = useRef(new Subject());

// enviando valores
observableNewMarker.current.next(marker);

// suscribiendose a evento que recibe valores
useEffect(() => {
  const subs = observableNewMarker$.subscribe((marker) => {
    console.log("Marker", marker);
  });

  return () => {
    subs.unsubscribe();
  };
}, []);
```
