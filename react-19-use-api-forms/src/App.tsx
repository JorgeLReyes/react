import { Suspense } from "react";
import { getPlanets } from "./actions/getPlanets";
import Planets from "./pages/Planets";
import { ErrorBoundary } from "./shared/ErroBoundary";

function App() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Planetas del Sistema Solar</h1>
      <ErrorBoundary fallback={<div>Ha ocurrido un error</div>}>
        <Suspense fallback={<div>Cargando planetas...</div>}>
          <Planets getPlanets={getPlanets()} />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}

export default App;
