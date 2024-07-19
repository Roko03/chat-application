import { Route, Routes, createBrowserRouter } from "react-router-dom";
import AuthenticationPage from "./routes/authentication/AuthenticationPage";
import ProtectedRoute from "./routes/ProtectedRoute";
import HomePage from "./routes/home/HomePage";
import ContainerLayout from "./components/container/ContainerLayout";
import Layout from "./components/layout/Layout";

function Root() {
  return (
    <Routes>
      <Route element={<ContainerLayout />}>
        <Route path="/authentication" element={<AuthenticationPage />} />
      </Route>
      <Route element={<Layout />}>
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<HomePage />} />
        </Route>
      </Route>
      <Route path="*" element={<h1>Error page</h1>} />
    </Routes>
  );
}
const router = createBrowserRouter([{ path: "*", Component: Root }]);

export default router;
