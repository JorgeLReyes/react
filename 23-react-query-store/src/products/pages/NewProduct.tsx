import { Button, Image, Input, Textarea } from "@heroui/react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useProductMutation } from "../../hooks/useProductMutation";

interface FormInputs {
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

export const NewProduct = () => {
  const productMutation = useProductMutation();

  const { control, handleSubmit, watch } = useForm<FormInputs>({
    defaultValues: {
      title: "Teclado",
      price: 50,
      description: "",
      category: "electronics",
      image: "https://ss637.liverpool.com.mx/xl/1143900181.jpg",
    },
  });

  const image = watch("image");

  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    console.log(data);
    productMutation.mutate(data);
  };

  return (
    <div className="w-full flex-col">
      <h1 className="text-2xl font-bold mb-4">Nuevo producto</h1>

      <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex justify-around items-start">
          <div className="flex flex-col w-[500px] gap-4  mr-5">
            <Controller
              control={control}
              name="title"
              rules={{ required: true }}
              render={({ field }) => (
                <Input
                  type="text"
                  placeholder="Título del producto"
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            />
            <Controller
              control={control}
              name="price"
              rules={{ required: true }}
              render={({ field }) => (
                <Input
                  type="number"
                  placeholder="Precio del producto"
                  value={field.value?.toString()}
                  onChange={(e) => field.onChange(+e.target.value)}
                />
              )}
            />
            <Controller
              control={control}
              name="image"
              rules={{ required: true }}
              render={({ field }) => (
                <Input
                  placeholder="URL del producto"
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            />
            <Controller
              control={control}
              name="description"
              rules={{ required: true }}
              render={({ field }) => (
                <Textarea
                  placeholder="Descripción del producto"
                  className="min-h-[120px]"
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            />
            <Controller
              control={control}
              name="category"
              rules={{ required: true }}
              render={({ field }) => (
                <select
                  value={field.value}
                  onChange={field.onChange}
                  className="rounded-md px-3 py-2 bg-gray-800 text-white w-full"
                >
                  <option value="men's clothing">Men's clothing</option>
                  <option value="women's clothing">Women's clothing</option>
                  <option value="jewelery">Jewelery</option>
                  <option value="electronics">Electronics</option>
                </select>
              )}
            />

            <Button
              className="mt-2"
              style={{
                color: "white",
                backgroundColor: "rgb(59, 130, 246)",
                padding: ".5rem",
                borderRadius: ".5rem",
              }}
              type="submit"
              isDisabled={productMutation.isPending}
            >
              {productMutation.isPending ? "Cargando" : "Crear"}
            </Button>
          </div>

          <div
            className="bg-white rounded-2xl p-10 flex items-center justify-center"
            style={{
              width: "500px",
              height: "600px",
            }}
          >
            <Image src={image} />
          </div>
        </div>
      </form>
    </div>
  );
};
