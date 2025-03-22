import { Formik, Form } from "formik";
import * as Yup from "yup";
import "../styles/styles.css";
import { MyTextInput } from "../components/MyInput";

export const FormikAbstraction = () => {
  // const fName = useId();

  return (
    <div>
      <h1>Formik Abstraction</h1>
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
        {(formik) => {
          console.log(formik);
          return (
            <Form noValidate>
              <MyTextInput
                label="First Name"
                name="firstName"
                placeholder="Your name"
              />
              <MyTextInput
                label="Last Name"
                name="lastName"
                placeholder="Your lastname"
              />
              <MyTextInput
                label="Email"
                name="email"
                type="email"
                placeholder="Your email"
              />
              <MyTextInput label="Email" name="jobType" as="select">
                <option value="">Select Job</option>
                <option value="developer">Developer</option>
                <option value="designer">Designer</option>
                <option value="manager">Manager</option>
                <option value="not-select">NO SELECCIONAR</option>
              </MyTextInput>
              <MyTextInput
                label="Terms and conditions"
                name="terms"
                type="checkbox"
                style={{
                  flexDirection: "row-reverse",
                  justifyContent: "start",
                }}
              />
              <button type="submit">Submit</button>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};
