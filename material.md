# Materia UI

`Instalaciones`

Instalaciones de la biblioteca e iconos

```bash
npm install @mui/material @emotion/react @emotion/styled
npm install @mui/icons-material
```

"Intalacion" de una font de google por cdn

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
  rel="stylesheet"
  href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap"
/>
```

## CreateTheme

Es una funcion que sirve para definir estilos globales de la aplicacion como: tipografias, paletas de colores, ajustar componentes de la biblioteca, espacioados.

```jsx
export const theme = createTheme({
  palette: {
    primary: {
      main: "#262254",
    },
    secondary: {
      main: "#543884",
    },
    error: {
      main: red.A400,
    },
  },
});
```

## Componente ThemeProvider

Es un componente que proveera el tema a todos los componentes que se encuentren dentro de su arbol (hijos). Se le pasa una propiedad al componente llamada theme y esta recibe el createTheme que es la configuracion del thema que hicimos para la aplicación

```jsx
const Theme = ({ children }: { children: ReactNode }) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};
```

## CssBaseLine

CssBaseline en Material UI es un componente que normaliza y resetea los estilos CSS predeterminados de los navegadores para proporcionar una base consistente en la aplicación.

> CssBaseline solo maneja estilos base (como márgenes, tipografía, fondo, etc.), pero no es necesario para que los colores de la paleta funcionen.

- Establece box-sizing: border-box en todos los elementos para evitar inconsistencias con los márgenes y el padding.
- Elimina márgenes y paddings predeterminados que los navegadores aplican a ciertos elementos, como body y h1.
- Aplica una tipografía consistente y ajusta otros estilos básicos como colores de fondo y texto.

> Es opcional. Si no lo usas, necesitarás manejar estos estilos básicos por tu cuenta.

`¿Qué son estos "estilos base" en createTheme?`

- Paleta de colores: Defines los colores principales, secundarios y de fondo. Estos colores se aplicarán automáticamente a los componentes como los botones, fondos, etc.
- Tipografía: Estableces la fuente base de la aplicación y también puedes definir tamaños y estilos de texto para encabezados (h1, h2, etc.), párrafos, etc.
- Otros ajustes globales: Como márgenes, rellenos, y otros estilos de los componentes, aunque estos se manejan de manera más específica en los componentes.

> Ver slotProps de materialUi
