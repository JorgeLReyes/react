import { useState } from "react";

const useForm = <T,>(initialForm: T) => {
  const [form, setForm] = useState(initialForm);

  const onInputChange = ({
    target: { name, value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    setForm((state) => ({ ...state, [name]: value }));
  };

  const onReset = () => {
    setForm(initialForm);
  };

  return {
    ...form,
    onInputChange,
    onReset,
  };
};

export default useForm;
