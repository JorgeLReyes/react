import { useRef } from "react";
import HeroCard from "../components/HeroCard";
import { Form, useActionData, useSearchParams } from "react-router-dom";
import { getHeroByName } from "../helpers/getHeroByName";

const SearchPage = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [params, setParams] = useSearchParams();
  const query = params.get("q") || "";
  const data = useActionData() as { q: string };
  const heroes =
    query || !data
      ? getHeroByName(query)
      : getHeroByName((data as { q: string })["q"]);
  console.log("render", data);
  // const location = useLocation();
  // const { q = "" } = queryString.parse(location.search) as { q: string };
  const onSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const value = inputRef.current!.value.trim();
    if (query !== value) setParams({ q: value });
  };

  return (
    <>
      <h1>Search</h1>
      <hr />
      <div className="row w-100">
        <div className="col-5">
          <h4>Searching</h4>
          <hr />
          <form onSubmit={onSearchSubmit}>
            <input
              ref={inputRef}
              type="text"
              placeholder="Search a hero without Form (react-dom)"
              className="form-control"
              name="searchText"
              autoComplete="off"
              defaultValue={query}
            />
            <button className="btn btn-outline-primary">Search</button>
          </form>
          <Form method="post">
            <input
              type="text"
              placeholder="Search a hero with Form (react-dom)"
              className="form-control"
              name="q"
              autoComplete="off"
              defaultValue={query}
            />
            <button className="btn btn-outline-primary">Search</button>
          </Form>
        </div>
        <div className="col-7">
          <h4>Results</h4>
          <hr />

          {!query && <div className="alert alert-primary">Search a hero</div>}

          {query && !heroes.length && (
            <div className="alert alert-danger">
              No hero finding: <b>{query}</b>
            </div>
          )}

          {heroes?.map((hero) => (
            <HeroCard hero={hero} />
          ))}
        </div>
      </div>
    </>
  );
};

export { SearchPage };
