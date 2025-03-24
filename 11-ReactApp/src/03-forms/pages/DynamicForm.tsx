import { Formik, Form } from "formik";
import formJson from "../data/form.json";
import { MyTextInput } from "../components/MyInput";
import * as Yup from "yup";

type validationJson = {
  type: string;
  value?: string | number;
}[];

const { requiredFields, initialValues } = formJson.reduce(
  (acc, current) => {
    acc.initialValues[current.name] = current.value;
    if (!current.validations) return acc;
    let schema = Yup.string();

    for (const rule of current.validations as validationJson) {
      if (rule.type === "required") {
        schema = schema.required("Campo requerido");
      }
      if (rule.type === "minLength") {
        schema = schema.min(
          rule.value as number,
          `Campo debe tener minimo ${rule.value} letras`
        );
      }
      if (rule.type === "email") {
        schema = schema.matches(
          new RegExp(rule.value as string),
          "Debe ser un email"
        );
      }
    }
    acc.requiredFields[current.name as string] = schema;
    return acc;
  },
  { initialValues: {}, requiredFields: {} } as {
    requiredFields: { [name: string]: Yup.StringSchema };
    initialValues: {
      [name: string]: string;
    };
  }
);

export const DynamicForm = () => {
  return (
    <div>
      <h1>DynamicForm</h1>
      <Formik
        initialValues={initialValues}
        onSubmit={(values, { resetForm }) => {
          console.log(values);
          resetForm();
        }}
        validationSchema={Yup.object(requiredFields)}
      >
        {() => {
          return (
            <Form>
              {formJson.map(({ options, as, ...field }) => {
                let childrenAsSelect = {};
                if (options) {
                  childrenAsSelect = {
                    children: (
                      <>
                        <option value="">Select an option</option>
                        {options.map(({ id, label }) => (
                          <option key={id} value={id}>
                            {label}
                          </option>
                        ))}
                      </>
                    ),
                    as,
                  };
                }
                return (
                  <MyTextInput
                    key={field.name}
                    {...field}
                    {...childrenAsSelect}
                  />
                );
              })}

              <button type="submit">Submit</button>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};
