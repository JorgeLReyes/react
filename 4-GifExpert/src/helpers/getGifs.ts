const key = import.meta.env.VITE_API_KEY;

interface GiftsResponse {
  id: string | number;
  title: string;
  images: { downsized_medium: { url: string } };
}

export interface Gifts {
  id: string | number;
  title: string;
  url: string;
}

export const getGifs = async (category: string): Promise<Gifts[]> => {
  const url = `https://api.giphy.com/v1/gifs/search/?api_key=${key}&q=${category}&limit=5`;

  const resp = await fetch(url);
  const { data } = await resp.json();
  const gifs = data.map((img: GiftsResponse) => ({
    id: img.id,
    title: img.title,
    url: img.images.downsized_medium.url,
  }));
  return gifs;
};
