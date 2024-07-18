import { Route, Routes, createBrowserRouter } from "react-router-dom";
import AuthenticationPage from "./routes/authentication/AuthenticationPage";
import ProtectedRoute from "./routes/ProtectedRoute";
import HomePage from "./routes/home/HomePage";

function Root() {
  return (
    <Routes>
      <Route path="/authentication" element={<AuthenticationPage />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<HomePage />} />
      </Route>
      <Route path="*" element={<h1>Error page</h1>} />
    </Routes>
  );
}
const router = createBrowserRouter([{ path: "*", Component: Root }]);

export default router;
