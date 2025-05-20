import {  HashRouter as Router, Routes, Route, Link } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState, lazy, Suspense } from "react";
import AdoptedPetContext from "./store/adoptedPet";
import ErrorBoundary from "./components/ErrorBoundary";

const Details = lazy(() => import("./components/Details"));
const SearchParams = lazy(() => import("./components/SearchParams"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      cacheTime: Infinity,
    },
  },
});

const App = () => {
  const adoptedPet = useState(null);

  return (
    <div>
      <Router>
        <AdoptedPetContext.Provider value={adoptedPet}>
          <QueryClientProvider client={queryClient}>
            <Suspense
              fallback={
                <div className="loading-pane">
                  <h2 className="loader">🌀</h2>
                </div>
              }
            >
              <header>
                <Link to="/">Adopt Me!</Link>
              </header>

              <Routes>
                <Route path="/details/:id" element={<Details />} />
                <Route
                  path="/"
                  element={
                    <ErrorBoundary>
                      <SearchParams />
                    </ErrorBoundary>
                  }
                />
              </Routes>
            </Suspense>
          </QueryClientProvider>
        </AdoptedPetContext.Provider>
      </Router>
    </div>
  );
};

export default App;
