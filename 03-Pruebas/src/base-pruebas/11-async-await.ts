export const getImagen = async () => {
  try {
    const apiKey = "RAh47kXTnXIa7egL81UGsvb7OEJ8jNST";
    const resp = await fetch(
      `http://api.giphy.com/v1/gifs/random?api_key=${apiKey}`
    );
    const { data } = await resp.json();

    const { url } = data.images.original;

    return url;
  } catch (error) {
    console.log({ error: (<Error>error).message });
    return "No se encontro la imagen";
  }
};
