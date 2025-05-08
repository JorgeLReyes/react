interface Options {
  endpoint: string;
  data?: unknown;
  method: "GET" | "POST" | "PUT" | "DELETE";
}

const baseUrl = import.meta.env.VITE_BASE_URL;

export const fetchAPI = async <T>({
  endpoint,
  data,
  method = "GET",
}: Options): Promise<T> => {
  const url = baseUrl + endpoint;
  if (method === "GET") {
    const resp = await fetch(url, {
      credentials: "include",
    });
    return <T>resp.json();
  }

  const resp = await fetch(url, {
    method,
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(data),
    credentials: "include",
  });

  return <T>resp.json();
};
