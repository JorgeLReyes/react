import { useFormik } from "formik";
import * as Yup from "yup";
import "../styles/styles.css";

export const FormikYupPage = () => {
  const {
    // values,
    errors,
    touched,
    // handleChange,
    handleSubmit,
    // handleBlur,
    getFieldProps,
  } = useFormik({
    initialValues: { firstName: "", lastName: "", email: "" },
    onSubmit: (values) => {
      console.log({ values });
    },
    validationSchema: Yup.object({
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
    }),
  });

  return (
    <div>
      <h1>Formik Basic Tutorial - Yup</h1>
      <form noValidate onSubmit={handleSubmit}>
        <label>
          FirstName
          <input
            type="text"
            // name="firstName"
            {...getFieldProps("firstName")}
            // value={values.firstName}
            // onBlur={handleBlur}
            // onChange={handleChange}
          />
        </label>
        {touched.firstName && errors.firstName && (
          <span>{errors.firstName}</span>
        )}
        <label>
          LastName
          <input
            type="text"
            // name="lastName"
            // value={values.lastName}
            // onBlur={handleBlur}
            // onChange={handleChange}
            {...getFieldProps("lastName")}
          />
        </label>
        {touched.lastName && errors.lastName && <span>{errors.lastName}</span>}
        <label>
          Email{" "}
          <input
            type="email"
            // name="email"
            // value={values.email}
            // onBlur={handleBlur}
            // onChange={handleChange}
            {...getFieldProps("email")}
          />
        </label>
        {touched.email && errors.email && <span>{errors.email}</span>}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};
