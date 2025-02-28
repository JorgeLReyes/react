import { useEffect, useMemo, useState } from "react";

export const useForm = <T>(
  initialForm: T,
  validation?: Record<string, { exp: RegExp; message: string }>
) => {
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState<
    Partial<Record<keyof T, string | undefined>>
  >({});

  useEffect(() => {
    if (validation) createValidators();
  }, [form]);

  useEffect(() => {
    setForm(initialForm);
  }, [initialForm]);

  const onInputChange = ({
    target: { name, value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    // onValidationSubmit();
    setForm((state) => ({ ...state, [name]: value }));
  };

  const onReset = () => {
    setForm(initialForm);
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

  return {
    form,
    error,
    isFormValid,
    onInputChange,
    onReset,
  };
};
