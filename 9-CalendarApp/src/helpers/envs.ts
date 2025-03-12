export const envs = () => {
  const env = import.meta.env;
  return { ...env };
};
