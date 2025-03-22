# Formik

`npm i formik`

Formik nos da un hook que es el que nos permitirá trabajar con los formualrios y controlarlos. Se inicializa con dos valores necesarios:

- initialValues: valores del formulario
- onSubmit: es una funcion que recibe los valores del formulario, se ejecuta cuando el formulario pase todas las pruebas de validacion (la funcion puede ser asincrona)

Otras propiedades

- validate: es una funcion que recibe los valores del formulario mas actuales y retorna un objeto con las propiedaes que den errores (campos que no cumplan con su validacion), y su valor será un string (el mensaje de error), esta funcion se ejecutará antes de que el formulario se envie o con cada cambio de valor de alguna de sus propiedades, y si tiene errores en su objeto, no procedera al envio del formulario.
- validateSchema: es similar a validate pero funciona con librerias como Yup.

```js
// importando formik
import { useFormik } from "formik";

// configurando y destructurando propiedaes y funciones
const { values, erros, handleSubmit, handleChange, handleBlur, touched } =
  useFormik({
    initialValues: {
      propForm: "",
    },
    onSubmit: (values) => {},
    validate: (values) => {
      /*logica de validacion*/ return erros;
    },
  });

// asignando funcion submit
<form noValidate onSubmit={handleSubmit}>
  <input
    type="text"
    name="firstName"
    // asignando valor de formulario
    value={values.propForm}
    // asignando funcion para cambiar el valor
    onChange={handleChange}
    onBlur={handleBlur}
    {...getFieldProps("firstName")}
  />
  {touched.propForm && errors.propForm && <></>}
</form>;
```

`formik` o lo que retorna useFormik tiene propiedades como :

- values: es el objeto que contiene las propiedeades o valores del formulario, que son las mismas con el que lo inicializamos. Es importante que el name del input coincida con el nombre de una propiedad del formulario
- touched: es un objeto que contiene las propiedad del formulario pero que sirve para saber si se ha interactuado con la propiedad, es decir, que marca qué campos el usuario ya tocó. Pero solo hasta que es enviado la primera vez el formulario o cuando un input pierde el foco
- erros: es el objeto que contiene los errores que se lanzan desde la funcion validate, el cual puede contener los mismos nombres de las propiedades del formulario, pero unicamente de las que den error al ser validadas
- handleChange: function que actualiza el estado del formulario
- handleSubmit: function que es la que llama a la funcion definida en la propieadad onSubmit
- getFieldProps: es una funcion que recibe como argumento el nombre del input y retorna como propiedades el name, onChange, onBlur y value, es decir, podemos usar esta funcion para omitir el uso explicito de las propiedades y funciones antes mencionados

## Yup

Es un objeto que cuenta con funciones como propiedades para evaluar la propiedad o valor que se le indique. Para este caso se usa junto con la propiedad validationSchema que puede recibir un Yup.object() y dentro de esta poder usar las funciones valiladoras

`npm i yup`

```js
  validationSchema: Yup.object({
        firstName: Yup.string()
          .max(15, "Debe de tener 15 caracteres o menos")
          .required("Requerido"),

        lastName: Yup.string()
          .max(15, "Debe de tener 15 caracteres o menos")
          .required("Requerido"),
        email: Yup.string().email("Email invalido").required(),
        terms: Yup.boolean().oneOf(
            // el valor debe estar en el arreglo,
            [true],
            "Debe aceptar terminos y condiciones"
          ),
      }),
```

## Formik components

- Formik: recibe como propiedades necesarias initialValues y onSubmit, internamente usa el useFormik, ademas el children puede ser una funcion que retorna un jsx o un jsx, la diferencia es que esta funcion recibe argumentos que son expuestos desde el hijo
- Form: es exactamente un form pero adaptado para implicitamente usar onSubmit
- Field: es exactamente un input
- ErrorMessage: es un componente que maneja los errores de validacion y recibe un name que debe ser igual al nombre del input que se quiere mostrar el error

```js
import { Formik, Field, Form, ErrorMessage } from "formik";
<Formik
  initialValues={{ firstName: "", lastName: "", email: "" }}
  onSubmit={(values) => console.log({ values })}
  validationSchema={Yup.object({
    firstName: Yup.string()
      .max(15, "Debe de tener 15 caracteres o menos")
      .required("Requerido"),

    lastName: Yup.string()
      .max(15, "Debe de tener 15 caracteres o menos")
      .required("Requerido"),
    email: Yup.string()
      .email("Email invalido")
      .matches(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/, "Email invalido")
      .required(),
  })}
>
  {(formik) => {
    return (
      <Form noValidate>
        <label htmlFor={fName}>First Name</label>
        <Field name="firstName" type="text" id={fName} />
        <ErrorMessage name="firstName" children={(msg) => <span>{msg}</span>} />

        <label htmlFor={lName}>Last Name</label>
        <Field name="lastName" type="text" id={lName} />
        <ErrorMessage name="lastName" component={"span"} />

        <button type="submit">Submit</button>
      </Form>
    );
  }}
</Formik>;
```

## useField

useField() es un hook de Formik que: ✅ Se conecta solo al contexto de Formik

- Te regresa todo lo necesario (value, onChange, onBlur, error, touched) en las propiedades de field y meta
  - field → trae: { name, value, onChange, onBlur }
  - meta → trae: { error, touched, initialValue, initialTouched, initialError }
- Evita tener que pasar manualmente todos esos handlers y valores como props

```json
{
  "field": {
    "name": "nameInput",
    "value": "",
    "onChange": "f()",
    "onBlur": "f()"
  },
  "meta": {
    "value": "",
    "error": "Requerido",
    "touched": true, //true || false,
    "initialValue": "",
    "initialTouched": false
  }
}
```
