export const getUserStorage = () => ({
  agente: localStorage.getItem("agente"),
  escritorio: localStorage.getItem("escritorio"),
});
