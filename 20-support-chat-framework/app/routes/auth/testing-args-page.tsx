import { Link } from "react-router";
import type { Route } from "./+types/testing-args-page";
import { sleep } from "~/assets/fake-data";

export function meta() {
  return [{ title: "Testing Args Page" }];
}

export function headers() {
  return {
    "X-Stretchy-Pants": "its for fun",
    "Cache-Control": "max-age=300, s-maxage=3600",
  };
}

export async function loader({ params }: Route.ClientLoaderArgs) {
  // const { id } = params;
  console.log({ params });
  return { mundo: "hola" };
}
export async function clientLoader({
  params,
  serverLoader,
}: Route.ClientLoaderArgs) {
  const { id } = params;
  console.log(await serverLoader());
  await sleep(1500);
  return { hola: "mundo", id };
}

export function HydrateFallback() {
  return <p>Loading Page...</p>;
}

export function links() {
  return [
    {
      rel: "icon",
      href: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1150px-React-icon.svg.png",
      type: "image/png",
    },
  ];
}

clientLoader.hydrate = true as const;

function TestingArgsPage({
  loaderData,
  actionData,
  params,
  matches,
}: Route.ComponentProps) {
  const { id } = params;
  console.log(id);
  return (
    <div>
      <h1 className="text-2xl font-bold">Testing Args Page</h1>
      <table className="min-w-full table-auto border border-gray-300 mt-4">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-4 py-2 text-left">Dato</th>
            <th className="border px-4 py-2 text-left">Valor</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border px-4 py-2">Loader Data</td>
            <td className="border px-4 py-2">{JSON.stringify(loaderData)}</td>
          </tr>
          <tr>
            <td className="border px-4 py-2">Action Data</td>
            <td className="border px-4 py-2">{JSON.stringify(actionData)}</td>
          </tr>
          <tr>
            <td className="border px-4 py-2">Route Parameters</td>
            <td className="border px-4 py-2">{JSON.stringify(params)}</td>
          </tr>
          <tr>
            <td className="border px-4 py-2">Matched Routes</td>
            <td className="border px-4 py-2">{JSON.stringify(matches)}</td>
          </tr>
        </tbody>
      </table>

      <Link to="/auth/testing" className="text-blue-500">
        Testing Page
      </Link>
    </div>
  );
}

export default TestingArgsPage;
