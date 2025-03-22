import { FormikErrors, useFormik } from "formik";
import "../styles/styles.css";

interface FormValues {
  firstName: string;
  lastName: string;
  email: string;
}
export const FormikPage = () => {
  const validate = (values: FormValues) => {
    const errors: FormikErrors<FormValues> = {};

    if (!values.firstName) errors.firstName = "Required";
    else if (values.firstName.length > 15)
      errors.firstName = "Must be 15 characters or less";

    if (!values.lastName) errors.lastName = "Required";
    else if (values.lastName.length > 10)
      errors.firstName = "Must be 10 characters or less";

    if (!values.email) errors.email = "Required";
    else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email))
      errors.email = "Invalid email address";

    return errors;
  };

  const {
    values,
    errors,
    handleChange,
    handleSubmit,
    handleBlur,
    touched,
  } = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
    },
    onSubmit: (values) => {
      console.log({ values });
    },
    validate,
  });

  return (
    <div>
      <h1>Formik Basic Tutorial</h1>
      <form noValidate onSubmit={handleSubmit}>
        <label>
          FirstName
          <input
            type="text"
            name="firstName"
            value={values.firstName}
            onBlur={handleBlur}
            onChange={handleChange}
          />
        </label>
        {touched.firstName && errors.firstName && (
          <span>{errors.firstName}</span>
        )}
        <label>
          LastName
          <input
            type="text"
            name="lastName"
            value={values.lastName}
            onBlur={handleBlur}
            onChange={handleChange}
          />
        </label>
        {touched.lastName && errors.lastName && <span>{errors.lastName}</span>}
        <label>
          Email{" "}
          <input
            type="email"
            name="email"
            value={values.email}
            onBlur={handleBlur}
            onChange={handleChange}
          />
        </label>
        {touched.email && errors.email && <span>{errors.email}</span>}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};
