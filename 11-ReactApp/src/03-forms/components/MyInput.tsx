import { ErrorMessage, Field } from "formik";
import type { CSSProperties, HTMLInputTypeAttribute, ReactNode } from "react";

interface Props {
  label: string;
  name: string;
  children?: ReactNode | null | undefined;
  id?: string;
  style?: CSSProperties;
  placeholder?: string;
  type?: HTMLInputTypeAttribute;
  value?: string; // this property will be eliminated if it is sent
}

type MyTextInputProps = Props &
  ({ children: ReactNode; as: "select" } | { children?: never; as?: never });
export const MyTextInput = ({ style, label, ...props }: MyTextInputProps) => {
  // const [field, meta] = useField(props);
  // console.log({ field, meta });
  delete props?.value;

  return (
    <>
      <label style={style}>
        {label}
        <Field {...props} />
      </label>
      <ErrorMessage name={props.name} component={"span"} />
      {/* {meta.touched && meta.error && ( */}
      {/* <span className="error">{meta.error}</span>
      )} */}
    </>
  );
};
