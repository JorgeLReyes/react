import { ErrorMessage, Field } from "formik";
import type { CSSProperties, HTMLInputTypeAttribute, ReactNode } from "react";

interface Props {
  label: string;
  name: string;
  children?: ReactNode;
  id?: string;
  style?: CSSProperties;
  placeholder?: string;
  type?: HTMLInputTypeAttribute;
}

type MyTextInputProps = Props &
  ({ children: ReactNode; as: "select" } | { children?: never; as?: never });
export const MyTextInput = ({ style, label, ...props }: MyTextInputProps) => {
  // const [field, meta] = useField(props);
  // console.log({ field, meta });
  return (
    <>
      <label style={style}>
        {label}
        <Field {...props} />
      </label>
      <ErrorMessage name={props.name} component={"span"} />
      {/* <input type="text" {...field} {...props} /> */}
      {/* {meta.touched && meta.error && ( */}
      {/* <span className="error">{meta.error}</span>
      )} */}
    </>
  );
};
