export const getEnviroments = () => {
  const ENVS = import.meta.env;

  return {
    ...ENVS,
  };
};
