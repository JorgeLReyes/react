# StoryBook

`npm create storybook@latest`

## 1. Definiendo meta y su tipado con Meta

Primero, debes definir un objeto meta que exportes por defecto. Este objeto es el que contiene toda la configuración de la historia de Storybook, como el componente que estamos mostrando, los valores predeterminados de las propiedades (args), parámetros adicionales, etc.

La tipificación de este objeto se hace utilizando Meta. Al usar el tipo genérico Meta<typeof MyComponent>, estamos diciendo que meta es un objeto cuya estructura depende de las propiedades del componente MyComponent. Esto ayuda a mantener la consistencia entre el componente y sus configuraciones en las historias.

```js
const meta = {
  title: "MyLabel",
  component: MyLabel,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof MyLabel>;


export default meta;
```

Es importante mecionar que si usamos una interfaz para definir las propiedades esta la exportemos, ya que:

- Podemos usar directamente la interfaz en el generico evitando usar `typeof Component`
- Si usamos el generico accediendo al tipo de Componente al momento de hacer la transpilacion obtendremos un warning/error ya que en este caso si se necesita que la interfaz este exportada explicitamente, es decir, al momento de analizar el tipado del Componente encontrara el nombre de esta interfaz y por ende necesitará acceder a esta.

### Mas props

Esta la propiedad `argTypes` donde podemos forzar el tipado de las propiedades, ademas de poder mejorar como se mostrará en la story

```js
argTypes: {
  size: { control: "inline-radio", options: ["h1", "h2", "h3"] },
},
```

Podemos omitir options para que tome las opciones que estan definidas para funcionar con el componente

## 2. ¿Qué hace el genérico Meta<typeof MyComponent>?

> satisfies es un nuevo tipo de tipado que permite mantener las literales

- Meta<typeof MyComponent> infiere los tipos de las propiedades de MyComponent (como text, color, etc.) y asegura que el objeto meta tiene la configuración correcta para ese componente.
- Esto permite que Storybook entienda cómo interactuar con los args, parameters y component, garantizando que todo sea consistente con el tipo de componente.

2. Definiendo y tipando las historias con StoryObj

Luego, para definir las historias (o variantes de un componente), usamos el tipo StoryObj. Este tipo está vinculado a meta, y ayuda a que las historias se estructuren correctamente con respecto al componente y sus args.

Al usar StoryObj<typeof meta>, indicamos que la historia debe ajustarse a la configuración de meta previamente definida. StoryObj sabe que args, component, y otros parámetros definidos en meta son importantes para cada historia.

```js
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    label: "Ingi",
    size: "h1",
  },
};
```

- StoryObj<typeof meta> asegura que las historias estén tipadas de acuerdo con las configuraciones definidas en meta.
- args: Si quieres sobreescribir valores para la historia, puedes hacerlo.

> Nota: En Storybook, las historias son simplemente las variantes de un componente que se exportan sin usar default. Es decir, cualquier exportación que no sea la exportación por defecto de meta se considera una historia. Estas historias se definen con el tipo StoryObj<typeof meta>, que las vincula con la configuración del componente definida en el objeto meta.

## 3. Documentacion automatica de las descripciones

Para que en la documentación que nos crea stori a traves del tag `autodocs` muestre descripciones personalizadas, en donde definamos la interfaz o tipos de los argumentos del componente, debemos anteponerle a cada propiedad un comentario el cual debe tener la estrcutura siguiente, de lo contrario no funcionará

```js
/**
 * Text to display
 **/

// Ejemplo:
interface Props {
  /**
   * Text to display
   **/
  label: string;
  /**
   * Label size
   **/
  size?: "h1" | "h2" | "h3" | "normal";
}
```

> tsc -p [ path ] le indicamos la configuracion que debe tomar al momento de hacer la transpilacion de codigo
