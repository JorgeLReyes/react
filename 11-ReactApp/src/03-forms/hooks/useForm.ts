import { useEffect, useMemo, useState } from "react";

interface Props<T> {
  data: T;
  validation?: Record<string, { exp: RegExp; message: string }>;
}

export const useForm = <T extends object>({ data, validation }: Props<T>) => {
  const [form, setForm] = useState(data);
  const [error, setError] = useState<
    Partial<Record<keyof T, string | undefined>>
  >({});

  useEffect(() => {
    if (validation) createValidators();
  }, [form]);

  useEffect(() => {
    setForm(data);
  }, [data]);

  const onChange = ({
    target: { name, value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    // onValidationSubmit();
    setForm((state) => ({ ...state, [name]: value }));
  };

  const onReset = () => {
    setForm(data);
  };

  const createValidators = () => {
    const newErrors: Partial<Record<keyof T, string | undefined>> = {};

    Object.entries(<object>form).forEach(([input, value]) => {
      const isValid = new RegExp(validation![input].exp).test(value);
      newErrors[<keyof T>input] = isValid
        ? undefined
        : validation![input].message;
    });

    setError(newErrors);
  };

  const isFormValid = useMemo(
    () => !Object.values(<object>error).some((value) => value !== undefined),
    [error]
  );

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    createValidators();
    console.log(form);
  };

  return {
    form,
    onChange,
    onSubmit,
    onReset,
    isFormValid,
    error,
  };
};
