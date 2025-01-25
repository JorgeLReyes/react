export const getUser = () => ({
  uid: "ABC123",
  username: "El_Papi1502",
});

export const getUsuarioActivo = (nombre: string) => ({
  uid: crypto.randomUUID(),
  username: nombre,
});
