import { Form, NavLink, useNavigation } from "react-router";
import type { Route } from "../+types/home";
import { sleep } from "~/assets/fake-data";

export async function action({ request }: Route.ActionArgs) {
  const data = await request.formData();
  console.log("Server action", data);
  return Object.fromEntries(data);
}

export async function clientAction({
  serverAction,
  request,
}: Route.ClientActionArgs) {
  await sleep(2000);
  const dataForm = await request.clone().formData();
  const data = await serverAction();
  return { dataForm: Object.fromEntries(dataForm), data };
}

export async function loader() {
  console.log("server loader testing 1");
  return { message: "Hello, world! from server loader" };
}

export async function clientLoader({ serverLoader }: Route.ClientLoaderArgs) {
  const serverData = await serverLoader();
  console.log("client loader");
  return {
    message: "Hello, world! from client loader",
    serverData,
  };
}

export function meta() {
  return [
    { title: "Very cool app" },
    {
      property: "og:title",
      content: "Very cool app",
    },
    {
      name: "description",
      content: "This app is the best",
    },
  ];
}

export function headers() {
  return {
    "X-Stretchy-Pants": "its for fun",
    "Cache-Control": "max-age=300, s-maxage=3600",
  };
}

function TestingPage({
  loaderData,
  actionData,
  params,
  matches,
}: Route.ComponentProps) {
  const navigation = useNavigation();

  const isPosting = navigation.state === "submitting";

  console.log({ navigation, isPosting });

  return (
    <div>
      <h1 className="text-2xl font-bold">Testing Page</h1>
      <p>Loader Data: {JSON.stringify(loaderData)}</p>
      <br />
      <p>
        Action Data: <br />
        {JSON.stringify(actionData)?.replaceAll("},", "},\n")}
      </p>
      <br />
      <p>Route Parameters: {JSON.stringify(params)}</p>
      <br />
      <p>Matched Routes: {JSON.stringify(matches)}</p>
      <br />
      <NavLink
        to="/auth/testing-args/ABC-123"
        className={({ isPending }) =>
          isPending ? "text-red-500" : "text-blue-500"
        }
      >
        Testing Args Page
      </NavLink>
      <Form className="mt-2 flex flex-col gap-2" method="post">
        <input
          className="border-2 border-gray-300 rounded-md p-2"
          type="text"
          name="name"
          placeholder="Name"
        />
        <input
          className="border-2 border-gray-300 rounded-md p-2"
          type="text"
          name="email"
          placeholder="Email"
        />
        <input
          className="border-2 border-gray-300 rounded-md p-2"
          type="text"
          name="password"
          placeholder="Password"
        />
        <button className="bg-blue-500 text-white rounded-md p-2" type="submit">
          Submit
        </button>
        {isPosting && <p>Submitting...</p>}
      </Form>
    </div>
  );
}

export default TestingPage;
