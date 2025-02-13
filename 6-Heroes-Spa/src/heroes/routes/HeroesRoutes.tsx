import { Navigate, Route, Routes } from "react-router-dom";
import { Navbar } from "../../ui";
import { DCPage, HeroPage, MarvelPage, SearchPage } from "../";
const HeroesRoutes = () => {
  return (
    <>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="marvel" element={<MarvelPage />} />
          <Route path="dc" element={<DCPage />} />
          <Route path="search" element={<SearchPage />} />
          <Route path="hero/:id" element={<HeroPage />} />
          {/* <Route path="hero/:heroId" element={} /> */}
          <Route index element={<Navigate to="/heroes/marvel" />} />
        </Routes>
      </div>
    </>
  );
};

export { HeroesRoutes };
