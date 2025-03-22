import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import "../styles/styles.css";
import { useId } from "react";

export const FormikComponents = () => {
  const fName = useId();
  const lName = useId();
  const email = useId();
  const job = useId();

  return (
    <div>
      <h1>Formik Components</h1>
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          email: "",
          terms: false,
          jobType: "",
        }}
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
            .matches(
              /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
              "Email invalido"
            )
            .required(),
          jobType: Yup.string()
            .notOneOf(["not-select"], "Opcion no permitida")
            .required("Job required"),
          terms: Yup.boolean().isTrue(),
          // oneOf(            [true],
          // "Debe aceptar terminos y condiciones")
        })}
      >
        {
          (/*formik */) => {
            return (
              <Form noValidate>
                <label htmlFor={fName}>First Name</label>
                <Field name="firstName" type="text" id={fName} />
                <ErrorMessage
                  name="firstName"
                  children={(msg) => <span>{msg}</span>}
                />

                <label htmlFor={lName}>Last Name</label>
                <Field name="lastName" type="text" id={lName} />
                <ErrorMessage name="lastName" component={"span"} />

                <label htmlFor={email}>Email</label>
                <Field name="email" type="email" id={email} />
                <ErrorMessage name="email" component={"span"} />

                <label htmlFor={job}>JobType</label>
                <Field name="jobType" as="select" id={job}>
                  <option value="">Select Job</option>
                  <option value="developer">Developer</option>
                  <option value="designer">Designer</option>
                  <option value="manager">Manager</option>
                  <option value="not-select">NO SELECCIONAR</option>
                </Field>
                <ErrorMessage name="jobType" component={"span"} />

                <label style={{ flexDirection: "row" }}>
                  <Field name="terms" type="checkbox" />
                  Terms and conditions
                </label>
                <ErrorMessage name="terms" component={"span"} />

                <button type="submit">Submit</button>
              </Form>
            );
          }
        }
      </Formik>
    </div>
  );
};
