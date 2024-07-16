import { Route, Routes, createBrowserRouter } from "react-router-dom";

function Root() {
  return (
    <Routes>
      <Route>
        <Route path="/authentication" element={<h1>Ej</h1>} />
      </Route>
      <Route path="*" element={<h1>Error page</h1>} />
    </Routes>
  );
}
const router = createBrowserRouter([{ path: "*", Component: Root }]);

export default router;
