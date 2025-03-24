import { MyTextInput as MyInput } from "../components/MyInput";
import "../styles/styles.css";
import { Form, Formik } from "formik";
import * as Yup from "yup";

export const RegisterFormikPage = () => {
  return (
    <div>
      <h1>Register formik</h1>
      <Formik
        initialValues={{
          name: "",
          email: "",
          password1: "",
          password2: "",
        }}
        onSubmit={(values) => {
          console.log(values);
        }}
        validationSchema={Yup.object({
          name: Yup.string()
            .min(2, "Min charactes is 2")
            .max(15, "Max charactes is 15")
            .required("Field is required"),
          email: Yup.string()
            .matches(
              /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
              "Email invalid"
            )
            .required("Field is required"),
          password1: Yup.string()
            .min(6, "Password must be at least")
            .required("Field is required"),
          password2: Yup.string()
            .required("Field is required")
            .oneOf([Yup.ref("password1")], "Passwords must match"),
          // .when(["password1"], ([password1], schema) =>
          //   schema.test({
          //     test: (password2) => password1 === password2,
          //     message: "Passwords must match",
          //   })
          // ),
        })}
      >
        {({ handleReset }) => (
          <Form noValidate>
            <MyInput label="Name" placeholder="Your name" name="name" />
            <MyInput label="Email" placeholder="Your email" name="email" />
            <MyInput
              label="Password"
              placeholder="Your password"
              name="password1"
              type="text"
            />
            <MyInput
              label="Confirm password"
              placeholder="Repeat your password"
              name="password2"
              type="text"
            />
            <button type="submit">Submit</button>
            <button type="button" onClick={handleReset}>
              Reset
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};
