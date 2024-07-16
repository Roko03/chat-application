import { Route, Routes, createBrowserRouter } from "react-router-dom";
import AuthenticationPage from "./routes/authentication/AuthenticationPage";

function Root() {
  return (
    <Routes>
      <Route>
        <Route path="/authentication" element={<AuthenticationPage />} />
      </Route>
      <Route path="*" element={<h1>Error page</h1>} />
    </Routes>
  );
}
const router = createBrowserRouter([{ path: "*", Component: Root }]);

export default router;
