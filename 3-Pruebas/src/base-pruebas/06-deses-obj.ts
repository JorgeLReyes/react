export const usContext = ({
  clave,
  edad,
}: {
  [key: string]: string | number;
}) => {
  return {
    nombreClave: clave,
    anios: edad,
    latlng: {
      lat: 14.1232,
      lng: -12.3232,
    },
  };
};
